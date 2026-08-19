import { GoogleGenerativeAI } from "@google/generative-ai";

import { SYSTEM_PROMPT, buildUserMessage } from "./prompts.js";
import { safeValidateRecipes, type RecipesResponse } from "./validators.js";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GROK_API_KEY = process.env.GROK_API_KEY;
const GROK_BASE_URL = "https://api.x.ai/v1";

function cleanJsonResponse(text: string): unknown {
  let cleaned = text.trim();

  // Strip markdown code fences
  if (cleaned.startsWith("```")) {
    cleaned = cleaned.replace(/^```(?:json)?\s*\n?/, "");
    cleaned = cleaned.replace(/\n?```\s*$/, "");
  }

  return JSON.parse(cleaned);
}

async function callGemini(ingredients: string[]): Promise<RecipesResponse> {
  if (!GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY not configured");
  }

  console.log("[GEMINI] API key present, calling Gemini...");
  console.log("[GEMINI] Ingredients:", ingredients);

  const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({
    model: "gemini-3.6-flash",
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 4096,
    },
  });

  const userMessage = buildUserMessage(ingredients);
  const fullPrompt = `${SYSTEM_PROMPT}\n\n${userMessage}`;

  console.log("[GEMINI] Sending prompt, length:", fullPrompt.length);

  const result = await model.generateContent(fullPrompt);
  const responseText = result.response.text();
  console.log("[GEMINI] Raw response (first 500 chars):", responseText.substring(0, 500));

  const parsed = cleanJsonResponse(responseText);
  const validated = safeValidateRecipes(parsed);

  if (!validated.success) {
    console.error("[GEMINI] Validation failed:", validated.error);
    throw new Error(`Invalid Gemini response: ${validated.error}`);
  }

  console.log("[GEMINI] Success! Got", validated.data.recipes.length, "recipes");
  return validated.data;
}

async function callGrok(ingredients: string[]): Promise<RecipesResponse> {
  if (!GROK_API_KEY) {
    throw new Error("GROK_API_KEY not configured");
  }

  const userMessage = buildUserMessage(ingredients);

  const response = await fetch(`${GROK_BASE_URL}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${GROK_API_KEY}`,
    },
    body: JSON.stringify({
      model: "grok-3",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: userMessage },
      ],
      temperature: 0.7,
      max_tokens: 4096,
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Grok API error ${response.status}: ${body}`);
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content;

  if (!content) {
    throw new Error("No content in Grok response");
  }

  const parsed = cleanJsonResponse(content);
  const validated = safeValidateRecipes(parsed);

  if (!validated.success) {
    throw new Error(`Invalid Grok response: ${validated.error}`);
  }

  return validated.data;
}

export async function generateRecipesFromAI(
  ingredients: string[]
): Promise<RecipesResponse> {
  const errors: string[] = [];

  console.log("[AI] Starting recipe generation for:", ingredients);

  // Try Gemini first
  try {
    console.log("[AI] Trying Gemini...");
    const result = await callGemini(ingredients);
    console.log("[AI] Gemini succeeded");
    return result;
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[AI] Gemini failed:", msg);
    errors.push(`Gemini: ${msg}`);
  }

  // Fallback to Grok
  try {
    console.log("[AI] Trying Grok fallback...");
    const result = await callGrok(ingredients);
    console.log("[AI] Grok succeeded");
    return result;
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[AI] Grok failed:", msg);
    errors.push(`Grok: ${msg}`);
  }

  console.error("[AI] All providers failed:", errors);
  throw new Error(
    `All AI providers failed: ${errors.join(" | ")}`
  );
}

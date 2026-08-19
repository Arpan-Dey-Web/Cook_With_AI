import type { Request, Response } from "express";

import { generateRecipesFromAI } from "../services/ai.service.js";

const MAX_INGREDIENTS = 30;

export async function generateRecipes(
  req: Request,
  res: Response
) {
  try {
    console.log("[CTRL] POST /api/recipes/generate");
    console.log("[CTRL] Body:", JSON.stringify(req.body));

    const { ingredients } = req.body;

    if (!Array.isArray(ingredients) || ingredients.length === 0) {
      console.log("[CTRL] Validation failed: no ingredients");
      return res.status(400).json({
        success: false,
        message: "At least one ingredient is required.",
      });
    }

    if (ingredients.length > MAX_INGREDIENTS) {
      return res.status(400).json({
        success: false,
        message: `Maximum ${MAX_INGREDIENTS} ingredients allowed.`,
      });
    }

    for (const item of ingredients) {
      if (typeof item !== "string" || item.trim().length === 0) {
        return res.status(400).json({
          success: false,
          message: "Each ingredient must be a non-empty string.",
        });
      }
    }

    const normalized = ingredients.map((i: string) => i.trim().toLowerCase());
    console.log("[CTRL] Normalized ingredients:", normalized);

    const result = await generateRecipesFromAI(normalized);

    console.log("[CTRL] Success! Sending", result.recipes.length, "recipes");
    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("[CTRL] Recipe generation error:", error);

    return res.status(500).json({
      success: false,
      message: "We couldn't generate recipes right now. Please try again.",
    });
  }
}

import { Recipe } from "../types/recipe";

const API_URL = process.env.EXPO_PUBLIC_API_URL ?? "http://10.0.2.2:5000";

interface ApiResponse {
  success: boolean;
  data?: { recipes: Recipe[] };
  message?: string;
}

export async function generateRecipes(
  ingredients: string[]
): Promise<Recipe[]> {
  const url = `${API_URL}/api/recipes/generate`;
  console.log("[SERVICE] Calling:", url);
  console.log("[SERVICE] Ingredients:", ingredients);

  let response: Response;
  try {
    response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ingredients }),
    });
  } catch (fetchErr) {
    console.error("[SERVICE] Network error:", fetchErr);
    throw new Error(
      `Cannot reach server at ${API_URL}. ` +
      `Make sure backend is running and URL is correct. ` +
      `Error: ${fetchErr instanceof Error ? fetchErr.message : String(fetchErr)}`
    );
  }

  console.log("[SERVICE] Response status:", response.status);

  let data: ApiResponse;
  try {
    data = await response.json();
  } catch {
    console.error("[SERVICE] Failed to parse response as JSON");
    throw new Error("Server returned invalid response.");
  }

  console.log("[SERVICE] Response data:", JSON.stringify(data).substring(0, 500));

  if (!response.ok || !data.success) {
    throw new Error(
      data.message || "Failed to generate recipes."
    );
  }

  return data.data?.recipes ?? [];
}


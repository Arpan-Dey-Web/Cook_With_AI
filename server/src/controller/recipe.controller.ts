import type { Request, Response } from "express";

export async function generateRecipes(
  req: Request,
  res: Response
) {
  try {
    const { ingredients } = req.body;

    if (!Array.isArray(ingredients) || ingredients.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one ingredient is required.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Recipe generation endpoint is working.",
      data: {
        ingredients,
      },
    });
  } catch (error) {
    console.error("Recipe generation error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong.",
    });
  }
}
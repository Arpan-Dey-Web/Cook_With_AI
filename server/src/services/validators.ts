import { z } from "zod";

const RecipeIngredientSchema = z.object({
  name: z.string().min(1),
  quantity: z.string().min(1),
  available: z.boolean(),
  optional: z.boolean(),
});

const RecipeSubstitutionSchema = z.object({
  missingIngredient: z.string().min(1),
  alternative: z.string().min(1),
});

const RecipeSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  description: z.string().min(1),
  matchPercentage: z.number().min(0).max(100),
  cookingTime: z.number().positive(),
  difficulty: z.enum(["Easy", "Medium", "Hard"]),
  servings: z.number().positive(),
  ingredients: z.array(RecipeIngredientSchema).min(1),
  instructions: z.array(z.string().min(1)).min(1),
  substitutions: z.array(RecipeSubstitutionSchema),
  chefTip: z.string().optional(),
});

const RecipesResponseSchema = z.object({
  recipes: z.array(RecipeSchema).min(1).max(5),
});

type RecipeIngredient = z.infer<typeof RecipeIngredientSchema>;
type RecipeSubstitution = z.infer<typeof RecipeSubstitutionSchema>;
type Recipe = z.infer<typeof RecipeSchema>;
type RecipesResponse = z.infer<typeof RecipesResponseSchema>;

function validateRecipesResponse(data: unknown): RecipesResponse {
  return RecipesResponseSchema.parse(data);
}

function safeValidateRecipes(data: unknown): {
  success: true;
  data: RecipesResponse;
} | {
  success: false;
  error: string;
} {
  const result = RecipesResponseSchema.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data };
  }
  return {
    success: false,
    error: result.error.issues
      .map((i) => `${i.path.join(".")}: ${i.message}`)
      .join("; "),
  };
}

export {
  RecipeIngredientSchema,
  RecipeSubstitutionSchema,
  RecipeSchema,
  RecipesResponseSchema,
  validateRecipesResponse,
  safeValidateRecipes,
  type RecipeIngredient,
  type RecipeSubstitution,
  type Recipe,
  type RecipesResponse,
};

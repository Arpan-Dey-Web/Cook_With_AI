export interface RecipeIngredient {
  name: string;
  quantity: string;
  available: boolean;
  optional: boolean;
}

export interface RecipeSubstitution {
  missingIngredient: string;
  alternative: string;
}

export interface Recipe {
  id: string;
  name: string;
  description: string;
  matchPercentage: number;
  cookingTime: number;
  difficulty: "Easy" | "Medium" | "Hard";
  servings: number;
  ingredients: RecipeIngredient[];
  instructions: string[];
  substitutions: RecipeSubstitution[];
  chefTip?: string;
}

import { createContext, useContext, useState, type ReactNode } from "react";
import { Recipe } from "../types/recipe";

interface RecipeContextValue {
  ingredients: string[];
  setIngredients: (ingredients: string[]) => void;
  recipes: Recipe[];
  setRecipes: (recipes: Recipe[]) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  error: string | null;
  setError: (error: string | null) => void;
  clearAll: () => void;
}

const RecipeContext = createContext<RecipeContextValue | null>(null);

export function RecipeProvider({ children }: { children: ReactNode }) {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clearAll = () => {
    setRecipes([]);
    setError(null);
    setLoading(false);
  };

  return (
    <RecipeContext.Provider
      value={{
        ingredients,
        setIngredients,
        recipes,
        setRecipes,
        loading,
        setLoading,
        error,
        setError,
        clearAll,
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
}

export function useRecipeContext() {
  const context = useContext(RecipeContext);
  if (!context) {
    throw new Error(
      "useRecipeContext must be used within a RecipeProvider"
    );
  }
  return context;
}

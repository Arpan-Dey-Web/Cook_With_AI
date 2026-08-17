import { Recipe } from "../types/recipe";

export const MOCK_RECIPES: Recipe[] = [
  {
    id: "chicken-fried-rice",
    name: "Chicken Fried Rice",
    description:
      "A quick and flavorful fried rice made with chicken, egg, rice, and vegetables.",
    matchPercentage: 90,
    cookingTime: 20,
    difficulty: "Easy",
    servings: 2,

    ingredients: [
      {
        name: "Chicken",
        quantity: "250g",
        available: true,
        optional: false,
      },
      {
        name: "Rice",
        quantity: "2 cups",
        available: true,
        optional: false,
      },
      {
        name: "Egg",
        quantity: "2",
        available: true,
        optional: false,
      },
      {
        name: "Onion",
        quantity: "1 medium",
        available: true,
        optional: false,
      },
      {
        name: "Garlic",
        quantity: "2 cloves",
        available: false,
        optional: false,
      },
      {
        name: "Cooking oil",
        quantity: "2 tbsp",
        available: false,
        optional: false,
      },
    ],

    instructions: [
      "Cook the chicken in a hot pan until fully cooked.",
      "Add chopped onion and garlic and cook until fragrant.",
      "Add the cooked rice and mix everything together.",
      "Push the rice to one side and scramble the eggs.",
      "Mix the eggs with the rice and chicken.",
      "Season to taste and stir-fry for another 2–3 minutes.",
    ],

    substitutions: [
      {
        missingIngredient: "Garlic",
        alternative: "Use garlic powder if available.",
      },
      {
        missingIngredient: "Cooking oil",
        alternative: "Use butter if available.",
      },
    ],

    chefTip:
      "Use cold cooked rice for better fried rice texture.",
  },

  {
    id: "chicken-egg-stir-fry",
    name: "Chicken Egg Stir Fry",
    description:
      "A simple high-protein stir fry combining chicken, eggs, and fresh vegetables.",
    matchPercentage: 80,
    cookingTime: 15,
    difficulty: "Easy",
    servings: 2,

    ingredients: [
      {
        name: "Chicken",
        quantity: "200g",
        available: true,
        optional: false,
      },
      {
        name: "Egg",
        quantity: "2",
        available: true,
        optional: false,
      },
      {
        name: "Onion",
        quantity: "1 medium",
        available: true,
        optional: false,
      },
      {
        name: "Garlic",
        quantity: "2 cloves",
        available: false,
        optional: false,
      },
      {
        name: "Soy sauce",
        quantity: "1 tbsp",
        available: false,
        optional: false,
      },
    ],

    instructions: [
      "Cut the chicken into small pieces.",
      "Heat oil in a pan and cook the chicken thoroughly.",
      "Add onion and stir-fry for 2 minutes.",
      "Add the eggs and scramble them with the chicken.",
      "Add soy sauce and mix everything together.",
      "Cook for another 2 minutes and serve hot.",
    ],

    substitutions: [
      {
        missingIngredient: "Soy sauce",
        alternative: "Use salt with a small amount of vinegar.",
      },
    ],

    chefTip:
      "Cut the chicken into small pieces so it cooks faster.",
  },

  {
    id: "chicken-rice-bowl",
    name: "Simple Chicken Rice Bowl",
    description:
      "A comforting rice bowl with seasoned chicken, egg, and onion.",
    matchPercentage: 75,
    cookingTime: 25,
    difficulty: "Medium",
    servings: 2,

    ingredients: [
      {
        name: "Chicken",
        quantity: "250g",
        available: true,
        optional: false,
      },
      {
        name: "Rice",
        quantity: "2 cups",
        available: true,
        optional: false,
      },
      {
        name: "Egg",
        quantity: "2",
        available: true,
        optional: false,
      },
      {
        name: "Onion",
        quantity: "1 medium",
        available: true,
        optional: false,
      },
      {
        name: "Ginger",
        quantity: "1 tsp",
        available: false,
        optional: true,
      },
    ],

    instructions: [
      "Cook the rice according to the package instructions.",
      "Season and cook the chicken in a pan.",
      "Add sliced onion and cook until soft.",
      "Prepare the eggs separately.",
      "Place rice into a bowl and top with chicken and onion.",
      "Add the egg and serve warm.",
    ],

    substitutions: [
      {
        missingIngredient: "Ginger",
        alternative: "Skip it or use a small amount of garlic.",
      },
    ],

    chefTip:
      "Serve the chicken over freshly cooked warm rice.",
  },
];
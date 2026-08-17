export function normalizeIngredient(value: string): string {
  return value.trim().replace(/\s+/g, " ");
}

export function isDuplicateIngredient(
  ingredients: string[],
  newIngredient: string
): boolean {
  const normalized = normalizeIngredient(newIngredient).toLowerCase();

  return ingredients.some(
    (ingredient) =>
      normalizeIngredient(ingredient).toLowerCase() === normalized
  );
}
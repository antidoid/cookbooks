export async function fetchRecipes() {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/recipe`);
  return await res.json();
}

export async function fetchRecipe(id: number) {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/recipe/${id}`);
  return await res.json();
}

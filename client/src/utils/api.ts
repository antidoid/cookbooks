import { QueryCache, useQuery, useQueryClient } from "@tanstack/react-query";
import auth from "@/utils/firebase";
import queryClient from "@/main";

export async function fetchRecipes() {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/recipe`);
  return await res.json();
}

export async function fetchRecipe(id: number) {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/recipe/${id}`);
  return await res.json();
}

export async function deleteRecipe(id: number) {
  const currUser = auth.currentUser;
  if (!currUser) {
    throw {
      err: "User not signed in"
    }
  }

  // Delete recipe
  await fetch(
    `${import.meta.env.VITE_API_URL}/api/recipe/${id}`,
    {
      method: "DELETE",
      headers: {
        "User": currUser.uid,
        "Authorization": `Bearer ${await currUser.getIdToken()}`
      }
    }
  ).then(() =>
    queryClient.invalidateQueries({ queryKey: ["recipes"] })
  )
}

import auth from "@/utils/firebase";
import queryClient from "@/main";
import { RecipeWithIngredients } from "@/components/RecipeForm";

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
      err: "User not signed in",
    };
  }

  // Delete recipe
  await fetch(`${import.meta.env.VITE_API_URL}/api/recipe/${id}`, {
    method: "DELETE",
    headers: {
      User: currUser.uid,
      Authorization: `Bearer ${await currUser.getIdToken()}`,
    },
  }).then(() => queryClient.invalidateQueries({ queryKey: ["recipes"] }));
}

export async function createRecipe(recipe: RecipeWithIngredients) {
  const currUser = auth.currentUser;
  if (!currUser) {
    throw {
      err: "User not signed in",
    };
  }
  console.log(JSON.stringify(recipe));

  await fetch(`${import.meta.env.VITE_API_URL}/api/recipe`, {
    method: "POST",
    body: JSON.stringify(recipe),
    headers: {
      user: currUser.uid,
      authorization: `Bearer ${await currUser.getIdToken()}`,
      "content-type": "application/json",
    },
  })
    .then(() => queryClient.invalidateQueries({ queryKey: ["recipes"] }))
    .catch((err: any) => {
      throw {
        err,
        message: "Something went wrong while creating recipe",
      };
    });
}

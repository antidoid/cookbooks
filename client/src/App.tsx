import Recipe from "./components/Recipe";
import RecipeForm from "./components/RecipeForm";
import Navbar from "./components/Navbar";
import { fetchRecipes } from "./utils/api";

import { useQuery } from "@tanstack/react-query";
import { ThemeProvider } from "@/components/theme-provider";
import { CircleX, Loader2 } from "lucide-react";

interface TRecipe {
  id: number;
  name: string;
  description: string;
  preparetime: number;
  serves: string;
  difficulty: string;
  recipetype: string;
  category: string;
  instruction: string;
  owner: string;
}

function App() {
  const { data, isError, isLoading, isSuccess } = useQuery({
    queryKey: ["recipes"],
    queryFn: fetchRecipes,
  });

  const recipeElements = data?.map((recipe: TRecipe) => {
    return (
      <Recipe
        id={recipe.id}
        key={recipe.id}
        name={recipe.name}
        description={recipe.description}
        preparetime={recipe.preparetime}
        serves={recipe.serves}
        difficulty={recipe.difficulty}
        category={recipe.category}
        recipetype={recipe.recipetype}
        instruction={recipe.instruction}
        owner={recipe.owner}
      />
    );
  });

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="min-h-screen">
        <nav>
          <Navbar />
        </nav>
        <main className="w-fit mx-auto flex flex-col justify-center items-center">
          <div className="w-full my-4 px-2 flex justify-between items-center">
            <h1 className="text-4xl md:text-6xl font-semibold">Recipes</h1>
            {isSuccess && <RecipeForm />}
          </div>
          {isLoading && <Loader2 className="size-16 animate-spin" />}
          {isError ? (
            <div className="mt-4 flex flex-col items-center p-4 rounded bg-red-200 text-xl text-red-400">
              <CircleX className="size-16" />
              <p className="ext-3xl"> Error fetching the recipes</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mx-2">
              {recipeElements}
            </div>
          )}
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;

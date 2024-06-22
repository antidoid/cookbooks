import { useQuery } from "@tanstack/react-query";
import { fetchRecipes } from "./utils/api";
import Navbar from "./components/Navbar";
import { ThemeProvider } from "@/components/theme-provider"
import Recipe from "./components/Recipe";

interface TRecipe {
  id: number;
  name: string;
  description: string;
  preparetime: string;
  serves: string;
  difficulty: string;
  recipetype: string;
  category: string;
  instruction: string;
  videolink: string;
  imagelink: string;
}

function App() {
  const { data, error } = useQuery({
    queryKey: ["recipes"],
    queryFn: fetchRecipes,
  });

  if (error) {
    return <div>Error fetching some recipes</div>;
  }

  const recipeElements = data?.map((recipe: TRecipe) => {
    return (
      <Recipe
        key={recipe.id}
        name={recipe.name}
        description={recipe.description}
        preparetime={recipe.preparetime}
        serves={recipe.serves}
        difficulty={recipe.difficulty}
        category={recipe.category}
        recipetype={recipe.recipetype}
      />
    );
  });

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="min-h-screen">
        <nav>
          <Navbar />
        </nav>
        <main className="flex flex-col justify-center items-center">
          <h1 className="my-10 text-6xl font-semibold">Recipes</h1>

          <div className="grid grid-cols-2 gap-8">
            {recipeElements}
          </div>
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;

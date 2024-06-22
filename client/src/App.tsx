import { useQuery } from "@tanstack/react-query";
import { fetchRecipes } from "./utils/api";
import Navbar from "./components/Navbar";

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
      <div key={recipe.id} className="grid grid-cols-2">
        <h2>{recipe.name}</h2>
        <p>{recipe.description}</p>
      </div>
    );
  });

  return (
    <div className="min-h-screen">
      <nav>
        <Navbar />
      </nav>
      <main className="flex flex-col justify-center items-center">
        <h1 className="my-10 text-6xl font-semibold">Recipes</h1>
        {recipeElements}
      </main>
    </div>
  );
}

export default App;

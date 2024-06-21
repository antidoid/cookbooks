import { useQuery } from '@tanstack/react-query'
import { fetchRecipes } from "./utils/api";

interface TRecipe {
  name: string
  description: string
  preparetime: string
  serves: string
  difficulty: string
  recipetype: string
  category: string
  instruction: string
  videolink: string
  imagelink: string
}

function App() {
  const { data, error } = useQuery({
    queryKey: ['recipes'],
    queryFn: fetchRecipes
  })

  if (error) {
    return <div>Error fetching some recipes</div>
  }

  const recipeElements = data?.map((recipe: TRecipe) => {
    return (
      <div className='grid grid-cols-2'>
        <h2>{recipe.name}</h2>
        <p>{recipe.description}</p>
      </div>
    )
  })

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <h1 className="mb-10 text-3xl font-bold">Cookbooks</h1>
      {recipeElements}
    </div>
  )
}

export default App;

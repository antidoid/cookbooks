import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { fetchRecipe } from "@/utils/api";
import { paragraphToList } from "@/utils/ui";
import { nanoid } from "nanoid";

type TIngredient = {
  ingredient_id: number;
  name: string;
  amt: string;
};

type RecipeDetailProps = {
  id: number;
  description: string;
  instruction: string;
};

export default function RecipeDetail({
  id,
  description,
  instruction,
}: RecipeDetailProps) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["recipes", id],
    queryFn: () => fetchRecipe(id),
  });

  if (isLoading) {
    return (
      <div className="flex flex-col space-y-3">
        <Skeleton className="h-[125px] w-[250px] rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <p className="bg-red-100 p-2 rounded text-gray-600">{error.message}</p>
    );
  }

  const ingredientsElements = data?.ingredients.map(
    (ingredient: TIngredient) => {
      return (
        <li
          key={ingredient.ingredient_id}
          className="flex items-center md:items-start md:flex-col"
        >
          <span>{ingredient.name}</span>
          <span className="text-sm ml-3 md:ml-0">{ingredient.amt}</span>
        </li>
      );
    },
  );

  const instructionElements = paragraphToList(instruction).map(
    (instruction) => {
      return <li key={nanoid()}>{instruction}</li>;
    },
  );

  return (
    <main className="flex flex-col">
      <p className="text-xl opacity-70">{description}</p>
      <div>
        <h4 className="text-2xl my-4 font-semibold text-black dark:text-white">
          Ingredients
        </h4>
        <ul className="opacity-70 grid grid-cols-1 md:grid-cols-3 gap-2 text-base">
          {ingredientsElements}
        </ul>
      </div>
      <div>
        <h4 className="opacity-100 text-2xl my-4 font-semibold text-black dark:text-white">
          Instruction
        </h4>
        <ul className="opacity-70 ml-4 list-disc text-base">
          {instructionElements}
        </ul>
      </div>
    </main>
  );
}

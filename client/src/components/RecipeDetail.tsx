import { RecipeProps } from "./Recipe";

type Ingredient = {
  name: string
  amount: string
}

type RecipeDetail = RecipeProps & {
  ingredients: Ingredient[]
}

export default function RecipeDetail({
  name,
  description,
  preparetime,
  serves,
  difficulty,
  recipetype,
  category,
  ingredients
}: RecipeDetail
) {

}

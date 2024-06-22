import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getTime } from "@/utils/ui";
import RecipeDetail from "./RecipeDetail";

export type RecipeProps = {
  id: number;
  name: string;
  description: string;
  preparetime: string;
  serves: string;
  difficulty: string;
  recipetype: string;
  category: string;
  instruction: string;
};

export default function Recipe({
  id,
  name,
  description,
  preparetime,
  serves,
  difficulty,
  category,
  recipetype,
  instruction,
}: RecipeProps) {
  return (
    <Dialog>
      <DialogTrigger>
        <Card>
          <CardHeader>
            <CardTitle>{name}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Time to Prepare: {getTime(preparetime)}</p>
            <p>Serves: {serves}</p>
            <p>Category: {category}</p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <p>{recipetype}</p>
            <p>{difficulty}</p>
          </CardFooter>
        </Card>
      </DialogTrigger>
      <DialogContent className="w-11/12 md:w-3/5">
        <DialogHeader className="text-start">
          <DialogTitle className="text-4xl pb-2">{name}</DialogTitle>
          <DialogDescription>
            <RecipeDetail
              id={id}
              description={description}
              instruction={instruction}
            />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

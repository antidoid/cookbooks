import auth from "@/utils/firebase";

import { Trash2 } from "lucide-react"
import { Loader2 } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
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
import { Button } from "./ui/button";
import { deleteRecipe } from "@/utils/api";
import { useMutation } from "@tanstack/react-query";

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
  owner: string;
};
import { useState } from "react";
import { User } from "firebase/auth";

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
  owner
}: RecipeProps) {
  const mutation = useMutation({
    mutationFn: deleteRecipe
  })

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  auth.onAuthStateChanged((user) => setUser(user));

  const handleDelete = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault()
    try {
      mutation.mutate(id)
    } catch (error) {
      console.log(error)
    }
    mutation.isSuccess && setIsOpen(true)
  }

  return (
    <div className="relative">
      <Dialog>
        <DialogTrigger className="w-full">
          <Card className="text-start opacity-80 hover:opacity-100 transition-opacity delay-100">
            <CardHeader>
              <CardTitle>
                <div className="max-w-64">
                  <span>{name}</span>
                </div>
              </CardTitle>
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
      {
        owner == user?.uid &&
        <AlertDialog
          open={isOpen}
          onOpenChange={setIsOpen}
        >
          <AlertDialogTrigger onClick={() => setIsOpen(true)} className="absolute z-10 top-12 mt-1 right-2">
            <Button
              variant="destructive"
              size="sm"
              className="z-10 absolute right-0 bottom-1"
            >
              <span className="sr-only">Delete</span>
              <Trash2 className="size-4" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="w-11/12">
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                <p>This action cannot be undone. This will permanently delete your recipe</p>
                {mutation.isError &&
                  <p className="bg-red-200 text-red-600 rounded-md p-2 mt-2">Error deleting recipe, please try again</p>
                }
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                disabled={mutation.isPending}
                className="bg-red-200 hover:bg-red-300"
                onClick={handleDelete}>
                {mutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                <span className="text-red-600 font-bold">Delete</span>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      }
    </div >
  );
}

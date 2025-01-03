import auth from "@/utils/firebase";

import { Trash2 } from "lucide-react";
import { Loader2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
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
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getTime } from "@/utils/ui";
import RecipeDetail from "./RecipeDetail";
import { Button } from "./ui/button";
import { deleteRecipe } from "@/utils/api";
import { useMutation } from "@tanstack/react-query";

import { useEffect, useState } from "react";
import { User } from "firebase/auth";
import { useToast } from "./ui/use-toast";

export type RecipeProps = {
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
  owner,
}: RecipeProps) {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    auth.onAuthStateChanged((user) => setUser(user));
  }, []);

  const mutation = useMutation({
    mutationFn: deleteRecipe,
    onSuccess: () => {
      toast({ title: "Recipe deleted successfully" });
      setIsOpen(false);
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Uh oh, Error deleting that recipe, try again",
        duration: 2000,
      });
    },
  });

  const handleDelete = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    mutation.mutate(id);
  };

  return (
    <div className="relative">
      <Dialog>
        <DialogTrigger className="w-full h-full">
          <Card className="h-full flex flex-col justify-evenly text-start opacity-80 hover:opacity-100 transition-opacity delay-100">
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
        <DialogContent className="overflow-y-scroll h-5/6 md:overflow-y-auto md:h-auto w-11/12 md:w-3/5">
          <DialogHeader className="text-start">
            <DialogTitle className="text-4xl pb-2">{name}</DialogTitle>
          </DialogHeader>
          <RecipeDetail
            id={id}
            description={description}
            instruction={instruction}
          />
        </DialogContent>
      </Dialog>
      {user && owner == user.uid && (
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(true)}
            className="absolute hover:bg-red-200 z-10 top-2 right-2 text-red-400 hover:text-red-700 transition-colors duration-300"
          >
            <span className="sr-only">Delete</span>
            <Trash2 className="size-4" />
          </Button>
          <AlertDialogContent className="w-11/12 md:w-auto">
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                recipe
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                disabled={mutation.isPending}
                className="bg-red-200 hover:bg-red-300"
                onClick={handleDelete}
              >
                {mutation.isPending && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                <span className="text-red-600 font-bold">Delete</span>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
}

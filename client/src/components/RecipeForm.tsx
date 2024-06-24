import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { Plus } from "lucide-react";
import auth from "@/utils/firebase";
import { User } from "firebase/auth";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Modal } from "./Modal";
import { useMutation } from "@tanstack/react-query";
import { createRecipe } from "@/utils/api";

const IngredientSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Ingredient name must be 3 or more characters" })
    .max(50, { message: "Ingredient name must be 50 or less characters" }),
  amt: z
    .string()
    .min(1, { message: "Amount must be one or more characters" })
    .max(50, { message: "Amount must be 50 or less characters" }),
});

const RecipeSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Must be 2 or more characters" })
    .max(30, { message: "Must be 30 or less characters" }),
  description: z
    .string()
    .min(10, { message: "Must be 10 or more characters" })
    .max(50, { message: "Must be 50 or less characters" }),
  preparetime: z.union([
    z.coerce
      .number({
        message: "must be a number",
      })
      .int({
        message: "must be a whole number",
      })
      .positive({
        message: "Time must be 1 or more minutes",
      }),
    z.literal("").refine(() => false, {
      message: "is required",
    }),
  ]),
  serves: z.union([
    z.coerce
      .number({
        message: "must be a number",
      })
      .int({
        message: "must be a whole number",
      })
      .positive({
        message: "Must serve 1 or more people",
      }),
    z.literal("").refine(() => false, {
      message: "Number of people to serve is required",
    }),
  ]),
  difficulty: z.enum(["Easy", "Medium", "Hard"]),
  category: z.enum(["Appetizer", "Dessert", "Main Course", "Salad"]),
  recipetype: z.enum(["Veg", "Non-Veg"]),
  instruction: z
    .string()
    .min(10, { message: "Must be 10 or more characters" })
    .max(300, { message: "Must be 200 or less characters" }),
  ingredients: z.string(),
});

const RecipeWithIngredientsSchema = RecipeSchema.extend({
  ingredients: z.array(IngredientSchema),
});

export type Recipe = z.infer<typeof RecipeSchema>;
type Ingredient = z.infer<typeof IngredientSchema>;
export type RecipeWithIngredients = z.infer<typeof RecipeWithIngredientsSchema>;

export default function RecipeForm() {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    auth.onAuthStateChanged((user) => setUser(user));
  }, []);

  const handleClick = () => {
    if (user) {
      setIsOpen(true);
    } else {
      toast({
        title: "Uh oh, You're Not logged in",
        description: "Login to share your favourite recipes",
        duration: 2000,
      });
    }
  };

  const form = useForm<Recipe>({
    resolver: zodResolver(RecipeSchema),
    defaultValues: {
      name: "",
      description: "",
      preparetime: "",
      serves: "",
      difficulty: "Easy",
      category: "Main Course",
      recipetype: "Veg",
      ingredients: "",
      instruction: "",
    },
  });

  useEffect(() => {
    // boolean value to indicate form has not been saved
    localStorage.setItem("userFormModified", form.formState.isDirty.toString());
  }, [form.formState.isDirty]);

  const mutation = useMutation({
    mutationFn: createRecipe,
    onSuccess: () => {
      toast({ title: "Recipe created successfully" });
      setIsOpen(false);
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Uh oh, Error creating that recipe, try again",
        duration: 2000,
      });
    },
  });

  async function onSubmit(values: Recipe) {
    const ingredients = values.ingredients
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0)
      .map((line) => {
        const [name, ...amtParts] = line.split(" ");
        const amt = amtParts.join(" ");
        if (
          !name ||
          !amt ||
          name.length < 3 ||
          name.length > 50 ||
          amt.length < 1 ||
          amt.length > 50
        ) {
          // let the user know about the mishap
        }
        const ingredient: Ingredient = { name, amt };
        return ingredient;
      });

    const recipe: RecipeWithIngredients = {
      ...values,
      ingredients,
    };
    mutation.mutate(recipe);
  }

  return (
    <div>
      <Button
        className="h-fit my-auto p-2 px-4 rounded flex gap-2 bg-green-200 hover:bg-green-300 text-green-600"
        onClick={handleClick}
      >
        <span className="font-bold">Create</span>
        <Plus />
      </Button>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen} form={form}>
        <Form {...form}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit(onSubmit)();
            }}
            className="space-y-6 px-2"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Recipe Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Palak Paneer" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="A classic indian delicacy" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <FormField
                control={form.control}
                name="preparetime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prepare Time</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Time to cook in minutes"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="serves"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Serves</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Number of people to serve"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="difficulty"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Difficulty</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Easy">Easy</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="Hard">Hard</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Salad">Salad</SelectItem>
                        <SelectItem value="Appetizer">Appetizer</SelectItem>
                        <SelectItem value="Main Course">Main Course</SelectItem>
                        <SelectItem value="Dessert">Dessert</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="recipetype"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Recipe Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Veg">Veg</SelectItem>
                        <SelectItem value="Non-Veg">Non-Veg</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="ingredients"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ingredients</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Write ingredients only in this format:
panner 250g
spinach 250g"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="instruction"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Instructions</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Share the instructions in sentences separated by period (.)"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-4">
              <Button type="submit">Submit</Button>
              <Button
                type="button"
                variant="destructive"
                onClick={() => form.reset()}
              >
                Reset
              </Button>
            </div>
          </form>
        </Form>
      </Modal>
    </div>
  );
}

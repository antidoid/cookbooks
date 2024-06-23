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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Modal } from "./Modal";

const RecipeSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Must be 2 or more characters" })
    .max(30, { message: "Must be 30 or less characters" }),
  description: z
    .string()
    .min(10, { message: "Must be 10 or more characters" })
    .max(50, { message: "Must be 50 or less characters" }),
  preparetime: z
    .number()
    .min(0, { message: "Time must be more than 0 minutes" }),
  serves: z.number().min(1, { message: "Must server 1 or more people" }),
  difficulty: z.enum(["Easy", "Medium", "Hard"]),
  category: z.enum(["Appetizer", "Dessert", "Main Course", "Salad"]),
  recipetype: z.enum(["Veg", "Non-Veg"]),
  // instruction
});

export type Recipe = z.infer<typeof RecipeSchema>;

export default function RecipeForm() {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    auth.onAuthStateChanged((user) => setUser(user));
  }, []);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { toast } = useToast();

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
      serves: 0,
      category: "Main Course",
      difficulty: "Easy",
      recipetype: "Veg",
      preparetime: 0,
    },
  });

  async function onSubmit() {
    console.log("Anything");
    // console.log(values);
  }

  useEffect(() => {
    // boolean value to indicate form has not been saved
    localStorage.setItem("userFormModified", form.formState.isDirty.toString());
  }, [form.formState.isDirty]);

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
            className="space-y-6"
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
            {/* <FormField */}
            {/*   control={form.control} */}
            {/*   name="preparetime" */}
            {/*   render={({ field }) => ( */}
            {/*     <FormItem> */}
            {/*       <FormLabel>Prepare Time</FormLabel> */}
            {/*       <FormControl> */}
            {/*         <Input */}
            {/*           type="number" */}
            {/*           placeholder="Time to cook in minutes" */}
            {/*           {...field} */}
            {/*         /> */}
            {/*       </FormControl> */}
            {/*       <FormMessage /> */}
            {/*     </FormItem> */}
            {/*   )} */}
            {/* /> */}
            <div className="flex gap-4">
              <Button>Submit</Button>
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

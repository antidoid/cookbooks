import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { Plus } from "lucide-react";
import auth from "@/utils/firebase";
import { User } from "firebase/auth";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

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

  return (
    <div>
      <Button
        className="h-fit my-auto p-2 px-4 rounded flex gap-2 bg-green-200 hover:bg-green-300 text-green-600"
        onClick={handleClick}
      >
        <span className="font-bold">Create</span>
        <Plus />
      </Button>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="w-11/12 md:w-3/5 lg:w-2/4">
          <div>form goes here</div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

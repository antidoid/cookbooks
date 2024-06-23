import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { Plus } from "lucide-react";
import auth from "@/utils/firebase";
import { User } from "firebase/auth";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Modal } from "./Modal";

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
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <div>form goes here</div>
      </Modal>
    </div>
  );
}

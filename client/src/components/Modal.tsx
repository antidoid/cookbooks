import { Dialog, DialogOverlay, DialogContent } from "@/components/ui/dialog";
import { AlertConfirmation } from "./AlertConfirmation";
import { Dispatch, SetStateAction, useState } from "react";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Recipe } from "./RecipeForm";
import { ScrollArea } from "@/components/ui/scroll-area";
import { UseFormReturn } from "react-hook-form";

type ModalProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  children: React.ReactNode;
  form: UseFormReturn<Recipe>;
};

export function Modal({ isOpen, setIsOpen, form, children }: ModalProps) {
  const [showExitConfirmation, setShowExitConfirmation] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
    form.reset();
  };

  const handleOpenChange = () => {
    const isUserFormModified = localStorage.getItem("userFormModified");
    if (isUserFormModified && JSON.parse(isUserFormModified)) {
      setShowExitConfirmation(true);
    } else {
      setIsOpen(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogOverlay>
        <DialogContent className="p-0 w-11/12 md:w-3/5 lg:w-1/2 h-5/6">
          <ScrollArea className="p-6">
            <DialogTitle className="text-2xl mb-4">Create a recipe</DialogTitle>
            <AlertConfirmation
              open={showExitConfirmation}
              setOpen={setShowExitConfirmation}
              confirmationAction={closeModal}
              message="You haven't saved your changes. Please confirm you want to exit without saving."
            />
            {children}
          </ScrollArea>
        </DialogContent>
      </DialogOverlay>
    </Dialog>
  );
}

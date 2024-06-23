import { Icons } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

import auth from "@/utils/firebase";
import {
  AuthProvider,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  User,
} from "firebase/auth";
import { useState } from "react";
import { ModeToggle } from "./mode-toggle";
import { useToast } from "./ui/use-toast";

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  auth.onAuthStateChanged((user) => setUser(user));
  const { toast } = useToast();

  const loginUser = async (providerName: "Google" | "Github") => {
    try {
      let provider: AuthProvider =
        providerName == "Google"
          ? new GoogleAuthProvider()
          : new GithubAuthProvider();
      await signInWithPopup(auth, provider);
      auth.currentUser &&
        toast({ title: "Successfully logged in user", duration: 2000 });
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: "Unable to log in user, try again",
        description: err.message,
        duration: 4000,
      });
    }
  };

  const logoutUser = async () => {
    await signOut(auth);
    toast({
      title: "User logged out successfully",
      duration: 2000,
    });
  };

  return (
    <Menubar className="flex justify-between p-6 px-2 md:px-4">
      <h3 className="font-bold text-xl">Cookbooks</h3>
      <div className="flex gap-4 items-center">
        <MenubarMenu>
          {user ? (
            <>
              <MenubarTrigger className="cursor-pointer">
                <Avatar>
                  <AvatarImage src={user?.photoURL || undefined} />
                </Avatar>
              </MenubarTrigger>
              <MenubarContent>
                <MenubarItem>Welcome, {user.displayName}</MenubarItem>
                <MenubarSeparator />
                <MenubarItem onClick={() => logoutUser()}>
                  <span>Logout</span>
                </MenubarItem>
              </MenubarContent>
            </>
          ) : (
            <Dialog>
              <DialogTrigger className="border-gray-100">Login</DialogTrigger>
              <DialogContent className="w-11/12 md:w-2/5 lg:w-1/4">
                <DialogTitle></DialogTitle>
                <Card>
                  <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl">Login</CardTitle>
                    <CardDescription>
                      Login to create your own recipes
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-4">
                    <div className="flex flex-col gap-4">
                      <Button
                        onClick={() => loginUser("Github")}
                        variant="outline"
                      >
                        <Icons.gitHub className="mr-2 h-4 w-4" />
                        Github
                      </Button>
                      <Button
                        onClick={() => loginUser("Google")}
                        variant="outline"
                      >
                        <Icons.google className="mr-2 h-4 w-4" />
                        Google
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </DialogContent>
            </Dialog>
          )}
        </MenubarMenu>
        <ModeToggle />
      </div>
    </Menubar>
  );
}

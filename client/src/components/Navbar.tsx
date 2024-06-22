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
  CardFooter,
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

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<Error | null>(null);
  auth.onAuthStateChanged((user) => setUser(user));

  const loginUser = async (providerName: "Google" | "Github") => {
    try {
      let provider: AuthProvider =
        providerName == "Google"
          ? new GoogleAuthProvider()
          : new GithubAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (err: any) {
      setError(err);
    }
  };

  const logoutUser = async () => {
    await signOut(auth);
  };

  return (
    <Menubar className="flex justify-between p-6">
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
                  <button>Logout</button>
                </MenubarItem>
              </MenubarContent>
            </>
          ) : (
            <Dialog>
              <DialogTrigger><Button variant="outline">Login</Button></DialogTrigger>
              <DialogContent>
                <DialogTitle></DialogTitle>
                <Card>
                  <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl">Login</CardTitle>
                    <CardDescription>
                      Login to create your own recipes
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-4">
                    <div className="grid grid-cols-2 gap-6">
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
                  {error && (
                    <CardFooter>
                      <p className="bg-red-100 p-2 rounded text-gray-600">
                        {error.message}
                      </p>
                    </CardFooter>
                  )}
                </Card>
              </DialogContent>
            </Dialog>
          )}
        </MenubarMenu>
        <ModeToggle />
      </div >
    </Menubar>
  );
}
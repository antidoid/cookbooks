import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import { onAuthStateChanged } from "firebase/auth";
import auth from "../utils/firebase";

export default function Header() {
  const [user, setUser] = useState(null);
  onAuthStateChanged(auth, (user) => setUser(user));

  return (
    <header>
      <nav>
        <NavLink to="/">Cookbooks</NavLink>
        <NavLink to="recipe">Recipes</NavLink>
        <NavLink to="about">About</NavLink>
        {user ? (
          <Menu menuButton={<img src={user.photoURL} />}>
            <MenuItem>
              <p>Welcome {user.displayName}</p>
            </MenuItem>
            <MenuItem>
              <NavLink to={`host/recipes/${user.uid}`}>My recipes</NavLink>
            </MenuItem>
            <MenuItem onClick={() => console.log("Signing out...")}>
              Sign out
            </MenuItem>
          </Menu>
        ) : (
          <NavLink to="login">Login</NavLink>
        )}
      </nav>
    </header>
  );
}

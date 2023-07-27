import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu as ControlledMenu, MenuItem } from "@szhsin/react-menu";
import { onAuthStateChanged } from "firebase/auth";
import { auth, logoutUser } from "../utils/api";

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
          <ControlledMenu menuButton={<img src={user.photoURL} />}>
            <MenuItem>
              <p>Welcome {user.displayName}</p>
            </MenuItem>
            <MenuItem>
              <NavLink to={`host/recipes/${user.uid}`}>My recipes</NavLink>
            </MenuItem>
            <MenuItem onClick={logoutUser}>Sign out</MenuItem>
          </ControlledMenu>
        ) : (
          <NavLink to="login">Login</NavLink>
        )}
      </nav>
    </header>
  );
}

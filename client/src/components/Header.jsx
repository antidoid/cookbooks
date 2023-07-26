import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import auth from "../utils/firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function Header() {
  const [user, setUser] = useState(null);

  onAuthStateChanged(auth, (user) => user && setUser(user));

  return (
    <header>
      <nav>
        <NavLink to="/">Cookbooks</NavLink>
        <NavLink to="recipe">Recipes</NavLink>
        <NavLink to="about">About</NavLink>
        <NavLink to="login">{user ? user.displayName : "Login"}</NavLink>
      </nav>
    </header>
  );
}

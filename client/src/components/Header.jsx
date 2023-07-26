import React from "react";
import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <nav>
        <NavLink to="/">Cookbooks</NavLink>
        <NavLink to="recipe">Recipes</NavLink>
        <NavLink to="about">About</NavLink>
        <NavLink to="login">Login</NavLink>
      </nav>
    </header>
  );
}

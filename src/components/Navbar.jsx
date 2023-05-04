import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="flex justify-between items-center text-white mx-5 mt-2 bg-zinc-900 bg-opacity-40 rounded-3xl px-20 py-2">
      <span className="text-2xl font-extrabold">Cookbooks</span>
      <ul className="flex grow justify-evenly mx-20">
        <li>HOME</li>
        <li>CATEGORIES</li>
        <li>
          <Link to="/explore">EXPLORE</Link>
        </li>
        <li>ABOUT US</li>
      </ul>
      <Link to="/login">
        <p className="py-2 px-2 text-md bg-teal-500 rounded-lg font-bold">
          Login
        </p>
      </Link>
    </nav>
  );
};

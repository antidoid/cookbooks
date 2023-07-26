import React from "react";
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { Layout } from "./components";
import { Homepage, Login, About, Recipe, NotFound } from "./pages";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Homepage />} />
      <Route path="recipe" element={<Recipe />} />
      <Route path="login" element={<Login />} />
      <Route path="about" element={<About />} />
      <Route path="*" element={<NotFound />} />
    </Route>,
  ),
  { basename: import.meta.env.DEV ? "/" : "/cookbooks/" },
);

export default function App() {
  return <RouterProvider router={router} />;
}

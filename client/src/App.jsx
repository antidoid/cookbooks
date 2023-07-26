import React from "react";
import {
  RouterProvider,
  createHashRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { Layout } from "./components";
import { Login } from "./pages";

const router = createHashRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<h1>Welcome to cookbooks</h1>} />
      <Route path="login" element={<Login />} />
    </Route>,
  ),
  { basename: import.meta.env.DEV ? "/" : "/cookbooks/" },
);

export default function App() {
  return <RouterProvider router={router} />;
}

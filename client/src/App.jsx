import React from "react";
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { Layout } from "./components";
import { Homepage, Login } from "./pages";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Homepage />} />
      <Route path="login" element={<Login />} />
    </Route>,
  ),
  { basename: import.meta.env.DEV ? "/" : "/cookbooks/" },
);

export default function App() {
  return <RouterProvider router={router} />;
}

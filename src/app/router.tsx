import { createBrowserRouter, Navigate } from "react-router-dom";

import App from "@/App";
import Home from "@/pages/Home/Home";
import Builder from "@/pages/Builder/Builder";
import Recipes from "@/pages/Recipes/Recipes";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/es" replace />,
  },
  {
    path: "recipes",
    element: <Recipes />,
  },

  {
    path: "/:lang",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "builder",
        element: <Builder />,
      },
    ],
  },
]);
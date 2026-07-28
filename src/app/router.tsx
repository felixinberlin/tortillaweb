import { createBrowserRouter, Navigate } from "react-router-dom";

import App from "@/App";

import Home from "@/pages/Home/Home";
import Recipes from "@/pages/Recipes/Recipes";
import Builder from "@/pages/Builder/Builder";
import Error from "@/pages/Error/Error";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/es" replace />,
  },

  {
    path: "/:lang",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "recipes",
        element: <Recipes />,
      },
      {
        path: "builder",
        element: <Builder />,
      },
    ],
  },

  {
    path: "*",
    element: <Error />,
  },
]);
import { createBrowserRouter, Navigate } from "react-router-dom";

import App from "@/App";

import Home from "@/pages/Home/Home";
import Recipes from "@/pages/Recipes/Recipes";
import Builder from "@/pages/Builder/Builder";
import Ingredients from "@/pages/Ingredients/Ingredients";
import Techniques from "@/pages/Techniques/Techniques";
import Science from "@/pages/Science/Science";
import About from "@/pages/About/About";
import History from "@/pages/History/History";
import Personas from "@/pages/Personas/Personas";
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
      {
        path: "ingredients",
        element: <Ingredients />,
      },
      {
        path: "techniques",
        element: <Techniques />,
      },
      {
        path: "science",
        element: <Science />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "history",
        element: <History />,
      },
      {
        path: "personas",
        element: <Personas />,
      },
    ],
  },

  {
    path: "*",
    element: <Error />,
  },
]);

import { createBrowserRouter } from "react-router-dom";

import App from "@/App";

import Home from "@/pages/Home/Home";
import Builder from "@/pages/Builder/Builder";


export const router = createBrowserRouter([
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

  // temporary fallback
  {
    path: "*",
    element: <Home />,
  },
]);
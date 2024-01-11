import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App";
import "./main.css";
import Signup from "./pages/javascript/Auth/Signup";
import Login from "./pages/javascript/Auth/Login";
import Mainpage from "./pages/javascript/Mainpage";
import Protected from "./pages/javascript/protected";
import Load from "./pages/javascript/Load";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Load />,
        children: [
          {
            path: "/",
            element: <Protected />,
            children: [
              {
                path: "/chats",
                element: <Mainpage />,
              },
            ],
          },
          {
            path: "/login",
            element: <Login />,
          },
          {
            path: "/signup",
            element: <Signup />,
          },
        ],
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);

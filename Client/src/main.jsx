import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App";
import "./main.css";
import Signup from "./pages/javascript/Auth/Signup";
import Login from "./pages/javascript/Auth/Login";
import Mainpage from "./pages/javascript/Mainpage";
import Protected from "./pages/javascript/Protected";
import Load from "./pages/javascript/Load";
import firebase from "firebase/compat/app";

const firebaseConfig = {
  apiKey: "AIzaSyBZXCJOlek2n0ocdlBqgiLAz8h_3v0pId0",
  authDomain: "messegit.firebaseapp.com",
  projectId: "messegit",
  storageBucket: "messegit.appspot.com",
  messagingSenderId: "715044310897",
  appId: "1:715044310897:web:6d62426bde9bd44b8c70d0",
  measurementId: "G-QPPVT0FDSJ",
};

firebase.initializeApp(firebaseConfig);

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
                children: [
                  {
                    // Add a dynamic route parameter for id
                    path: "/chats/:id",
                    element: <Mainpage />,
                  },
                ],
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
localStorage.setItem("refresh", false);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);

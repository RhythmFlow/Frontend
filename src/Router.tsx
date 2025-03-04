import { createBrowserRouter } from "react-router";
import Login from "./views/Login";
import NotFound from "./views/NotFound";

export const router = createBrowserRouter([
  { path: "/login", element: <Login /> },
  { path: "*", element: <NotFound /> },
]);

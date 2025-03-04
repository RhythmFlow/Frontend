import { createBrowserRouter } from "react-router";
import Login from "./views/Login";
import NotFound from "./views/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./views/Home";

export const router = createBrowserRouter([
  { path: "/login", element: <Login /> },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },
  { path: "*", element: <NotFound /> },
]);

import { RouterProvider } from "react-router-dom";
import { router } from "./Router";
import { AuthContextProvider } from "./contexts/AuthContext";

function App() {
  return (
    <>
      <AuthContextProvider>
        <RouterProvider router={router} />
      </AuthContextProvider>
    </>
  );
}

export default App;

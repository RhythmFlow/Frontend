import { Navigate } from "react-router";
import { useAuth } from "src/contexts/AuthContext";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }
  return <>{children}</>;
}

export default ProtectedRoute;

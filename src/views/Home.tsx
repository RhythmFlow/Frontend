import { useAuth } from "src/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function Home() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    const result = await signOut();
    if (!result.success) {
      console.log(result.error);
    } else {
      navigate("/login");
    }
  };

  return (
    <div>
      <h1>Welcome, {user?.email}</h1>
      <button onClick={handleSignOut}>Sign out</button>
    </div>
  );
}

export default Home;

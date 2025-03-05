import { useAuth } from "src/providers/AuthProvider";

function Home() {
  const { user, logout } = useAuth();

  const handleSignOut = async () => {
    await logout();
  };
  return (
    <div>
      <>
        <h1>Welcome, {user?.email}</h1>
        <button onClick={handleSignOut}>Sign out</button>
      </>
      {/* {!user ? (
        <Login />
      ) : (
      )} */}
    </div>
  );
}

export default Home;

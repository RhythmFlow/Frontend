import { useState } from "react";
import { LuCircleAlert } from "react-icons/lu";
import { FcGoogle } from "react-icons/fc";

import { Navigate, useNavigate } from "react-router";
import { useAuth } from "src/providers/AuthProvider";

function Login() {
  const navigate = useNavigate();
  const { user, loginWithEmail, loginWithGoogle } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setLoading(true);
    const result = await loginWithGoogle();
    if (!result.success) {
      const message = result.error?.message
        ? result.error.message[0].toUpperCase() + result.error.message.slice(1)
        : "An error occurred";
      setError(message);
    } else {
      navigate("/");
    }
    setLoading(false);
  };

  const handleEmailLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const result = await loginWithEmail(email, password);
    if (!result.success) {
      const message = result.error?.message
        ? result.error.message[0].toUpperCase() + result.error.message.slice(1)
        : "An error occurred";
      setError(message);
    } else {
      navigate("/");
    }
    setLoading(false);
  };

  return (
    <div
      className="
    h-screen 
    bg-gradient-to-t 
    from-black 
    from-20% 
    to-violet-700
    "
    >
      <div
        className="
      flex 
      flex-row 
      min-h-screen 
      justify-center 
      items-center
      "
      >
        {user && <Navigate to="/" />}
        <div
          className="
        min-w-[300px] 
        p-10 
        bg-neutral-900 
        w-xl 
        rounded-xl 
        flex 
        flex-col 
        items-center
        "
        >
          {/* Header */}
          <h1
            className="
          text-3xl 
          font-bold 
          pb-6
          "
          >
            Log in to RhythmFlow
          </h1>
          {/* Error message */}
          {error && (
            <div
              className="
            bg-red-500 
            w-full 
            p-3 
            m-2
            flex 
            items-center 
            rounded-sm
            "
            >
              <LuCircleAlert className="text-3xl pr-2" />
              <p>{error}</p>
            </div>
          )}
          <form
            onSubmit={handleEmailLogin}
            className="flex flex-col w-5/6 justify-center items-center"
          >
            {/* Providers */}
            <button
              className="
            disabled:cursor-not-allowed 
            flex 
            items-center 
            rounded-3xl 
            bg-neutral-900 
            border-neutral-500 
            border-1 
            hover:cursor-pointer 
            hover:border-neutral-300 
            text-white 
            p-3 
            w-xs 
            mt-6
            focus:outline-2
            focus:outline-white
            "
              onClick={handleGoogleLogin}
              disabled={loading}
            >
              <FcGoogle className="text-2xl ml-4" />
              <p className="font-bold w-full justify-center">
                Continue with Google
              </p>
            </button>
            <hr className="w-full border-neutral-500 mt-10 mb-10" />
            {/* Email input */}
            <div className="flex flex-col mb-6">
              <label
                htmlFor="email"
                className="
              mb-2
              text-sm 
              font-semibold
            "
              >
                Email
              </label>
              <input
                autoComplete="email"
                className="
                disabled:cursor-not-allowed 
                bg-neutral-900 border-1 
                border-neutral-500 
                focus:outline-white 
                focus:outline-2 
                hover:border-neutral-300 
                rounded-sm 
                p-3 
                w-xs
              "
                placeholder="Email"
                type="email"
                id="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                disabled={loading}
              />
            </div>
            {/* Password input */}
            <div className="flex flex-col mb-6">
              <label htmlFor="password" className="mb-2 text-sm font-semibold">
                Password
              </label>
              <input
                placeholder="Password"
                className="
            disabled:cursor-not-allowed 
            bg-neutral-900 border-1 
            border-neutral-500 
            focus:outline-white 
            focus:outline-2 
            hover:border-neutral-300 
            rounded-sm 
            p-3 
            w-xs
            "
                type="password"
                id="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                disabled={loading}
              />
            </div>
            <button
              className="
            disabled:cursor-not-allowed 
            m-2
            rounded-3xl 
            bg-violet-500 
            hover:bg-violet-400 
            text-white 
            p-3 
            w-xs 
            hover:cursor-pointer
            "
              disabled={loading}
              type="submit"
            >
              Log in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;

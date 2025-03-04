import { createContext, useContext, useEffect, useState } from "react";
import supabase from "../lib/supabase";
import { Session, User } from "@supabase/supabase-js";

const AuthContext = createContext<{
  session: Session | null | undefined;
  user: User | null | undefined;
  login: (
    email: string,
    password: string
  ) => Promise<{
    success: boolean;
    error?: string;
    // data?: { user: User; session: Session };
  }>;
}>({
  session: null,
  user: null,
  login: async () => {
    return Promise.resolve({ success: false });
  },
});

import { ReactNode } from "react";

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User>();

  // login
  const login = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    // console.log(data);
    if (error) {
      console.log("There was an error logging in. PLease try again.");
      return {
        success: false,
        error: "There was an error logging in. Please try again.",
      };
    }
    return { success: true };
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ session, user, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};


import { createContext, useContext, useState } from "react";
import { User, Session } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";
import { mockAuth } from "@/data/mockDataStore";

type AuthContextType = {
  user: User | null;
  session: Session | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signUp: (email: string, password: string, username: string) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Use mock authentication data instead of Supabase
  const {
    user,
    session,
    isAuthenticated,
    signIn: mockSignIn,
    signUp: mockSignUp,
    signOut: mockSignOut
  } = mockAuth;

  const signUp = async (email: string, password: string, username: string) => {
    setIsLoading(true);
    try {
      console.log(`Mock sign up: ${email}, ${username}`);
      const result = await mockSignUp();
      return result;
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      console.log(`Mock sign in: ${email}`);
      const result = await mockSignIn();
      if (!result.error) {
        navigate("/");
      }
      return result;
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    setIsLoading(true);
    try {
      console.log("Mock sign out");
      await mockSignOut();
      navigate("/auth");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        isAuthenticated,
        isLoading,
        signUp,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

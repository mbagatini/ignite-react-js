import { createContext, useContext } from "react";

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  signIn(credentials: SignInCredentials): Promise<void>;
  isAuthenticated: boolean;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

// Contexto
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

// Provider
export function AuthProvider({ children }: AuthProviderProps) {
  const isAuthenticated = false;

  async function signIn(credentials: SignInCredentials) {
    console.log(credentials);
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook
export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider");
  }

  return context;
}

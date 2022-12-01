import { createContext, useContext, useEffect, useState } from "react";
import { GetServerSidePropsContext } from "next";
import Router from "next/router";
import { setCookie, parseCookies, destroyCookie } from "nookies";

import { api } from "../services/apiClient";

interface User {
  email: string;
  permissions: string[];
  roles: string[];
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  signIn: (credentials: SignInCredentials) => Promise<void>;
  signOut: () => void;
  isAuthenticated: boolean;
  user: User;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

let authBroadcastChannel: BroadcastChannel;

export function signOut() {
  clearCookies();

  authBroadcastChannel.postMessage("signOut");

  Router.push("/");
}

export function clearCookies(
  context: GetServerSidePropsContext | undefined = undefined
) {
  destroyCookie(context, "nextauth.token");
  destroyCookie(context, "nextauth.refreshToken");
}

// Contexto
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

// Provider
export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>({} as User);
  const isAuthenticated = !!user;

  /**
   * BroadcastChannel - controla se o usuário deslogou de uma aba e
   * desloga em todas abas abertas
   */
  useEffect(() => {
    authBroadcastChannel = new BroadcastChannel("auth");

    authBroadcastChannel.onmessage = (event) => {
      if (event.data === "signOut") {
        signOut();
      }
    };
  }, []);

  /**
   * Carrega os dados do usuário somente quando ele realizar o primeiro acesso
   */
  useEffect(() => {
    const { "nextauth.token": token } = parseCookies();

    if (token) {
      api
        .get("/me")
        .then((response) => {
          const { email, permissions, roles } = response.data;

          setUser({
            email,
            permissions,
            roles,
          });
        })
        .catch((error) => {
          signOut();
        });
    }
  }, []);

  async function signIn({ email, password }: SignInCredentials) {
    try {
      const response = await api.post("sessions", { email, password });
      const { token, refreshToken, permissions, roles } = response.data;

      /**
       * Salva os dados do token em cookies
       */
      setCookie(undefined, "nextauth.token", token, {
        maxAge: 30 * 24 * 60 * 60, // 30 dias
        path: "/", // Caminhos com acesso ao cookie
      });

      setCookie(undefined, "nextauth.refreshToken", refreshToken, {
        maxAge: 30 * 24 * 60 * 60, // 30 dias
        path: "/", // Caminhos com acesso ao cookie
      });

      // Salva os dados do usuário recém logado
      setUser({
        email,
        permissions,
        roles,
      });

      /**
       * Atualiza os headers da api para salvar o token
       */
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      Router.push("/dashboard");
    } catch (error) {}
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, signIn, signOut }}>
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

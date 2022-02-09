import Router from "next/router";

import { useAuth } from "../hooks/useAuth";

export default function Dashboard() {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    new Promise(() =>
      setTimeout(() => {
        Router.push("/");
      }, 1000 * 3)
    );

    return <p>Você precisa estar logado para acessar o dashboard</p>;
  }

  return <h2>this is the dashboard, welcome</h2>;
}

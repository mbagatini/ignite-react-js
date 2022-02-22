import { GetServerSideProps } from "next";
import { useEffect } from "react";

import { useAuth } from "../hooks/useAuth";
import { setupAPIClient } from "../services/api";
import { api } from "../services/apiClient";
import { checkSSRAuth } from "../utils/checkSSRAuth";

export default function Dashboard() {
  const { user } = useAuth();

  useEffect(() => {
    api.get("/me").catch((error) => console.warn(error));
  }, []);

  return <h2>Welcome {user.email}</h2>;
}

export const getServerSideProps = checkSSRAuth(async (context) => {
  /**
   * Teste requisição a API com SSR e contexto
   */
  const apiClientSSR = setupAPIClient(context);
  const response = await apiClientSSR.get("/me");
  console.log("SSR ", response.data);

  return {
    props: {},
  };
});

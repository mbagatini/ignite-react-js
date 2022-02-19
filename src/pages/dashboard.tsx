import { GetServerSideProps } from "next";
import { useEffect } from "react";

import { logout, useAuth } from "../hooks/useAuth";
import { setupAPIClient } from "../services/api";
import { api } from "../services/apiClient";
import { checkSSRAuth } from "../utils/checkSSRAuth";

export default function Dashboard() {
  const { user } = useAuth();

  useEffect(() => {
    api.get("/me"); //.catch(() => logout);
  }, []);

  return <h2>Welcome {user.email}</h2>;
}

export const getServerSideProps: GetServerSideProps = checkSSRAuth(
  async (context) => {
    /**
     * Teste requisição a API com SSR e contexto
     */
    // const apiClientSSR = setupAPIClient(context);
    // const response = await apiClientSSR.get("/me");
    // console.log("SSR ", response.data);

    return {
      props: {},
    };
  }
);

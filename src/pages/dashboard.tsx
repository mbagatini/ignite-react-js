import { GetServerSideProps } from "next";
import { useEffect } from "react";

import { useAuth } from "../hooks/useAuth";
import { useCan } from "../hooks/useCan";
import { setupAPIClient } from "../services/api";
import { api } from "../services/apiClient";
import { checkSSRAuth } from "../utils/checkSSRAuth";

export default function Dashboard() {
  const { user } = useAuth();

  const userCanSeeMetrics = useCan({
    permissions: ["metrics.list"],
    roles: ["editor"],
  });

  useEffect(() => {
    api.get("/me").catch((error) => console.warn(error));
  }, []);

  return (
    <div>
      <h2>Welcome {user.email}</h2>
      {userCanSeeMetrics && <h3>Métricas</h3>}
    </div>
  );
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

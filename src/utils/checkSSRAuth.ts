import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from "next";
import { parseCookies } from "nookies";

import { clearCookies } from "../hooks/useAuth";
import { AuthError } from "../services/errors/AuthError";

/**
 * o T é a tipagem da função e é por causa dele que o typescript
 * consegue sugerir as propriedades do retorno
 */
export function checkSSRAuth<T>(callback: GetServerSideProps<T>) {
  return async (
    context: GetServerSidePropsContext
  ): Promise<GetServerSidePropsResult<T> | undefined> => {
    const cookies = parseCookies(context);

    /**
     * Redireciona o usuário para o login se ele não estiver autenticado
     */
    if (!cookies["nextauth.token"]) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }

    try {
      return await callback(context);
    } catch (error) {
      if (error instanceof AuthError) {
        // Limpa os dados de autenticação
        clearCookies(context);

        return {
          redirect: {
            destination: "/",
            permanent: false,
          },
        };
      }
    }
  };
}

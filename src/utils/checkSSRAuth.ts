import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from "next";
import { parseCookies } from "nookies";
import decode from "jwt-decode";

import { clearCookies } from "../hooks/useAuth";
import { AuthError } from "../services/errors/AuthError";
import { validateUserPermissions } from "./validateUserPermissions";

type checkSSRAuthOptions = {
  permissions?: string[];
  roles?: string[];
};

/**
 * o T é a tipagem da função e é por causa dele que o typescript
 * consegue sugerir as propriedades do retorno
 */
export function checkSSRAuth<T>(
  callback: GetServerSideProps<T>,
  options?: checkSSRAuthOptions
) {
  return async (
    context: GetServerSidePropsContext
  ): Promise<GetServerSidePropsResult<T> | undefined> => {
    const cookies = parseCookies(context);
    const token = cookies["nextauth.token"];

    // Token decodificado
    const user = decode<{ permissions: string[]; roles: string[] }>(token);

    if (options) {
      const { permissions, roles } = options;

      const userCanAccess = validateUserPermissions({
        user,
        permissions,
        roles,
      });

      if (!userCanAccess) {
        return {
          redirect: {
            destination: "/dashboard",
            permanent: false,
          },
        };
      }
    }

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

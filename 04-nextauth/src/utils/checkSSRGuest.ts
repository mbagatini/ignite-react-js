import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from "next";
import { parseCookies } from "nookies";

/**
 * o T é a tipagem da função e é por causa dele que o typescript
 * consegue sugerir as propriedades do retorno
 */
export function checkSSRGuest<T>(callback: GetServerSideProps<T>) {
  /**
   * High order function: função que retorna outra função
   */
  return async (
    context: GetServerSidePropsContext
  ): Promise<GetServerSidePropsResult<T>> => {
    const cookies = parseCookies(context);

    /**
     * Redireciona o usuário para o dashboard quando ele já estiver autenticado
     */
    if (cookies["nextauth.token"]) {
      return {
        redirect: {
          destination: "/dashboard",
          permanent: false,
        },
      };
    }

    return await callback(context);
  };
}

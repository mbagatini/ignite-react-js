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
export function checkSSRAuth<T>(callback: GetServerSideProps<T>) {
  return async (
    context: GetServerSidePropsContext
  ): Promise<GetServerSidePropsResult<T>> => {
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

    return await callback(context);
  };
}

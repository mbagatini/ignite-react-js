import axios, { AxiosError } from "axios";
import { GetServerSidePropsContext } from "next";
import { parseCookies, setCookie } from "nookies";

import { signOut } from "../hooks/useAuth";
import { AuthError } from "./errors/AuthError";

type FailedRequest = {
  onSuccess: (token: string) => void;
  onFailure: (error: AxiosError<any, any>) => void;
};

/**
 * Carrega os cookies na primeira execução
 */
let isRefreshingToken = false;
let failedRequests = [] as FailedRequest[];

/**
 * Precisa receber o contexto para que os lugares onde este código é chamado por SSR
 * consiga trabalhar com os cookies corretamente
 */
export function setupAPIClient(
  context: GetServerSidePropsContext = undefined as any
) {
  let cookies = parseCookies(context);

  const api = axios.create({
    baseURL: "http://localhost:3333",
  });

  // Alter defaults after instance has been created
  // O Authorization default no create instance não funciona!!!
  api.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${cookies["nextauth.token"]}`;

  /**
   * Intercepta o response para verificar se o token foi
   * expirado para então fazer o refresh do token
   *
   * Axios não permite código assíncrono dentro do interceptor
   *
   */
  api.interceptors.response.use(
    (response) => {
      return response;
    },
    (error: AxiosError) => {
      if (error.response?.status === 401) {
        if (error.response?.data?.code === "token.expired") {
          // Todas informações contidas no request
          const originalConfig = error.config;

          /**
           * Atualização do token
           */
          if (!isRefreshingToken) {
            isRefreshingToken = true;

            // Trata as situações para o refresh do token
            handleRefreshToken()
              .then((response) => {
                const { token } = response;
                failedRequests.forEach((request) => request.onSuccess(token));
              })
              .catch((error) => {
                failedRequests.forEach((request) => request.onFailure(error));
                failedRequests = [];
              })
              .finally(() => {
                isRefreshingToken = false;
              });
          }

          /**
           * Se o token está atualizado com sucesso, então monta a fila de requests
           * para serem executados novamente com o novo token
           */
          return new Promise((resolve, reject) => {
            failedRequests.push({
              onSuccess: (token: string) => {
                // Atualiza o token no header da requisição
                if (originalConfig.headers) {
                  originalConfig.headers["Authorization"] = `Bearer ${token}`;
                }
                console.warn(
                  "Disparando fila de requests novamente: ",
                  originalConfig.url
                );

                resolve(api(originalConfig));
              },
              onFailure: (error: AxiosError) => reject(error),
            });
          });
        } else {
          if (typeof window === "object") {
            signOut();
          } else {
            return Promise.reject(new AuthError());
          }
        }
      }

      return Promise.reject(error);
    }
  );

  type RefreshTokenResponse = {
    token: string;
  };

  function handleRefreshToken(): Promise<RefreshTokenResponse> {
    const { "nextauth.refreshToken": refreshToken } = cookies;

    return api.post("/refresh", { refreshToken }).then((response) => {
      console.warn("Refreshing token...");

      const { token, refreshToken: newRefreshToken } = response.data;

      /**
       * Salva os dados do token em cookies
       */
      setCookie(context, "nextauth.token", token, {
        maxAge: 30 * 24 * 60 * 60, // 30 dias
        path: "/", // Caminhos com acesso ao cookie
      });

      setCookie(context, "nextauth.refreshToken", newRefreshToken, {
        maxAge: 30 * 24 * 60 * 60, // 30 dias
        path: "/", // Caminhos com acesso ao cookie
      });

      /**
       * Atualiza os headers da api para salvar o token
       */
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      return Promise.resolve({ token });
    });
  }

  return api;
}

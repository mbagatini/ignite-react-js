import axios, { AxiosError } from "axios";
import { parseCookies, setCookie } from "nookies";

/**
 * Carrega os cookies na primeira execução
 */
let cookies = parseCookies();

export const api = axios.create({
  baseURL: "http://localhost:3333",
  headers: {
    Authorization: `Bearer ${cookies["nextauth.token"]}`,
  },
});

/**
 * Intercepta o response para verificar se o token foi
 * expirado para então fazer o refresh do token
 */
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      if (error.response?.data?.code === "token.expired") {
        cookies = parseCookies();

        const { "nextauth.refreshToken": refreshToken } = cookies;

        const response = await api.post("/refresh", { refreshToken });
        const { token, refreshToken: newRefreshToken } = response.data;

        /**
         * Salva os dados do token em cookies
         */
        setCookie(undefined, "nextauth.token", token, {
          maxAge: 30 * 24 * 60 * 60, // 30 dias
          path: "/", // Caminhos com acesso ao cookie
        });

        setCookie(undefined, "nextauth.refreshToken", newRefreshToken, {
          maxAge: 30 * 24 * 60 * 60, // 30 dias
          path: "/", // Caminhos com acesso ao cookie
        });

        /**
         * Atualiza os headers da api para salvar o token
         */
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      } else {
      }
    }
  }
);

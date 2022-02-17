import { useState } from "react";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";

import styles from "../styles/Home.module.css";
import { useAuth } from "../hooks/useAuth";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn } = useAuth();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const data = {
      email,
      password,
    };

    await signIn(data);
  }

  return (
    <form
      className={`${styles.container} ${styles.main}`}
      onSubmit={handleSubmit}
    >
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Sign in</button>
    </form>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
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

  return {
    props: {},
  };
};

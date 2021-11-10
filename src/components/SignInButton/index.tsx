import { FaGithub } from "react-icons/fa";
import { FiX } from "react-icons/fi";

import styles from "./styles.module.scss";

export function SignInButton() {
  const isUserLogged = true;

  return isUserLogged ? (
    <button type="button" className={styles.signInGithub}>
      <FaGithub color="#04d361" />
      Morgana Bagatini
      <FiX color="#737380" className={styles.closeIcon} />
    </button>
  ) : (
    <button type="button" className={styles.signInGithub}>
      <FaGithub color="#eba417" />
      Sign in with Github
    </button>
  );
}

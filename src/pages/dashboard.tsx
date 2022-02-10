import { useEffect } from "react";

import { logout, useAuth } from "../hooks/useAuth";
import { api } from "../services/api";

export default function Dashboard() {
  const { user } = useAuth();

  useEffect(() => {
    api.get("/me").catch((error) => logout);
  }, []);

  return <h2>Welcome {user.email}</h2>;
}

import { useQuery } from "react-query";
import { api } from "../services/api";

type User = {
  name: string;
  email: string;
  createdAt: string;
};

async function getUsers(): Promise<User[]> {
  const { data } = await api.get("users");

  const users = data.users.map((user: any) => {
    const formattedDate = new Intl.DateTimeFormat("pt-BR", {
      dateStyle: "medium",
    }).format(new Date(user.createdAt));

    return {
      ...user,
      createdAt: formattedDate,
    };
  });

  return users;
}

export function useUsers() {
  return useQuery("users", getUsers, {
    staleTime: 1000 * 60, // 1 minute
  });
}

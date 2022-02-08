import { useQuery } from "react-query";
import { api } from "../services/api";

type User = {
  name: string;
  email: string;
  createdAt: string;
};

type GetUserResponse = {
  users: User[];
  totalCount: number;
};

async function getUsers(page: number): Promise<GetUserResponse> {
  const { data, headers } = await api.get("users", {
    params: { page, perPage: 10 },
  });

  const users = data.users.map((user: any) => {
    const formattedDate = new Intl.DateTimeFormat("pt-BR", {
      dateStyle: "medium",
    }).format(new Date(user.createdAt));

    return {
      ...user,
      createdAt: formattedDate,
    };
  });

  return { users, totalCount: Number(headers["x-total-count"]) };
}

export function useUsers(page: number) {
  return useQuery(["users", page], () => getUsers(page), {
    staleTime: 1000 * 60, // 1 minute
  });
}

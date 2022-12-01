import { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  Icon,
  Text,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useBreakpointValue,
  Spinner,
  Link,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { RiAddLine } from "react-icons/ri";

import { useUsers } from "../../hooks/useUsers";
import { api } from "../../services/api";
import { queryClient } from "../../services/queryClient";

import { Header } from "../../components/Header";
import { Pagination } from "../../components/Pagination";
import { Sidebar } from "../../components/Sidebar";

type UsersDTO = {
  users: {
    id: number;
    name: string;
    email: string;
    createdAt: string;
  }[];
  totalCount: number;
};

export default function UserList() {
  const isLarge = useBreakpointValue({ base: false, lg: true });
  const [page, setPage] = useState(1);

  /**
   * Carrega os dados em cache com a lib useQuery
   */
  const { data, isLoading, isFetching, error } = useUsers(page);
  const { users, totalCount } = (data || {}) as UsersDTO;

  /**
   * Realiza o prefetch dos dados do usuário
   */
  async function handlePrefetchUser(id: number) {
    await queryClient.prefetchQuery(
      ["user", id],
      async () => {
        const response = await api.get(`/users/${id}`);
        return response.data;
      },
      {
        staleTime: 1000 * 60 * 10, // 10 minutos
      }
    );
  }

  return (
    <Box>
      <Header />

      <Flex w="100%" maxW={1480} my="6" mx="auto" px="6">
        <Sidebar />

        <Box flex="1" borderRadius={8} bg="gray.800" p="8">
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">
              Users
              {!isLoading && isFetching && (
                <Spinner size="sm" color="gray.500" ml="4" />
              )}
            </Heading>

            <NextLink href="/users/create" passHref>
              <Button
                as="a"
                size="sm"
                fontSize="sm"
                colorScheme="pink"
                leftIcon={<Icon as={RiAddLine} />}
              >
                New
              </Button>
            </NextLink>
          </Flex>

          {isLoading ? (
            // Carregando
            <Flex justify="center">
              <Spinner />
            </Flex>
          ) : error ? (
            // Erro
            <Flex justify="center">
              <Text>Ops... Não foi possível carregar os dados.</Text>
            </Flex>
          ) : (
            // Dados
            <>
              <Table colorScheme="whiteAlpha">
                <Thead>
                  <Tr>
                    <Th px={["4", "4", "6"]} color="gray.300" w="8">
                      <Checkbox colorScheme="pink" />
                    </Th>
                    <Th>User</Th>
                    {isLarge && <Th>Created at</Th>}
                  </Tr>
                </Thead>
                <Tbody>
                  {users.map((user, idx) => {
                    return (
                      <Tr key={idx}>
                        <Td px={["4", "4", "6"]}>
                          <Checkbox colorScheme="pink" />
                        </Td>
                        <Td>
                          <Box>
                            <Link
                              color="purple.500"
                              onMouseEnter={() => handlePrefetchUser(user.id)}
                            >
                              <Text fontWeight="bold">{user.name}</Text>
                            </Link>
                            <Text fontSize="sm" color="gray.300">
                              {user.email}
                            </Text>
                          </Box>
                        </Td>
                        {isLarge && <Td>{user.createdAt}</Td>}
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>

              <Pagination
                totalNumberOfRegisters={totalCount}
                currentPage={page}
                onPageChange={setPage}
              />
            </>
          )}
        </Box>
      </Flex>
    </Box>
  );
}

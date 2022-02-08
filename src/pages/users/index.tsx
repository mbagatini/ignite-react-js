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
} from "@chakra-ui/react";
import Link from "next/link";
import { useQuery } from "react-query";
import { RiAddLine } from "react-icons/ri";

import { Header } from "../../components/Header";
import { Pagination } from "../../components/Pagination";
import { Sidebar } from "../../components/Sidebar";
import { useUsers } from "../../hooks/useUsers";

export default function UserList() {
  const isLarge = useBreakpointValue({ base: false, lg: true });

  /**
   * Carrega os dados em cache com a lib useQuery
   */
  const { data, isLoading, isFetching, error } = useUsers();

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

            <Link href="/users/create" passHref>
              <Button
                as="a"
                size="sm"
                fontSize="sm"
                colorScheme="pink"
                leftIcon={<Icon as={RiAddLine} />}
              >
                New
              </Button>
            </Link>
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
                  {data?.map((user, idx) => {
                    return (
                      <Tr key={idx}>
                        <Td px={["4", "4", "6"]}>
                          <Checkbox colorScheme="pink" />
                        </Td>
                        <Td>
                          <Box>
                            <Text fontWeight="bold">{user.name}</Text>
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

              <Pagination totalNumberOfRegisters={50} currentPage={4} />
            </>
          )}
        </Box>
      </Flex>
    </Box>
  );
}

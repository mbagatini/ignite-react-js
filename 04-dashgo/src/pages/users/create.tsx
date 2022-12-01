import { useMutation } from "react-query";
import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { api } from "../../services/api";
import { queryClient } from "../../services/queryClient";

import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import { Input } from "../../components/Form/Input";

type SignUpFormData = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

// Validação do form
const signUpSchema = yup
  .object({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required(),
    password_confirmation: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords do not match")
      .required(),
  })
  .required();

export default function CreateUser() {
  const router = useRouter();

  const { register, handleSubmit, formState } = useForm<SignUpFormData>({
    resolver: yupResolver(signUpSchema),
  });

  const { errors } = formState;

  /**
   * Hook de mutation para criação de usuário
   */
  const createUser = useMutation(
    async (user: SignUpFormData) => {
      const response = await api.post("users", {
        user: {
          ...user,
          created_at: new Date(),
        },
      });
    },
    {
      // Se cadastrado com sucesso, invalida o cache que armazena os usuários
      onSuccess: async () => {
        await queryClient.invalidateQueries("users");
        router.push("/users");
      },
    }
  );

  const handleSignUp: SubmitHandler<SignUpFormData> = async (inputs) => {
    await createUser.mutateAsync(inputs);
  };

  return (
    <Box>
      <Header />

      <Flex w="100%" maxW={1480} my="6" mx="auto" px="6">
        <Sidebar />

        <Box
          as="form"
          flex="1"
          borderRadius={8}
          bg="gray.800"
          p={["6", "8"]}
          onSubmit={handleSubmit(handleSignUp)}
        >
          <Heading size="lg" fontWeight="normal">
            New user
          </Heading>

          <Divider my="6" borderColor="gray.700" />

          <VStack spacing={["6", "8"]}>
            <SimpleGrid w="100%" spacing={["6", "8"]} minChildWidth="240px">
              <Input label="Name" {...register("name")} error={errors.name} />
              <Input
                type="email"
                label="E-mail"
                {...register("email")}
                error={errors.email}
              />
            </SimpleGrid>

            <SimpleGrid w="100%" spacing={["6", "8"]} minChildWidth="240px">
              <Input
                type="password"
                label="Passwrod"
                {...register("password")}
                error={errors.password}
              />
              <Input
                type="password"
                label="Password again"
                {...register("password_confirmation")}
                error={errors.password_confirmation}
              />
            </SimpleGrid>
          </VStack>

          <Flex mt="8" justify="flex-end">
            <HStack spacing="4">
              <Link href="/users" passHref>
                <Button as="a" colorScheme="whiteAlpha">
                  Cancel
                </Button>
              </Link>
              <Button
                type="submit"
                colorScheme="pink"
                isLoading={formState.isSubmitting}
              >
                Save
              </Button>
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}

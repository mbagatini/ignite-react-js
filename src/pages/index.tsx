import { Button, Flex, Stack } from "@chakra-ui/react";
import type { NextPage } from "next";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { Input } from "../components/Form/Input";

type SignInFormData = {
  email: string;
  password: string;
};

// Validação do form
const signInSchema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().required(),
  })
  .required();

const SignIn: NextPage = () => {
  const { register, handleSubmit, formState } = useForm<SignInFormData>({
    resolver: yupResolver(signInSchema),
  });

  const handleSignIn: SubmitHandler<SignInFormData> = (inputs, event) => {
    console.log(inputs);
  };

  // Erros de validação do form
  const { errors } = formState;

  return (
    <Flex w="100vw" h="100vh" align="center" justify="center">
      <Flex
        as="form"
        width="100%"
        maxWidth={360}
        bg="gray.800"
        p="8"
        borderRadius={8}
        flexDir="column"
        onSubmit={handleSubmit(handleSignIn)}
      >
        <Stack spacing="4">
          <Input
            type="email"
            label="E-mail"
            {...register("email")}
            error={errors.email}
          />
          <Input
            type="password"
            label="Password"
            {...register("password")}
            error={errors.password}
          />
        </Stack>

        <Button
          type="submit"
          mt="6"
          colorScheme="pink"
          size="lg"
          isLoading={formState.isSubmitting} // Efeito de carregamento
        >
          Sign in
        </Button>
      </Flex>
    </Flex>
  );
};

export default SignIn;

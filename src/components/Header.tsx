import { Flex, Image } from "@chakra-ui/react";

export function Header() {
  return (
    <Flex textAlign="center" p={"4"}>
      <Image src="logo.png" alt="World trip" />
    </Flex>
  );
}

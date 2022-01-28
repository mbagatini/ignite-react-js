import { Flex, HStack, Stack } from "@chakra-ui/react";
import { Item } from "./Item";

export function TiposViagem() {
  return (
    <Flex
      w="100%"
      maxW={960}
      mx="auto"
      py={20}
      px={6}
      wrap="wrap"
      justify="space-around"
    >
      <Item image="cocktail.png" title="vida noturna" />
      <Item image="surf.png" title="praia" />
      <Item image="building.png" title="moderno" />
      <Item image="museum.png" title="clássico" />
      <Item image="earth.png" title="e mais..." />
    </Flex>
  );
}

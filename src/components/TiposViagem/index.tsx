import { Flex } from "@chakra-ui/react";
import { Item } from "./Item";

export function TiposViagem() {
  return (
    <Flex w="100%" maxW={960} mx="auto" justify="space-between" py={20}>
      <Item image="cocktail.png" title="vida noturna" />
      <Item image="surf.png" title="praia" />
      <Item image="building.png" title="moderno" />
      <Item image="museum.png" title="clássico" />
      <Item image="earth.png" title="e mais..." />
    </Flex>
  );
}

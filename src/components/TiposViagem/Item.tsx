import { VStack, Image, Text } from "@chakra-ui/react";

interface ItemProps {
  image: string;
  title: string;
}

export function Item({ image, title }: ItemProps) {
  return (
    <VStack spacing="6">
      <Image src={image} alt={title} />
      <Text fontSize="2xl" fontWeight="semibold">
        {title}
      </Text>
    </VStack>
  );
}

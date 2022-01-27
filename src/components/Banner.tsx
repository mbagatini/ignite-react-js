import { Box, Text, Image, VStack, Flex } from "@chakra-ui/react";

export function Banner() {
  return (
    <Box w="100%" h={335} bgImage="Background.png">
      <Flex h="100%" direction="row" maxW={960} mx="auto" position="relative">
        <VStack maxW={524} spacing="5" my="auto">
          <Text fontWeight="medium" fontSize="4xl" color="gray.50">
            5 Continentes, infinitas possibilidades
          </Text>
          <Text fontSize="xl" color="gray.100">
            Chegou a hora de tirar do papel a viagem que você sempre sonhou.
          </Text>
        </VStack>

        <Image
          src="Airplane.png"
          alt="Airplane"
          position="absolute"
          bottom="-10"
          right="0"
        />
      </Flex>
    </Box>
  );
}

import {
  Box,
  Text,
  Image,
  VStack,
  Flex,
  useBreakpointValue,
} from "@chakra-ui/react";

export function Banner() {
  const isLargeScreen = useBreakpointValue({
    base: false,
    xl: true,
  });

  return (
    <Box w="100%" h={335} bgImage="Background.png" p={6}>
      <Flex h="100%" direction="row" maxW={960} mx="auto" position="relative">
        <VStack maxW={524} spacing={5} my="auto" align="flex-start">
          <Text fontWeight="medium" fontSize={["xl", "4xl"]} color="gray.50">
            5 Continentes, infinitas possibilidades
          </Text>
          <Text fontSize={["sm", "xl"]} color="gray.100">
            Chegou a hora de tirar do papel a viagem que você sempre sonhou.
          </Text>
        </VStack>

        {isLargeScreen && (
          <Image
            src="Airplane.png"
            alt="Airplane"
            position="absolute"
            bottom="-10"
            right="0"
          />
        )}
      </Flex>
    </Box>
  );
}

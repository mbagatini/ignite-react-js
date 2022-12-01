import { Box, Flex, Text } from "@chakra-ui/react";

interface BannerContinenteProps {
  title: string;
  image: string;
}

export function BannerContinente({ title, image }: BannerContinenteProps) {
  return (
    <Flex
      w="100%"
      h={[250, 500]}
      position="relative"
      align={["center", "flex-end"]}
      pb={[0, 20]}
    >
      <Box
        w="100%"
        h={[250, 500]}
        bgImage={image}
        bgSize="cover"
        bgPosition="center"
        filter="brightness(0.35)"
        position="absolute"
        top={0}
        zIndex={-10}
      />
      <Text
        w="100%"
        maxW={960}
        mx="auto"
        px={6}
        color="white"
        fontSize={["3xl", "5xl"]}
        fontWeight="semibold"
        textAlign={["center", "left"]}
      >
        {title}
      </Text>
    </Flex>
  );
}

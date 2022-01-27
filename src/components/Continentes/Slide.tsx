import { Flex, Image, Text } from "@chakra-ui/react";

interface SlideProps {
  image: string;
  title: string;
  subtitle: string;
}

export function Slide({ image, title, subtitle }: SlideProps) {
  return (
    <Flex h={450} direction="column" align="center" justify="center">
      <Image
        src={image}
        alt={title}
        position="absolute"
        zIndex="-1"
        filter="brightness(0.35)"
      />
      <Text fontSize="5xl" fontWeight="medium" color="white" mb={4}>
        {title}
      </Text>
      <Text fontSize="2xl" fontWeight="medium" color="white">
        {subtitle}
      </Text>
    </Flex>
  );
}

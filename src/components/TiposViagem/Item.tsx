import {
  Image,
  Text,
  useBreakpointValue,
  Stack,
  Icon,
  IconProps,
} from "@chakra-ui/react";

interface ItemProps {
  image: string;
  title: string;
}

const CircleIcon = (props: IconProps) => (
  <Icon viewBox="0 0 200 200" {...props}>
    <path
      fill="currentColor"
      d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0"
    />
  </Icon>
);

export function Item({ image, title }: ItemProps) {
  const isMediumScreen = useBreakpointValue({
    base: false,
    md: true,
  });

  return (
    <Stack
      direction={["row", "column"]}
      spacing="6"
      align="center"
      py={2}
      pr={2}
    >
      {isMediumScreen && <Image src={image} alt={title} />}
      {!isMediumScreen && <CircleIcon color="yellow.500" />}
      <Text as="span" fontSize="2xl" fontWeight="semibold">
        {title}
      </Text>
    </Stack>
  );
}

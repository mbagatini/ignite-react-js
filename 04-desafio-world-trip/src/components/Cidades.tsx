import { Grid, GridItem, Stack, Text, Image, Box } from "@chakra-ui/react";

interface CidadeProps {
  cities: {
    country: string;
    city: string;
    image?: string;
  }[];
}

export function Cidades({ cities }: CidadeProps) {
  if (!cities) {
    return null;
  }

  return (
    <Grid
      templateColumns={["1fr", "repeat(auto-fit, minmax(200px, 1fr))"]}
      gap={8}
    >
      {cities.map((item, i) => (
        <GridItem key={i} bg="white">
          <Box
            bgImage={item.image}
            alt={item.city}
            bgSize="cover"
            h={178}
            borderTopRadius="md"
          ></Box>
          <Stack
            p={4}
            borderWidth={1}
            borderRadius="md"
            borderColor="yellow.500"
            borderTop={0}
            borderTopRadius="none"
          >
            <Text fontWeight="semibold" fontSize={"xl"}>
              {item.city}
            </Text>
            <Text fontWeight="medium" color="gray.400">
              {item.country}
            </Text>
          </Stack>
        </GridItem>
      ))}
    </Grid>
  );
}

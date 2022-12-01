import { Box, Flex, HStack, Text, VStack } from "@chakra-ui/react";
import { GetStaticPaths, GetStaticProps } from "next";
import { Header } from "../components/Header";
import { BannerContinente } from "../components/BannerContinente";
import { Cidades } from "../components/Cidades";
import { Kpi } from "../components/Kpi";

interface ContinentProps {
  title: string;
  description: string;
  bannerImage: string;
  countryNumber: number;
  languagesNumber: number;
  cityNumber: number;
  cities: {
    country: string;
    city: string;
    image?: string;
  }[];
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const response = await fetch(`http://localhost:3000/api/${slug}`);
  const data = await response.json();

  return {
    props: data as ContinentProps,
  };
};

export default function Continent(data: ContinentProps) {
  return (
    <VStack>
      <Header />
      <BannerContinente image={data.bannerImage} title={data.title} />

      <Box maxW={960} mx="auto" px={8} pb={8}>
        <Flex direction={["column", "column", "row"]} align="center" py={12}>
          <Text flex={1} fontSize={["sm", "xl"]} textAlign="justify">
            {data.description}
          </Text>

          <Flex w="100%" flex={1} pt={6}>
            <HStack w="100%" spacing={6} justify={["flex-start", "center"]}>
              <Kpi number={data.countryNumber} label="países" />
              <Kpi number={data.languagesNumber} label="línguas" />
              <Kpi number={data.cityNumber} label="cidades +100" />
            </HStack>
          </Flex>
        </Flex>

        <Flex direction="column">
          <Text fontWeight="medium" fontSize={["2xl", "4xl"]} pb={8}>
            Cidades +100
          </Text>

          <Cidades cities={data.cities} />
        </Flex>
      </Box>
    </VStack>
  );
}

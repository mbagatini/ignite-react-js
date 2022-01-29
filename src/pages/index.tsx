import type { NextPage } from "next";
import { Divider, VStack, Text, Box } from "@chakra-ui/react";

import { BannerHome } from "../components/BannerHome";
import { Header } from "../components/Header";
import { TiposViagem } from "../components/TiposViagem";
import { Continentes } from "../components/Continentes";

const Home: NextPage = () => {
  return (
    <VStack>
      <Header />
      <BannerHome />
      <TiposViagem />

      <Divider w="90px" border="2px" borderColor="gray.800" opacity="1" />

      <Box
        fontWeight="medium"
        fontSize={["2xl", "4xl"]}
        textAlign="center"
        py={[10, 14]}
      >
        <Text>Vamos nessa?</Text>
        <Text>Então escolha seu continente</Text>
      </Box>

      <Continentes />
    </VStack>
  );
};

export default Home;

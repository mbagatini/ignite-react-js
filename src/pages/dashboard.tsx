import { Box, Flex, SimpleGrid, VStack, Text, theme } from "@chakra-ui/react";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";

import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";

// Importação do componente que só deve ser importando quando estivermos no lado do browser
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

function getDate(addDays: number) {
  var date = new Date();
  date.setDate(date.getDate() + addDays);
  return date.toISOString();
}

const options: ApexOptions = {
  chart: {
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
    foreColor: theme.colors.gray[500],
  },
  grid: {
    show: false,
  },
  dataLabels: {
    enabled: false,
  },
  tooltip: {
    enabled: false,
  },
  xaxis: {
    type: "datetime",
    axisBorder: {
      color: theme.colors.gray[600],
    },
    axisTicks: {
      color: theme.colors.gray[600],
    },
    categories: [
      getDate(0),
      getDate(1),
      getDate(2),
      getDate(3),
      getDate(4),
      getDate(5),
    ],
  },
  fill: {
    opacity: 0.3,
    type: "gradient",
    gradient: {
      shade: "dark",
      opacityFrom: 0.7,
      opacityTo: 0.3,
    },
  },
};

const series = [{ name: "subscriptions", data: [10, 2, 23, 40, 22, 60] }];

export default function Dashboard() {
  return (
    <VStack>
      <Header />

      <Flex w="100%" maxW={1480} my="6" mx="auto" px="6">
        <Sidebar />

        <SimpleGrid flex="1" gap="4" align="flex-start" minChildWidth={320}>
          <Box p={["6", "8"]} pb="4" borderRadius={8} bg="gray.800">
            <Text>Inscritos</Text>
            <Chart options={options} series={series} type="area" height={160} />
          </Box>
          <Box p={["6", "8"]} borderRadius={8} bg="gray.800">
            <Text>Taxa</Text>
          </Box>
        </SimpleGrid>
      </Flex>
    </VStack>
  );
}

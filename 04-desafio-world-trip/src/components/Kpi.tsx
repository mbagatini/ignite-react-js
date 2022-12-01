import { Flex, Text } from "@chakra-ui/react";

interface KpiProps {
  number: number;
  label: string;
}

export function Kpi({ number, label }: KpiProps) {
  return (
    <Flex direction="column" textAlign={["left", "center"]}>
      <Text color="yellow.500" fontSize={["2xl", "4xl"]} fontWeight="semibold">
        {number}
      </Text>
      <Text fontSize={["md", "xl"]} fontWeight="semibold">
        {label}
      </Text>
    </Flex>
  );
}

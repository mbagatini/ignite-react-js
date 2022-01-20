import { Box, HStack, Stack } from "@chakra-ui/react";
import { Page } from "./Page";

export function Pagination() {
  return (
    <Stack
      direction={["column", "row"]}
      mt="8"
      justify="space-between"
      align="center"
      spacing="6"
    >
      <Box>
        <strong>0</strong> - <strong>10</strong> de <strong>20</strong>
      </Box>
      <HStack spacing="2">
        <Page isCurrent>1</Page>
        <Page>2</Page>
        <Page>3</Page>
        <Page>4</Page>
        <Page>5</Page>
      </HStack>
    </Stack>
  );
}

import { Box, HStack, Stack, Text } from "@chakra-ui/react";
import { Page } from "./Page";

interface PaginationProps {
  totalNumberOfRegisters: number;
  registersPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

function generatePages(from: number, to: number) {
  return [...new Array(to - from)]
    .map((_, index) => index + from + 1)
    .filter((page) => page > 0);
}

export function Pagination({
  totalNumberOfRegisters,
  currentPage = 1,
  registersPerPage = 10,
  onPageChange,
}: PaginationProps) {
  /**
   * primeira pagina
   * anterior
   * atual
   * proxima
   * ultima pagina
   */

  const siblingsCount = 1;
  const lastPage = Math.ceil(totalNumberOfRegisters / registersPerPage);

  const previousPages =
    currentPage > 1
      ? generatePages(currentPage - siblingsCount - 1, currentPage - 1)
      : [];

  const nextPages =
    currentPage < lastPage
      ? generatePages(
          currentPage,
          Math.min(currentPage + siblingsCount, lastPage)
        )
      : [];

  const siblingPages = [...previousPages, currentPage, ...nextPages];

  const registrosStart = (currentPage - 1) * registersPerPage + 1;
  const registrosEnd = currentPage * registersPerPage;

  return (
    <Stack
      direction={["column", "row"]}
      mt="8"
      justify="space-between"
      align="center"
      spacing="6"
    >
      <Box>
        <strong>{registrosStart}</strong> - <strong>{registrosEnd}</strong> de{" "}
        <strong>{totalNumberOfRegisters}</strong>
      </Box>
      <HStack spacing="2">
        {currentPage > siblingsCount + 1 && (
          <>
            <Page>1</Page>
            {currentPage > siblingsCount + 2 && (
              <Text color="gray.300" w="8" textAlign="center">
                ...
              </Text>
            )}
          </>
        )}

        {siblingPages.map((page) => (
          <Page
            key={page}
            isCurrent={page === currentPage}
            // onClick={onPageChange}
          >
            {String(page)}
          </Page>
        ))}

        {currentPage + siblingsCount < lastPage && (
          <>
            {lastPage > currentPage + siblingsCount + 1 && (
              <Text color="gray.300" w="8" textAlign="center">
                ...
              </Text>
            )}
            <Page>{String(lastPage)}</Page>
          </>
        )}
      </HStack>
    </Stack>
  );
}

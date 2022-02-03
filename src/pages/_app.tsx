import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClientProvider, QueryClient } from "react-query";
import { theme } from "../styles/theme";

import { SidebarDrawerProvider } from "../hooks/useSidebarDrawer";
import { initServer } from "../services/mirage";

/**
 * Inicia o serivço do MirageJS
 */
if (process.env.NODE_ENV === "development") {
  initServer();
}

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <SidebarDrawerProvider>
          <Component {...pageProps} />
        </SidebarDrawerProvider>
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default MyApp;

import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "../styles/theme";

import { SidebarDrawerProvider } from "../hooks/useSidebarDrawer";
import { initServer } from "../services/mirage";

/**
 * Inicia o serivço do MirageJS
 */
if (process.env.NODE_ENV === "development") {
  initServer();
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <SidebarDrawerProvider>
        <Component {...pageProps} />
      </SidebarDrawerProvider>
    </ChakraProvider>
  );
}

export default MyApp;

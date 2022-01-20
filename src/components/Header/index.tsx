import { Flex, IconButton, Icon, useBreakpointValue } from "@chakra-ui/react";
import { RiMenuLine } from "react-icons/ri";
import { useSidebarDrawer } from "../../hooks/useSidebarDrawer";
import { Logo } from "./Logo";
import { Notifications } from "./Notifications";
import { Profile } from "./Profile";
import { Search } from "./Search";

export function Header() {
  const { onOpen } = useSidebarDrawer();

  const isLarge = useBreakpointValue({
    base: false,
    lg: true,
  });

  return (
    <Flex
      as="header"
      w="100%"
      maxW={1480}
      h="20"
      mx="auto"
      mt="4"
      px="6"
      align="center"
    >
      {/* Botão para abrir o menu */}
      {!isLarge && (
        <IconButton
          icon={<Icon as={RiMenuLine} />}
          fontSize="24"
          variant="unstyled"
          aria-label="Open menu"
          onClick={onOpen}
          mr="2"
        ></IconButton>
      )}

      <Logo />
      {isLarge && <Search />}

      <Flex align="center" ml="auto">
        <Notifications />
        <Profile showUserData={isLarge} />
      </Flex>
    </Flex>
  );
}

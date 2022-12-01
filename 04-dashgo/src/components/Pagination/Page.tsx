import { Button, ButtonProps as ChakraButtonProps } from "@chakra-ui/react";

interface PageProps extends ChakraButtonProps {
  children: string;
  isCurrent?: boolean;
  onPageChange: (page: number) => void;
}

export function Page({
  isCurrent,
  children,
  onPageChange,
  ...rest
}: PageProps) {
  if (isCurrent) {
    return (
      <Button
        size="sm"
        fontSize="xs"
        w="4"
        colorScheme="pink"
        disabled
        _disabled={{
          bg: "pink.500",
          cursor: "default",
        }}
        {...rest}
      >
        {children}
      </Button>
    );
  }

  return (
    <Button
      size="sm"
      fontSize="xs"
      w="4"
      bg="gray.700"
      _hover={{
        bg: "gray.500",
      }}
      onClick={() => onPageChange(Number(children))}
      {...rest}
    >
      {children}
    </Button>
  );
}

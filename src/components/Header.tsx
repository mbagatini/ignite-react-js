import { Flex, Image } from "@chakra-ui/react";
import Link from "next/link";

export function Header() {
  return (
    <Flex textAlign="center" p={"4"}>
      <Link href="/" passHref>
        <a>
          <Image src="logo.png" alt="World trip" />
        </a>
      </Link>
    </Flex>
  );
}

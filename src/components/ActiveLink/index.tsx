import { cloneElement, ReactElement } from "react";
import { useRouter } from "next/dist/client/router";
import Link, { LinkProps } from "next/link";

interface ActiveLinkProps extends LinkProps {
  activeClass: string;
  children: ReactElement;
}

export function ActiveLink({
  activeClass,
  children,
  ...rest
}: ActiveLinkProps) {
  const { asPath } = useRouter();

  const className = asPath === rest.href ? activeClass : "";

  children = cloneElement(children, { className });

  return <Link {...rest}>{children}</Link>;
}

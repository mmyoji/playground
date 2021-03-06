import NextLink from "next/link";
import { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  href: string;
  className?: string;
}>;

export function Link({ href, children, className }: Props) {
  return (
    <NextLink href={href} passHref>
      <a className={className}>
        {children}
      </a>
    </NextLink>
  );
}

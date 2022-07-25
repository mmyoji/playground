import { ReactNode } from "react";

interface Props {
  htmlFor: string;
  children: ReactNode;
}

export function Label({ htmlFor, children }: Props) {
  return <label htmlFor={htmlFor} className="font-bold">{children}</label>;
}

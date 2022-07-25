import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export function Title({ children }: Props) {
  return <h1 className="font-bold text-xl">{children}</h1>;
}

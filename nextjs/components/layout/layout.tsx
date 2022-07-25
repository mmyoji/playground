import { ReactNode } from "react";

import { Footer } from "./footer";
import { Header } from "./header";

interface Props {
  children: ReactNode;
}

export function Layout({ children }: Props) {
  return (
    <div className="container mx-auto flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

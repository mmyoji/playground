/** @jsx h */
import { h, ComponentChildren } from "preact";
import { tw } from "@twind";

import { Header } from "./Layout/Header.tsx";
import { Footer } from "./Layout/Footer.tsx";

interface Props {
  children: ComponentChildren;
}

export function Layout({ children }: Props) {
  return (
    <div class={tw`flex flex-col min-h-screen`}>
      <Header />

      <div class={tw`flex-1`}>
        <main class={tw`p-4 mx-auto max-w-screen-md`}>{children}</main>
      </div>

      <Footer />
    </div>
  );
}

/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";

export function Header() {
  return (
    <div class={tw`bg-green-300`}>
      <header class={tw`mx-auto max-w-screen-lg`}>
        <div class={tw`p-4 flex`}>
          <a
            class={tw`text-2xl text-gray-900 tracking-tight font-extrabold items-center`}
            href="/"
          >
            Fresh App
          </a>
        </div>
      </header>
    </div>
  );
}

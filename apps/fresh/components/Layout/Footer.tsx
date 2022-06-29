/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";

const FooterLink = ({ text, href }: { text: string; href: string }) => {
  return (
    <a class={tw`text-gray-600 hover:underline`} href={href}>
      {text}
    </a>
  );
};

export function Footer() {
  return (
    <footer
      class={tw`border-t-2 border-gray-200 bg-gray-100 h-32 flex flex-col gap-4 justify-center`}
    >
      <div
        class={tw`mx-auto max-w-screen-lg flex items-center justify-center gap-8`}
      >
        <FooterLink
          text="Source"
          href="https://github.com/lucacasonato/fresh"
        />
        <FooterLink
          text="License"
          href="https://github.com/lucacasonato/fresh/blob/main/LICENSE"
        />
        <FooterLink
          text="Code of Conduct"
          href="https://github.com/lucacasonato/fresh/blob/main/CODE_OF_CONDUCT.md"
        />
      </div>
      <div class={tw`text-gray-600 text-center`}>
        <span>© 2022 mmyoji</span>
      </div>
    </footer>
  );
}

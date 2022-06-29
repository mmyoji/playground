/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";

interface Props {
  customText?: string;
}

export default function BackLink({ customText }: Props) {
  const text = customText || "Back";

  const handleClick: h.JSX.MouseEventHandler<HTMLAnchorElement> = (event) => {
    event.preventDefault();
    window?.history?.back();
  };

  return (
    <div>
      <a href="#" onClick={handleClick} class={tw`hover:underline`}>
        &lt; {text}
      </a>
    </div>
  );
}

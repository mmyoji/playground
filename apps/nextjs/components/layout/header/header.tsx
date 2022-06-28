import { config } from "@/lib/config";
import { Navigation } from "./navigation";

export function Header() {
  return (
    <header>
      <h1>{config.app.name}</h1>

      <Navigation />
    </header>
  );
}

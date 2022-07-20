import { Link } from "@/components/shared/link";
import { config } from "@/lib/config";

export function Header() {
  return (
    <header className="py-4">
      <h1 className="text-3xl font-bold">
        <Link href="/">
          {config.app.name}
        </Link>
      </h1>
    </header>
  );
}

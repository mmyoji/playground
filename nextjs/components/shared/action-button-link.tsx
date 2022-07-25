import { ReactNode } from "react";
import { Link } from "@/components/shared/link";

interface Props {
  children: ReactNode;
  href: string;
}

export function ActionButtonLink({ href, children }: Props) {
  return (
    <Link
      href={href}
      className="p-2 text-green-900 hover:text-green-700 bg-emerald-200 hover:bg-emerald-100 rounded-md border-2 border-solid border-emerald-200 hover:border-emerald-100"
    >
      {children}
    </Link>
  );
}

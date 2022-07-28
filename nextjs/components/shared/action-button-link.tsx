import { ReactNode } from "react";
import { Link } from "@/components/shared/link";

import styles from "./action-button-link.module.css";

interface Props {
  children: ReactNode;
  href: string;
}

export function ActionButtonLink({ href, children }: Props) {
  return (
    <Link
      href={href}
      className={styles.link}
    >
      {children}
    </Link>
  );
}

import { Link } from "@/components/shared/link";
import { config } from "@/lib/config";

import styles from "./header.module.css";

export function Header() {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>
        <Link href="/" className={styles.titleLink}>
          {config.app.name}
        </Link>
      </h1>
    </header>
  );
}

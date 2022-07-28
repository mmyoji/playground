import { ReactNode } from "react";

import styles from "./title.module.css";

interface Props {
  children: ReactNode;
}

export function Title({ children }: Props) {
  return <h1 className={styles.title}>{children}</h1>;
}

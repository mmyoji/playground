import { ReactNode } from "react";

import styles from "./label.module.css";

interface Props {
  htmlFor: string;
  children: ReactNode;
}

export function Label({ htmlFor, children }: Props) {
  return <label htmlFor={htmlFor} className={styles.label}>{children}</label>;
}

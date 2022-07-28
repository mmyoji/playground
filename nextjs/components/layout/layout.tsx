import { ReactNode } from "react";

import { Footer } from "./footer";
import { Header } from "./header";

import styles from "./layout.module.css";

interface Props {
  children: ReactNode;
}

export function Layout({ children }: Props) {
  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>{children}</main>
      <Footer />
    </div>
  );
}

import { Link } from "@/components/shared/link";

import styles from "./list-item.module.css";

interface Props {
  id: string;
  title: string;
  updatedAt: string;
}

export function PostListItem({ id, title, updatedAt }: Props) {
  return (
    <article className={styles.article}>
      <Link href={`/posts/${id}`}>
        <h3 className={styles.title}>{title}</h3>
      </Link>
      <p className={styles.timeContainer}>
        <time>{updatedAt}</time>
      </p>
    </article>
  );
}

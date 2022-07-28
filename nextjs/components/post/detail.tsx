import { ReactNode } from "react";
import { ActionButtonLink } from "@/components/shared/action-button-link";

import styles from "./detail.module.css";

interface Props {
  post: {
    id: string;
    title: string;
    content: string | null;
    createdAt: string;
    updatedAt: string;
  };
}

function TimeText({ children }: { children: ReactNode }) {
  return (
    <p className={styles.timeContainer}>
      <time>{children}</time>
    </p>
  );
}

export const PostDetail = ({ post }: Props) => {
  const { id, title, content, createdAt, updatedAt } = post;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{title}</h1>
      <TimeText>
        Created: {createdAt}
      </TimeText>
      <TimeText>
        Updated: {updatedAt}
      </TimeText>
      <p className={styles.content}>{content}</p>
      <div className={styles.editButtonContainer}>
        <ActionButtonLink href={`/posts/${id}/edit`}>
          Edit
        </ActionButtonLink>
      </div>
    </div>
  );
};

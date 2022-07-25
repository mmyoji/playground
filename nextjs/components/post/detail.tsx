import { ReactNode } from "react";
import { ActionButtonLink } from "@/components/shared/action-button-link";

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
    <p className="mt-2 text-gray-600">
      <time>{children}</time>
    </p>
  );
}

export const PostDetail = ({ post }: Props) => {
  const { id, title, content, createdAt, updatedAt } = post;

  return (
    <div className="p-3">
      <h1 className="text-3xl font-bold">{title}</h1>
      <TimeText>
        Created: {createdAt}
      </TimeText>
      <TimeText>
        Updated: {updatedAt}
      </TimeText>
      <p className="py-2">{content}</p>
      <div className="mt-2">
        <ActionButtonLink href={`/posts/${id}/edit`}>
          Edit
        </ActionButtonLink>
      </div>
    </div>
  );
};

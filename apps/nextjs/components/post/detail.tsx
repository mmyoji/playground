import { Link } from "@/components/shared/link";

interface Props {
  post: {
    id: string;
    title: string;
    content: string | null;
    createdAt: string;
    updatedAt: string;
  };
}

export const PostDetail = ({ post }: Props) => {
  const { id, title, content, createdAt, updatedAt } = post;

  return (
    <>
      <h1>{title}</h1>
      <p>
        <time>Created: {createdAt}</time>
      </p>
      <p>
        <time>Updated: {updatedAt}</time>
      </p>
      <p>{content}</p>
      <Link href={`/posts/${id}/edit`}>
        Edit
      </Link>
    </>
  );
};

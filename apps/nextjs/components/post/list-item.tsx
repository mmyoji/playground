import { Link } from "@/components/shared/link";

interface Props {
  id: string;
  title: string;
  updatedAt: string;
}

export function PostListItem({ id, title, updatedAt }: Props) {
  return (
    <article>
      <Link href={`/posts/${id}`}>
        <h3>{title}</h3>
      </Link>
      <p>
        <time>{updatedAt}</time>
      </p>
    </article>
  );
}

import Link from "next/link";

interface Props {
  id: string;
  title: string;
  updatedAt: string;
}

export function PostListItem({ id, title, updatedAt }: Props) {
  return (
    <article>
      <Link href={`/posts/${id}`}>
        <a>
          <h3>{title}</h3>
        </a>
      </Link>
      <p>
        <time>{updatedAt}</time>
      </p>
    </article>
  );
}

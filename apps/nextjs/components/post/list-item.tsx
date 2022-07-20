import { Link } from "@/components/shared/link";

interface Props {
  id: string;
  title: string;
  updatedAt: string;
}

export function PostListItem({ id, title, updatedAt }: Props) {
  return (
    <article className="mb-3">
      <Link href={`/posts/${id}`}>
        <h3 className="text-2xl font-bold underline">{title}</h3>
      </Link>
      <p className="text-gray-600">
        <time>{updatedAt}</time>
      </p>
    </article>
  );
}

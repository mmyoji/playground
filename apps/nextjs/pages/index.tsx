import { GetStaticProps } from "next";
import { NextPageWithMetadata } from "@/app-env";
import { PostListItem } from "@/components/post/list-item";
import { Layout } from "@/components/layout/layout";
import { Link } from "@/components/shared/link";
import { postQuery } from "@/lib/post.query";

interface Props {
  posts: Awaited<ReturnType<typeof postQuery.fetchMany>>;
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const posts = await postQuery.fetchMany({ take: 10 });

  return {
    props: {
      posts,
    },
  };
};

const PostsPage: NextPageWithMetadata<Props> = ({ posts }) => {
  return (
    <Layout>
      <div>
        {/* TODO: Signed-in user can only see this link */}
        <Link href="/posts/new">
          Create a new Post
        </Link>
      </div>

      <section>
        {posts.map((post) => <PostListItem key={post.id} {...post} />)}
      </section>
    </Layout>
  );
};

export default PostsPage;

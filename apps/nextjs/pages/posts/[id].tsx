import Head from "next/head";

import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { NextPageWithMetadata } from "@/app-env";
import { Layout } from "@/components/layout/layout";
import { PostDetail } from "@/components/post/detail";
import { postQuery } from "@/lib/post.query";
import { config } from "@/lib/config";

interface Props {
  // `undefined` when page is not statically generated yet
  post: NonNullable<Awaited<ReturnType<typeof postQuery.fetchOne>>> | undefined;
}

const SECONDS = 1;

export const getStaticPaths: GetStaticPaths<{ id: string }> = async () => {
  const posts = await postQuery.fetchMany({ take: 5 });

  return {
    paths: posts.map(({ id }) => ({ params: { id } })),
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<
  Props,
  { id: string }
> = async ({ params }) => {
  if (!params) {
    throw new Error("Invalid request: `params` not found!");
  }

  const { id } = params;
  const post = await postQuery.fetchOne({ id });
  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post,
    },
    revalidate: 60 * SECONDS,
  };
};

const PostPage: NextPageWithMetadata<Props> = (
  { post },
) => {
  const router = useRouter();

  if (!post || router.isFallback) {
    return <div>Loading...</div>;
  }

  const { title } = post;

  return (
    <>
      <Head>
        <title>{`${title} | ${config.app.name}`}</title>
      </Head>
      <Layout>
        <PostDetail post={post} />
      </Layout>
    </>
  );
};

export default PostPage;

import Link from "next/link";

import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { NextPageWithMetadata } from "@/app-env";
import { Layout } from "@/components/layout/layout";
import { IOnSubmit, PostForm } from "@/components/post/form";
import { Toast } from "@/components/shared/toast";
import { postQuery } from "@/lib/post.query";
import { Params } from "@/lib/post.validator";
import { command } from "@/lib/request";

interface Props {
  post: NonNullable<Awaited<ReturnType<typeof postQuery.fetchOne>>>;
}

type QueryParams = {
  id: string;
};

const title = `Edit a Post`;

export const getServerSideProps: GetServerSideProps<
  Props,
  QueryParams
> = async ({ params }) => {
  if (!params) {
    throw new Error("Invalid request: `params` not found!");
  }

  const { id } = params;
  const post = await postQuery.fetchOne({ id, onlyPublished: false });

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post,
    },
  };
};

const EditPostPage: NextPageWithMetadata<Props> = (
  { post: { id, title, published } },
) => {
  const router = useRouter();

  const onSubmit: IOnSubmit = async (args) => {
    const { error } = await command<Params>(`/api/posts/${id}`, "PATCH", args);
    if (error) {
      toast.error(error.message);
      return;
    }

    router.push(`/posts/${id}`);
  };

  return (
    <Layout>
      <Link href={`/posts/${id}`}>
        <a>&lt; Back</a>
      </Link>

      <h1>{title}</h1>

      <PostForm
        init={{ title, published }}
        onSubmit={onSubmit}
        buttonText="Update"
      />
      <Toast />
    </Layout>
  );
};

EditPostPage.meta = { title };

export default EditPostPage;

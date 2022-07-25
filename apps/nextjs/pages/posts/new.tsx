import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { NextPageWithMetadata } from "@/app-env";
import { Layout } from "@/components/layout/layout";
import { IOnSubmit, PostForm } from "@/components/post/form";
import { Title } from "@/components/shared/title";
import { Toast } from "@/components/shared/toast";
import { Params } from "@/lib/post.validator";
import { command } from "@/lib/request";

const title = `Create a new post`;

const NewPostPage: NextPageWithMetadata<{}> = () => {
  const router = useRouter();

  const onSubmit: IOnSubmit = async (args) => {
    const { error } = await command<Params>("/api/posts", "POST", args);
    if (error) {
      toast.error(error.message);
      return;
    }

    router.push(`/`);
  };

  return (
    <Layout>
      <Title>{title}</Title>
      <PostForm onSubmit={onSubmit} buttonText="Create" />
      <Toast />
    </Layout>
  );
};

NewPostPage.meta = { title };

export default NewPostPage;

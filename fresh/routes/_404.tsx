/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import { UnknownPageProps } from "$fresh/server.ts";
import { Layout } from "../components/Layout.tsx";

export default function NotFoundPage({ url }: UnknownPageProps) {
  return (
    <Layout>
      <h2 class={tw`font-bold text-3xl`}>404</h2>
      <p>Not Found: {url.pathname}</p>
    </Layout>
  );
}

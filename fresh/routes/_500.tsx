/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import { ErrorPageProps } from "$fresh/server.ts";
import { Layout } from "../components/Layout.tsx";

export default function InternalServerErrorPage({ error }: ErrorPageProps) {
  return (
    <Layout>
      <h2 class={tw`font-bold text-3xl`}>500</h2>
      <p>Internal Server Error: {(error as Error).message}</p>
    </Layout>
  );
}

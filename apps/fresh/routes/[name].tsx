/** @jsx h */
import { h } from "preact";
import { PageProps } from "$fresh/server.ts";
import { Layout } from "../components/Layout.tsx";
import BackLink from "../islands/BackLink.tsx";

export default function Greet(props: PageProps) {
  return (
    <Layout>
      <BackLink />
      <div>Hello {props.params.name}</div>
    </Layout>
  );
}

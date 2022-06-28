/** @jsx h */
import { h } from "preact";
import { ErrorPageProps } from "$fresh/server.ts";

export default function InternalServerErrorPage({ error }: ErrorPageProps) {
  return <p>500 internal server error: {(error as Error).message}</p>;
}

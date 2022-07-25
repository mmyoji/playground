import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";

import Head from "next/head";

import { AppPropsWithMetadata } from "@/app-env";
import { config } from "@/lib/config";

interface Props {}

export default function MyApp({
  Component,
  pageProps,
}: AppPropsWithMetadata<Props>) {
  const { title, description } = Component.meta ?? {};

  return (
    <>
      <Head>
        <title>{[title, config.app.name].filter(Boolean).join(" | ")}</title>
        <meta
          name="description"
          content={description || `Generated by create next app`}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Component {...pageProps} />
    </>
  );
}
import type { NextPage } from "next";
import type { AppProps } from "next/app";

type NextPageWithMetadata<P = {}, IP = P> = NextPage<P, IP> & {
  meta?: {
    title?: string;
    description?: string;
  };
};

type AppPropsWithMetadata<P = {}> = AppProps<P> & {
  Component: NextPageWithMetadata;
};

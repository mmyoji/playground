/** @jsx h */
/// <reference no-default-lib="true"/>
/// <reference lib="dom" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />

import { Router } from "oak";
import { h, renderSSR } from "nano_jsx";

import { App } from "./components/app.tsx";

const jsxRouter = new Router();

jsxRouter.get("/jsx", (ctx) => {
  const html = renderSSR(<App />);
  ctx.response.headers.set("Content-Type", "text/html");
  ctx.response.body = ["<!DOCTYPE html>", html].join("\n");
});

export { jsxRouter };

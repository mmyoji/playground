import { Application } from "oak";

import { rootRouter } from "./app/root/root.router.ts";
import { usersRouter } from "./app/users/users.router.ts";
import { jsxRouter } from "./app/jsx/jsx.router.tsx";

const port = Number(Deno.env.get("PORT") || "8080");

const app = new Application();

[rootRouter, usersRouter, jsxRouter].forEach((router) => {
  app.use(router.routes());
  app.use(router.allowedMethods());
});

app.use(async (context) => {
  await context.send({
    root: `${Deno.cwd()}/public`,
  });
});

await app.listen({ port });

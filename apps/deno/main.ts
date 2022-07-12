import { Application } from "oak";

import { rootRouter } from "./app/root/root.router.ts";
import { usersRouter } from "./app/users/users.router.ts";
import { jsxRouter } from "./app/jsx/jsx.router.tsx";
import { config } from "./config.ts";

const app = new Application();

const routers = [rootRouter, usersRouter, jsxRouter];

for (const router of routers) {
  app.use(router.routes());
  app.use(router.allowedMethods());
}

app.use(async (context) => {
  await context.send({
    root: `${Deno.cwd()}/public`,
  });
});

await app.listen({ port: config.port });

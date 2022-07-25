import { Router, Status } from "oak";

const rootRouter = new Router();

rootRouter.get("/", (ctx) => {
  ctx.response.body = "Hello!";
  ctx.response.status = Status.OK;
});

export { rootRouter };

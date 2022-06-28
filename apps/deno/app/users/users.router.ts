import { Router, Status } from "oak";

import { User } from "./users.interface.ts";
import { UsersService } from "./users.service.ts";

const usersRouter = new Router();
const usersService = new UsersService();

usersRouter.post("/users", async (ctx) => {
  const body = ctx.request.body({ type: "json" });
  const value = await body.value;
  const userOrError = await usersService.create(
    value as Partial<Pick<User, "name">>,
  );
  if (typeof userOrError === "string") {
    ctx.response.status = Status.UnprocessableEntity;
    ctx.response.body = { errors: [{ message: userOrError }] };
    return;
  }

  ctx.response.status = Status.Created;
  ctx.response.body = { user: userOrError };
});

export { usersRouter };

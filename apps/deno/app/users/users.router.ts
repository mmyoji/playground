import { Router, Status } from "oak";

import { User } from "./users.interface.ts";
import { UsersService } from "./users.service.ts";

const usersRouter = new Router();
const usersService = new UsersService();

usersRouter.post("/users", async (ctx) => {
  const body = ctx.request.body({ type: "json" });
  const value = await body.value;
  const { user, error } = await usersService.create(
    value as Partial<Pick<User, "name">>
  );
  if (typeof error === "string") {
    ctx.response.status = Status.UnprocessableEntity;
    ctx.response.body = { errors: [{ message: error }] };
    return;
  }

  ctx.response.status = Status.Created;
  ctx.response.body = { user };
});

export { usersRouter };

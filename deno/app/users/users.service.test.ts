import { assertEquals } from "testing/asserts.ts";

import { UsersService } from "./users.service.ts";

const usersService = new UsersService();

Deno.test("UsersService.create", async (t) => {
  await t.step("returns an error message when invalid args", async () => {
    const { error } = await usersService.create({});
    assertEquals(typeof error, "string");
  });

  await t.step("returns a user with valid args", async () => {
    const { user } = await usersService.create({ name: "Tom" });
    assertEquals(typeof user, "object");
    assertEquals(user!.name, "Tom");
  });
});

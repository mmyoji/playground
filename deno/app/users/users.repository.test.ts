import { assertEquals } from "testing/asserts.ts";

import { UsersRepository } from "./users.repository.ts";

const usersRepository = new UsersRepository();

Deno.test("UsersRepository.create", async (t) => {
  await t.step("returns a created user when valid", async () => {
    const user = await usersRepository.create({ name: "foo" });
    assertEquals(user.name, "foo");

    const users = await usersRepository.getMany();
    assertEquals(users.at(-1), user);
  });
});

Deno.test("UsersRepository.exists", async (t) => {
  await t.step("returns true when found", async () => {
    const result = await usersRepository.exists({ name: "Alice" });
    assertEquals(result, true);
  });

  await t.step("returns falsed when not found", async () => {
    const result = await usersRepository.exists({ name: "bar" });
    assertEquals(result, false);
  });
});

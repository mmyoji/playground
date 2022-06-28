import { assertEquals } from "asserts";

import { validate } from "./users.validator.ts";

Deno.test("UsersValidator.valdate", async (t) => {
  await t.step(
    "returns an error message when [name] doesn't exist",
    async () => {
      const error = await validate({});
      assertEquals(error, "[name] must exists or be string.");
    },
  );

  await t.step(
    "returns an error message when [name] isn't string",
    async () => {
      // @ts-ignore: could be possible
      const error = await validate({ name: 1 });
      assertEquals(error, "[name] must exists or be string.");
    },
  );

  await t.step(
    "returns an error message when [name] has already been taken",
    async () => {
      const error = await validate({ name: "Bob" });
      assertEquals(error, "[name] has already been taken.");
    },
  );

  await t.step("returns a blank string with valid args", async () => {
    const error = await validate({ name: "Mary" });
    assertEquals(error, "");
  });
});

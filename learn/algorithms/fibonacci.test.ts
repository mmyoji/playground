import { assertEquals } from "testing/asserts.ts";
import { fibonacci } from "./fibonacci.ts";

Deno.test("fibonacci", () => {
  const gen = fibonacci();

  assertEquals(gen(), 1);
  assertEquals(gen(), 1);
  assertEquals(gen(), 2);
  assertEquals(gen(), 3);
  assertEquals(gen(), 5);
  assertEquals(gen(), 8);
  assertEquals(gen(), 13);
  assertEquals(gen(), 21);
  assertEquals(gen(), 34);
});

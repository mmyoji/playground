import { assertEquals } from "testing/asserts.ts";

import { Stack } from "./stack.ts";

Deno.test("Stack can be pushed and popped", () => {
  const stack = new Stack<string>();

  assertEquals(stack.peek(), null);

  stack.push("foo");
  assertEquals(stack.peek(), "foo");

  stack.push("bar");
  assertEquals(stack.peek(), "bar");

  stack.push("buz");
  assertEquals(stack.peek(), "buz");

  {
    const element = stack.pop();
    assertEquals(element, "buz");
  }
  assertEquals(stack.peek(), "bar");

  {
    const element = stack.pop();
    assertEquals(element, "bar");
  }
  assertEquals(stack.peek(), "foo");
});

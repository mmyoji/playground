import { assertEquals } from "testing/asserts.ts";
import { factorial, factorialRecursive } from "./factorial.ts";

const expects: [number, number][] = [
  [0, 1],
  [1, 1],
  [2, 2],
  [3, 6],
  [4, 24],
  [5, 120],
  [10, 3628800],
];

Deno.test("factorial works", () => {
  for (const [given, expected] of expects) {
    assertEquals(factorial(given), expected);
  }
});

Deno.test("factorialRecursive works", () => {
  for (const [given, expected] of expects) {
    assertEquals(factorialRecursive(given), expected);
  }
});

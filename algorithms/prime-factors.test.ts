import { assert } from "testing/asserts.ts";
import { primeFactors } from "./prime-factors.ts";

Deno.test("prime factors", () => {
  assert(primeFactors(1));
  assert(primeFactors(2));
  assert(primeFactors(3));
  assert(!primeFactors(4));
  assert(primeFactors(5));
  assert(!primeFactors(6));
  assert(primeFactors(7));
  assert(!primeFactors(8));
  assert(!primeFactors(9));
  assert(!primeFactors(10));
  assert(primeFactors(11));
});

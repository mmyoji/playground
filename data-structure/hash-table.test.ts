import { assertEquals } from "testing/asserts.ts";

import { HashTable } from "./hash-table.ts";

Deno.test(
  "HashTable.get returns expected value when given key is matched",
  () => {
    const hash = new HashTable<string>();

    assertEquals(hash.get("foo"), undefined);

    hash.set("key-1", "foo");
    hash.set("key-2", "bar");

    assertEquals(hash.get("key"), undefined);
    assertEquals(hash.get("key-1"), "foo");
    assertEquals(hash.get("key-2"), "bar");
    assertEquals(hash.get("key-3"), undefined);

    {
      const value = hash.delete("key-1");
      assertEquals(value, "foo");
    }
    assertEquals(hash.get("key-1"), undefined);
  }
);

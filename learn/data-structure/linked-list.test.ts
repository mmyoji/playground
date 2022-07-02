import { assertEquals, assertStrictEquals } from "testing/asserts.ts";

import { LinkedList } from "./linked-list.ts";

Deno.test("new LinkedList() sets head=null and tail=null", () => {
  const list = new LinkedList<string>();

  assertEquals(list.head, null);
  assertEquals(list.tail, null);
});

Deno.test(
  "LinkedList.append sets the same node for both head and tail with given value when the list has no head (tail)",
  () => {
    const list = new LinkedList<string>();

    list.append("foo");

    assertStrictEquals(list.head, list.tail);
    assertEquals(list.head!.value, "foo");
    assertEquals(list.tail!.value, "foo");
    assertEquals(list.head!.next, null);
  }
);

Deno.test(
  "LinkedList.append sets a new tail with given value when the list is not empty",
  () => {
    const list = new LinkedList<string>();

    list.append("foo");
    list.append("bar");

    assertEquals(list.head!.value, "foo");
    assertStrictEquals(list.head!.next, list.tail);

    assertEquals(list.tail!.value, "bar");
    assertEquals(list.tail!.next, null);
  }
);

Deno.test(
  "LinkedList.prepend sets the same node for both head and tail with given value after initialization",
  () => {
    const list = new LinkedList<string>();

    list.prepend("foo");

    assertStrictEquals(list.head, list.tail);
    assertEquals(list.head!.value, "foo");
    assertEquals(list.tail!.value, "foo");
    assertEquals(list.head!.next, null);
  }
);

Deno.test(
  "LinkedList.prepend sets a new head with given value when the list is not empty",
  () => {
    const list = new LinkedList<string>();

    list.prepend("foo");
    list.prepend("bar");

    assertEquals(list.head!.value, "bar");
    assertStrictEquals(list.head!.next, list.tail);

    assertEquals(list.tail!.value, "foo");
    assertEquals(list.tail!.next, null);
  }
);

Deno.test("LinkedList.find returns null when the list is empty", () => {
  const list = new LinkedList<string>();

  const result = list.find("foo");
  assertEquals(result, null);
});

Deno.test(
  "LinkedList.find returns null when the list doesn't have matched value",
  () => {
    const list = new LinkedList<string>();

    list.append("foo");
    list.append("bar");
    list.append("buz");

    {
      const result = list.find("f");
      assertEquals(result, null);
    }

    {
      const result = list.find("o");
      assertEquals(result, null);
    }

    {
      const result = list.find("ba");
      assertEquals(result, null);
    }
  }
);

Deno.test(
  "LinkedList.find returns matched node when the list has matched value",
  () => {
    const list = new LinkedList<string>();

    list.append("foo");
    list.append("bar");
    list.append("buz");

    {
      const result = list.find("foo");
      assertEquals(result!.value, "foo");
    }

    {
      const result = list.find("bar");
      assertEquals(result!.value, "bar");
    }

    {
      const result = list.find("buz");
      assertEquals(result!.value, "buz");
    }
  }
);

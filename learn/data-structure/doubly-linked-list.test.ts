import { assertEquals, assertStrictEquals } from "testing/asserts.ts";

import { DoublyLinkedList } from "./doubly-linked-list.ts";

Deno.test("new DoublyLinkedList() sets head=null and tail=null", () => {
  const list = new DoublyLinkedList<string>();

  assertEquals(list.head, null);
  assertEquals(list.tail, null);
});

Deno.test(
  "DoublyLinkedList.append sets the same node instance for head and tail when the list is empty",
  () => {
    const list = new DoublyLinkedList<string>();

    list.append("foo");

    assertStrictEquals(list.head, list.tail);
    assertEquals(list.head!.prev, null);
    assertEquals(list.head!.next, null);
    assertEquals(list.head!.value, "foo");
  }
);

Deno.test(
  "DoublyLinkedList.append sets the new node for its tail when the list is not empty",
  () => {
    const list = new DoublyLinkedList<string>();

    // has 2 nodes
    list.append("foo");
    list.append("bar");

    assertEquals(list.head!.value, "foo");
    assertEquals(list.head!.prev, null);
    assertStrictEquals(list.head!.next, list.tail);

    assertEquals(list.tail!.value, "bar");
    assertStrictEquals(list.tail!.prev, list.head);
    assertEquals(list.tail!.next, null);

    // append again (3rd node)
    list.append("buz");

    assertEquals(list.head!.value, "foo");
    assertEquals(list.head!.prev, null);
    assertStrictEquals(list.head!.next!.value, "bar");

    assertEquals(list.tail!.value, "buz");
    assertStrictEquals(list.tail!.prev!.value, "bar");
    assertEquals(list.tail!.next, null);
  }
);

Deno.test(
  "DoublyLinkedList.prepend sets the same node instance for head and tail when the list is empty",
  () => {
    const list = new DoublyLinkedList<string>();

    list.prepend("foo");

    assertStrictEquals(list.head, list.tail);
    assertEquals(list.head!.prev, null);
    assertEquals(list.head!.next, null);
    assertEquals(list.head!.value, "foo");
  }
);

Deno.test(
  "DoublyLinkedList.prepend sets the new node for its head when the list is not empty",
  () => {
    const list = new DoublyLinkedList<string>();

    list.prepend("foo");
    list.prepend("bar");

    assertEquals(list.head!.value, "bar");
    assertEquals(list.head!.prev, null);
    assertStrictEquals(list.head!.next, list.tail);

    assertEquals(list.tail!.value, "foo");
    assertEquals(list.tail!.prev, list.head);
    assertEquals(list.tail!.next, null);

    list.prepend("buz");

    assertEquals(list.head!.value, "buz");
    assertEquals(list.head!.prev, null);
    assertStrictEquals(list.head!.next!.value, "bar");

    assertEquals(list.tail!.value, "foo");
    assertEquals(list.tail!.prev!.value, "bar");
    assertEquals(list.tail!.next, null);
  }
);

Deno.test("DoublyLinkedList.find returns null when the list is empty", () => {
  const list = new DoublyLinkedList<string>();

  const result = list.find("foo");
  assertEquals(result, null);
});

Deno.test(
  "DoublyLinkedList.find returns null when the list doesn't have matched value",
  () => {
    const list = new DoublyLinkedList<string>();

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
  "DoublyLinkedList.find returns matched node when the list has matched value",
  () => {
    const list = new DoublyLinkedList<string>();

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

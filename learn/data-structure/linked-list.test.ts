import { assertEquals, assertStrictEquals } from "testing/asserts.ts";
import { describe, it } from "testing/bdd.ts";

import { LinkedList } from "./linked-list.ts";

describe("LinkedList", () => {
  describe("new", () => {
    it("has head=null and tail=null after initialization", () => {
      const linkedList = new LinkedList();

      assertEquals(linkedList.head, null);
      assertEquals(linkedList.tail, null);
    });
  });

  describe("append", () => {
    it("sets the same node for both head and tail with given value after initialization", () => {
      const linkedList = new LinkedList();

      linkedList.append("foo");

      assertStrictEquals(linkedList.head, linkedList.tail);
      assertEquals(linkedList.head!.value, "foo");
      assertEquals(linkedList.tail!.value, "foo");
      assertEquals(linkedList.head!.next, null);
    });

    it("sets a new tail with given value when the list is not empty", () => {
      const linkedList = new LinkedList();

      linkedList.append("foo");
      linkedList.append("bar");

      assertEquals(linkedList.head!.value, "foo");
      assertStrictEquals(linkedList.head!.next, linkedList.tail);

      assertEquals(linkedList.tail!.value, "bar");
      assertEquals(linkedList.tail!.next, null);
    });
  });

  describe("prepend", () => {
    it("sets the same node for both head and tail with given value after initialization", () => {
      const linkedList = new LinkedList();

      linkedList.prepend("foo");

      assertStrictEquals(linkedList.head, linkedList.tail);
      assertEquals(linkedList.head!.value, "foo");
      assertEquals(linkedList.tail!.value, "foo");
      assertEquals(linkedList.head!.next, null);
    });

    it("sets a new head with given value when the list is not empty", () => {
      const linkedList = new LinkedList();

      linkedList.prepend("foo");
      linkedList.prepend("bar");

      assertEquals(linkedList.head!.value, "bar");
      assertStrictEquals(linkedList.head!.next, linkedList.tail);

      assertEquals(linkedList.tail!.value, "foo");
      assertEquals(linkedList.tail!.next, null);
    });
  });
});

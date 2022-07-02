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

  describe("find", () => {
    it("returns null when the list is empty", () => {
      const linkedList = new LinkedList<string>();

      const result = linkedList.find("foo");
      assertEquals(result, null);
    });

    it("returns null when the list doesn't have matched value", () => {
      const linkedList = new LinkedList<string>();

      linkedList.append("foo");
      linkedList.append("bar");
      linkedList.append("buz");

      {
        const result = linkedList.find("f");
        assertEquals(result, null);
      }

      {
        const result = linkedList.find("o");
        assertEquals(result, null);
      }

      {
        const result = linkedList.find("ba");
        assertEquals(result, null);
      }
    });

    it("returns matched node when the list has matched value", () => {
      const linkedList = new LinkedList<string>();

      linkedList.append("foo");
      linkedList.append("bar");
      linkedList.append("buz");

      {
        const result = linkedList.find("foo");
        assertEquals(result!.value, "foo");
      }

      {
        const result = linkedList.find("bar");
        assertEquals(result!.value, "bar");
      }

      {
        const result = linkedList.find("buz");
        assertEquals(result!.value, "buz");
      }
    });
  });
});

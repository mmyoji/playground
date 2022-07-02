import { assertEquals } from "testing/asserts.ts";

import { Queue } from "./queue.ts";

Deno.test("Queue can be enqueued and dequeued", () => {
  const q = new Queue<number>();

  assertEquals(q.peek(), null);

  q.enqueue(10);
  assertEquals(q.peek(), 10);

  q.enqueue(11);
  assertEquals(q.peek(), 10);

  {
    const element = q.dequeue();
    assertEquals(element, 10);
  }
  assertEquals(q.peek(), 11);

  {
    const element = q.dequeue();
    assertEquals(element, 11);
  }
  assertEquals(q.peek(), null);
});

import { assertEquals } from "testing/asserts.ts";

import { MaxHeap, MinHeap } from "./heap.ts";

Deno.test("MaxHeap always makes the top of the pyramid greatest", () => {
  const heap = new MaxHeap<number>();

  heap.add(100);

  assertEquals(heap.toString(), `100`);

  heap.add(200);
  heap.add(150);

  //   200
  // 100 150
  assertEquals(heap.toString(), `200,100,150`);

  heap.add(300);
  heap.add(50);

  //      300
  //   200   150
  // 100 50
  assertEquals(heap.toString(), `300,200,150,100,50`);
  assertEquals(heap.leftChild(0), 200);
  assertEquals(heap.rightChild(0), 150);
  assertEquals(heap.leftChild(1), 100);
  assertEquals(heap.rightChild(1), 50);
  assertEquals(heap.leftChild(2), null);
  assertEquals(heap.rightChild(2), null);
});

Deno.test("MinHeap always makes the top of the pyramid smallest", () => {
  const heap = new MinHeap<number>();

  heap.add(100);

  assertEquals(heap.toString(), `100`);

  heap.add(200);
  heap.add(150);

  assertEquals(heap.toString(), `100,200,150`);

  heap.add(300);
  heap.add(50);

  //       50
  //   100    150
  // 300 200
  assertEquals(heap.toString(), `50,100,150,300,200`);
});

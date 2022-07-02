// see: https://github.com/trekhleb/javascript-algorithms/tree/master/src/data-structures/queue

import { LinkedList } from "./linked-list.ts";

export class Queue<T> {
  #list: LinkedList<T>;

  constructor() {
    this.#list = new LinkedList<T>();
  }

  enqueue(value: T): void {
    this.#list.append(value);
  }

  dequeue(): T | null {
    const node = this.#list.deleteHead();
    return node ? node.value : null;
  }

  /**
   * Read the element at the front of the queue without removing it.
   */
  peek(): T | null {
    if (this.#isEmpty()) {
      return null;
    }

    return this.#list.head!.value;
  }

  #isEmpty(): boolean {
    return !this.#list.head;
  }
}

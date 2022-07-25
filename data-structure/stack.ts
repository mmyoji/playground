// see: https://github.com/trekhleb/javascript-algorithms/tree/master/src/data-structures/stack

import { LinkedList } from "./linked-list.ts";

export class Stack<T> {
  #list: LinkedList<T>;

  constructor() {
    this.#list = new LinkedList<T>();
  }

  push(value: T): void {
    this.#list.prepend(value);
  }

  pop(): T | null {
    if (this.#isEmpty()) {
      return null;
    }

    const node = this.#list.deleteHead();
    return node ? node.value : null;
  }

  /**
   * Read the element at the top of the stack without removing it.
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

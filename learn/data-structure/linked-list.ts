// see: https://github.com/trekhleb/javascript-algorithms/tree/master/src/data-structures/linked-list

class LinkedListNode<T> {
  value: T;
  next: LinkedListNode<T> | null;

  constructor(value: T, next: LinkedListNode<T> | null = null) {
    this.value = value;
    this.next = next;
  }
}

export class LinkedList<T> {
  head: LinkedListNode<T> | null;
  tail: LinkedListNode<T> | null;

  constructor() {
    this.head = null;
    this.tail = null;
  }

  append(value: T): LinkedList<T> {
    const newNode = new LinkedListNode<typeof value>(value);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
      return this;
    }

    if (!this.tail) {
      throw new Error("Invalid state: tail must be set.");
    }

    this.tail.next = newNode;
    this.tail = newNode;

    return this;
  }

  prepend(value: T): LinkedList<T> {
    const newNode = new LinkedListNode<typeof value>(value, this.head);
    this.head = newNode;

    if (!this.tail) {
      this.tail = newNode;
    }

    return this;
  }
}

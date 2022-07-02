// see: https://github.com/trekhleb/javascript-algorithms/tree/master/src/data-structures/linked-list

type NodeType<T> = LinkedListNode<T> | null;

class LinkedListNode<T> {
  value: T;
  next: NodeType<T>;

  constructor(value: T, next: NodeType<T> = null) {
    this.value = value;
    this.next = next;
  }
}

export class LinkedList<T> {
  head: NodeType<T>;
  tail: NodeType<T>;

  constructor() {
    this.head = null;
    this.tail = null;
  }

  append(value: T): this {
    const newNode = new LinkedListNode<T>(value);

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

  prepend(value: T): this {
    const newNode = new LinkedListNode<T>(value, this.head);
    this.head = newNode;

    if (!this.tail) {
      this.tail = newNode;
    }

    return this;
  }

  find(value: T): NodeType<T> {
    if (!this.head) {
      return null;
    }

    let current: NodeType<T> = this.head;

    while (current) {
      if (current.value === value) {
        return current;
      }

      current = current.next;
    }

    return null;
  }
}

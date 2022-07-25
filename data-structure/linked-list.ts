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

  find(equal: (node: LinkedListNode<T>) => boolean): NodeType<T> {
    if (!this.head) {
      return null;
    }

    let current: NodeType<T> = this.head;

    while (current) {
      if (equal(current)) {
        return current;
      }

      current = current.next;
    }

    return null;
  }

  delete(value: T, equal: (a: T, b: T) => boolean): NodeType<T> {
    if (!this.head || !this.tail) {
      return null;
    }

    let deleted: NodeType<T> = null;
    while (this.head && equal(this.head.value, value)) {
      deleted = this.head;
      this.head = this.head.next;
    }

    let current: NodeType<T> = this.head;
    if (current !== null) {
      while (current.next) {
        if (equal(current.next.value, value)) {
          deleted = current.next;
          current.next = current.next.next;
        } else {
          current = current.next;
        }
      }
    }

    if (equal(this.tail.value, value)) {
      this.tail = current;
    }

    return deleted;
  }

  deleteHead(): NodeType<T> {
    if (!this.head || !this.tail) {
      return null;
    }

    const deleted = this.head;
    if (this.head.next) {
      this.head = this.head.next;
    } else {
      this.head = null;
      this.tail = null;
    }

    return deleted;
  }
}

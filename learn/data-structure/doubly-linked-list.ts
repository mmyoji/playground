type NodeType<T> = DoublyLinkedListNode<T> | null;

class DoublyLinkedListNode<T> {
  value: T;
  prev: NodeType<T>;
  next: NodeType<T>;

  constructor(value: T, prev: NodeType<T> = null, next: NodeType<T> = null) {
    this.value = value;
    this.prev = prev;
    this.next = next;
  }
}

export class DoublyLinkedList<T> {
  head: NodeType<T>;
  tail: NodeType<T>;

  constructor() {
    this.head = null;
    this.tail = null;
  }

  append(value: T): this {
    const newNode = new DoublyLinkedListNode<T>(value);

    if (!this.head || !this.tail) {
      this.head = newNode;
      this.tail = newNode;

      return this;
    }

    this.tail.next = newNode;
    newNode.prev = this.tail;
    this.tail = newNode;

    return this;
  }

  prepend(value: T): this {
    const newNode = new DoublyLinkedListNode<T>(value, null, this.head);

    if (this.head) {
      this.head.prev = newNode;
    }
    this.head = newNode;

    if (!this.tail) {
      this.tail = newNode;
    }

    return this;
  }

  find(value: T): NodeType<T> {
    if (!this.head || !this.tail) {
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

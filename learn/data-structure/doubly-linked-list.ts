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

  append(value: T): DoublyLinkedList<T> {
    const newNode = new DoublyLinkedListNode<typeof value>(value);

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
}

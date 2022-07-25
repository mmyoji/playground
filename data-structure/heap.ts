// see: https://github.com/trekhleb/javascript-algorithms/blob/master/src/data-structures/heap/README.ja-JP.md

class Heap<T> {
  #heapContainer: T[] = [];

  constructor() {
    if (new.target === Heap) {
      throw new TypeError(`Cannot construct Heap instance directly`);
    }
  }

  getParentIndex(childIndex: number): number {
    return Math.floor((childIndex - 1) / 2);
  }

  getLeftChildIndex(parentIndex: number): number {
    return 2 * parentIndex + 1;
  }

  getRightChildIndex(parentIndex: number): number {
    return 2 * parentIndex + 2;
  }

  hasParent(childIndex: number): boolean {
    return this.getParentIndex(childIndex) >= 0;
  }

  hasLeftChild(parentIndex: number): boolean {
    return this.getLeftChildIndex(parentIndex) < this.#heapContainer.length;
  }

  hasRightChild(parentIndex: number): boolean {
    return this.getRightChildIndex(parentIndex) < this.#heapContainer.length;
  }

  parent(childIndex: number): T | null {
    return this.#heapContainer[this.getParentIndex(childIndex)] || null;
  }

  leftChild(parentIndex: number): T | null {
    return this.#heapContainer[this.getLeftChildIndex(parentIndex)] || null;
  }

  rightChild(parentIndex: number): T | null {
    return this.#heapContainer[this.getRightChildIndex(parentIndex)] || null;
  }

  swap(i1: number, i2: number): void {
    const tmp = this.#heapContainer[i2];
    this.#heapContainer[i2] = this.#heapContainer[i1];
    this.#heapContainer[i1] = tmp;
  }

  peek(): T | null {
    if (this.isEmpty()) {
      return null;
    }

    return this.#heapContainer[0];
  }

  poll(): T | null {
    if (this.isEmpty()) {
      return null;
    }

    if (this.#heapContainer.length === 1) {
      return this.#heapContainer.pop() as T;
    }

    const item = this.#heapContainer[0];

    this.#heapContainer[0] = this.#heapContainer.pop() as T;
    this.#heapifyDown();

    return item;
  }

  add(item: T): this {
    this.#heapContainer.push(item);
    this.#heapifyUp();
    return this;
  }

  remove(item: T): this {
    const numberOfItemsToRemove = this.find(item).length;

    for (let iteration = 0; iteration < numberOfItemsToRemove; iteration++) {
      const indexToRemove = this.find(item).pop() as number;

      if (indexToRemove === this.#heapContainer.length - 1) {
        this.#heapContainer.pop();
      } else {
        this.#heapContainer[indexToRemove] = this.#heapContainer.pop() as T;

        const parentItem = this.parent(indexToRemove);

        if (
          this.hasLeftChild(indexToRemove) &&
          (!parentItem ||
            this.pairIsCorrectOrder(
              parentItem,
              this.#heapContainer[indexToRemove]
            ))
        ) {
          this.#heapifyDown(indexToRemove);
        } else {
          this.#heapifyUp(indexToRemove);
        }
      }
    }

    return this;
  }

  find(item: T): number[] {
    const foundItemIndices: number[] = [];

    for (
      let itemIndex = 0;
      itemIndex < this.#heapContainer.length;
      itemIndex++
    ) {
      if (item === this.#heapContainer[itemIndex]) {
        foundItemIndices.push(itemIndex);
      }
    }

    return foundItemIndices;
  }

  isEmpty(): boolean {
    return this.#heapContainer.length === 0;
  }

  toString(): string {
    return this.#heapContainer.toString();
  }

  /**
   * Take the last element (last in array or the bottom left in a tree)
   * in the heap container and lift it up until it is in the correct
   * order with respect to its parent element.
   */
  #heapifyUp(startIndex?: number): void {
    let currentIndex = startIndex || this.#heapContainer.length - 1;

    while (
      this.hasParent(currentIndex) &&
      !this.pairIsCorrectOrder(
        this.parent(currentIndex)!,
        this.#heapContainer[currentIndex]
      )
    ) {
      this.swap(currentIndex, this.getParentIndex(currentIndex));
      currentIndex = this.getParentIndex(currentIndex);
    }
  }

  /**
   * Compare the parent element to its children and swap parent with appropriate
   * child (smallest child for MinHeap, largest child for MaxHeap).
   * Do the same for next children after swap.
   */
  #heapifyDown(startIndex = 0): void {
    let currentIndex = startIndex;
    let nextIndex: number | null = null;

    while (this.hasLeftChild(currentIndex)) {
      if (
        this.hasRightChild(currentIndex) &&
        this.pairIsCorrectOrder(
          this.rightChild(currentIndex) as T,
          this.leftChild(currentIndex) as T
        )
      ) {
        nextIndex = this.getRightChildIndex(currentIndex);
      } else {
        nextIndex = this.getLeftChildIndex(currentIndex);
      }

      if (
        this.pairIsCorrectOrder(
          this.#heapContainer[currentIndex],
          this.#heapContainer[nextIndex]
        )
      ) {
        break;
      }

      this.swap(currentIndex, nextIndex);
      currentIndex = nextIndex;
    }
  }

  /**
   * Checks if pair of heap elements is in correct order.
   * For MinHeap, the firstElement must be always smaller or equal.
   * For MaxHeap, the firstElement must be always bigger  or equal.
   */
  pairIsCorrectOrder(firstElement: T, secondElement: T): boolean {
    throw new Error(
      `You have to implement heap pair comparison method for ${firstElement} and ${secondElement} values.`
    );
  }
}

export class MaxHeap<T> extends Heap<T> {
  pairIsCorrectOrder(firstElement: T, secondElement: T): boolean {
    return firstElement >= secondElement;
  }
}

export class MinHeap<T> extends Heap<T> {
  pairIsCorrectOrder(firstElement: T, secondElement: T): boolean {
    return firstElement <= secondElement;
  }
}

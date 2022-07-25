// see: https://github.com/trekhleb/javascript-algorithms/tree/master/src/data-structures/tree/binary-search-tree

import { HashTable } from "./hash-table.ts";

function equal<T extends number>(
  node1: BinaryTreeNode<T> | null,
  node2: BinaryTreeNode<T> | null
): boolean {
  if (node1 === null && node2 === null) {
    return true;
  }

  if (node1 === null || node2 === null) {
    return false;
  }

  return node1.value === node2.value;
}

interface IBaseNode<T extends number> {
  left: IBaseNode<T> | null;
  right: IBaseNode<T> | null;
  parent: IBaseNode<T> | null;
  value: T | null;
  meta: HashTable<T>;

  get height(): number;
  get leftHeight(): number;
  get rightHeight(): number;
  get balanceFactor(): number;
  get uncle(): IBaseNode<T> | undefined;

  setValue: (value: T) => IBaseNode<T>;
  setLeft: (node: IBaseNode<T> | null) => IBaseNode<T>;
  setRight: (node: IBaseNode<T> | null) => IBaseNode<T>;
  removeChild: (node: IBaseNode<T> | null) => boolean;
  replaceChild: (
    target: IBaseNode<T> | null,
    replacement: IBaseNode<T> | null
  ) => boolean;
  traverseInOrder: () => (T | null)[];
  toString: () => string;
}

// For simpliciy, set T as number here.
class BinaryTreeNode<T extends number> implements IBaseNode<T> {
  left: IBaseNode<T> | null;
  right: IBaseNode<T> | null;
  parent: IBaseNode<T> | null;
  value: T | null;
  meta: HashTable<T>;

  constructor(value: T | null = null) {
    this.left = null;
    this.right = null;
    this.parent = null;
    this.value = value;

    this.meta = new HashTable<T>();
  }

  get height(): number {
    return Math.max(this.leftHeight, this.rightHeight);
  }

  get leftHeight(): number {
    return this.left?.height || 0;
  }

  get rightHeight(): number {
    return this.right?.height || 0;
  }

  get balanceFactor(): number {
    return this.leftHeight - this.rightHeight;
  }

  get uncle(): BinaryTreeNode<T> | undefined {
    const { parent } = this;
    if (!parent) {
      return undefined;
    }

    const { parent: grandParent } = parent;
    if (!grandParent) {
      return undefined;
    }

    const { left, right } = grandParent;
    if (!left || !right) {
      return undefined;
    }

    return equal(parent, left) ? right : left;
  }

  setValue(value: T | null): IBaseNode<T> {
    this.value = value;
    return this;
  }

  setLeft(node: IBaseNode<T> | null): IBaseNode<T> {
    if (this.left) {
      this.left.parent = null;
    }

    this.left = node;

    if (this.left) {
      this.left.parent = this;
    }

    return this;
  }

  setRight(node: IBaseNode<T> | null): IBaseNode<T> {
    if (this.right) {
      this.right.parent = null;
    }

    this.right = node;

    if (this.right) {
      this.right.parent = this;
    }

    return this;
  }

  removeChild(node: IBaseNode<T> | null): boolean {
    if (this.left && equal(this.left, node)) {
      this.left = null;
      return true;
    }

    if (this.right && equal(this.right, node)) {
      this.right = null;
      return true;
    }

    return false;
  }

  replaceChild(
    target: IBaseNode<T> | null,
    replacement: IBaseNode<T> | null
  ): boolean {
    if (!target || !replacement) {
      return false;
    }

    if (this.left && equal(this.left, target)) {
      this.left = replacement;
      return true;
    }

    if (this.right && equal(this.right, target)) {
      this.right = replacement;
      return true;
    }

    return false;
  }

  static copyNode<T extends number>(
    source: BinaryTreeNode<T> | null,
    target: BinaryTreeNode<T> | null
  ): void {
    if (!source || !target) return;

    target.setValue(source.value as T);
    target.setLeft(source.left);
    target.setRight(source.right);
  }

  traverseInOrder(): (T | null)[] {
    let traverse: (T | null)[] = [];

    if (this.left) {
      traverse = [...traverse, ...this.left.traverseInOrder()];
    }

    traverse.push(this.value);

    if (this.right) {
      traverse = [...traverse, ...this.right.traverseInOrder()];
    }

    return traverse;
  }

  toString(): string {
    return this.traverseInOrder().toString();
  }
}

class BinarySearchTreeNode<T extends number>
  extends BinaryTreeNode<T>
  implements IBaseNode<T>
{
  declare left: BinarySearchTreeNode<T> | null;
  declare right: BinarySearchTreeNode<T> | null;
  declare parent: BinarySearchTreeNode<T> | null;

  constructor(value: T | null = null) {
    super(value);
  }

  insert(value: T | null): BinarySearchTreeNode<T> {
    if (this.value === null) {
      this.value = value;
      return this;
    }

    if (value === null) {
      return this;
    }

    if (value < this.value) {
      if (this.left) {
        return this.left.insert(value);
      }

      const newNode = new BinarySearchTreeNode<typeof value>(value);
      this.setLeft(newNode);

      return newNode;
    }

    if (value > this.value) {
      if (this.right) {
        return this.right.insert(value);
      }

      const newNode = new BinarySearchTreeNode<typeof value>(value);
      this.setRight(newNode);

      return newNode;
    }

    return this;
  }

  find(value: T): BinarySearchTreeNode<T> | null {
    if (this.value === value) {
      return this;
    }

    if (this.value === null) {
      return null;
    }

    if (value < this.value && this.left) {
      return this.left.find(value);
    }

    if (value > this.value && this.right) {
      return this.right.find(value);
    }

    return null;
  }

  contains(value: T): boolean {
    return !!this.find(value);
  }

  remove(value: T): boolean {
    const nodeToRemove = this.find(value);

    if (!nodeToRemove) {
      throw new Error(`Item not found in the tree`);
    }

    const { parent } = nodeToRemove;

    if (!nodeToRemove.left && !nodeToRemove.right) {
      if (parent) {
        parent.removeChild(nodeToRemove);
      } else {
        nodeToRemove.setValue(null);
      }
    } else if (nodeToRemove.left && nodeToRemove.right) {
      const nextBiggerNode = nodeToRemove.right.findMin();
      if (nextBiggerNode.value !== nodeToRemove.right.value) {
        this.remove(nextBiggerNode.value as T);
        nodeToRemove.setValue(nextBiggerNode.value);
      } else {
        nodeToRemove.setValue(nodeToRemove.right.value);
        nodeToRemove.setRight(nodeToRemove.right.right);
      }
    } else {
      const childNode = nodeToRemove.left || nodeToRemove.right;

      if (parent) {
        parent.replaceChild(nodeToRemove, childNode);
      } else {
        BinaryTreeNode.copyNode(childNode, nodeToRemove);
      }
    }

    nodeToRemove.parent = null;
    return true;
  }

  findMin(): BinarySearchTreeNode<T> {
    if (!this.left) {
      return this;
    }

    return this.left.findMin();
  }
}

export class BinarySearchTree<T extends number> {
  root: BinarySearchTreeNode<T>;

  constructor() {
    this.root = new BinarySearchTreeNode<T>(null);
  }

  insert(value: T | null): BinarySearchTreeNode<T> {
    return this.root.insert(value);
  }

  contains(value: T): boolean {
    return this.root.contains(value);
  }

  remove(value: T): boolean {
    return this.root.remove(value);
  }

  toString(): string {
    return this.root.toString();
  }
}

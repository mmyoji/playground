// see: https://github.com/trekhleb/javascript-algorithms/tree/master/src/data-structures/hash-table

import { LinkedList } from "./linked-list.ts";

const DEFAULT_HASH_TABLE_SIZE = 32;

export class HashTable<T> {
  #buckets: LinkedList<{ key: string; value: T }>[];
  #keys: { [key: string]: number };

  constructor(tableSize: number = DEFAULT_HASH_TABLE_SIZE) {
    this.#buckets = Array(tableSize)
      .fill(null)
      .map(() => new LinkedList<{ key: string; value: T }>());

    this.#keys = {};
  }

  hash(key: string): number {
    const hash = Array.from(key).reduce((acc, k) => acc + k.charCodeAt(0), 0);
    return hash % this.#buckets.length;
  }

  get(key: string): T | undefined {
    const list = this.#buckets[this.hash(key)];
    const node = list.find((n) => n.value.key === key);
    return node ? node.value.value : undefined;
  }

  set(key: string, value: T): void {
    const keyHash = this.hash(key);
    this.#keys[key] = keyHash;

    const list = this.#buckets[keyHash];
    const node = list.find((n) => n.value.key === key);

    if (!node) {
      list.append({ key, value });
    } else {
      node.value.value = value;
    }
  }

  delete(key: string): T | null {
    const keyHash = this.hash(key);
    delete this.#keys[key];

    const list = this.#buckets[keyHash];
    const node = list.find((n) => n.value.key === key);

    if (node) {
      const deleted = list.delete(node.value, (a, b) => a.key === b.key);
      return deleted ? deleted.value.value : null;
    }

    return null;
  }
}

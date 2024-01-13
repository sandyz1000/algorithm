/* 
## 862

======
Task.

Return the length of the shortest, non-empty, contiguous subarray of A with sum at least K.
If there is no non-empty subarray with sum at least K, return -1.

Example 1:
----------
Input: A = [1], K = 1
Output: 1

Example 2:
----------
Input: A = [1,2], K = 4
Output: -1

Example 3:
----------
Input: A = [2,-1,2], K = 3
Output: 3
 

Note:
=====
1 <= A.length <= 50000
-10 ^ 5 <= A[i] <= 10 ^ 5
1 <= K <= 10 ^ 9

 */


import { Deque } from "datastructures-js";

export class Item {
  constructor(public value: number, public index: number) {}
}

class IMQ {
  private q: Deque<Item> = new Deque<Item>();
  private min: number = Number.MAX_SAFE_INTEGER;
  private K: number;

  constructor(K: number) {
    this.K = K;
  }

  push(newItem: Item): void {
    while (this.q.size() !== 0 && newItem.value < this.q.back().value) {
      this.q.popBack();
    }

    while (this.q.size() !== 0 && newItem.value - this.q.front().value >= this.K) {
      this.min = Math.min(this.min, newItem.index - this.q.front().index);
      this.q.popFront();
    }

    this.q.pushBack(newItem);
  }

  getMin(): number {
    return this.min !== Number.MAX_SAFE_INTEGER ? this.min : -1;
  }
}

function shortestSubarray(A: number[], K: number): number {
  const q = new IMQ(K);
  q.push(new Item(0, -1));

  for (let i = 0; i < A.length; i++) {
    A[i] = i > 0 ? A[i] + A[i - 1] : A[0];
    q.push(new Item(A[i], i));
  }

  return q.getMin();
}

if (require.main === module) {
    const A: number[] = [2, -1, 2];
    const K: number = 3;
    console.log("Shortest sum sub-array:", shortestSubarray(A, K));
}

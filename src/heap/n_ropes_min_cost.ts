/* 
Connect n ropes with minimum cost

There are given n ropes of different lengths, we need to connect these ropes into one rope.
The cost to connect two ropes is equal to sum of their lengths. We need to connect the ropes
with minimum cost.

For example if we are given 4 ropes of lengths 4, 3, 2 and 6. We can connect the ropes in
following ways.
1) First connect ropes of lengths 2 and 3. Now we have three ropes of lengths 4, 6 and 5.
2) Now connect ropes of lengths 4 and 5. Now we have two ropes of lengths 6 and 9.
3) Finally connect the two ropes and all ropes have connected.

Total cost for connecting all ropes is 5 + 9 + 15 = 29. This is the optimized cost for connecting
ropes. Other ways of connecting ropes would always have same or more cost.

Example:
If we connect 4 and 6 first (we get three strings of 3, 2 and 10), then connect 10 and 3 (we get
two strings of 13 and 2). Finally we connect 13 and 2. Total cost in this way is 10 + 13 + 15 = 38.

If we observe the above problem closely, we can notice that the lengths of the ropes which
are picked first are included more than once in total cost. Therefore, the idea is to connect
smallest two ropes first and recur for remaining ropes. This approach is similar to Huffman
Coding. We put smallest ropes down the tree so that they can be repeated multiple times
rather than the longer ropes.

Following is complete algorithm for finding the minimum cost for connecting n ropes.
Let there be n ropes of lengths stored in an array len[0..n-1]
1)  Create a min heap and insert all lengths into the min heap.
2)  Do following while number of elements in min heap is not one.
    a) Extract the minimum and second minimum from min heap
    b) Add the above two extracted values and insert the added value to the min-heap.
3)  Return the value of only left item in min heap.

Time Complexity: Time complexity of the algorithm is O(nLogn) assuming that we use a O(nLogn)
sorting algorithm. Note that heap operations like insert and extract take O(Logn) time.

Algorithmic Paradigm: Greedy Algorithm

 */

export class MinHeap {
  size: number;
  capacity: number;
  harr: number[];

  constructor(capacity: number) {
    this.size = 0;
    this.capacity = capacity;
    this.harr = new Array(capacity).fill(0);
  }

  static minHeapify(minHeap: MinHeap, idx: number): void {
    let smallest = idx;
    const left = 2 * idx + 1;
    const right = 2 * idx + 2;

    if (left < minHeap.size && minHeap.harr[left] < minHeap.harr[smallest]) {
      smallest = left;
    }

    if (right < minHeap.size && minHeap.harr[right] < minHeap.harr[smallest]) {
      smallest = right;
    }

    if (smallest !== idx) {
      [minHeap.harr[smallest], minHeap.harr[idx]] = [minHeap.harr[idx], minHeap.harr[smallest]];
      MinHeap.minHeapify(minHeap, smallest);
    }
  }

  static is_size_one(minHeap: MinHeap): boolean {
    return minHeap.size === 1;
  }

  static extract_min(minHeap: MinHeap): number {
    const temp = minHeap.harr[0];
    minHeap.harr[0] = minHeap.harr[minHeap.size - 1];
    minHeap.size -= 1;
    MinHeap.minHeapify(minHeap, 0);
    return temp;
  }

  static insert_min_heap(minHeap: MinHeap, val: number): void {
    minHeap.size += 1;
    let i = minHeap.size - 1;
    while (i && val < minHeap.harr[(i - 1) / 2]) {
      minHeap.harr[i] = minHeap.harr[(i - 1) / 2];
      i = (i - 1) / 2;
    }
    minHeap.harr[i] = val;
  }

  static build_min_heap(minHeap: MinHeap): void {
    const n = minHeap.size - 1;
    for (let i = (n - 1) / 2; i >= 0; i--) {
      MinHeap.minHeapify(minHeap, i);
    }
  }

  static create_and_build_min_heap(arr: number[], size: number): MinHeap {
    const minHeap = new MinHeap(size);
    for (let i = 0; i < size; i++) {
      minHeap.harr[i] = arr[i];
    }
    minHeap.size = size;
    MinHeap.build_min_heap(minHeap);
    return minHeap;
  }

  static min_cost(arr: number[], n: number): number {
    let cost = 0;

    const minHeap = MinHeap.create_and_build_min_heap(arr, n);

    while (!MinHeap.is_size_one(minHeap)) {
      const minimum = MinHeap.extract_min(minHeap);
      const secMin = MinHeap.extract_min(minHeap);
      cost += minimum + secMin;
      MinHeap.insert_min_heap(minHeap, minimum + secMin);
    }

    return cost;
  }
}

if (require.main === module) {
  const arr = [4, 3, 2, 6];
  const size = arr.length;
  console.log(`Total cost for connecting ropes is ${MinHeap.min_cost(arr, size)}`);
}

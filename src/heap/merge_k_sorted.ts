/* Given k sorted arrays of size n each, merge them and print the sorted output.

Input:
k = 3, n =  4
arr = [[1, 3, 5, 7],
       [2, 4, 6, 8],
       [0, 9, 10, 11]]

Output:
0 1 2 3 4 5 6 7 8 9 10 11

A simple solution is to create an output array of size n*k and one by one copy all arrays to it.
Finally, sort the output array using any O(nLogn) sorting algorithm.

Time Complexity:
The main step is 3rd step, the loop runs n*k times. In every iteration of loop, we call heapify
which takes O(Logk) time. Therefore, the time complexity is O(nk Logk).

TypeScript program to merge k sorted arrays of size n each.
""" */

export class MinHeapNode {
  element: number;
  i: number;
  j: number;

  constructor(element: number, i: number, j: number) {
    this.element = element;
    this.i = i;
    this.j = j;
  }
}

export class MinHeap {
  harr: MinHeapNode[];
  heap_size: number;

  constructor(arr: MinHeapNode[], size: number) {
    this.harr = arr;
    this.heap_size = size;
    let i = Math.floor((this.heap_size - 1) / 2);
    while (i >= 0) {
      this.min_heapify(i);
      i--;
    }
  }

  min_heapify(i: number): void {
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    let smallest = i;

    if (left < this.heap_size && this.harr[left].element < this.harr[i].element) {
      smallest = left;
    }

    if (right < this.heap_size && this.harr[right].element < this.harr[smallest].element) {
      smallest = right;
    }

    if (smallest !== i) {
      [this.harr[i], this.harr[smallest]] = [this.harr[smallest], this.harr[i]];
      this.min_heapify(smallest);
    }
  }

  replace_min(x: MinHeapNode): void {
    this.harr[0] = x;
    this.min_heapify(0);
  }

  get_min(): MinHeapNode {
    return this.harr[0];
  }

  static merge_k_arrays(arr: number[][], k: number): number[] {
    const n = arr[0].length;
    const output: number[] = new Array(n * k).fill(0);

    const harr: MinHeapNode[] = Array.from({ length: k }, (val, i) => new MinHeapNode(arr[i][0], i, 1));

    const hp = new MinHeap(harr, k);

    for (let count = 0; count < n * k; count++) {
      const root = hp.get_min();
      output[count] = root.element;

      if (root.j < n) {
        root.element = arr[root.i][root.j];
        root.j += 1;
      } else {
        root.element = Number.MAX_SAFE_INTEGER;
      }

      hp.replace_min(root);
    }

    return output;
  }
}

if (require.main === module) {

  // Example usage
  const arr: number[][] = [
    [2, 6, 12, 34],
    [1, 9, 20, 1000],
    [23, 34, 90, 2000]
  ];

  const k = arr.length;
  const output = MinHeap.merge_k_arrays(arr, k);

  console.log("Merged array is \n");
  console.log(output);

} 
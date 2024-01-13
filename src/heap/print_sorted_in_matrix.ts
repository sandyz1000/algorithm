/* """
Print all elements in sorted order from row and column wise sorted matrix

Given an n x n matrix, where every row and column is sorted in non-decreasing order.
Print all elements of matrix in sorted order.

==Example:==
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Input: mat = [{10, 20, 30, 40},
             {15, 25, 35, 45},
             {27, 29, 37, 48},
             {32, 33, 39, 50}]

Output: 10 15 20 25 27 29 30 32 33 35 37 39 40 45 48 50
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

"""
 */


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
  heap_size: number;
  harr: MinHeapNode[];

  constructor(a: MinHeapNode[], size: number) {
    this.heap_size = size;
    this.harr = a;
    let i = Math.floor((this.heap_size - 1) / 2);
    while (i >= 0) {
      this.min_heapify(i);
      i -= 1;
    }
  }

  min_heapify(i: number): void {
    const l = this.left(i);
    const r = this.right(i);
    let smallest = i;

    if (l < this.heap_size && this.harr[l].element < this.harr[i].element) {
      smallest = l;
    }

    if (r < this.heap_size && this.harr[r].element < this.harr[smallest].element) {
      smallest = r;
    }

    if (smallest !== i) {
      [this.harr[i], this.harr[smallest]] = [this.harr[smallest], this.harr[i]];
      this.min_heapify(smallest);
    }
  }

  left(i: number): number {
    return 2 * i + 1;
  }

  right(i: number): number {
    return 2 * i + 2;
  }

  getMin(): MinHeapNode {
    return this.harr[0];
  }

  replaceMin(x: MinHeapNode): void {
    this.harr[0] = x;
    this.min_heapify(0);
  }

  static print_sorted(mat: number[][]): void {
    const N = mat.length;
    const harr = mat.map((row, i) => new MinHeapNode(row[0], i, 1));
    const hp = new MinHeap(harr, N);

    for (let count = 0; count < N * N; count++) {
      const root = hp.getMin();
      console.log(root.element, end = " ");

      if (root.j < N) {
        root.element = mat[root.i][root.j];
        root.j += 1;
      } else {
        root.element = Number.MAX_SAFE_INTEGER;
      }

      hp.replaceMin(root);
    }
  }
}

// Example usage
const mat = [
  [10, 20, 30, 40],
  [15, 25, 35, 45],
  [27, 29, 37, 48],
  [32, 33, 39, 50],
];
MinHeap.print_sorted(mat);


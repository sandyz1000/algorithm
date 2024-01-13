/* 
Kth smallest element in a row-wise and column-wise sorted 2D array | Set 1
Given an n x n matrix, where every row and column is sorted in non-decreasing order.
Find the kth smallest element in the given 2D array.

For example, consider the following 2D array.

        10, 20, 30, 40
        15, 25, 35, 45
        24, 29, 37, 48
        32, 33, 39, 50
The 3rd smallest element is 20 and 7th smallest element is 30

# kth largest element in a 2d array sorted row-wise and column-wise
# A structure to store an entry of heap. The entry contains a value from 2D array,
# row and column numbers of the value


*/


export const INT_MAX = 999999999;

export class HeapNode {
    constructor(public value: number, public r: number | null = null, public c: number | null = null) {}
}

function minHeapify(harr: HeapNode[], i: number, heapSize: number): void {
    const left = i * 2 + 1;
    const right = i * 2 + 2;
    let smallest = i;

    if (left < heapSize && harr[left].value < harr[smallest].value) {
        smallest = left;
    }

    if (right < heapSize && harr[right].value < harr[smallest].value) {
        smallest = right;
    }

    if (smallest !== i) {
        [harr[i], harr[smallest]] = [harr[smallest], harr[i]];
        minHeapify(harr, smallest, heapSize);
    }
}

function buildHeap(harr: HeapNode[], n: number): void {
    for (let i = Math.floor((n - 1) / 2); i >= 0; i--) {
        minHeapify(harr, i, n);
    }
}

function kthSmallest(mat: number[][], n: number, k: number): number {
    if (k <= 0 || k > n * n) {
        return INT_MAX;
    }

    const harr: HeapNode[] = [];
    for (let i = 0; i < n; i++) {
        harr.push(new HeapNode(mat[0][i], 0, i));
    }

    buildHeap(harr, n);

    for (let i = 0; i < k; i++) {
        const hr = harr[0];
        const nextVal = hr.r !== null && hr.r < n - 1 ? mat[hr.r + 1][hr.c!] : INT_MAX;
        harr[0] = new HeapNode(nextVal, hr.r !== null ? hr.r + 1 : null, hr.c);
        minHeapify(harr, 0, n);
    }

    return harr[0].value;
}

if (require.main === module) {
    const mat: number[][] = [
        [10, 20, 30, 40],
        [15, 25, 35, 45],
        [24, 29, 37, 48],
        [32, 33, 39, 50]
    ];
    console.log(`${3}th smallest element is ${kthSmallest(mat, 4, 3)}`);
    console.log(`${7}th smallest element is ${kthSmallest(mat, 4, 7)}`);
}

/* """
Sort a nearly sorted (or K sorted) array

Given an array of n elements, where each element is at most k away from its target position, devise
an algorithm that sorts in O(n log k) time.

Example:
Let us consider k is 2, an element at index 7 in the sorted array, can be at indexes
5, 6, 7, 8, 9 in the given array.

Other Example:
Input : arr[] = {6, 5, 3, 2, 8, 10, 9}
        k = 3 
Output : arr[] = {2, 3, 5, 6, 8, 9, 10}

Input : arr[] = {10, 9, 8, 7, 4, 70, 60, 50}
        k = 4
Output : arr[] = {4, 7, 8, 9, 10, 50, 60, 70}

The Min Heap based method takes O(nLogk) time and uses O(k) auxiliary space.


We can use Insertion Sort to sort the elements efficiently.
Following is the Python code for standard Insertion Sort.

The inner loop will run at most k times. To move every element to its correct place,
at most k elements need to be moved. So overall complexity will be O(nk)


We can sort such arrays more efficiently with the help of Heap data structure.
    Following is the detailed process that uses Heap.
    1) Create a Min Heap of size k+1 with first k+1 elements. This will take O(k) time
      (See this GFact)
    2) One by one remove min element from heap, put it in result array, and add a new element to
      heap from remaining elements.

    Removing an element and adding a new element to min heap will take Logk time.
    So overall complexity will be O(k) + O((n-k)*logK)

    The Min Heap based method takes O(nLogk) time and uses O(k) auxiliary space.

    ---------------------------------------------------------------------------------------
    We can also use a Balanced Binary Search Tree instead of Heap to store K+1 elements. The
    insert and delete operations on Balanced BST also take O(Logk) time. So Balanced BST based
    method will also take O(nLogk) time, but the Heap based method seems to be more efficient as
    the minimum element will always be at root. Also, Heap doesn't need extra space for left and
    right pointers.


*/

export class MinHeap {
    harr: number[];
    heap_size: number;

    constructor(arr: number[], size: number) {
        this.harr = arr;
        this.heap_size = size;

        for (let i = Math.floor((this.heap_size - 1) / 2); i >= 0; i--) {
            this.minHeapify(i);
        }
    }

    minHeapify(i: number): void {
        const l: number = this.left(i);
        const r: number = this.right(i);
        let smallest: number = i;

        if (l < this.heap_size && this.harr[l] < this.harr[i]) {
            smallest = l;
        }

        if (r < this.heap_size && this.harr[r] < this.harr[smallest]) {
            smallest = r;
        }

        if (smallest !== i) {
            [this.harr[i], this.harr[smallest]] = [this.harr[smallest], this.harr[i]];
            this.minHeapify(smallest);
        }
    }

    left(i: number): number {
        return 2 * i + 1;
    }

    right(i: number): number {
        return 2 * i + 2;
    }

    replaceMin(x: number): number {
        const root: number = this.harr[0];
        this.harr[0] = x;

        if (root < x) {
            this.minHeapify(0);
        }

        return root;
    }

    extractMin(): number {
        const root: number = this.harr[0];

        if (this.heap_size > 1) {
            this.harr[0] = this.harr[this.heap_size - 1];
            this.heap_size--;
            this.minHeapify(0);
        }

        return root;
    }

    static sortK(arr: number[], n: number, k: number): void {
        const harr: number[] = new Array(k + 1).fill(0);
        let i: number = 0;

        while (i <= k && i < n) {
            harr[i] = arr[i];
            i++;
        }

        const hp: MinHeap = new MinHeap(harr, k + 1);

        let ti: number = 0;
        i = k + 1;

        while (ti < n) {
            if (i < n) {
                arr[ti] = hp.replaceMin(arr[i]);
            } else {
                arr[ti] = hp.extractMin();
            }

            i++;
            ti++;
        }
    }
}

function insertionSort(A: number[], size: number): void {
    for (let i = 1; i < size; i++) {
        const key: number = A[i];
        let j: number = i - 1;

        while (j >= 0 && A[j] > key) {
            A[j + 1] = A[j];
            j = j - 1;
        }

        A[j + 1] = key;
    }
}

if (require.main === module) {
    const k: number = 3;
    const arr: number[] = [2, 6, 3, 12, 56, 8];
    const n: number = arr.length;

    MinHeap.sortK(arr, n, k);

    console.log("Following is sorted array:");
    console.log(arr);
}

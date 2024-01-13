/* """
K'th Smallest/Largest Element in Unsorted Array | Set 1

http://www.geeksforgeeks.org/kth-smallestlargest-element-unsorted-array/

Given an array and a number k where k is smaller than size of array, we need to find the k'th
smallest element in the given array. It is given that all array elements are distinct.

Examples:

Input: arr = [7, 10, 4, 3, 20, 15], k = 3
Output: 7

Input: arr = [7, 10, 4, 3, 20, 15], k = 4
Output: 10


*/

import * as DataStructures from 'datastructures-js';

const INT_MAX = Number.MAX_SAFE_INTEGER;

export class MaxHeapCustom {
    harr: number[];
    capacity: number;
    heap_size: number;

    constructor(a: number[], size: number) {
        this.harr = a;
        this.capacity = 0;
        this.heap_size = size;

        let i = Math.floor((this.heap_size - 1) / 2);
        while (i >= 0) {
            this.max_heapify(i);
            i--;
        }
    }

    parent(i: number): number {
        return Math.floor((i - 1) / 2);
    }

    left(i: number): number {
        return 2 * i + 1;
    }

    right(i: number): number {
        return 2 * i + 2;
    }

    get_max(): number {
        return this.harr[0];
    }

    replace_max(x: number): void {
        this.harr[0] = x;
        this.max_heapify(0);
    }

    extract_max(): number {
        if (this.heap_size === 0) {
            return INT_MAX;
        }

        const root = this.harr[0];

        if (this.heap_size > 1) {
            this.harr[0] = this.harr[this.heap_size - 1];
            this.max_heapify(0);
        }
        this.heap_size--;

        return root;
    }

    max_heapify(i: number): void {
        const left = this.left(i);
        const right = this.right(i);
        let largest = i;

        if (left < this.heap_size && this.harr[left] > this.harr[i]) {
            largest = left;
        }

        if (right < this.heap_size && this.harr[right] > this.harr[largest]) {
            largest = right;
        }

        if (largest !== i) {
            [this.harr[i], this.harr[largest]] = [this.harr[largest], this.harr[i]];
            this.max_heapify(largest);
        }
    }
}

export class MinHeapCustom {
    harr: number[];
    capacity: number;
    heap_size: number;

    constructor(a: number[], size: number) {
        this.harr = a;
        this.capacity = 0;
        this.heap_size = size;

        let i = Math.floor((this.heap_size - 1) / 2);
        while (i >= 0) {
            this.min_heapify(i);
            i--;
        }
    }

    left(i: number): number {
        return 2 * i + 1;
    }

    right(i: number): number {
        return 2 * i + 2;
    }

    getMin(): number {
        return this.harr[0];
    }

    extract_min(): number {
        if (this.heap_size === 0) {
            return INT_MAX;
        }

        const root = this.harr[0];

        if (this.heap_size > 1) {
            this.harr[0] = this.harr[this.heap_size - 1];
            this.min_heapify(0);
        }

        this.heap_size--;
        return root;
    }

    min_heapify(i: number): void {
        const l = this.left(i);
        const r = this.right(i);
        let smallest = i;

        if (l < this.heap_size && this.harr[l] < this.harr[i]) {
            smallest = l;
        }

        if (r < this.heap_size && this.harr[r] < this.harr[smallest]) {
            smallest = r;
        }

        if (smallest !== i) {
            [this.harr[i], this.harr[smallest]] = [this.harr[smallest], this.harr[i]];
            this.min_heapify(smallest);
        }
    }
}

class MaxHeapObj{
    val: number;

    constructor(val: number) {
        this.val = val;
    }

    lt(other: { val: number }): boolean {
        return this.val > other.val;
    }

    eq(other: { val: number }): boolean {
        return this.val === other.val;
    }

    toString(): string {
        return String(this.val);
    }
};

export class MaxHeap {

    heap: { val: number }[];

    constructor(arr: number[], k: number) {
        this.heap = [];
        for (let i = 0; i < k; i++) {
            this.heap.push(new MaxHeapObj(arr[i]));
        }
        DataStructures.Heap.heapify(this.heap);
    }

    parent(i: number): number {
        return Math.floor((i - 1) / 2);
    }

    insert_key(k: number): void {
        DataStructures.Heap.heappush(this.heap, new MaxHeapObj(k));
    }

    increase_key(i: number, new_val: number): void {
        this.heap[i] = new MaxHeapObj(new_val);
        while (i !== 0 && this.heap[this.parent(i)].val < this.heap[i].val) {
            [this.heap[i], this.heap[this.parent(i)]] = [this.heap[this.parent(i)], this.heap[i]];
            i = this.parent(i);
        }
    }

    extract_max(): number {
        return DataStructures.Heap.heappop(this.heap).val;
    }

    delete_key(i: number): void {
        this.increase_key(i, Number.POSITIVE_INFINITY);
        this.extract_max();
    }
}

export class MinHeap {
    heap: number[];

    constructor(arr: number[], k: number) {
        this.heap = [];
        for (let i = 0; i < k; i++) {
            this.heap.push(arr[i]);
        }
        DataStructures.Heap.heapify(this.heap);
    }

    parent(i: number): number {
        return Math.floor((i - 1) / 2);
    }

    insert_key(k: number): void {
        DataStructures.Heap.heappush(this.heap, k);
    }

    decrease_key(i: number, new_val: number): void {
        this.heap[i] = new_val;
        while (i !== 0 && this.heap[this.parent(i)] > this.heap[i]) {
            [this.heap[i], this.heap[this.parent(i)]] = [this.heap[this.parent(i)], this.heap[i]];
            i = this.parent(i);
        }
    }

    extract_min(): number {
        return DataStructures.Heap.heappop(this.heap);
    }

    delete_key(i: number): void {
        this.decrease_key(i, Number.NEGATIVE_INFINITY);
        this.extract_min();
    }

    get_min(): number {
        return this.heap[0];
    }
}

export class KSmallestUnsorted {
    kth_smallest_method1(arr: number[], n: number, k: number): number {
        arr.sort();
        return arr[k - 1];
    }

    kth_smallest_method2(arr: number[], n: number, k: number): number {
        const mh = new MinHeapCustom(arr, n);

        for (let i = 0; i < k - 1; i++) {
            mh.extract_min();
        }
        return mh.getMin();
    }

    kth_smallest_method3(arr: number[], n: number, k: number): number {
        const mh = new MaxHeapCustom(arr, k);

        for (let i = k; i < n; i++) {
            if (arr[i] < mh.get_max()) {
                mh.replace_max(arr[i]);
            }
        }

        return mh.get_max();
    }

    kth_smallest_method4(arr: number[], l: number, r: number, k: number): number {
        if (0 < k && k <= r - l + 1) {
            const pos = this.partition(arr, l, r);

            if (pos - l === k - 1) {
                return arr[pos];
            }

            if (pos - l > k - 1) {
                return this.kth_smallest_method4(arr, l, pos - 1, k);
            }

            return this.kth_smallest_method4(arr, pos + 1, r, k - 1 - (pos - l));
        }

        return INT_MAX;
    }

    partition(arr: number[], left: number, right: number): number {
        const x = arr[right];
        let i = left;

        for (let j = left; j < right; j++) {
            if (arr[j] <= x) {
                [arr[i], arr[j]] = [arr[j], arr[i]];
                i++;
            }
        }

        [arr[i], arr[right]] = [arr[right], arr[i]];
        return i;
    }
}

if (require.main === module) {
    // Test
    const test = new KSmallestUnsorted();
    const arr = [12, 3, 5, 7, 4, 19, 26];
    let n = arr.length;
    let k = 3;
    console.log(`K'th smallest element is ${test.kth_smallest_method1(arr, n, k)}`);
    
    const arr2 = [12, 3, 5, 7, 4, 19, 26];
    n = arr2.length;
    k = 3;
    console.log(`K'th smallest element is ${test.kth_smallest_method2(arr2, n, k)}`);
    
    const arr3 = [12, 3, 5, 7, 4, 19, 26];
    n = arr3.length;
    k = 3;
    console.log(`K'th smallest element is ${test.kth_smallest_method3(arr3, n, k)}`);
    
    const arr4 = [12, 3, 5, 7, 4, 19, 26];
    n = arr4.length;
    k = 3;
    console.log(`K'th smallest element is ${test.kth_smallest_method4(arr4, 0, n - 1, k)}`);
}

/* """
A typical recursive Python implementation of QuickSort

------------------------------------------------
Discussion:
------------------------------------------------
The recursion method can be optimized in many ways:

1) The above implementation uses last index as pivot. This causes worst-case behavior on already
sorted arrays, which is a commonly occurring case. The problem can be solved by choosing either a
random index for the pivot, or choosing the middle index of the partition or choosing the median
of the first, middle and last element of the partition for the pivot. (See this for details)

2) To reduce the recursion depth, recur first for the smaller half of the array, and use a tail
call to recurse into the other.

3) Insertion sort works better for small subarrays. Insertion sort can be used for invocations on
such small arrays (i.e. where the length is less than a threshold t determined experimentally).
For example, this library implementation of qsort uses insertion sort below size 7. 


*/

class Stack {
    private top: number;
    private capacity: number;
    private arr: number[];

    constructor(capacity: number) {
        this.top = -1;
        this.capacity = capacity;
        this.arr = new Array<number>(capacity);
    }

    isFull(): boolean {
        return this.top === this.capacity - 1;
    }

    isEmpty(): boolean {
        return this.top === -1;
    }

    push(item: number): void {
        if (this.isFull()) {
            throw new Error("Cannot push element to full stack");
        }
        this.arr[++this.top] = item;
    }

    pop(): number {
        if (this.isEmpty()) {
            throw new Error("Cannot pop empty stack");
        }
        const temp: number = this.arr[this.top];
        this.arr[this.top--] = -1;
        return temp;
    }

    peek(): number {
        return this.arr[this.top];
    }
}

function partition(arr: number[], low: number, high: number): number {
    const pivot: number = arr[high];
    let i: number = low - 1;

    for (let j = low; j < high; j++) {
        if (arr[j] <= pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }

    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    return i + 1;
}

function quickSort(arr: number[], low: number, high: number): void {
    if (low < high) {
        const pi: number = partition(arr, low, high);

        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}

function partition2(arr: number[], l: number, h: number): number {
    const x: number = arr[h];
    let i: number = l - 1;

    for (let j = l; j < h; j++) {
        if (arr[j] <= x) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }

    [arr[i + 1], arr[h]] = [arr[h], arr[i + 1]];
    return i + 1;
}

function quickSortIterative(arr: number[], l: number, h: number): void {
    const size: number = h - l + 1;
    const stack: Stack = new Stack(size);

    stack.push(l);
    stack.push(h);

    while (!stack.isEmpty()) {
        h = stack.pop();
        l = stack.pop();

        const p: number = partition2(arr, l, h);

        if (p - 1 > l) {
            stack.push(l);
            stack.push(p - 1);
        }

        if (p + 1 < h) {
            stack.push(p + 1);
            stack.push(h);
        }
    }
}

if (require.main === module) {
    const arr: number[] = [4, 3, 5, 2, 1, 3, 2, 3];
    const n: number = arr.length;

    quickSortIterative(arr, 0, n - 1);
    console.log("Sorted array is:");
    for (let i = 0; i < n; i++) {
        console.log(arr[i]);
    }
}

/* """
Sort numbers stored on different machines
---------------------------------------------
Given N machines. Each machine contains some numbers
in sorted form. But the amount of numbers, each machine has is not fixed. Output the numbers from
all the machine in sorted non-decreasing form.

Example:
Machine M1 contains 3 numbers: {30, 40, 50}
Machine M2 contains 2 numbers: {35, 45}
Machine M3 contains 5 numbers: {10, 60, 70, 80, 100}

Output: {10, 30, 35, 40, 45, 50, 60, 70, 80, 100}

Representation of stream of numbers on each machine is considered as linked list. A Min Heap can
be used to print all numbers in sorted order.

Following is the detailed process

1.  Store the head pointers of the linked lists in a minHeap of size N where N is number of
    machines.
2.  Extract the minimum item from the minHeap. Update the minHeap by replacing the head of the
    minHeap with the next number from the linked list or by replacing the head of the minHeap with
    the last number in the minHeap followed by decreasing the size of heap by 1.
3.  Repeat the above step 2 until heap is not empty. """
 */

export class ListNode {
  data: number;
  nextNode: ListNode | null;

  constructor(data: number) {
    this.data = data;
    this.nextNode = null;
  }
}

export class LinkedList {
  head: ListNode | null;

  constructor() {
    this.head = null;
  }

  push(newData: number): void {
    const newNode = new ListNode(newData);
    newNode.nextNode = this.head;
    this.head = newNode;
  }
}

class MinHeapNode {
  head: ListNode | null;

  constructor(head: ListNode | null) {
    this.head = head;
  }
}

export class MinHeap {
  count: number;
  capacity: number;
  arr: MinHeapNode[];

  constructor(capacity: number) {
    this.count = 0;
    this.capacity = capacity;
    this.arr = Array.from({ length: capacity }, () => new MinHeapNode(null));
  }

  minHeapify(idx: number): void {
    const left = 2 * idx + 1;
    const right = 2 * idx + 2;
    let smallest = idx;

    if (
      left < this.count &&
      this.arr[left].head!.data < this.arr[smallest].head!.data
    ) {
      smallest = left;
    }

    if (
      right < this.count &&
      this.arr[right].head!.data < this.arr[smallest].head!.data
    ) {
      smallest = right;
    }

    if (smallest !== idx) {
      [this.arr[smallest], this.arr[idx]] = [this.arr[idx], this.arr[smallest]];
      this.minHeapify(smallest);
    }
  }

  isEmpty(): boolean {
    return this.count === 0;
  }

  buildMinHeap(): void {
    const n = this.count - 1;
    for (let i = Math.floor((n - 1) / 2); i >= 0; i--) {
      this.minHeapify(i);
    }
  }

  populateMinHeap(arr: LinkedList[], n: number): void {
    for (let i = 0; i < n; i++) {
      this.arr[this.count].head = arr[i].head;
      this.count += 1;
    }

    this.buildMinHeap();
  }

  extractMin(): ListNode | null {
    if (this.isEmpty()) {
      return null;
    }

    const temp = { ...this.arr[0] };
    if (temp.head!.nextNode) {
      this.arr[0].head = temp.head!.nextNode;
    } else {
      this.arr[0] = this.arr[this.count - 1];
      this.count -= 1;
    }

    this.minHeapify(0);
    return temp.head;
  }

  static externalSort(arr: LinkedList[], N: number): void {
    const minHeap = new MinHeap(N);
    minHeap.populateMinHeap(arr, N);

    while (!minHeap.isEmpty()) {
      const temp = minHeap.extractMin();
      if (temp !== null) {
        console.log(`${temp.data} `);
      }
    }
  }
}

if (require.main === module) {
  // Example usage
  const N = 3; // Number of machines
  const arr: LinkedList[] = [];
  
  const llist1 = new LinkedList();
  llist1.push(50);
  llist1.push(40);
  llist1.push(30);
  arr.push(llist1);
  
  const llist2 = new LinkedList();
  llist2.push(45);
  llist2.push(35);
  arr.push(llist2);
  
  const llist3 = new LinkedList();
  llist3.push(100);
  llist3.push(80);
  llist3.push(70);
  llist3.push(60);
  llist3.push(10);
  arr.push(llist3);
  
  MinHeap.externalSort(arr, N);
}

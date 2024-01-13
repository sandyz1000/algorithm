/* """
Design a Data Structure for the following operations. The data structure should be efficient
enough to accommodate the operations according to their frequency.

1)  findMin() : Returns the minimum item.
    Frequency: Most frequent

2)  findMax() : Returns the maximum item.
    Frequency: Most frequent

3)  deleteMin() : Delete the minimum item.
    Frequency: Moderate frequent

4)  deleteMax() : Delete the maximum item.
    Frequency: Moderate frequent

5)  Insert() : Inserts an item.
    Frequency: Least frequent

6)  Delete() : Deletes an item.
    Frequency: Least frequent.

Explanation: 
=============================================
A simple solution is to maintain a sorted array where smallest element is at first position
and largest element is at last. The time complexity of findMin(), findMAx() and deleteMax()
is O(1). But time complexities of deleteMin(), insert() and delete() will be O(n).

Can we do the most frequent two operations in O(1) and other operations in O(Logn) time?.

The idea is to use two binary heaps (one max and one min heap). The main challenge is,
while deleting an item, we need to delete from both min-heap and max-heap. So, we need some
kind of mutual data structure. In the following design, we have used doubly linked list as a
mutual data structure. The doubly linked list contains all input items and indexes of
corresponding min and max heap nodes. The nodes of min and max heaps store addresses of nodes
of doubly linked list. The root node of min heap stores the address of minimum item in doubly
linked list. Similarly, root of max heap stores address of maximum item in doubly linked
list. Following are the details of operations.

1) findMax(): We get the address of maximum value node from root of Max Heap. So this is a
O(1) operation.

1) findMin(): We get the address of minimum value node from root of Min Heap. So this is a
O(1) operation.

3) deleteMin(): We get the address of minimum value node from root of Min Heap. We use this
address to find the node in doubly linked list. From the doubly linked list, we get node of
Max Heap. We delete node from all three. We can delete a node from doubly linked list in O(1)
time. delete() operations for max and min heaps take O(Logn) time.

4) deleteMax(): is similar to deleteMin()

5) Insert() We always insert at the beginning of linked list in O(1) time. Inserting the
address in Max and Min Heaps take O(Logn) time. So overall complexity is O(Logn)

6) Delete() We first search the item in Linked List. Once the item is found in O(n) time,
we delete it from linked list. Then using the indexes stored in linked list, we delete it
from Min Heap and Max Heaps in O(Logn) time. So overall complexity of this operation is O(n).
The Delete operation can be optimized to O(Logn) by using a balanced binary search tree
instead of doubly linked list as a mutual data structure. Use of balanced binary search will
not effect time complexity of other operations as it will act as a mutual data structure like
doubly Linked List.
""" */

const INF = Number.MAX_SAFE_INTEGER;

export class LNode {
    data: number;
    minHeapIndex: number;
    maxHeapIndex: number;
    nextNode?: LNode | null;
    prevNode?: LNode | null;

    constructor(
        data: number,
        minHeapIndex: number,
        maxHeapIndex: number,
        nextNode: LNode | null = null,
        prevNode: LNode | null = null
    ) {
        this.data = data;
        this.minHeapIndex = minHeapIndex;
        this.maxHeapIndex = maxHeapIndex;
        this.nextNode = nextNode;
        this.prevNode = prevNode;
    }
}

class List {
    head: LNode | null;

    constructor(head: LNode | null = null) {
        this.head = head;
    }
}

export class MinHeap {
    size: number;
    capacity: number;
    array: Array<LNode>;

    constructor(capacity: number = 0, size: number = 0, mArray: Array<LNode> = []) {
        this.size = size;
        this.capacity = capacity;
        this.array = mArray;
    }
}

export class MaxHeap {
    size: number;
    capacity: number;
    array: Array<LNode>;

    constructor(capacity: number = 0, size: number = 0, mArray: Array<LNode> = []) {
        this.size = size;
        this.capacity = capacity;
        this.array = mArray;
    }
}

class MyDataStructure {
    minHeap: MinHeap;
    maxHeap: MaxHeap;
    llist: List;

    constructor(capacity: number) {
        this.minHeap = this.createMinHeap(capacity);
        this.maxHeap = this.createMaxHeap(capacity);
        this.llist = this.createList();
    }

    createMaxHeap(capacity: number): MaxHeap {
        const mArray: Array<LNode> = Array.from({ length: capacity }, () => new LNode(null, -1, -1));
        return new MaxHeap(capacity, 0, mArray);
    }

    createMinHeap(capacity: number): MinHeap {
        const mArray: Array<LNode> = Array.from({ length: capacity }, () => new LNode(null, -1, -1));
        return new MinHeap(capacity, 0, mArray);
    }

    createList(): List {
        return new List();
    }

    newLNode(data: number): LNode {
        return new LNode(data, -1, -1);
    }

    isMaxHeapEmpty(): boolean {
        return this.maxHeap.size === 0;
    }

    isMinHeapEmpty(): boolean {
        return this.minHeap.size === 0;
    }

    isMaxHeapFull(): boolean {
        return this.maxHeap.size === this.maxHeap.capacity;
    }

    isMinHeapFull(): boolean {
        return this.minHeap.size === this.minHeap.capacity;
    }

    isListEmpty(): boolean {
        return !this.llist.head;
    }

    hasOnlyOneLNode(): boolean {
        return !this.llist.head?.nextNode && !this.llist.head?.prevNode;
    }

    minHeapify(index: number): void {
        let smallest = index;
        const left = 2 * index + 1;
        const right = 2 * index + 2;

        if (left < this.minHeap.size && this.minHeap.array[left] &&
            this.minHeap.array[left].data < this.minHeap.array[smallest].data) {
            smallest = left;
        }

        if (right < this.minHeap.size && this.minHeap.array[right] &&
            this.minHeap.array[right].data < this.minHeap.array[smallest].data) {
            smallest = right;
        }

        if (smallest !== index) {
            [this.minHeap.array[smallest].minHeapIndex, this.minHeap.array[index].minHeapIndex] =
                [this.minHeap.array[index].minHeapIndex, this.minHeap.array[smallest].minHeapIndex];

            [this.minHeap.array[smallest], this.minHeap.array[index]] =
                [this.minHeap.array[index], this.minHeap.array[smallest]];

            this.minHeapify(smallest);
        }
    }

    maxHeapify(index: number): void {
        let largest = index;
        const left = 2 * index + 1;
        const right = 2 * index + 2;

        if (left < this.maxHeap.size && this.maxHeap.array[left] &&
            this.maxHeap.array[left].data > this.maxHeap.array[largest].data) {
            largest = left;
        }

        if (right < this.maxHeap.size && this.maxHeap.array[right] &&
            this.maxHeap.array[right].data > this.maxHeap.array[largest].data) {
            largest = right;
        }

        if (largest !== index) {
            [this.maxHeap.array[largest].maxHeapIndex, this.maxHeap.array[index].maxHeapIndex] =
                [this.maxHeap.array[index].maxHeapIndex, this.maxHeap.array[largest].maxHeapIndex];

            [this.maxHeap.array[largest], this.maxHeap.array[index]] =
                [this.maxHeap.array[index], this.maxHeap.array[largest]];

            this.maxHeapify(largest);
        }
    }

    insertMinHeap(temp: LNode): void {
        if (this.isMinHeapFull()) {
            return;
        }

        this.minHeap.size += 1;
        let i = this.minHeap.size - 1;

        while (i && temp.data < this.minHeap.array[(i - 1) / 2].data) {
            this.minHeap.array[i] = this.minHeap.array[(i - 1) / 2];
            this.minHeap.array[i].minHeapIndex = i;
            i = (i - 1) / 2;
        }

        this.minHeap.array[i] = temp;
        this.minHeap.array[i].minHeapIndex = i;
    }

    insertMaxHeap(temp: LNode): void {
        if (this.isMaxHeapFull()) {
            return;
        }

        this.maxHeap.size += 1;
        let i = this.maxHeap.size - 1;

        while (i && temp.data > this.maxHeap.array[(i - 1) / 2].data) {
            this.maxHeap.array[i] = this.maxHeap.array[(i - 1) / 2];
            this.maxHeap.array[i].maxHeapIndex = i;
            i = (i - 1) / 2;
        }

        this.maxHeap.array[i] = temp;
        this.maxHeap.array[i].maxHeapIndex = i;
    }

    findMin(): number {
        if (this.isMinHeapEmpty()) {
            return INF;
        }

        return this.minHeap.array[0].data;
    }

    findMax(): number {
        if (this.isMaxHeapEmpty()) {
            return INF;
        }

        return this.maxHeap.array[0].data;
    }

    removeLNode(temp: LNode): void {
        if (this.hasOnlyOneLNode()) {
            this.llist.head = null;
        } else if (!temp.prevNode) {
            this.llist.head = temp.nextNode;
            temp.nextNode.prevNode = null;
        } else {
            temp.prevNode.nextNode = temp.nextNode;
            if (temp.nextNode) {
                temp.nextNode.prevNode = temp.prevNode;
            }
        }
    }

    deleteMax(): void {
        if (this.isMaxHeapEmpty()) {
            return;
        }

        const temp = this.maxHeap.array[0];
        this.maxHeap.array[0] = this.maxHeap.array[this.maxHeap.size - 1];
        this.maxHeap.size -= 1;
        this.maxHeap.array[0].maxHeapIndex = 0;
        this.maxHeapify(0);

        this.minHeap.array[temp.minHeapIndex] = this.minHeap.array[this.minHeap.size - 1];
        this.minHeap.size -= 1;
        this.minHeap.array[temp.minHeapIndex].minHeapIndex = temp.minHeapIndex;
        this.minHeapify(temp.minHeapIndex);

        this.removeLNode(temp);
    }

    deleteMin(): void {
        if (this.isMinHeapEmpty()) {
            return;
        }

        const temp = this.minHeap.array[0];
        this.minHeap.array[0] = this.minHeap.array[this.minHeap.size - 1];
        this.minHeap.size -= 1;
        this.minHeap.array[0].minHeapIndex = 0;
        this.minHeapify(0);

        this.maxHeap.array[temp.maxHeapIndex] = this.maxHeap.array[this.maxHeap.size - 1];
        this.maxHeap.size -= 1;
        this.maxHeap.array[temp.maxHeapIndex].maxHeapIndex = temp.maxHeapIndex;
        this.maxHeapify(temp.maxHeapIndex);

        this.removeLNode(temp);
    }

    insertAtHead(temp: LNode): void {
        if (this.isListEmpty()) {
            this.llist.head = temp;
        } else {
            temp.nextNode = this.llist.head;
            if (this.llist.head) {
                this.llist.head.prevNode = temp;
            }
            this.llist.head = temp;
        }
    }

    delete(item: number): void {
        const minHeap = this.minHeap;
        const maxHeap = this.maxHeap;

        if (this.isListEmpty()) {
            return;
        }

        let temp = this.llist.head;
        while (temp && temp.data !== item) {
            temp = temp.nextNode;
        }

        if (!temp || (temp && temp.data !== item)) {
            return;
        }

        minHeap.array[temp.minHeapIndex] = minHeap.array[minHeap.size - 1];
        minHeap.size -= 1;
        minHeap.array[temp.minHeapIndex].minHeapIndex = temp.minHeapIndex;
        this.minHeapify(temp.minHeapIndex);

        maxHeap.array[temp.maxHeapIndex] = maxHeap.array[maxHeap.size - 1];
        maxHeap.size -= 1;
        maxHeap.array[temp.maxHeapIndex].maxHeapIndex = temp.maxHeapIndex;
        this.maxHeapify(temp.maxHeapIndex);

        this.removeLNode(temp);
    }

    insert(data: number): void {
        const temp = this.newLNode(data);
        this.insertAtHead(temp);
        this.insertMinHeap(temp);
        this.insertMaxHeap(temp);
    }
}

// Code execution starts here
if (require.main === module) {
    const dataStruct = new MyDataStructure(10);

    // Test Case #1
    // myDS.insert(10)
    // myDS.insert(2)
    // myDS.insert(32)
    // myDS.insert(40)
    // myDS.insert(5)

    // Test Case #2
    dataStruct.insert(10);
    dataStruct.insert(20);
    dataStruct.insert(30);
    dataStruct.insert(40);
    dataStruct.insert(50);

    console.log(`Maximum = ${dataStruct.findMax()}\n`);
    console.log(`Minimum = ${dataStruct.findMin()}\n`);

    dataStruct.deleteMax();  // 50 is deleted
    console.log("After deleteMax()\n");
    console.log(`Maximum = ${dataStruct.findMax()}\n`);
    console.log(`Minimum = ${dataStruct.findMin()}\n`);

    dataStruct.deleteMin();  // 10 is deleted
    console.log("After deleteMin()\n");
    console.log(`Maximum = ${dataStruct.findMax()}\n`);
    console.log(`Minimum = ${dataStruct.findMin()}\n`);

    dataStruct.delete(40);  // 40 is deleted
    console.log("After Delete()\n");
    console.log(`Maximum = ${dataStruct.findMax()}\n`);
    console.log(`Minimum = ${dataStruct.findMin()}\n`);
}

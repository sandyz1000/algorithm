
/* http:www.growingwiththeweb.com/data-structures/binomial-heap/overview/

Binomial Heap:
A Binomial Heap is a set of Binomial Trees where each Binomial Tree follows Min Heap property.
And there can be at-most one Binomial Tree of any degree.

Examples Binomial Heap:

12------------10-------------------- 20
             /  \                 /  |  \
           15    50             70  50  40
           |                  / |    |
           30               80  85  65
                            |
                           100

A Binomial Heap with 13 nodes. It is a collection of 3 Binomial Trees of orders 0, 2 and 3
from left to right.

    10-------------------- 20
   /  \                 /  |  \
 15    50             70  50  40
 |                  / |    |
 30               80  85  65
                  |
                 100

A Binomial Heap with 12 nodes. It is a collection of 2 Binomial Trees of orders 2 and 3
from left to right.

Binary Representation of a number and Binomial Heaps

A Binomial Heap with n nodes has number of Binomial Trees equal to the number of set bits in
Binary representation of n. For example let n be 13, there 3 set bits in binary representation of
n (00001101), hence 3 Binomial Trees. We can also relate degree of these Binomial Trees with
positions of set bits. With this relation we can conclude that there are O(Logn) Binomial Trees
in a Binomial Heap with 'n' nodes.

==Operations of Binomial Heap:==
The main operation in Binomial Heap is union(), all other operations mainly use this operation.
The union() operation is to combine two Binomial Heaps into one.
Let us first discuss other operations, we will discuss union later.

1) insert(H, k): Inserts a key 'k' to Binomial Heap 'H'. This operation first creates a Binomial
Heap with single key 'k', then calls union on H and the new Binomial heap.

2) getMin(H): A simple way to getMin() is to traverse the list of root of Binomial Trees and
return the minimum key. This implementation requires O(Logn) time. It can be optimized to O(1) by
maintaining a pointer to minimum key root.

3) extractMin(H): This operation also uses union(). We first call getMin() to find the minimum
key Binomial Tree, then we remove the node and create a new Binomial Heap by connecting all
subtrees of the removed minimum node. Finally we call union() on H and the newly created Binomial
Heap. This operation requires O(Logn) time.

4) delete(H): Like Binary Heap, delete operation first reduces the key to minus infinite, then
calls extractMin().

5) decreaseKey(H): decreaseKey() is also similar to Binary Heap. We compare the decreases key
with it parent and if parent's key is more, we swap keys and recur for parent. We stop when we
either reach a node whose parent has smaller key or we hit the root node. Time complexity of
decreaseKey() is O(Logn).

======Union operation in Binomial Heap:======
Given two Binomial Heaps H1 and H2, union(H1, H2) creates a single Binomial Heap.

1) The first step is to simply merge the two Heaps in non-decreasing order of degrees. In the
following diagram, figure(b) shows the result after merging.

2) After the simple merge, we need to make sure that there is at-most one Binomial Tree of any
order. To do this, we need to combine Binomial Trees of same order. We traverse the list of
merged roots, we keep track of three pointers, prev, x and next-x. There can be following 4 cases
when we traverse the list of roots.

-- Case 1: Orders of x and next-x are not same, we simply move ahead.

In following 3 cases orders of x and next-x are same.
-- Case 2: If order of next-next-x is also same, move ahead.
-- Case 3: If key of x is smaller than or equal to key of next-x, then make next-x as a child of
    x by linking it with x.
-- Case 4: If key of x is greater than or equal to key of next-x, then make x as child of next.

==How to represent Binomial Heap?==
A Binomial Heap is a set of Binomial Trees. A Binomial Tree must be represented in a way that
allows sequential access to all siblings, starting from the leftmost sibling (We need this in and
extractMin() and delete()). The idea is to represent Binomial Trees as leftmost child and
right-sibling representation, i.e., every node stores two pointers, one to the leftmost child and
other to the right sibling.


==Implementation of Binomial Heap==
In previous article, we have discussed about the concepts related to Binomial heap.

Examples Binomial Heap:


12------------10--------------------20
             /  \                 /  | \
           15    50             70  50  40
           |                  / |    |
           30               80  85  65
                            |
                           100

A Binomial Heap with 13 nodes. It is a collection of 3 Binomial Trees of orders 0, 2 and 3
from left to right.

    10--------------------20
   /  \                 /  | \
 15    50             70  50  40
 |                  / |    |
 30               80  85  65
                  |
                 100

In this article, implementation of Binomial Heap is discussed. Following functions implemented :

1.  insert(H, k): Inserts a key 'k' to Binomial Heap 'H'. This operation first creates a Binomial
    Heap with single key 'k', then calls union on H and the new Binomial heap.

2.  getMin(H): A simple way to getMin() is to traverse the list of root of Binomial Trees and
    return the minimum key. This implementation requires O(Logn) time. It can be optimized to O(1)
    by maintaining a pointer to minimum key root.

3.  extractMin(H): This operation also uses union(). We first call getMin() to find the minimum key
    Binomial Tree, then we remove the node and create a new Binomial Heap by connecting all
    subtrees of the removed minimum node. Finally we call union() on H and the newly created
    Binomial Heap. This operation requires O(Logn) time.

Refer diagram shown in
http://www.geeksforgeeks.org/binomial-heap-2/
 */

export class Node {
    key: number;
    degree: number;
    parent: Node | null;
    child: Node | null;
    sibling: Node | null;

    constructor(key: number, degree = 0, parent: Node | null = null, child: Node | null = null, sibling: Node | null = null) {
        this.key = key;
        this.degree = degree;
        this.parent = parent;
        this.child = child;
        this.sibling = sibling;
    }

    compareTo(other: Node): number {
        return this.key - other.key;
    }
}

export class BinomialHeap {
    heap: Node[];

    constructor(_heap: Node[] = []) {
        this.heap = _heap;
    }

    swap(b1: Node, b2: Node): void {
        // Implementation of swap function goes here
    }

    mergeBinomialTrees(b1: Node, b2: Node): Node {
        // Implementation of mergeBinomialTrees function goes here
        return b1;  // Placeholder, replace with actual implementation
    }

    unionBinomialHeap(l1: Node[], l2: Node[]): Node[] {
        // Implementation of unionBinomialHeap function goes here
        return l1;  // Placeholder, replace with actual implementation
    }

    adjust(heap: Node[]): Node[] {
        // Implementation of adjust function goes here
        return heap;  // Placeholder, replace with actual implementation
    }

    insertTreeInHeap(heap: Node[], tree: Node): Node[] {
        // Implementation of insertTreeInHeap function goes here
        return heap;  // Placeholder, replace with actual implementation
    }

    removeMinFromTreeReturnHeap(tree: Node): Node[] {
        // Implementation of removeMinFromTreeReturnHeap function goes here
        return [];  // Placeholder, replace with actual implementation
    }

    insert(key: number): void {
        const temp = new Node(key);
        this.heap = this.insertTreeInHeap(this.heap, temp);
    }

    getMin(): Node | null {
        if (this.heap.length === 0) {
            return null;
        }

        let temp = this.heap[0];
        for (let i = 1; i < this.heap.length; i++) {
            if (this.heap[i].key < temp.key) {
                temp = this.heap[i];
            }
        }

        return temp;
    }

    extractMin(): void {
        const newHeap: Node[] = [];
        const temp = this.getMin();
        if (temp === null) {
            return;
        }

        for (let i = 0; i < this.heap.length; i++) {
            if (this.heap[i] !== temp) {
                newHeap.push(this.heap[i]);
            }
        }

        const lo = this.removeMinFromTreeReturnHeap(temp);
        const adjustedHeap = this.adjust(this.unionBinomialHeap(newHeap, lo));
        this.heap = adjustedHeap;
    }

    printTree(h: Node | null): void {
        // Implementation of printTree function goes here
        // Replace with actual implementation based on your needs
    }

    printHeap(heap: Node[] | null = null): void {
        if (heap === null) {
            heap = this.heap;
        }

        for (let i = 0; i < heap.length; i++) {
            this.printTree(heap[i]);
        }
        console.log("");
    }
}

// Code execution starts here
if (require.main === module) {
    const heapObj = new BinomialHeap();
    heapObj.insert(10);
    heapObj.insert(20);
    heapObj.insert(30);
    heapObj.insert(40);
    heapObj.insert(50);
    heapObj.insert(60);

    console.log("\nHeap elements after insertion:");
    heapObj.printHeap();

    const temp = heapObj.getMin();
    if (temp !== null) {
        console.log("Minimum element of heap ", temp.key);
    }

    heapObj.extractMin();
    console.log("Heap after deletion of minimum element");
    heapObj.printHeap();
}

/* 
Leftist Tree / Leftist Heap
http://www.geeksforgeeks.org/leftist-tree-leftist-heap/

A leftist tree or leftist heap is a priority queue implemented with a variant of a binary heap.
Every node has an s-value (or rank or distance) which is the distance to the nearest leaf. In
contrast to a binary heap (Which is always a complete binary tree), a leftist tree may be very
unbalanced.

Below are time complexities of Leftist Tree / Heap.
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Function       Complexity              Comparison
1) Get Min:       O(1)      [same as both Binary and Binomial]
2) Delete Min:    O(Log n)  [same as both Binary and Binomial]
3) Insert:        O(Log n)  [O(Log n) in Binary and O(1) in Binomial and O(Log n) for worst case]
4) Merge:         O(Log n)  [O(Log n) in Binomial]
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

A leftist tree is a binary tree with properties:
    1.  Normal Min Heap Property: key(i) >= key(parent(i))

    2.  Heavier on left side: dist(right(i)) <= dist(left(i)). Here, dist(i) is the number of
    edges on the shortest path from node i to a leaf node in extended binary tree representation
    (In this representation, a null child is considered as external or leaf node). The shortest
    path to a descendant external node is through the right child. Every subtree is also a
    leftist tree and dist( i ) = 1 + dist( right( i ) ).

==Example:==

The below leftist tree is presented with its distance calculated for each node with the procedure
mentioned above. The rightmost node has a rank of 0 as the right subtree of this node is null and
its parent has a distance of 1 by dist( i ) = 1 + dist( right( i )). The same is followed for
each node and their s-value( or rank) is calculated.

    ----- DIAGRAM -GOES-HERE -----

From above second property, we can draw two conclusions :

The path from root to rightmost leaf is the shortest path from root to a leaf.
If the path to rightmost leaf has x nodes, then leftist heap has atleast 2x – 1 nodes. This means
the length of path to rightmost leaf is O(log n) for a leftist heap with n nodes.

==Operations:==

1.  The main operation is merge().

2.  deleteMin() (or extractMin() can be done by removing root and calling merge() for left and
    right subtrees.

3.  insert() can be done be create a leftist tree with single key (key to be inserted) and calling
    merge() for given tree and tree with single node.

==Idea behind Merging:==

Since right subtree is smaller, the idea is to merge right subtree of a tree with other tree.
Below are abstract steps.

1.  Put the root with smaller value as the new root.
2.  Hang its left subtree on the left.
3.  Recursively merge its right subtree and the other tree.
4.  Before returning from recursion:
    - Update dist() of merged root.
    - Swap left and right subtrees just below root, if needed, to keep leftist property of merged
    result

Source : http://courses.cs.washington.edu/courses/cse326/08sp/lectures/05-leftist-heaps.pdf

==Detailed Steps for Merge:==

1.  Compare the roots of two heaps.
2.  Push the smaller key into an empty stack, and move to the right child of smaller key.
3.  Recursively compare two keys and go on pushing the smaller key onto the stack and move to
    its right child.
4.  Repeat until a null node is reached.
5.  Take the last node processed and make it the right child of the node at top of the stack, and
    convert it to leftist heap if the properties of leftist heap are violated.
6.  Recursively go on popping the elements from the stack and making them the right child of new
    stack top.

------------------------------------------------------------------------
==Example:==
------------------------------------------------------------------------

Consider two leftist heaps given below:

             4                   6
          /     \             /   \
         19      8           8    7
        /  \    /           /
       27  20  12          14
      /       / \
     43      15 25

Merge them into a single leftist heap

Compare(4, 6)
push(4)
Compare(8, 6)
Push(6)
Compare(8, 7)
Push(7)
Compare(8, None)

As null is encounter we make node 8 as right of the subtree of the stacktop i.e. 7

             4                  6
          /    \              /   \
         19  refer node8     8     7
        /  \                /       \
       27  20              14        8
      /                             /
     43                            12
                                  /  \
                                 15  25

The subtree at node 7 violates the property of leftist heap so we swap it with the left child and
retain the property of leftist heap.

             4                  6
          /    \              /   \
         19  refer node8     8     7
        /  \                /       \
       27  20              14        8
      /                             /
     43                            12
                                  /  \
                                 15  25

Convert to leftist heap. Repeat the process

             4
          /     \
         19      6
        /  \    /  \
       27  20  8    7
      /       /    /
     43      14   8
                 /
               12
              / \
            15  25


The worst case time complexity of this algorithm is O(log n) in the worst case, where n is the
number of nodes in the leftist heap.
 */

export class LeftistNode {
    element: number;
    left: LeftistNode | null;
    right: LeftistNode | null;
    dist: number;

    constructor(element: number, dist = 0, left: LeftistNode | null = null, right: LeftistNode | null = null) {
        this.element = element;
        this.left = left;
        this.right = right;
        this.dist = dist;
    }
}

export class Pointer {
    value: number;

    constructor(value: number) {
        this.value = value;
    }
}

export class LeftistHeap {
    root: LeftistNode | null;
    rhs: LeftistHeap | null;

    constructor(root: LeftistNode | null = null, rhs: LeftistHeap | null = null) {
        this.root = root;
        this.rhs = rhs;
    }

    merge_node(rhs: LeftistHeap): void {
        if (this === rhs) {
            return;
        }
        this.root = this.merge(this.root, rhs.root);
        rhs.root = null;
    }

    merge(h1: LeftistNode | null, h2: LeftistNode | null): LeftistNode | null {
        if (h1 === null) {
            return h2;
        }
        if (h2 === null) {
            return h1;
        }
        if (h1.element < h2.element) {
            return this.merge1(h1, h2);
        } else {
            return this.merge1(h2, h1);
        }
    }

    merge1(h1: LeftistNode, h2: LeftistNode): LeftistNode {
        if (h1.left === null) {
            h1.left = h2;
        } else {
            h1.right = this.merge(h1.right, h2);
            if (h1.left.dist < h1.right.dist) {
                this.swap_children(h1);
            }
            h1.dist = h1.right.dist + 1;
        }
        return h1;
    }

    swap_children(t: LeftistNode): void {
        const tmp = t.left;
        t.left = t.right;
        t.right = tmp;
    }

    reclaim_memory(t: LeftistNode | null): void {
        if (t !== null) {
            this.reclaim_memory(t.left);
            this.reclaim_memory(t.right);
            t = null;
        }
    }

    clone(t: LeftistNode | null): LeftistNode | null {
        if (t === null) {
            return null;
        } else {
            return new LeftistNode(t.element, this.clone(t.left), this.clone(t.right), t.dist);
        }
    }

    insert(x: number): void {
        this.root = this.merge(new LeftistNode(x), this.root);
    }

    find_min(): number {
        if (this.root === null) {
            throw new Error("Heap is Empty");
        }
        return this.root.element;
    }

    deleteMin(): void {
        const oldRoot = this.root;
        this.root = this.merge(this.root?.left, this.root?.right);
        oldRoot && (oldRoot.left = oldRoot.right = null);
    }

    delete_min(minItem: Pointer): void {
        if (this.isEmpty()) {
            console.log("Heap is Empty");
            return;
        }
        minItem.value = this.find_min();
        this.deleteMin();
    }

    isEmpty(): boolean {
        return this.root === null;
    }

    isFull(): boolean {
        return false;
    }

    make_empty(): void {
        this.reclaim_memory(this.root);
        this.root = null;
    }
}

if (require.main === module) {
    // Example usage
    const h = new LeftistHeap();
    const h1 = new LeftistHeap();
    let h2: LeftistHeap;

    const arr = [1, 5, 7, 10, 15];
    const arr1 = [22, 75];

    h.insert(arr[0]);
    h.insert(arr[1]);
    h.insert(arr[2]);
    h.insert(arr[3]);
    h.insert(arr[4]);
    h1.insert(arr1[0]);
    h1.insert(arr1[1]);

    const minPtr = new Pointer(0);
    h.delete_min(minPtr);
    console.log(minPtr.value);

    h1.delete_min(minPtr);
    console.log(minPtr.value);

    h.merge_node(h1);
    h2 = new LeftistHeap(h.root ? h.clone(h.root) : null);

    h2.delete_min(minPtr);
    console.log(minPtr.value);

}
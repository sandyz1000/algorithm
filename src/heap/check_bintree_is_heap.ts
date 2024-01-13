/* 
Given a binary tree we need to check it has heap property or not, Binary tree need to fulfill
following two conditions for being a heap:

1)  It should be a complete tree (i.e. all levels except last should be full).
2)  Every node's value should be greater than or equal to its child node (considering max-heap).

For example this tree contains heap property -

                97
              /    \
             46    37
            /  \  / \
           12  3 7  31
          / \
         6  9

While this doesn't -

                 97
               /    \
              46    37
             / \   / \
            12  3 7  31
               / \
              2  4



We check each of the above condition separately, for checking completeness isComplete and for
checking heap isHeapUtil function are written.

Detail about isComplete function can be found here.

isHeapUtil function is written considering following things -

1.  Every Node can have 2 children, 0 child (last level nodes) or 1 child (there can be at most
    one such node).
2.  If Node has No child then it's a leaf node and return true (Base case)
3.  If Node has one child (it must be left child because it is a complete tree) then we need
    to compare this node with its single child only.
4.  If Node has both child then check heap property at Node and recur for both subtrees.


 */

export class Node {
    key: number;
    left: Node | null;
    right: Node | null;

    constructor(key: number, left: Node | null = null, right: Node | null = null) {
        this.key = key;
        this.left = left;
        this.right = right;
    }
}

export class IsHeap {
    countNodes(root: Node | null): number {
        if (root === null) {
            return 0;
        }
        return 1 + this.countNodes(root.left) + this.countNodes(root.right);
    }

    isCompleteUtility(root: Node | null, index: number, numberNodes: number): boolean {
        if (root === null) {
            return true;
        }

        if (index >= numberNodes) {
            return false;
        }

        return (
            this.isCompleteUtility(root.left, 2 * index + 1, numberNodes) &&
            this.isCompleteUtility(root.right, 2 * index + 2, numberNodes)
        );
    }

    isHeapUtility(root: Node | null): boolean {
        if (root === null || (root.left === null && root.right === null)) {
            return true;
        }

        if (root.right === null) {
            return root.key >= (root.left?.key ?? 0);
        } else {
            return (
                root.key >= (root.left?.key ?? 0) &&
                root.key >= (root.right?.key ?? 0) &&
                this.isHeapUtility(root.left) &&
                this.isHeapUtility(root.right)
            );
        }
    }

    isHeap(root: Node | null): boolean {
        const nodeCount = this.countNodes(root);
        const index = 0;

        return (
            this.isCompleteUtility(root, index, nodeCount) &&
            this.isHeapUtility(root)
        );
    }
}

// Code execution starts here
if (require.main === module) {
    let root: Node | null = null;
    root = new Node(10);
    root.left = new Node(9);
    root.right = new Node(8);
    root.left.left = new Node(7);
    root.left.right = new Node(6);
    root.right.left = new Node(5);
    root.right.right = new Node(4);
    root.left.left.left = new Node(3);
    root.left.left.right = new Node(2);
    root.left.right.left = new Node(1);

    const test = new IsHeap();
    console.log(test.isHeap(root) ? "Given binary tree is a Heap" : "Given binary tree is not a Heap");
}

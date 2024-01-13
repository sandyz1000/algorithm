/* """
Count smaller elements on right side

Write a function to count number of smaller elements on right of each element in an array.
Given an unsorted array arr[] of distinct integers, construct another array count_smaller[] such
that count_smaller[i] contains count of smaller elements on right side of each element arr[i] in
array.

Examples:

Input:   arr = [12, 1, 2, 3, 0, 11, 4]
Output:  count_smaller  = [6, 1, 1, 1, 0, 1, 0]
----------------------------------
(Corner Cases)
Input:   arr = [5, 4, 3, 2, 1]
Output:  count_smaller = [4, 3, 2, 1, 0]
----------------------------------
Input:   arr = [1, 2, 3, 4, 5]
Output:  count_smaller = [0, 0, 0, 0, 0]
----------------------------------


## Method 1 (Simple)

Use two loops. The outer loop picks all elements from left to right. The inner loop iterates
through all the elements on right side of the picked element and updates countSmaller[].

Time Complexity: O(n^2)
Auxiliary Space: O(1)


## Method 2 (Use Self Balancing BST)
An AVL tree node

A Self Balancing Binary Search Tree (AVL, Red Black,.. etc) can be used to get the solution
in O(nLogn) time complexity. We can augment these trees so that every node N contains size
the subtree rooted with N. We have used AVL tree in the following implementation.

We traverse the array from right to left and insert all elements one by one in an AVL tree.
While inserting a new key in an AVL tree, we first compare the key with root. If key is
greater than root, then it is greater than all the nodes in left subtree of root. So we add
the size of left subtree to the count of smaller element for the key being inserted. We
recursively follow the same approach for all nodes down the root.

*/

export class Node {
    key: number;
    left: Node | null;
    right: Node | null;
    height: number;
    size: number;

    constructor(key: number, height = 1, size = 1, left: Node | null = null, right: Node | null = null) {
        this.key = key;
        this.left = left;
        this.right = right;
        this.height = height;
        this.size = size;
    }
}

class BalanceBST {
    private count = 0;

    private height(N: Node | null): number {
        return N ? N.height : 0;
    }

    private size(N: Node | null): number {
        return N ? N.size : 0;
    }

    private rightRotate(y: Node): Node {
        const x = y.left as Node;
        const T2 = x.right;

        x.right = y;
        y.left = T2;

        y.height = Math.max(this.height(y.left), this.height(y.right)) + 1;
        x.height = Math.max(this.height(x.left), this.height(x.right)) + 1;

        y.size = this.size(y.left) + this.size(y.right) + 1;
        x.size = this.size(x.left) + this.size(x.right) + 1;

        return x;
    }

    private leftRotate(x: Node): Node {
        const y = x.right as Node;
        const T2 = y.left;

        y.left = x;
        x.right = T2;

        x.height = Math.max(this.height(x.left), this.height(x.right)) + 1;
        y.height = Math.max(this.height(y.left), this.height(y.right)) + 1;

        x.size = this.size(x.left) + this.size(x.right) + 1;
        y.size = this.size(y.left) + this.size(y.right) + 1;

        return y;
    }

    private getBalance(N: Node | null): number {
        return N ? this.height(N.left) - this.height(N.right) : 0;
    }

    private insert(node: Node | null, key: number): Node {
        if (!node) {
            return new Node(key);
        }

        if (key < node.key) {
            node.left = this.insert(node.left, key);
        } else {
            node.right = this.insert(node.right, key);
            this.count += this.size(node.left) + 1;
        }

        node.height = Math.max(this.height(node.left), this.height(node.right)) + 1;
        node.size = this.size(node.left) + this.size(node.right) + 1;

        const balance = this.getBalance(node);

        if (balance > 1 && key < (node.left as Node).key) {
            return this.rightRotate(node);
        }

        if (balance < -1 && key > (node.right as Node).key) {
            return this.leftRotate(node);
        }

        if (balance > 1 && key > (node.left as Node).key) {
            node.left = this.leftRotate(node.left as Node);
            return this.rightRotate(node);
        }

        if (balance < -1 && key < (node.right as Node).key) {
            node.right = this.rightRotate(node.right as Node);
            return this.leftRotate(node);
        }

        return node;
    }

    constructLowerArray(arr: number[], countSmaller: number[], n: number): void {
        let root: Node | null = null;

        for (let i = n - 1; i >= 0; i--) {
            this.count = 0;
            root = this.insert(root, arr[i]);
            countSmaller[i] = this.count;
        }
    }
}

export class CountSmaller {
    constructLowerArray(arr: number[], countSmaller: number[], n: number): void {
        for (let i = 0; i < n; i++) {
            countSmaller[i] = 0;
        }

        for (let i = 0; i < n; i++) {
            for (let j = i + 1; j < n; j++) {
                if (arr[j] < arr[i]) {
                    countSmaller[i] += 1;
                }
            }
        }
    }
}

if (require.main === module) {
    // Example usage
    console.log("\n----------Method-1---------\n");
    const small = new CountSmaller();
    const arr1 = [12, 10, 5, 4, 2, 20, 6, 1, 0, 2];
    const low1: number[] = new Array(arr1.length);
    small.constructLowerArray(arr1, low1, arr1.length);
    console.log(arr1);
    
    console.log("\n----------Method-2---------\n");
    const bst = new BalanceBST();
    const arr2 = [12, 1, 2, 3, 0, 11, 4];
    const low2: number[] = new Array(arr2.length);
    bst.constructLowerArray(arr2, low2, arr2.length);
    console.log("Following is the constructed smaller count array\n", low2);
    

}    

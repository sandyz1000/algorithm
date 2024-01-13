/* 
Clone a Binary Tree with Random Pointers
http://www.geeksforgeeks.org/clone-binary-tree-random-pointers/

Given a Binary Tree where every node has following structure.

```ts
export class Node {
    key: number
    left: Node | null
    right: Node | null
    random: Node | null

    constructor(key, left=null, right=null, _random=null) {
        this.key = key
        this.left = left
        this.right = right
        this.random = _random
    }
}
        

The random pointer points to any random node of the binary tree and can even point to None, clone
the given binary tree.


Method 1 (Use Hashing)
The idea is to store mapping from given tree nodes to clone tree nodes in hashtable. Following are detailed steps.

1) Recursively traverse the given Binary and copy key value, left pointer and right pointer to clone tree.
While copying, store the mapping from given tree node to clone tree node in a hashtable. In the following
pseudo code, ‘cloneNode’ is currently visited node of clone tree and ‘treeNode’ is currently visited node of
given tree.

   cloneNode->key  = treeNode->key
   cloneNode->left = treeNode->left
   cloneNode->right = treeNode->right
   map[treeNode] = cloneNode

2) Recursively traverse both trees and set random pointers using entries from hash table.

   cloneNode->random = map[treeNode->random]

Method 1 (Use Hashing)
    The idea is to store mapping from given tree nodes to clone tree node in hashtable.
    Following are detailed steps.

    1) Recursively traverse the given Binary and copy key value, left pointer and right pointer to
    clone tree. While copying, store the mapping from given tree node to clone tree node in a
    hashtable. In the following pseudo code, 'cloneNode' is currently visited node of clone tree
    and 'treeNode' is currently visited node of given tree.

       cloneNode.key  = treeNode.key
       cloneNode.left = treeNode.left
       cloneNode.right = treeNode.right
       map[treeNode] = cloneNode

    2) Recursively traverse both trees and set random pointers using entries from hash table.

       cloneNode.random = map[treeNode.random]

    Following is Python implementation of above idea.

    Note that map doesn't implement hash table, it actually is based on self-balancing
    binary search tree.

    A hashmap based Python program to clone a binary tree with random pointers

Method 2 (Temporarily Modify the Given Binary Tree)

    1. Create new nodes in cloned tree and insert each new node in original tree between the left
    pointer edge of corresponding node in the original tree (See the below image). i.e. if
    current node is A and it's left child is B ( A - >> B ), then new cloned node with key A will
    be created (say cA) and it will be put as A — >> cA — >> B (B can be a None or a non-None
    left child). Right child pointer will be set correctly i.e. if for current node A,
    right child is C in original tree (A — >> C) then corresponding cloned nodes cA and cC will
    like cA —- >> cC

            1                  (1)
          /   \               /   \
         2     3             2    (3)
                            / \  /
                          (2)   2
                          /
                         2

    2. Set random pointer in cloned tree as per original tree
    i.e. if node A's random pointer points to node B, then in cloned tree, cA will point to cB
    (cA and cB are new node in cloned tree corresponding to node A and B in original tree)

    3. Restore left pointers correctly in both original and cloned tree

 */

export class Node {
    key: number;
    left: Node | null;
    right: Node | null;
    random: Node | null;

    constructor(key: number, left: Node | null = null, right: Node | null = null, random: Node | null = null) {
        this.key = key;
        this.left = left;
        this.right = right;
        this.random = random;
    }
}

export class CloneBinTreeUsingHashing {
    printInorder(node: Node | null): void {
        if (!node) {
            return;
        }

        this.printInorder(node.left);
        console.log(`[ ${node.key} . ${node.random ? node.random.key : 'None'} ]`);
        this.printInorder(node.right);
    }

    copyLeftRightNode(treeNode: Node | null, myMap: Map<Node | null, Node>): Node | null {
        if (!treeNode) {
            return null;
        }

        const cloneNode = new Node(treeNode.key);
        myMap.set(treeNode, cloneNode);
        cloneNode.left = this.copyLeftRightNode(treeNode.left, myMap);
        cloneNode.right = this.copyLeftRightNode(treeNode.right, myMap);
        return cloneNode;
    }

    copyRandom(treeNode: Node | null, cloneTree: Node | null, myMap: Map<Node | null, Node>): void {
        if (!cloneTree) {
            return;
        }
        cloneTree.random = myMap.get(treeNode?.random) || null;
        this.copyRandom(treeNode?.left, cloneTree.left, myMap);
        this.copyRandom(treeNode?.right, cloneTree.right, myMap);
    }

    cloneTree(tree: Node | null): Node | null {
        if (!tree) {
            return null;
        }

        const myMap = new Map<Node | null, Node>();
        const newTree = this.copyLeftRightNode(tree, myMap);
        this.copyRandom(tree, newTree, myMap);
        return newTree;
    }
}

export class TempModifyBinaryTree {
    printInorder(node: Node | null): void {
        if (!node) {
            return;
        }

        this.printInorder(node.left);
        console.log(`[ ${node.key} . ${node.random ? node.random.key : 'None'} ]`, end=" ");
        this.printInorder(node.right);
    }

    copyLeftRightNode(treeNode: Node | null): Node | null {
        if (!treeNode) {
            return null;
        }

        const aLeft = treeNode.left;
        treeNode.left = new Node(treeNode.key);
        treeNode.left.left = aLeft;
        if (aLeft) {
            aLeft.left = this.copyLeftRightNode(aLeft);
        }

        treeNode.left.right = this.copyLeftRightNode(treeNode.right);
        return treeNode.left;
    }

    copyRandomNode(treeNode: Node | null, cloneNode: Node | null): void {
        if (!treeNode) {
            return;
        }
        if (treeNode.random) {
            cloneNode.random = treeNode.random;
        } else {
            cloneNode.random = null;
        }

        if (treeNode.left && cloneNode.left) {
            this.copyRandomNode(treeNode.left.left, cloneNode.left.left);
        }

        this.copyRandomNode(treeNode.right, cloneNode.right);
    }

    restoreTreeLeftNode(treeNode: Node | null, cloneNode: Node | null): void {
        if (!treeNode) {
            return;
        }
        if (cloneNode.left) {
            const cloneLeft = cloneNode.left.left;
            treeNode.left = treeNode.left.left;
            cloneNode.left = cloneLeft;
        } else {
            treeNode.left = null;
        }

        this.restoreTreeLeftNode(treeNode.left, cloneNode.left);
        this.restoreTreeLeftNode(treeNode.right, cloneNode.right);
    }

    cloneTree(treeNode: Node | null): Node | null {
        if (!treeNode) {
            return null;
        }

        const cloneNode = this.copyLeftRightNode(treeNode);
        this.copyRandomNode(treeNode, cloneNode);
        this.restoreTreeLeftNode(treeNode, cloneNode);
        return cloneNode;
    }
}

function cloneBinTree(): void {
    console.log("\n ------- Method-1 ----- ");
    const cbt = new CloneBinTreeUsingHashing();

    // Test No 1
    const tree = new Node(1);
    tree.left = new Node(2);
    tree.right = new Node(3);
    tree.left.left = new Node(4);
    tree.left.right = new Node(5);
    tree.random = tree.left.right;
    tree.left.left.random = tree;
    tree.left.right.random = tree.right;

    // Test No 2
    // const tree = null;

    // Test No 3
    // const tree = new Node(1);

    // Test No 4
    // const tree = new Node(1);
    // tree.left = new Node(2);
    // tree.right = new Node(3);
    // tree.random = tree.right;
    // tree.left.random = tree;

    console.log("Inorder traversal of original binary tree is: \n");
    cbt.printInorder(tree);

    const clone = cbt.cloneTree(tree);

    console.log("\n\nInorder traversal of cloned binary tree is: \n");
    cbt.printInorder(clone);
}

function tempModBinTree(): void {
    console.log("\n ------- Method-2 ----- ");
    const temp = new TempModifyBinaryTree();

    // Test No 1
    // const tree = new Node(1);
    // tree.left = new Node(2);
    // tree.right = new Node(3);
    // tree.left.left = new Node(4);
    // tree.left.right = new Node(5);
    // tree.random = tree.left.right;
    // tree.left.left.random = tree;
    // tree.left.right.random = tree.right;

    // Test No 2
    // const tree = null;

    // Test No 3
    // const tree = new Node(1);

    // Test No 4
    // const tree = new Node(1);
    // tree.left = new Node(2);
    // tree.right = new Node(3);
    // tree.random = tree.right;
    // tree.left.random = tree;

    // Test No 5
    // const tree = new Node(1);
    // tree.left = new Node(2);
    // tree.right = new Node(3);
    // tree.left.left = new Node(4);
    // tree.left.right = new Node(5);
    // tree.right.left = new Node(6);
    // tree.right.right = new Node(7);
    // tree.random = tree.left;

    // Test No 6
    const tree = new Node(10);
    const n2 = new Node(6);
    const n3 = new Node(12);
    const n4 = new Node(5);
    const n5 = new Node(8);
    const n6 = new Node(11);
    const n7 = new Node(13);
    const n8 = new Node(7);
    const n9 = new Node(9);
    tree.left = n2;
    tree.right = n3;
    tree.random = n2;
    n2.left = n4;
    n2.right = n5;
    n2.random = n8;
    n3.left = n6;
    n3.right = n7;
    n3.random = n5;
    n4.random = n9;
    n5.left = n8;
    n5.right = n9;
    n5.random = tree;
    n6.random = n9;
    n9.random = n8;

    // Test No 7
    // const tree = new Node(1);
    // tree.left = new Node(2);
    // tree.right = new Node(3);
    // tree.left.random = tree;
    // tree.right.random = tree.left;

    console.log("Inorder traversal of original binary tree is: \n");
    temp.printInorder(tree);

    const clone = temp.cloneTree(tree);

    console.log("\n\nInorder traversal of cloned binary tree is: \n");
    temp.printInorder(clone);
}

cloneBinTree();
tempModBinTree();

/* """
Vertical Sum in a given Binary Tree | Set 1
https://www.geeksforgeeks.org/vertical-sum-in-binary-tree-set-space-optimized/

Given a Binary Tree, find vertical sum of the nodes that are in same vertical line.
Print all sums through different vertical lines.

------------------------------------------------------------
Examples:
------------------------------------------------------------

      1
    /   \
  2      3
 / \    / \
4   5  6   7

The tree has 5 vertical lines

Vertical-Line-1 has only one node 4 => vertical sum is 4
Vertical-Line-2: has only one node 2=> vertical sum is 2
Vertical-Line-3: has three nodes: 1,5,6 => vertical sum is 1+5+6 = 12
Vertical-Line-4: has only one node 3 => vertical sum is 3
Vertical-Line-5: has only one node 7 => vertical sum is 7

So expected output is 4, 2, 12, 3 and 7

------------------------------------------------------------
Explanation:
------------------------------------------------------------

We need to check the Horizontal Distances from root for all nodes. If two nodes have the same
Horizontal Distance (HD), then they are on same vertical line. The idea of HD is simple. HD for
root is 0, a right edge (edge connecting to right subtree) is considered as +1 horizontal
distance and a left edge is considered as -1 horizontal distance. For example, in the above tree,
HD for Node 4 is at -2, HD for Node 2 is -1, HD for 5 and 6 is 0 and HD for node 7 is +2.
We can do inorder traversal of the given Binary Tree. While traversing the tree,
we can recursively calculate HDs. We initially pass the horizontal distance as 0 for root. For
left subtree, we pass the Horizontal Distance as Horizontal distance of root minus 1. For right
subtree, we pass the Horizontal Distance as Horizontal Distance of root plus 1.

------------------------------------------------------------
------------------------------------------------------------
 */


export class TreeNode {
    constructor(public key: number, public left: TreeNode | null = null, public right: TreeNode | null = null) {}
}

export class LLNode {
    constructor(public key: number, public next: LLNode | null = null, public prev: LLNode | null = null) {}
}

export class Tree {
    constructor(public root: TreeNode) {}

    verticalSum(root: TreeNode | null): void {
        if (root === null) {
            return;
        }

        const hM: { [key: number]: number } = {};
        this.verticalSumUtil(root, 0, hM);
        console.log(Object.values(hM));
    }

    private verticalSumUtil(root: TreeNode | null, hD: number, hM: { [key: number]: number }): void {
        if (root === null) {
            return;
        }

        this.verticalSumUtil(root.left, hD - 1, hM);
        hM[hD] = (hM[hD] || 0) + root.key;
        this.verticalSumUtil(root.right, hD + 1, hM);
    }
}

export class VerticalSumBinaryTree {
    constructor(public root: TreeNode) {}

    verticalSumDLL(root: TreeNode | null): void {
        let llnode: LLNode | null = new LLNode(0);
        this.verticalSumDLLUtil(root, llnode);

        while (llnode.prev !== null) {
            llnode = llnode.prev;
        }

        while (llnode !== null) {
            console.log(llnode.key);
            llnode = llnode.next;
        }
    }

    private verticalSumDLLUtil(treeNode: TreeNode | null, llnode: LLNode): void {
        if (treeNode === null) {
            return;
        }

        llnode.key += treeNode.key;

        if (treeNode.left !== null) {
            if (llnode.prev === null) {
                llnode.prev = new LLNode(0);
                llnode.prev.next = llnode;
            }
            this.verticalSumDLLUtil(treeNode.left, llnode.prev);
        }

        if (treeNode.right !== null) {
            if (llnode.next === null) {
                llnode.next = new LLNode(0);
                llnode.next.prev = llnode;
            }
            this.verticalSumDLLUtil(treeNode.right, llnode.next);
        }
    }
}

if (require.main === module) {
    console.log("\nMethod-1");

    const root1 = new TreeNode(1);
    root1.left = new TreeNode(2);
    root1.right = new TreeNode(3);
    root1.left.left = new TreeNode(4);
    root1.left.right = new TreeNode(5);
    root1.right.left = new TreeNode(6);
    root1.right.right = new TreeNode(7);

    const tree1 = new Tree(root1);
    console.log("Following are the values of vertical sums with the positions of the columns with respect to root");
    tree1.verticalSum(root1);

    console.log("\nMethod-2");

    const root2 = new TreeNode(1);
    root2.left = new TreeNode(2);
    root2.right = new TreeNode(3);
    root2.left.left = new TreeNode(4);
    root2.left.right = new TreeNode(5);
    root2.right.left = new TreeNode(6);
    root2.right.right = new TreeNode(7);

    console.log("Vertical Sums are");
    const vsbt = new VerticalSumBinaryTree(root2);
    vsbt.verticalSumDLL(root2);
}

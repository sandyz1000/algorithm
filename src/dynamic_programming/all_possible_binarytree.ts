/* Find all possible binary trees with given Inorder Traversal
Last Updated: 06-12-2018
Given an array that represents Inorder Traversal, find all possible Binary Trees with the given Inorder
traversal and print their preorder traversals.

Examples:
-------------------------------------------------------------------
Input:   in[] = {3, 2};
Output:  Preorder traversals of different possible Binary Trees are:
         3 2
         2 3
Below are different possible binary trees
    3        2
     \      /
      2    3

Input:   in[] = {4, 5, 7};
Output:  Preorder traversals of different possible Binary Trees are:
          4 5 7
          4 7 5
          5 4 7
          7 4 5
          7 5 4
Below are different possible binary trees
  4         4           5         7       7
   \          \       /   \      /       /
    5          7     4     7    4       5
     \        /                  \     /
      7      5                    5   4
-------------------------------------------------------------------

Let given inorder traversal be in[]. In the given traversal, all nodes in left subtree of in[i] must
appear before it and in right subtree must appear after it. So when we consider in[i] as root, all elements
from in[0] to in[i-1] will be in left subtree and in[i+1] to n-1 will be in right subtree.
If in[0] to in[i-1] can form x different trees and in[i+1] to in[n-1] can from y different trees then
we will have x*y total trees when in[i] as root. So we simply iterate from 0 to n-1 for root. For every
node in[i], recursively find different left and right subtrees. If we take a closer look, we can notice
that the count is basically n’th Catalan number. We have discussed different approaches to find n’th Catalan
number here.

The idea is to maintain a list of roots of all Binary Trees. Recursively construct all possible left and
right subtrees. Create a tree for every pair of left and right subtree and add the tree to list.

Below is detailed algorithm.
----------------------------
1) Initialize list of Binary Trees as empty.
2) For every element in[i] where i varies from 0 to n-1,
    do following
......a)  Create a new node with key as 'arr[i]',
          let this node be 'node'
......b)  Recursively construct list of all left subtrees.
......c)  Recursively construct list of all right subtrees.
3) Iterate for all left subtrees
   a) For current leftsubtree, iterate for all right subtrees
        Add current left and right subtrees to 'node' and add
        'node' to list.

 */

export class TreeeNode {
  key: number;
  left: TreeeNode | null;
  right: TreeeNode | null;

  constructor(item: number) {
    this.key = item;
    this.left = null;
    this.right = null;
  }
}

// A utility function to do preorder traversal of BST
function preorder(root: TreeeNode | null): void {
  if (root !== null) {
    console.log(root.key + " ");
    preorder(root.left);
    preorder(root.right);
  }
}

function getTrees(arr: number[], start: number, end: number): (TreeeNode | null)[] {
  // List to store all possible trees
  const trees: (TreeeNode | null)[] = [];

  // if start > end then subtree will be empty so returning NULL in the list
  if (start > end) {
    trees.push(null);
    return trees;
  }

  // Iterating through all values from start to end for constructing left and right subtree recursively
  for (let i = start; i <= end; i++) {
    // Constructing left subtree
    const ltrees = getTrees(arr, start, i - 1);

    // Constructing right subtree
    const rtrees = getTrees(arr, i + 1, end);

    // Looping through all left and right subtrees and connecting to ith root below
    for (const j of ltrees) {
      for (const k of rtrees) {
        // Making arr[i] as root
        const node = new TreeeNode(arr[i]);

        // Connecting left subtree
        node.left = j;

        // Connecting right subtree
        node.right = k;

        // Adding this tree to list
        trees.push(node);
      }
    }
  }
  return trees;
}

if (require.main === module) {
  const inp: number[] = [4, 5, 7];
  const n: number = inp.length;

  const trees: (TreeeNode | null)[] = getTrees(inp, 0, n - 1);

  console.log("Preorder traversals of different possible Binary Trees are ");
  for (const i of trees) {
    preorder(i);
    console.log("----");
  }
}

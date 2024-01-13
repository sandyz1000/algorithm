"""
Construct tree from ancestor matrix
--------------------------------

Given an ancestor matrix mat[n][n] where Ancestor matrix is defined as below.

   mat[i][j] = 1 if i is ancestor of j
   mat[i][j] = 0, otherwise
Construct a Binary Tree from given ancestor matrix where all its values of nodes are from 0 to n-1.

It may be assumed that the input provided the program is valid and tree can be constructed out
of it.

Many Binary trees can be constructed from one input. The program will construct any one of them.

Examples:
--------------------------------

Input: 0 1 1
       0 0 0
       0 0 0
Output: Root of one of the below trees.
    0                0
  /   \     OR     /   \
 1     2          2     1

Input: 0 0 0 0 0 0
       1 0 0 0 1 0
       0 0 0 1 0 0
       0 0 0 0 0 0
       0 0 0 0 0 0
       1 1 1 1 1 0
Output: Root of one of the below trees.
      5              5               5
   /    \           / \            /   \
  1      2   OR    2   1    OR    1     2  OR ....
 /  \   /        /    /  \       / \    /
0   4  3        3    0    4     4   0  3

There are different possible outputs because ancestor matrix doesn't store that which child
is left and which is right.

"""
from __future__ import print_function
from collections import namedtuple
# Given an ancestor matrix for binary tree, construct the tree.

# Note that we can also use an array of vectors in place of multimap. We have used multimap for
# simplicity. Array of vectors would improve performance as inserting and accessing elements
# would take O(1) time.


class Node:
    def __init__(self, data, left=None, right=None):
        self.data = data
        self.left = left
        self.right = right

N = 6

Pair = namedtuple('Pair', ('first', 'second',))


def ancestor_tree(mat):
    """
    Constructs tree from ancestor matrix
    :param mat: 2d-array
    :return:
    """
    # Binary array to determine weather parent is set for node i or not
    parent = [0] * (N + 1)
    parent[N] = [0]

    # Root will store the root of the constructed tree
    root = None
    # Create a multimap, sum is used as key and row numbers are used as values
    mm = []
    for i in range(N):
        sum = 0  # Initialize sum of this row
        for j in range(N):
            sum += mat[i][j]
        mm.append(Pair(sum, i))  # insert(sum, i) pairs into the multimap

    # node[i] will store node for i in constructed tree
    node = [None] * N

    # Traverse all entries of multimap.  Note that values
    # are accessed in increasing order of sum
    for it in mm:
        # create a new node for every value
        node[it.second] = Node(it.second)
        # To store last processed node. This node will be root after loop terminates
        root = node[it.second]

        if it.first != 0:  # if non-leaf node
            # traverse row 'it.second' in the matrix
            for i in range(N):
                # if parent is not set and ancestor exits
                if not parent[i] and mat[it.second][i]:
                    # check for unoccupied left/right node and set parent of node i
                    if not node[it.second].left:
                        node[it.second].left = node[i]
                    else:
                        node[it.second].right = node[i]

                    parent[i] = 1

    return root


def printInorder(node):
    if node is None:
        return
    printInorder(node.left)
    print("%d " % node.data)
    printInorder(node.right)


if __name__ == '__main__':
    # Inorder traversal of tree is  0 1 4 5 3 2
    mat = [[0, 0, 0, 0, 0, 0],
           [1, 0, 0, 0, 1, 0],
           [0, 0, 0, 1, 0, 0],
           [0, 0, 0, 0, 0, 0],
           [0, 0, 0, 0, 0, 0],
           [1, 1, 1, 1, 1, 0]]
    root = ancestor_tree(mat)

    print("Inorder traversal of tree is \n")
    printInorder(root)

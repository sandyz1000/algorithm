"""
Construct Ancestor Matrix from a Given Binary Tree
Given a Binary Tree where all values are from 0 to n-1. Construct an ancestor matrix mat[n][n].
Ancestor matrix is defined as below.

mat[i][j] = 1 if i is ancestor of j
mat[i][j] = 0, otherwise

Examples:
--------------------------------

Input: Root of below Binary Tree.
          0
        /   \
       1     2

Output: 0 1 1
        0 0 0
        0 0 0
--------------------------------

Input: Root of below Binary Tree.
           5
        /    \
       1      2
      /  \    /
     0    4  3

Output: 0 0 0 0 0 0
        1 0 0 0 1 0
        0 0 0 1 0 0
        0 0 0 0 0 0
        0 0 0 0 0 0
        1 1 1 1 1 0
--------------------------------

------------------------------------------------
Explanation:
------------------------------------------------
The idea is to traverse the tree. While traversing, keep track of ancestors in an array. When
we visit a node, we add it to ancestor array and consider corresponding row in adjacency
matrix. We mark all ancestors in its row as 1. Once a node and all its children are
processed, we remove the node from ancestor array.

anc[] stores all ancestors of current node. This function fills ancestors for all nodes.
It also returns size of tree. Size of tree is used to print ancestor matrix.
"""


# Python program to construct ancestor matrix for given tree.
# Time complexity of above solution is O(n2).
MAX = 100
# Creating a global boolean matrix for simplicity
mat = [[0 for j in range(MAX)] for i in range(MAX)]


class Node(object):
    def __init__(self, data, left=None, right=None):
        self.data = data
        self.left = left
        self.right = right


def ancestor_matrix_rec(root: Node, anc):
    if root is None:  # base case
        return 0

    # Update all ancestors of current node
    data = root.data
    for i in range(len(anc)):
        mat[anc[i]][data] = 1

    # Push data to list of ancestors
    anc.append(data)

    # Traverse left and right subtrees
    left = ancestor_matrix_rec(root.left, anc)
    right = ancestor_matrix_rec(root.right, anc)

    # Remove data from list the list of ancestors as all descendants of it are processed now.
    anc.pop()
    return left + right + 1  # return count of node


def ancestor_matrix(root):
    # Create an empty ancestor array
    anc = []
    # Fill ancestor matrix and find size of tree.
    n = ancestor_matrix_rec(root, anc)
    # Print the filled values
    output = ([[mat[i][j] for j in range(n)] for i in range(n)])
    for item in output:
        print(item)


if __name__ == '__main__':
    # /* Construct the following binary tree
    #         5
    #       /   \
    #     1      2
    #   /  \    /
    #  0    4  3    */
    root = Node(5)
    root.left = Node(1)
    root.right = Node(2)
    root.left.left = Node(0)
    root.left.right = Node(4)
    root.right.left = Node(3)

    ancestor_matrix(root)

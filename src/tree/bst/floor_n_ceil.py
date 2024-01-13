"""
Floor and Ceil from a BST

There are numerous applications we need to find floor (ceil) value of a key in a binary search tree
or sorted array. For example, consider designing memory management system in which free nodes are
arranged in BST. Find best fit for the input request.

Ceil Value Node: Node with smallest data larger than or equal to key value.

Imagine we are moving down the tree, and assume we are root node. The comparison yields three
possibilities,
A) Root data is equal to key. We are done, root data is ceil value.
B) Root data < key value, certainly the ceil value can't be in left subtree. Proceed to search on
right subtree as reduced problem instance.
C) Root data > key value, the ceil value may be in left subtree. We may find a node with larger
data than key value in left subtree, if not the root itself will be ceil node.

         8
      /    \
     4     12
   /  \   /  \
  2   6  10  14

"""
from __future__ import print_function

# Python program to find ceil of a given value in BST


class Node(object):
    """A Binary tree node"""

    def __init__(self, data):
        self.key = data
        self.left = None
        self.right = None


def ceil(root, inp):
    """
    Function to find ceil of a given input in BST. If input is more
    than the max key in BST, return -1
    """

    if root is None:  # Base Case
        return -1

    if root.key == inp:  # We found equal key
        return root.key

    # If root's key is smaller, ceil must be in right subtree
    if root.key < inp:
        return ceil(root.right, inp)
    # Else, either left subtree or root has the ceil value
    else:
        val = ceil(root.left, inp)
        return val if val >= inp else root.key


if __name__ == '__main__':
    root = Node(8)
    root.left = Node(4)
    root.right = Node(12)
    root.left.left = Node(2)
    root.left.right = Node(6)
    root.right.left = Node(10)
    root.right.right = Node(14)

    for i in range(16):
        print("%d %d" % (i, ceil(root, i)))

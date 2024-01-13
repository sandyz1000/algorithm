""" Convert left-right representation of a binary tree to down-right

Left-Right representation of a binary tree is standard representation where every node has a
pointer to left child and another pointer to right child.

Down-Right representation is an alternate representation where every node has a pointer to left
(or first) child and another pointer to next sibling. So siblings at every level are connected
from left to right.

--------------------------------------------
Example:
--------------------------------------------

Given a binary tree in left-right representation as below

                      1
                    /   \
                   2	3
                       / \
                      4   5
                     /   / \
                    6   7   8
Convert the structure of the tree to down-right representation like the below tree.

                    1
                    |
                    2 - 3
                        |
                        4 - 5
                        |   |
                        6   7 - 8

The conversion should happen in-place, i.e., left child pointer should be used as down pointer
and right child pointer should be used as right sibling pointer.

"""
from __future__ import print_function
# Python program to convert left-right to down-right representation of binary tree


class Node(object):
    def __init__(self, key, left=None, right=None):
        self.key = key
        self.left = left
        self.right = right


def convert(root):
    """An Iterative level order traversal based function to convert left-right to down-right
    representation."""
    if root is None:  # Base Case
        return
    # Recursively convert left an right subtrees
    convert(root.left)
    convert(root.right)

    # If left child is NULL, make right child as left as it is the first child.
    if root.left is None:
        root.left = root.right
    else:  # If left child is NOT NULL, then make right child as right of left child
        root.left.right = root.right

    # Set root's right as NULL
    root.right = None


def down_right_traversal(root):
    """A utility function to traverse a tree stored in down-right form."""
    if root is not None:
        print(root.key)
        down_right_traversal(root.right)
        down_right_traversal(root.left)


if __name__ == '__main__':
    # Time complexity of the above program is O(n).
    # Let us create binary tree shown in above diagram
    #
    #        1
    #      /   \
    #     2     3
    #          / \
    #         4   5
    #        /   /  \
    #       6   7    8
    #

    root = Node(1)
    root.left = Node(2)
    root.right = Node(3)
    root.right.left = Node(4)
    root.right.right = Node(5)
    root.right.left.left = Node(6)
    root.right.right.left = Node(7)
    root.right.right.right = Node(8)

    convert(root)

    print("Traversal of the tree converted to down-right form\n")
    down_right_traversal(root)

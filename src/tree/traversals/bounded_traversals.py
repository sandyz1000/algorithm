"""
Boundary Traversal of binary tree
Given a binary tree, print boundary nodes of the binary tree Anti-Clockwise starting from the root.
For example, boundary traversal of the following tree is "20 8 4 10 14 25 22"

             20
           /   \
          8    22
         / \    \
        4  12   25
          /  \
         10  14

"""
from __future__ import print_function


# Python program for binary traversal of binary tree
# Time Complexity: O(n) where n is the number of nodes in binary tree.

# A binary tree node
class Node(object):
    # Constructor to create a new node
    def __init__(self, data):
        self.data = data
        self.left = None
        self.right = None


def print_leaves(root):
    """A simple function to print leaf nodes of a Binary Tree"""
    if root:
        print_leaves(root.left)

        # Print it if it is a leaf node
        if root.left is None and root.right is None:
            print(root.data, end=" ")

        print_leaves(root.right)


def print_boundary_left(root):
    """
    A function to print all left boundary nodes, except a leaf node.
    Print the nodes in TOP DOWN manner
    :param root:
    :return:
    """
    if root:
        if root.left:
            # to ensure top down order, print the node before calling itself for left subtree
            print(root.data, end=" ")
            print_boundary_left(root.left)

        elif root.right:
            print(root.data, end=" ")
            print_boundary_right(root.right)
            # do nothing if it is a leaf node, this way we avoid duplicates in output


def print_boundary_right(root):
    """
    A function to print all right boundary nodes, except a leaf node.
    Print the nodes in BOTTOM UP manner
    :param root:
    :return:
    """
    if root:
        if root.right:
            # to ensure bottom up order, first call for right subtree, then print this node
            print_boundary_right(root.right)
            print(root.data, end=" ")

        elif root.left:
            print_boundary_right(root.left)
            print(root.data, end=" ")

            # do nothing if it is a leaf node, this way we
            # avoid duplicates in output


def print_boundary(root):
    """
    We break the problem in 3 parts:
    1. Print the left boundary in top-down manner.
    2. Print all leaf nodes from left to right, which can again be sub-divided into two sub-parts:
        2.1 Print all leaf nodes of left sub-tree from left to right.
        2.2 Print all leaf nodes of right subtree from left to right.
    3. Print the right boundary in bottom-up manner.

    We need to take care of one thing that nodes are not printed again. e.g. The left most node
    is also the leaf node of the tree.

    A function to do boundary traversal of a given binary tree
    :param root:
    :return:
    """
    if root:
        print(root.data, end=" ")
        # Print the left boundary in top-down manner
        print_boundary_left(root.left)
        # Print all leaf nodes
        print_leaves(root.left)
        print_leaves(root.right)
        # Print the right boundary in bottom-up manner
        print_boundary_right(root.right)


if __name__ == '__main__':
    root = Node(20)
    root.left = Node(8)
    root.left.left = Node(4)
    root.left.right = Node(12)
    root.left.right.left = Node(10)
    root.left.right.right = Node(14)
    root.right = Node(22)
    root.right.right = Node(25)
    print_boundary(root)

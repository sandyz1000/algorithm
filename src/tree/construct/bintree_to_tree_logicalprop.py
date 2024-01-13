""" Convert a given Binary tree to a tree that holds Logical AND property

Given a Binary Tree (Every node has at most 2 children) where each node has value either 0 or 1.
Convert a given Binary tree to a tree that holds Logical AND property, i.e., each node value should
be the logical AND between its children.

------------------------------------------------------------
Examples:
------------------------------------------------------------
Input : The below tree doesn't hold the logical AND property convert it to a tree
that holds the property.

             1
           /   \
          1     0
         / \   / \
        0   1 1   1

Output :
             0
           /   \
          0     1
         / \   / \
        0   1 1   1
"""
from __future__ import print_function

# Python code to covert a given binary tree to a tree that holds logical AND property.


class Node:
    # Constructor to create a new node
    def __init__(self, data):
        self.data = data
        self.left = None
        self.right = None


def convert_tree(root):
    """Convert the given tree to a tree where each node is logical AND of its children The main
    idea is to do Post-order traversal """
    if root is None:
        return

    convert_tree(root.left)  # first recur on left child
    convert_tree(root.right)  # then recur on right child
    if root.left is not None and root.right is not None:
        root.data = root.left.data & root.right.data


def print_inorder(root):
    if root is None:
        return

    print_inorder(root.left)  # first recur on left child
    print("%d " % root.data)  # then print the data of node
    print_inorder(root.right)  # now recur on right child


if __name__ == '__main__':
    # Create following Binary Tree
    #          1
    #        /   \
    #       1     0
    #      / \   / \
    #     0   1 1   1
    #

    root = Node(0)
    root.left = Node(1)
    root.right = Node(0)
    root.left.left = Node(0)
    root.left.right = Node(1)
    root.right.left = Node(1)
    root.right.right = Node(1)
    print("\n Inorder traversal before conversion ")
    print_inorder(root)

    convert_tree(root)

    print("\n Inorder traversal after conversion ")
    print_inorder(root)

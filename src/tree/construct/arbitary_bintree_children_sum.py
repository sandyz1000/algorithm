"""
Convert an arbitrary Binary Tree to a tree that holds Children Sum Property

Question: Given an arbitrary binary tree, convert it to a binary tree that holds Children Sum
Property. You can only increment data values in any node (You cannot change structure of tree and
cannot decrement value of any node).

---------------------------------------------------
Example:
---------------------------------------------------
The below tree doesn't hold the children sum property, convert it to a tree that holds
the property.

             50
           /     \
         /         \
       7             2
     / \             /\
   /     \          /   \
  3        5      1      30

"""
from __future__ import print_function, unicode_literals
# Program to convert an aribitary binary tree to a tree that holds children sum property
# Time Complexity: O(n^2), Worst case complexity is for a skewed tree such that nodes are
# in decreasing order from root to leaf.

from collections import namedtuple


class Node(object):
    def __init__(self, data, left=None, right=None):
        self.data = data
        self.left = left
        self.right = right


def convert_tree(node):
    """
    ---------------------------------------------------
    Algorithm:
    ---------------------------------------------------
    Traverse given tree in post order to convert it, i.e., first change left and right children
    to hold the children sum property then change the parent node.

    Let difference between node's data and children sum be diff.
    diff = node's children sum - node's data

    1) If diff is 0 then nothing needs to be done.

    2) If diff > 0 ( node's data is smaller than node's children sum) increment the node's data by
    diff.

    3) If diff < 0 (node's data is greater than the node's children sum) then increment one
    child's data. We can choose to increment either left or right child if they both are not
    NULL. Let us always first increment the left child. Incrementing a child changes the
    subtree's children sum property so we need to change left subtree also. So we recursively
    increment the left child. If left child is empty then we recursively call increment() for
    right child. Let us run the algorithm for the given example.

    First convert the left subtree (increment 7 to 8).

                 50
               /     \
             /         \
           8             2
         / \             /\
       /     \          /   \
      3        5      1      30

    Then convert the right subtree (increment 2 to 31)

              50
            /    \
          /        \
        8            31
       / \           / \
     /     \       /     \
    3       5    1       30

    Now convert the root, we have to increment left subtree for converting the root.

              50
            /    \
          /        \
        19           31
       / \           /  \
     /     \       /      \
    14      5     1       30

    Please note the last step - we have incremented 8 to 19, and to fix the subtree we have
    incremented 3 to 14.

    This function changes a tree to to hold children sum property
    :param node: Node
    :return:
    """
    left_data, right_data = 0, 0

    # If tree is empty or it's a leaf node then return true
    if node is None or (node.left is None and node.right is None):
        return None
    else:  # convert left and right subtrees
        convert_tree(node.left)
        convert_tree(node.right)

    # If left child is not present then 0 is used as data of left child
    if node.left is not None:
        left_data = node.left.data
    # If right child is not present then 0 is used as data of right child
    if node.right is not None:
        right_data = node.right.data

    # get the diff of node's data and children sum
    diff = left_data + right_data - node.data

    # If node's children sum is greater than the node's data
    if diff > 0:
        node.data = node.data + diff

    # THIS IS TRICKY --> If node's data is greater than children sum,
    # then increment subtree by diff
    if diff < 0:
        increment(node, -diff)  # -diff is used to make diff positive


def increment(node, diff):
    """This function is used to increment subtree by diff"""
    # IF left child is not NULL then increment it
    if node.left is not None:
        node.left.data = node.left.data + diff
        # Recursively call to fix the descendants of node->left
        increment(node.left, diff)

    # Else increment right child
    elif node.right is not None:
        node.right.data = node.right.data + diff
        # Recursively call to fix the descendants of node->right
        increment(node.right, diff)


def printInorder(node):
    """Given a binary tree, printInorder() prints out its inorder traversal"""
    if node is None:
        return

    # first recur on left child
    printInorder(node.left)
    # then print the data of node
    print("%d " % node.data)
    # now recur on right child
    printInorder(node.right)


if __name__ == '__main__':
    # Inorder traversal before conversion is :
    # 3 7 5 50 1 2 30
    # Inorder traversal after conversion is :
    # 14 19 5 50 1 31 30

    root = Node(50)
    root.left = Node(7)
    root.right = Node(2)
    root.left.left = Node(3)
    root.left.right = Node(5)
    root.right.left = Node(1)
    root.right.right = Node(30)

    print("\n Inorder traversal before conversion ")
    printInorder(root)
    convert_tree(root)
    print("\n Inorder traversal after conversion ")
    printInorder(root)

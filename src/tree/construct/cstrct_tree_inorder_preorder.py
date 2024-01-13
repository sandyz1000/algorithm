"""
Construct Tree from given Inorder and Preorder traversals
Let us consider the below traversals:

Inorder sequence: D B E A F C
Preorder sequence: A B D E C F

In a Preorder sequence, leftmost element is the root of the tree. So we know 'A' is root for given
sequences. By searching 'A' in Inorder sequence, we can find out all elements on left side of 'A'
are in left subtree and elements on right are in right subtree. So we know below structure now.

                 A
               /   \
             /       \
           D B E     F C

We recursively follow above steps and get the following tree.

                 A
               /   \
             /      \
            B        C
           / \      /
          /   \    /
         D     E  F
"""
from __future__ import print_function


# Python program to construct tree using inorder and preorder traversals

# Time Complexity: O(n^2). Worst case occurs when tree is left skewed. Example Preorder and
# Inorder traversals for worst case are {A, B, C, D} and {D, C, B, A}.

# A binary tree node
class Node:
    def __init__(self, data):
        self.data = data
        self.left = None
        self.right = None


def build_tree(in_order, pre_order, in_strt, in_end):
    """
    Recursive function to construct binary of size len from Inorder traversal in[] and Preorder
    traversal pre[].  Initial values of inStrt and inEnd should be 0 and len -1.  The function
    doesn't do any error checking for cases where inorder and preorder do not form a tree
    :param in_order:
    :param pre_order:
    :param in_strt:
    :param in_end:
    :return:
    """
    if in_strt > in_end:
        return None

    # Pick current node from Preorder traversal using preIndex and increment preIndex
    tNode = Node(pre_order[build_tree.preIndex])
    build_tree.preIndex += 1

    # If this node has no children then return
    if in_strt == in_end:
        return tNode

    # Else find the index of this node in Inorder traversal
    inIndex = search(in_order, in_strt, in_end, tNode.data)

    # Using index in Inorder Traversal, construct left and right subtrees
    tNode.left = build_tree(in_order, pre_order, in_strt, inIndex - 1)
    tNode.right = build_tree(in_order, pre_order, inIndex + 1, in_end)

    return tNode


def search(arr, start, end, value):
    """
    UTILITY FUNCTIONS
    Function to find index of vaue in arr[start...end]
    The function assumes that value is rpesent in inOrder[]
    :param arr: list(int)
    :param start: int
    :param end: int
    :param value: int
    :return:
    """
    for i in range(start, end + 1):
        if arr[i] == value:
            return i


def print_inorder(node):
    if node is None:
        return
    print_inorder(node.left)  # first recur on left child
    print(node.data)  # then print the data of node
    print_inorder(node.right)  # now recur on right child


if __name__ == '__main__':
    inOrder = ['D', 'B', 'E', 'A', 'F', 'C']
    preOrder = ['A', 'B', 'D', 'E', 'C', 'F']
    # Static variable preIndex
    build_tree.preIndex = 0
    root = build_tree(inOrder, preOrder, 0, len(inOrder) - 1)

    # Let us test the build tree by printing Inorder traversal
    print("Inorder traversal of the constructed tree is", print_inorder(root))

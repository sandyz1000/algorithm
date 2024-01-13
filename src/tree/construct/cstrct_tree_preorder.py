"""
Construct a special tree from given preorder traversal
Given an array 'pre[]' that represents Preorder traversal of a spacial binary tree where every node
has either 0 or 2 children. One more array ‘preLN[]’ is given which has only two possible values
'L' and 'N'. The value 'L' in 'preLN[]' indicates that the corresponding node in Binary Tree is a
leaf node and value 'N' indicates that the corresponding node is non-leaf node. Write a function
to construct the tree from the given two arrays.

Source: Amazon Interview Question

Example:
--------------------------------

Input:  pre = [10, 30, 20, 5, 15], preLN = ['N', 'N', 'L', 'L', 'L']

Output: Root of following tree
          10
         /  \
        30   15
       /  \
      20   5

"""
from __future__ import print_function

# The first element in pre[] will always be root. So we can easily figure out root. If left
# subtree is empty, the right subtree must also be empty and preLN[] entry for root must be ‘L’.
# We can simply create a node and return it. If left and right subtrees are not empty,
# then recursively call for left and right subtrees and link the returned nodes to root. A
# program to construct Binary Tree from preorder traversal

# Time Complexity: O(n)


class Node:
    def __init__(self, data, left=None, right=None):
        self.data = data
        self.left = left
        self.right = right


class IndexPointer:
    def __init__(self, index):
        self.index = index


def construct_tree_util(pre, pre_ln, indexref, n):
    """
    A recursive function to create a Binary Tree from given pre[]
    preLN[] arrays. The function returns root of tree. index_ptr is used
    to update index values in recursive calls. index must be initially passed as 0
    :param pre: list(int)
    :param pre_ln: list(str)
    :param indexref: int
    :param n: int
    :return:
    """
    index = indexref.get_index  # store the current value of index in pre[]

    # Base Case: All nodes are constructed
    if index == n:
        return None

    # Allocate memory for this node and increment index for subsequent recursive calls
    temp = Node(pre[indexref.get_index])
    indexref.get_index += 1

    # If this is an internal node, construct left and right subtrees and link the subtrees
    if pre_ln[index] == 'N':
        temp.left = construct_tree_util(pre, pre_ln, indexref, n)
        temp.right = construct_tree_util(pre, pre_ln, indexref, n)

    return temp


def construct_tree(pre, preLN, n):
    """
    :param pre: list(int)
    :param preLN: list(str)
    :param n: int
    :return:
    """
    # Initialize index as 0. Value of index is used in recursion to maintain the
    # current index in pre[] and preLN[] arrays.
    indexref = IndexPointer(0)
    return construct_tree_util(pre, preLN, indexref, n)


# This function is used only for testing
def printInorder(node):
    if node is None:
        return

    printInorder(node.left)  # first recur on left child
    print("%d " % node.data)  # then print the data of node
    printInorder(node.right)  # now recur on right child


if __name__ == '__main__':
    # Constructing tree given in the above figure
    #       10
    #      /  \
    #     30   15
    #    /  \
    #   20   5
    pre = [10, 30, 20, 5, 15]
    preLN = ['N', 'N', 'L', 'L', 'L']
    n = len(pre)
    # construct the above tree
    root = construct_tree(pre, preLN, n)

    # Test the constructed tree
    print("Following is Inorder Traversal of the Constructed Binary Tree: \n")
    printInorder(root)

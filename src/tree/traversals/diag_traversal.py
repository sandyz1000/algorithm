"""
Diagonal Traversal of Binary Tree
Consider lines of slope -1 passing between nodes. Given a Binary Tree, print all diagonal elements
in a binary tree belonging to same line.

Example:
- - - - - - - - - - - - - - - - - - - -
Input : Root of below tree

        8
      /  \
     3   10
   /  \    \
  1   6    14
     / \   /
    4   7 13

Output :
Diagonal Traversal of binary tree :
8 10 14
3 6 7 13
1 4
- - - - - - - - - - - - - - - - - - - -

"""
from __future__ import print_function
from collections import defaultdict

# Python program for diagonal traversal of Binary Tree


# A binary tree node
class Node(object):
    # Constructor to create a new binary tree node
    def __init__(self, data):
        self.data = data
        self.left = None
        self.right = None


def diagonal_print_util(root, d, diagonal_print_map):
    """
    root - root of the binary tree
    d -  distance of current line from rightmost-topmost slope.
    diagonalPrint - multimap to store Diagonal elements (Passed by Reference)

    :param root:
    :param d:
    :param diagonal_print_map:
    :return:
    """
    # Base Case
    if root is None:
        return

    # Store all nodes of same line together as a vector
    diagonal_print_map[d].append(root.data)

    # Increase the vertical distance if left child
    diagonal_print_util(root.left, d + 1, diagonal_print_map)

    # Vertical distance remains same for right child
    diagonal_print_util(root.right, d, diagonal_print_map)


def diagonal_print(root):
    """
    The idea is to use map. We use different slope distances and use them as key in map.
    Value in map is vector (or dynamic array) of nodes. We traverse the tree to store values
    in map. Once map is built, we print contents of it.

    Print diagonal traversal of given binary tree
    :param root:
    :return:
    """
    # Create a dict to store diagnoal elements
    diagonalPrintMap = defaultdict(list)

    # Find the diagonal traversal
    diagonal_print_util(root, 0, diagonalPrintMap)

    print("Diagonal Traversal of binary tree :\n")
    for i in diagonalPrintMap:
        for j in diagonalPrintMap[i]:
            print(j, end=" ")
        print("")


if __name__ == '__main__':
    root = Node(8)
    root.left = Node(3)
    root.right = Node(10)
    root.left.left = Node(1)
    root.left.right = Node(6)
    root.right.right = Node(14)
    root.right.right.left = Node(13)
    root.left.right.left = Node(4)
    root.left.right.right = Node(7)

    diagonal_print(root)

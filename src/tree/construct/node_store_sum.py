"""
Change a Binary Tree so that every node stores sum of all nodes in left subtree
Given a Binary Tree, change the value in each node to sum of all the values in the nodes in the
left subtree including its own.

------------------------------------------
Example:
------------------------------------------
Input:
     1
   /   \
 2      3

Output:
    3
  /   \
 2     3


Input:
       1
      / \
     2   3
    / \   \
   4   5   6

Output:
      12
     / \
    6   3
   / \   \
  4   5   6

"""
from __future__ import print_function
# Python program to store  sum of nodes in left subtree in every node
# Time Complexity: O(n)


class Node:
    def __init__(self, data, left=None, right=None):
        self.data = data
        self.left = left
        self.right = right


def updatetree(root):
    """
    Function to modify a Binary Tree so that every node stores sum of values in its left child
    including its own value"""
    if not root:  # Base cases
        return 0

    if root.left is None and root.right is None:
        return root.data

    # Update left and right subtrees
    leftsum = updatetree(root.left)
    rightsum = updatetree(root.right)

    # Add leftsum to current node
    root.data += leftsum

    # Return sum of values under root
    return root.data + rightsum


def inorder(node):
    """Utility function to do inorder traversal"""
    if node is None:
        return
    inorder(node.left)
    print("%d " % node.data)
    inorder(node.right)


if __name__ == '__main__':
    # Let us construct below tree
    #             1
    #            / \
    #           2   3
    #          / \   \
    #         4   5   6

    root = Node(1)
    root.left = Node(2)
    root.right = Node(3)
    root.left.left = Node(4)
    root.left.right = Node(5)
    root.right.right = Node(6)
    updatetree(root)

    print("Inorder traversal of the modified tree is \n")
    inorder(root)

""" Convert a given tree to its Sum Tree

Given a Binary Tree where each node has positive and negative values. Convert this to a tree where
each node contains the sum of the left and right sub trees in the original tree.
The values of leaf nodes are changed to 0.

------------------------------------------------
Example:
------------------------------------------------
The following tree

                  10
               /      \
             -2       6
            /  \     / \
           8   -4   7  5

should be changed to

                20(4-2+12+6)
               /      \
            4(8-4)    12(7+5)
           /   \      /  \
         0      0    0    0

"""
from __future__ import print_function


# Time Complexity: The solution involves a simple traversal of the given tree. So the time
# complexity is O(n) where n is the number of nodes in the given Binary Tree.

class Node(object):
    def __init__(self, data, left=None, right=None):
        self.data = data
        self.left = left
        self.right = right


def to_sum_tree(node):
    """
    ------------------------------------------------
    Explanation:
    ------------------------------------------------
    Do a traversal of the given tree. In the traversal, store the old value of the current node,
    recursively call for left and right subtrees and change the value of current node as sum of the
    values returned by the recursive calls. Finally return the sum of new value and value (which is
    sum of values in the subtree rooted with this node).

    Convert a given tree to a tree where every node contains sum of values of nodes in left
    and right subtrees in the original tree
    """
    if node is None:  # Base case
        return 0

    old_val = node.data  # Store the old value
    # Recursively call for left and right subtrees and store the sum as new value of this node
    node.data = to_sum_tree(node.left) + to_sum_tree(node.right)
    # Return the sum of values of nodes in left and right subtrees and old_value of this node
    return node.data + old_val


def printInorder(node):
    """A utility function to print inorder traversal of a Binary Tree"""
    if node is None:
        return
    printInorder(node.left)
    print("%d " % node.data)
    printInorder(node.right)


if __name__ == '__main__':
    root = None
    # Constructing tree given in the above figure
    root = Node(10)
    root.left = Node(-2)
    root.right = Node(6)
    root.left.left = Node(8)
    root.left.right = Node(-4)
    root.right.left = Node(7)
    root.right.right = Node(5)

    to_sum_tree(root)

    # Print inorder traversal of the converted tree to test result of toSumTree()
    print("Inorder Traversal of the resultant tree is: \n")
    printInorder(root)

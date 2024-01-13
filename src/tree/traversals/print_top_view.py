"""
Print Nodes in Top View of Binary Tree

Top view of a binary tree is the set of nodes visible when the tree is viewed from the top. Given a binary tree,
print the top view of it. The output nodes can be printed in any order. Expected time complexity is O(n)

A node x is there in output if x is the topmost node at its horizontal distance. Horizontal distance of left child of
a node x is equal to horizontal distance of x minus 1, and that of right child is horizontal distance of x plus 1.

       1
    /     \
   2       3
  /  \    / \
 4    5  6   7
Top view of the above binary tree is
4 2 1 3 7

        1
      /   \
    2       3
      \
        4
          \
            5
             \
               6
Top view of the above binary tree is
2 1 3 6

Method:
=================================
The idea is to do something similar to vertical Order Traversal. Like vertical Order Traversal, we need to nodes of
same horizontal distance together. We do a level order traversal so that the topmost node at a horizontal node is
visited before any other node of same horizontal distance below it. Hashing is used to check if a node at given
horizontal distance is seen or not.

"""
# Java program to print top view of Binary tree
from __future__ import print_function
from collections import deque


# Class for a tree node
class TreeNode(object):
    def __init__(self, key):
        self.key = key
        self.left, self.right = None, None


class QItem(object):
    """
    # A class to represent a queue item. The queue is used to do Level order traversal.
    # Every Queue item contains node and horizontal distance of node from root
    """

    def __init__(self, node, h):
        self.node = node
        self.hd = h


class Tree(object):
    """Class for a Binary Tree"""

    def __init__(self, node):
        self.root = node

    def print_top_view(self):
        """This method prints nodes in top view of binary tree"""

        # base case
        if self.root is None:
            return None

        # Creates an empty hashset
        _set = set()

        # Create a queue and add root to it
        _queue = deque()
        _queue.append(QItem(self.root, 0))  # Horizontal distance of root is 0

        # Standard BFS or level order traversal loop
        while len(_queue) > 0:
            # Remove the front item and get its details
            qi = _queue.popleft()
            hd = qi.hd
            n = qi.node

            # If this is the first node at its horizontal distance, then this node is in top view
            if hd not in _set:
                _set.add(hd)
                print(n.key, end=" ")

            # Enqueue left and right children of current node
            if n.left is not None:
                _queue.append(QItem(n.left, hd - 1))
            if n.right is not None:
                _queue.append(QItem(n.right, hd + 1))


if __name__ == '__main__':
    #         /* Create following Binary Tree
    #              1
    #            /  \
    #           2    3
    #            \
    #             4
    #              \
    #               5
    #                \
    #                 6*/
    root = TreeNode(1)
    root.left = TreeNode(2)
    root.right = TreeNode(3)
    root.left.right = TreeNode(4)
    root.left.right.right = TreeNode(5)
    root.left.right.right.right = TreeNode(6)
    t = Tree(root)
    print("Following are nodes in top view of Binary Tree")
    t.print_top_view()

"""
Level Order Tree Traversal
Level order traversal of a tree is breadth first traversal for the tree.

        (1)
        /  \
      (2)  (3)
      / \
    (4) (5)
"""
from __future__ import print_function
from collections import deque

# Recursive Python program for level order traversal of Binary Tree
# Time Complexity: O(n^2) in worst case.

# For a skewed tree, printGivenLevel() takes O(n) time where n is the number of nodes in the
# skewed tree. So time complexity of printLevelOrder() is
# O(n) + O(n-1) + O(n-2) + .. + O(1) which is O(n^2).

# Space Complexity: O(n) in worst case. For a skewed tree, printGivenLevel() uses O(n) space for
# call stack. For a Balanced tree, call stack uses O(log n) space, (i.e., height of the balanced tree).


class Node(object):
    # A utility function to create a new node
    def __init__(self, key):
        self.data = key
        self.left = None
        self.right = None


def print_level_order(root):
    """
    METHOD 1 (Use function to print a given level)

    Algorithm:
    There are basically two functions in this method. One is to print all nodes at a given level
    (printGivenLevel), and other is to print level order traversal of the tree (print_level_order).
    print_level_order makes use of printGivenLevel to print nodes at all levels one by one starting
    from root.

    Function to  print level order traversal of tree """
    h = height(root)
    for i in range(1, h + 1):
        print_given_level(root, i)


def print_given_level(root, level):
    """Print nodes at a given level"""
    if root is None:
        return
    if level == 1:
        print("%d" % root.data)
    elif level > 1:
        print_given_level(root.left, level - 1)
        print_given_level(root.right, level - 1)


def height(node):
    """
    Compute the height of a tree -- the number of nodes along the longest path from the
    root node down to the farthest leaf node
    :param node:
    :return:
    """
    if node is None:
        return 0
    else:
        # Compute the height of each subtree
        lheight = height(node.left)
        rheight = height(node.right)

        # Use the larger one
        # return lheight + 1 if lheight > rheight else rheight + 1
        return max(lheight, rheight) + 1


def print_bfs(root):
    if root is None:
        return
    queue = deque()
    queue.append(root)

    while(len(queue) > 0):
        # Print front of queue and remove it from queue
        node = queue.popleft()
        print(node.data)

        # Enqueue left child
        if node.left is not None:
            queue.append(node.left)

        # Enqueue right child
        if node.right is not None:
            queue.append(node.right)


if __name__ == '__main__':
    root = Node(1)
    root.left = Node(2)
    root.right = Node(3)
    root.left.left = Node(4)
    root.left.right = Node(5)
    print("Level order traversal of binary tree is -", print_level_order(root))

    root = Node(1)
    root.left = Node(2)
    root.right = Node(3)
    root.left.left = Node(4)
    root.left.right = Node(5)

    print("Level Order Traversal of binary tree is -")
    print_bfs(root)

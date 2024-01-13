"""
Bottom View of a Binary Tree

Given a Binary Tree, we need to print the bottom view from left to right. A node x is there in output if x is the
bottommost node at its horizontal distance. Horizontal distance of left child of a node x is equal to horizontal
distance of x minus 1, and that of right child is horizontal distance of x plus 1.

Examples:

                      20
                    /    \
                  8       22
                /   \      \
              5      3      25
                    / \
                  10    14

For the above tree the output should be 5, 10, 3, 14, 25.

If there are multiple bottom-most nodes for a horizontal distance from root, then print the later one in level
traversal. For example, in the below diagram, 3 and 4 are both the bottom-most nodes at horizontal distance 0,
we need to print 4.


                      20
                    /    \
                  8       22
                /   \    /   \
              5      3 4     25
                    / \
                  10    14
For the above tree the output should be 5, 10, 4, 14, 25.


Method 1 - Using Queue
==============================
The following are steps to print Bottom View of Binary Tree.

1. We put tree nodes in a queue for the level order traversal.

2. Start with the horizontal distance(hd) 0 of the root node, keep on adding left child to queue along with the
horizontal distance as hd-1 and right child as hd+1.

3. Also, use a _map which stores key value pair sorted on key.

4. Every time, we encounter a new horizontal distance or an existing horizontal distance put the node data for the
horizontal distance as key. For the first time it will add to the map, next time it will replace the value.
This will make sure that the bottom most element for that horizontal distance is present in the map and if you see
the tree from beneath that you will see that element.

"""
from __future__ import print_function
import sys
from collections import deque


# Java Program to print Bottom View of Binary Tree


class Node(object):
    """Tree node class"""

    def __init__(self, key):
        self.data = key  # data of the node
        self.hd = sys.maxint  # horizontal distance of the node
        self.left, self.right = None, None  # left and right references


class Tree(object):

    def __init__(self, node):
        self.root = node

    def bottom_view(self):
        """Method that prints the bottom view."""
        if self.root is None:
            return None

        # Initialize a variable 'hd' with 0 for the root element.
        hd = 0

        # _map which stores key value pair sorted on key value
        _map = {}

        # Queue to store tree nodes in level order traversal
        _queue = deque()

        # Assign initialized horizontal distance value to root node and add it to the queue.
        self.root.hd = hd
        _queue.append(self.root)

        # Loop until the queue is empty (standard level order loop)
        while len(_queue) > 0:
            temp = _queue.popleft()

            # Extract the horizontal distance value from the dequeue tree node.
            hd = temp.hd

            # Put the dequeue tree node to TreeMap having key as horizontal distance. Every time we find a node
            # having same horizontal distance we need to replace the data in the map.
            _map[hd] = temp.data

            # If the dequeue node has a left child add it to the queue with a horizontal distance hd-1.
            if temp.left is not None:
                temp.left.hd = hd - 1
                _queue.append(temp.left)

            # If the dequeue node has a right child add it to the queue with a horizontal distance hd+1.
            if temp.right is not None:
                temp.right.hd = hd + 1
                _queue.append(temp.right)

        for k in sorted(_map.keys()):
            print(_map[k], end=" ")


if __name__ == '__main__':
    root = Node(20)
    root.left = Node(8)
    root.right = Node(22)
    root.left.left = Node(5)
    root.left.right = Node(3)
    root.right.left = Node(4)
    root.right.right = Node(25)
    root.left.right.left = Node(10)
    root.left.right.right = Node(14)
    tree = Tree(root)
    print("Bottom view of the given binary tree:")
    tree.bottom_view()

"""
Perfect Binary Tree Specific Level Order Traversal

In standard Level Order Traversal, we enqueue root into a queue 1st, then we dequeue ONE node
from queue, process (print) it, enqueue its children into queue. We keep doing this until queue
is empty.

Approach 1:
We can do standard level order traversal here too but instead of printing nodes directly,
we have to store nodes in current level in a temporary array or list 1st and then take nodes from
alternate ends (left and right) and print nodes. Keep repeating this for all levels.
This approach takes more memory than standard traversal.

Approach 2:

The standard level order traversal idea will slightly change here. Instead of processing ONE node
at a time, we will process TWO nodes at a time. And while pushing children into queue,
the enqueue order will be: 1st node's left child, 2nd node's right child, 1st node's right child
and 2nd node's left child.  """

import queue


class Stack(object):
    def __init__(self):
        self.stack = []

    def push(self, item):
        self.stack.append(item)

    def pop(self):
        return self.stack.pop()

    def empty(self):
        return len(self.stack) == 0


# Python program for special order traversal. A binary tree node
class Node:
    # A constructor for making a new node
    def __init__(self, key):
        self.data = key
        self.left = None
        self.right = None


# Top down approach
# Given a perfect binary tree print its node in specific order
def level_order_topdown(root):
    if root is None:
        return

    # Let us print root and next level first
    print(root.data, end=" ")

    # Since it is perfect Binary tree, one of the node is needed to be checked
    if root.left is not None:
        print(root.left.data, end=" ")
        print(root.right.data, end=" ")

    # Do anything more if there are nodes at next level in given perfect Binary Tree
    if root.left.left is None:
        return

    # Create a queue and enqueue left and right children of root
    q = [root.left, root.right]
    # We process two nodes at a time, so we need two variables to stroe two front items of queue
    while len(q) > 0:  # Traversal loop
        # Pop two items from queue
        first = q.pop(0)
        second = q.pop(0)
        # Print children of first and second in reverse order
        print(first.left.data, end=" ")
        print(second.right.data, end=" ")
        print(first.right.data, end=" ")
        print(second.left.data, end=" ")
        # If first and second have grandchildren, enqueue them in reverse order
        if first.left.left is not None:
            q.append(first.left)
            q.append(second.right)
            q.append(first.right)
            q.append(second.left)


# Bottoms up approach
# Python program for special order traversal
# A binary tree node has data, pointer to left child and a pointer to right child
def levelorder_util(root, s):
    """
    Helper function that allocates a new node with the given data and NULL
    left and right pointers.
    :param root: Node
    :param s: Stack
    :return:
    """
    if root is None:
        return

    # Create a queue and enqueue left and right children of root
    q = queue.Queue()
    q.put(root.left)
    q.put(root.right)

    # We process two nodes at a time, so we need two variables to store two front items of queue
    while not q.empty():  # traversal loop
        # Pop two items from queue
        first = q.get()
        second = q.get()

        # Push first and second node's chilren in reverse order
        s.push(second.left)
        s.push(first.right)
        s.push(second.right)
        s.push(first.left)

        # If first and second have grandchildren, enqueue them in specific order
        if first.left.left is not None:
            q.put(first.right)
            q.put(second.left)
            q.put(first.left)
            q.put(second.right)


# Given a perfect binary tree, print its nodes in specific level order
def level_order_bottomsup(root):
    # create a stack and push root
    s = Stack()
    s.push(root)  # Push level 1 and level 2 nodes in stack

    # Since it is perfect Binary Tree, right is not checked
    if root.left is not None:
        s.push(root.right)
        s.push(root.left)

    # Do anything more if there are nodes at next level in given perfect Binary Tree
    if root.left.left is not None:
        levelorder_util(root, s)

    # Finally pop all Nodes from stack and prints them.
    while not s.empty():
        print(s.pop().data, end=" ")


if __name__ == '__main__':
    # Perfect Binary Tree of Height 4
    root = Node(1)

    root.left = Node(2)
    root.right = Node(3)

    root.left.left = Node(4)
    root.left.right = Node(5)
    root.right.left = Node(6)
    root.right.right = Node(7)

    root.left.left.left = Node(8)
    root.left.left.right = Node(9)
    root.left.right.left = Node(10)
    root.left.right.right = Node(11)
    root.right.left.left = Node(12)
    root.right.left.right = Node(13)
    root.right.right.left = Node(14)
    root.right.right.right = Node(15)

    root.left.left.left.left = Node(16)
    root.left.left.left.right = Node(17)
    root.left.left.right.left = Node(18)
    root.left.left.right.right = Node(19)
    root.left.right.left.left = Node(20)
    root.left.right.left.right = Node(21)
    root.left.right.right.left = Node(22)
    root.left.right.right.right = Node(23)
    root.right.left.left.left = Node(24)
    root.right.left.left.right = Node(25)
    root.right.left.right.left = Node(26)
    root.right.left.right.right = Node(27)
    root.right.right.left.left = Node(28)
    root.right.right.left.right = Node(29)
    root.right.right.right.left = Node(30)
    root.right.right.right.right = Node(31)

    print("Specific Level Order traversal of binary tree is")

    print("\nLevel order bottoms up approach:")
    level_order_bottomsup(root)
    print("\n\n")
    print("\nLevel order top down approach:")
    level_order_topdown(root)

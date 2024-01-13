"""
Print level order traversal line by line | Set 1
Given a binary tree, print level order traversal in a way that nodes of all levels are printed in
separate lines.

---------------------------------------------------------
Example:
---------------------------------------------------------

          1
       /     \
      2       3
    /   \       \
   4     5       6
        /  \     /
       7    8   9

Output for above tree should be
1
2 3
4 5 6
7 8 9
"""
from __future__ import print_function
import queue


class Node:
    def __init__(self, data, left=None, right=None):
        self.data = data
        self.left = left
        self.right = right


class LevelOrderTraversal1:
    """
    Iterative program to print levels line by line Using Queue

    Time complexity of this method is O(n) where n is number of nodes in given binary tree. """

    def level_order(self, root):
        """Iterative method to do level order traversal line by line"""
        if root is None:  # Base Case
            return

        # Create an empty queue for level order traversals
        q = queue.Queue()

        # Enqueue Root and initialize height
        q.put(root)

        while True:
            # node_count (queue size) indicates number of nodes at current lelvel.
            node_count = q.qsize()
            if node_count == 0:
                break

            # Dequeue all nodes of current level and Enqueue all nodes of next level
            while node_count > 0:
                node = q.get()
                print(node.data, end=" ")
                if node.left is not None:
                    q.put(node.left)
                if node.right is not None:
                    q.put(node.right)
                node_count -= 1
            print("")

    def level_order_sum(self, root):
        if root is None:
            return
        q = queue.Queue()
        q.put(root)

        while q:
            size = len(q)
            summ = 0
            for _ in range(size):
                node = q.get()
                summ += node.data
                if node.left is not None:
                    q.put(node.left)
                if node.right is not None:
                    q.put(node.right)
            print(f"Sum: {summ}") 


class LevelOrderTraversal2:
    """
    Level order traversal line by line | Set 2 (Using Two Queues)
    Time Complexity : O(n)
    Python program to do level order traversal line by line

    Prints level order traversal line by line using two queues. """

    def level_order(self, root):
        q1 = queue.Queue()
        q2 = queue.Queue()

        if root is None:
            return

        # Pushing first level node into first queue
        q1.put(root)
        # Executing loop till both the queues become empty

        while not q1.empty() or not q2.empty():
            while not q1.empty():
                first = q1.get()
                # Pushing left child of current node in first queue into second queue
                if first.left is not None:
                    q2.put(first.left)

                # pushing right child of current node in first queue into second queue
                if first.right is not None:
                    q2.put(first.right)
                print(first.data, end=" ")
            print("")

            while not q2.empty():
                # pushing left child of current node in second queue into first queue
                second = q2.get()
                if second.left is not None:
                    q1.put(second.left)

                # pushing right child of current node in second queue into first queue
                if second.right is not None:
                    q1.put(second.right)
                print(second.data, end=" ")
            print("")


if __name__ == '__main__':
    # Let us create binary tree shown in above diagram
    root = Node(1)
    root.left = Node(2)
    root.right = Node(3)
    root.left.left = Node(4)
    root.left.right = Node(5)
    root.right.right = Node(6)

    traversal = LevelOrderTraversal1()
    print("Method-1: Print level order: ", traversal.level_order(root))

    traversal = LevelOrderTraversal2()
    print("Method-2: Print level order: ", traversal.level_order(root))

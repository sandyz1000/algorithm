"""
Reverse Level Order Traversal
We have discussed level order traversal of a post in previous post. The idea is to print last
level first, then second last level, and so on. Like Level order traversal, every level is printed
from left to right.

        (1)
        /  \
      (2)  (3)
      / \
    (4) (5)

"""
from __future__ import print_function


class Node:
    # Constructor to create a new node
    def __init__(self, data):
        self.data = data
        self.left = None
        self.right = None


class ReverseLevelOrder:
    """
    A recursive Python program to print REVERSE level order traversal

    METHOD 1 (Recursive function to print a given level)

    We can easily modify the method 1 of the normal level order traversal. In method 1, we have a
    method printGivenLevel() which prints a given level number. The only thing we need to change
    is, instead of calling printGivenLevel() from first level to last level, we call it from last
    level to first level.

    Time Complexity:
    The worst case time complexity of this method is O(n^2). For a skewed tree,
    printGivenLevel() takes O(n) time where n is the number of nodes in the skewed tree. So time
    complexity of printLevelOrder() is O(n) + O(n-1) + O(n-2) + .. + O(1) which is O(n^2).
    """

    def reverse_level_order(self, root):
        """Function to print reverse level order traversal"""
        h = self.height(root)
        for i in reversed(range(1, h + 1)):
            self.print_given_level(root, i)

    def print_given_level(self, root, level):
        """Print nodes at a given level"""
        if root is None:
            return
        if level == 1:
            print(root.data)

        elif level > 1:
            self.print_given_level(root.left, level - 1)
            self.print_given_level(root.right, level - 1)

    def height(self, node):
        """
        Compute the height of a tree-- the number of nodes along the longest path from the
        root node down to the farthest leaf node
        """
        if node is None:
            return 0
        else:

            # Compute the height of each subtree
            lheight = self.height(node.left)
            rheight = self.height(node.right)

            # Use the larger one
            if lheight > rheight:
                return lheight + 1
            else:
                return rheight + 1


class ReverseLevelOrder2:
    """
    METHOD 2 (Using Queue and Stack)

    The method 2 of normal level order traversal can also be easily modified to print level order
    traversal in reverse order. The idea is to use a stack to get the reverse level order. If we do
    normal level order traversal and instead of printing a node, push the node to a stack and then
    print contents of stack, we get "5 4 3 2 1" for above example tree, but output should be "4 5
    2 3 1". So to get the correct sequence (left to right at every level), we process children of a
     node in reverse order, we first push the right subtree to stack, then left subtree.

    Time Complexity: O(n) where n is number of nodes in the binary tree.

    Given a binary tree, print its nodes in reverse level order

    """

    def reverse_level_order(self, root):
        """Python program to print REVERSE level order traversal using stack and queue"""
        S = []
        Q = []
        Q.append(root)

        # Do something like normal level order traversal order.
        # Following are the differences with normal level order
        # traversal:
        # 1) Instead of printing a node, we push the node to stack
        # 2) Right subtree is visited before left subtree
        while len(Q) > 0:
            root = Q.pop(0)  # Dequeue node and make it root
            S.append(root)

            # Enqueue right child
            if root.right:
                Q.append(root.right)

            # Enqueue left child
            if root.left:
                Q.append(root.left)

        # Now pop all items from stack one by one and print them
        while len(S) > 0:
            root = S.pop()
            print(root.data)


if __name__ == '__main__':
    root = Node(1)
    root.left = Node(2)
    root.right = Node(3)
    root.left.left = Node(4)
    root.left.right = Node(5)
    # Level Order traversal of binary tree is
    reverse = ReverseLevelOrder()
    print("\nMethod-1: --- \n ")
    reverse.reverse_level_order(root)

    reverse = ReverseLevelOrder2()
    print("\nMethod-2: --- \n ")
    reverse.reverse_level_order(root)

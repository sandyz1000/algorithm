"""
Convert a BST to a Binary Tree such that sum of all greater keys is added to every key

Given a Binary Search Tree (BST), convert it to a Binary Tree such that every key of the original
BST is changed to key plus sum of all greater keys in BST.

------------------------------------------
Examples:
------------------------------------------
Input: Root of following BST
              5
            /   \
           2     13

Output: The given BST is converted to following Binary Tree
              18
            /   \
          20     13

"""
from __future__ import print_function

# Program to change a BST to Binary Tree such that key of a node becomes
# original key plus sum of all greater keys in BST
# Time Complexity: O(n) where n is the number of nodes in given Binary Search Tree.


class SumPointer(object):
    def __init__(self, summ):
        self.sum = summ


class Node(object):
    """A BST node has key, left child and right child"""

    def __init__(self, key, left=None, right=None):
        self.key = key
        self.left = left
        self.right = right


class BinaryTree(object):
    root = None
    sum_ptr = SumPointer(0)

    def add_greater_util(self, root, sum_ptr):
        """
        A recursive function that traverses the given BST in reverse inorder and
        for every key, adds all greater keys to it

        :param root: Node
        :param sum_ptr: SumPointer
        :return:
        """
        if root is None:  # Base Case
            return

        # Recur for right subtree first so that sum of all greater nodes is stored at sum_ptr
        self.add_greater_util(root.right, sum_ptr)
        # Update the value at sum_ptr
        sum_ptr.sum += root.key
        # Update key of this node
        root.key = sum_ptr.sum
        # Recur for left subtree so that the updated sum is added to smaller nodes
        self.add_greater_util(root.left, sum_ptr)

    def add_greater(self, root):
        """
        A wrapper over addGreaterUtil(). It initializes sum and calls
        addGreaterUtil() to recursive upodate and use value of sum

        :param root: Node
        :return:
        """
        self.add_greater_util(root, self.sum_ptr)

    def print_inorder(self, node):
        """# A utility function to print inorder traversal of Binary Tree"""
        if node is None:
            return
        self.print_inorder(node.left)
        print("%d " % node.key)
        self.print_inorder(node.right)


if __name__ == '__main__':
    #   Create following BST
    #           5
    #         /   \
    #        2     13

    tree = BinaryTree()
    tree.root = Node(5, Node(2), Node(13))
    print("\nInorder traversal of the given tree\n")
    tree.print_inorder(tree.root)
    tree.add_greater(tree.root)
    print("\n Inorder traversal of the modified tree\n")
    tree.print_inorder(tree.root)

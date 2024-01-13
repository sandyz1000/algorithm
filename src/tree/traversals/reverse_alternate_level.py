"""
Reverse alternate levels of a perfect binary tree

Given a Perfect Binary Tree, reverse the alternate level nodes of the binary tree.


Given tree:
               a
            /     \
           b       c
         /  \     /  \
        d    e    f    g
       / \  / \  / \  / \
       h  i j  k l  m  n  o

Modified tree:
               a
            /     \
           c       b
         /  \     /  \
        d    e    f    g
       / \  / \  / \  / \
      o  n m  l k  j  i  h

Method 1 (Simple)

A simple solution is to do following steps.
1) Access nodes level by level.
2) If current level is odd, then store nodes of this level in an array.
3) Reverse the array and store elements back in tree.


Method 2 (Using Two Traversals)

Another is to do two inorder traversals. Following are steps to be followed.

1) Traverse the given tree in inorder fashion and store all odd level nodes in an auxiliary array.
For the above example given tree, contents of array become {h, i, b, j, k, l, m, c, n, o}
2) Reverse the array. The array now becomes {o, n, c, m, l, k, j, b, i, h}
3) Traverse the tree again inorder fashion. While traversing the tree, one by one take elements from array and store
elements from array to every odd level traversed node.
For the above example, we traverse 'h' first in above array and replace 'h' with 'o'. Then we traverse 'i' and
replace it with n.

"""
from __future__ import print_function


class Node(object):
    """Java program to reverse alternate levels of perfect binary tree"""

    # A utility function to create a new node
    def __init__(self, key):
        self.data = key
        self.left = None
        self.right = None


class Index:
    """class to access index value by reference"""

    def __init__(self, index=0):
        self.index = index


class BinaryTree(object):
    def __init__(self, root=None):
        self.root = root
        self.index = Index()

    def store_alternate(self, node, arr, index, l):

        # base case
        if node is None:
            return None

        # store elements of left subtree
        self.store_alternate(node.left, arr, index, l + 1)

        # store this node only if level is odd
        if l % 2 != 0:
            arr[index.index] = node.data
            index.index += 1

        self.store_alternate(node.right, arr, index, l + 1)

    def modify_tree(self, node, arr, index, l):
        """
        Function to modify Binary Tree (All odd level nodes are updated by taking elements from
        array in inorder fashion)
        :param node:
        :param arr:
        :param index:
        :param l:
        :return:
        """

        # Base case
        if node is None:
            return None

        # Update nodes in left subtree
        self.modify_tree(node.left, arr, index, l + 1)

        # Update this node only if this is an odd level node
        if l % 2 != 0:
            node.data = arr[index.index]
            index.index += 1

        # Update nodes in right subtree
        self.modify_tree(node.right, arr, index, l + 1)

    def reverse(self, arr, n):
        """
        A utility function to reverse an array from index 0 to n-1
        :param arr:
        :param n:
        :return:
        """
        l, r = 0, n - 1
        while l < r:
            arr[l], arr[r] = arr[r], arr[l]
            l += 1
            r -= 1

    def reverse_alternate(self, node):
        """The main function to reverse alternate nodes of a binary tree"""

        # Create an auxiliary array to store nodes of alternate levels
        arr = [None for i in range(100)]

        # First store nodes of alternate levels
        self.store_alternate(node, arr, self.index, 0)

        # Update tree by taking elements from array
        self.index.index = 0

        # Reverse the array
        self.reverse(arr, self.index.index)

        # Update tree by taking elements from array
        self.index.index = 0
        self.modify_tree(node, arr, self.index, 0)

    def print_inorder(self, node):
        """A utility function to print indorder traversal of a binary tree"""
        if node is None:
            return None

        self.print_inorder(node.left)
        print(node.data + " ", end=" ")
        self.print_inorder(node.right)


if __name__ == '__main__':
    tree = BinaryTree()
    tree.root = Node('a')
    tree.root.left = Node('b')
    tree.root.right = Node('c')
    tree.root.left.left = Node('d')
    tree.root.left.right = Node('e')
    tree.root.right.left = Node('f')
    tree.root.right.right = Node('g')
    tree.root.left.left.left = Node('h')
    tree.root.left.left.right = Node('i')
    tree.root.left.right.left = Node('j')
    tree.root.left.right.right = Node('k')
    tree.root.right.left.left = Node('l')
    tree.root.right.left.right = Node('m')
    tree.root.right.right.left = Node('n')
    tree.root.right.right.right = Node('o')
    print("Inorder Traversal of given tree")
    tree.print_inorder(tree.root)
    print("\n")
    tree.reverse_alternate(tree.root)
    print("Inorder Traversal of modified tree")
    tree.print_inorder(tree.root)

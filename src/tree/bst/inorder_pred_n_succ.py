"""
Inorder predecessor and successor for a given key in BST

There is BST given with root node with key part as integer only. You need to find the inorder
successor and predecessor of a given key. In case the given key is not found in BST, then return
the two values within which this key will lie. """
# Python program to find predecessor and successor in a BST
from __future__ import print_function


class Node(object):
    # Constructor to create a new node
    def __init__(self, key):
        self.key = key
        self.left = None
        self.right = None


class BinarySearchTree(object):
    def __init__(self, root=None):
        self.root = root
        self.pre = None
        self.suc = None

    def find_pre_suc(self, root, key):
        """
        This function finds predecessor and successor of key in BST
        It sets pre and suc as predecessor and successor respectively
        :param root:
        :param key:
        :return:
        """
        if root is None:  # Base Case
            return

        # If key is present at root
        if root.key == key:

            # the maximum value in left subtree is predecessor
            if root.left is not None:
                tmp = root.left
                while tmp.right:
                    tmp = tmp.right
                self.pre = tmp

            # the minimum value in right subtree is successor
            if root.right is not None:
                tmp = root.right
                while tmp.left:
                    tmp = tmp.left
                self.suc = tmp

            return

        # If key is smaller than root's key, go to left subtree
        if root.key > key:
            self.suc = root
            self.find_pre_suc(root.left, key)

        else:  # go to right subtree
            self.pre = root
            self.find_pre_suc(root.right, key)

    def insert(self, key):
        self.root = self.insert_util(self.root, key)

    def insert_util(self, node, key):
        """A utility function to insert a new node in with given key in BST"""
        if node is None:
            return Node(key)
        if key < node.key:
            node.left = self.insert_util(node.left, key)
        else:
            node.right = self.insert_util(node.right, key)

        return node


if __name__ == '__main__':
    key = 65  # Key to be searched in BST

    #   Let us create following BST
    #               50
    #            /     \
    #           30      70
    #          /  \    /  \
    #        20   40  60   80
    #

    tree = BinarySearchTree()
    tree.insert(50)
    tree.insert(30)
    tree.insert(20)
    tree.insert(40)
    tree.insert(70)
    tree.insert(60)
    tree.insert(80)

    tree.find_pre_suc(tree.root, key)

    if tree.pre is not None:
        print("Predecessor is", tree.pre.key)
    else:
        print("No Predecessor")

    if tree.suc is not None:
        print("Successor is", tree.suc.key)
    else:
        print("No Successor")

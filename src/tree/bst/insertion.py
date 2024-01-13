"""
Binary Search Tree, is a node-based binary tree data structure which has the following properties:
    1)  The left subtree of a node contains only nodes with keys less than the node's key.
    2)  The right subtree of a node contains only nodes with keys greater than the node's key.
    3)  The left and right subtree each must also be a binary search tree.
    4)  There must be no duplicate nodes.

# Searching a key:
To search a given key in Binary Search Tree, we first compare it with root,
if the key is present at root, we return root. If key is greater than root's key, we recur for
right subtree of root node. Otherwise we recur for left subtree.

# Insertion of a key:
A new key is always inserted at leaf. We start searching a key from root
till we hit a leaf node. Once a leaf node is found, the new node is added as a child of the leaf
node.

         100                               100
        /   \        Insert 40            /    \
      20     500    --------->          20     500
     /  \                              /  \
    10   30                           10   30
                                              \
                                              40

# Time Complexity: The worst case time complexity of search and insert operations is O(h) where h
is height of Binary Search Tree. In worst case, we may have to travel from root to the deepest
leaf node. The height of a skewed tree may become n and the time complexity of search and insert
operation may become O(n)

"""
from __future__ import print_function


class Node:
    def __init__(self, key):
        self.left = None
        self.right = None
        self.val = key


class BinarySearchTree(object):
    """Python program to demonstrate insert operation in binary search tree"""

    def __init__(self, root=None):
        self.root = root

    # A utility function to search a given key in BST
    def search(self, root, key):
        # Base Cases: root is null or key is present at root
        if root is None or root.value == key:
            return root

        # Key is greater than root's key
        if root.value < key:
            return self.search(root.right, key)

        # Key is smaller than root's key
        return self.search(root.left, key)

    def insert(self, node):
        self.root = self.insert_util(self.root, node)

    def insert_util(self, root, node):
        """A utility function to insert a new node with the given key"""
        if root is None:
            root = node
        else:
            if root.value < node.value:
                if root.right is None:
                    root.right = node
                else:
                    self.insert_util(root.right, node)
            else:
                if root.left is None:
                    root.left = node
                else:
                    self.insert_util(root.left, node)
        return root

    def inorder(self, root):
        """A utility function to do inorder tree traversal"""
        if root:
            self.inorder(root.left)
            print(root.value, end=" ")
            self.inorder(root.right)


if __name__ == '__main__':
    # Let us create the following BST
    #      50
    #    /    \
    #   30     70
    #  /  \   /  \
    # 20  40 60  80
    tree = BinarySearchTree()

    tree.insert(Node(50))
    tree.insert(Node(30))
    tree.insert(Node(20))
    tree.insert(Node(40))
    tree.insert(Node(70))
    tree.insert(Node(60))
    tree.insert(Node(80))

    # Print inoder traversal of the BST
    tree.inorder(tree.root)

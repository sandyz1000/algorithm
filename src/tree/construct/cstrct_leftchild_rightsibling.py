""" Creating a tree with Left-Child Right-Sibling Representation

More on k-ary tree https://en.wikipedia.org/wiki/K-ary_tree

Left-Child Right-Sibling Representation is a different representation of an n-ary tree where
instead of holding a reference to each and every child node, a node holds just two references,
first a reference to it's first child, and the other to it's immediate next sibling. This new
transformation not only removes the need of advance knowledge of the number of children a node
has, but also limits the number of references to a maximum of two, thereby making it so much
easier to code.

At each node, link children of same parent from left to right.
Parent should be linked with only first child.

Examples:
--------------------------------------------
Left Child Right Sibling tree representation
      10
      |
      2 -> 3 -> 4 -> 5
      |    |
      6    7 -> 8 -> 9

"""
from __future__ import print_function
# Python program to create a tree with left child right sibling representation.


class Node:
    def __init__(self, data, next_node=None, child=None):
        self.data = data
        self.next_node = next_node
        self.child = child


class BinTree(object):
    def __init__(self, root):
        self.root = root

    def add_sibling(self, n, data):
        """Adds a sibling to a list with starting with n"""
        if n is None:
            return None

        while n.next_node:
            n = n.next_node

        n.next_node = Node(data)
        return n

    def add_child(self, n, data):
        """Add child Node to a Node"""
        if n is None:
            return None

        # Check if child list is not empty.
        if n.child:
            return self.add_sibling(n.child, data)
        else:
            n.child = Node(data)
            return n

    @staticmethod
    def traverseTree(root):
        """Traverses tree in level order"""
        if root is None:
            return

        while root:
            print(root.data)
            if root.child:
                BinTree.traverseTree(root.child)
            root = root.next_node


if __name__ == '__main__':
    #  Let us create below tree
    # *           10
    # *     /   /    \   \
    # *    2   3     4    5
    # *              |  / | \
    # *              6 7  8  9
    #
    # Left child right sibling
    #      10
    # *    |
    # *    2 -> 3 -> 4 -> 5
    # *              |    |
    # *              6    7 -> 8 -> 9
    root = Node(10)
    tree = BinTree(root)
    n1 = tree.add_child(root, 2)
    n2 = tree.add_child(root, 3)
    n3 = tree.add_child(root, 4)
    n4 = tree.add_child(n3, 6)
    n5 = tree.add_child(root, 5)
    n6 = tree.add_child(n5, 7)
    n7 = tree.add_child(n5, 8)
    n8 = tree.add_child(n5, 9)
    tree.traverseTree(root)

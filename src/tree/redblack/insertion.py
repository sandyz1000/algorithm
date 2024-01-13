"""
Python Program for Red Black Tree Insertion

http://www.geeksforgeeks.org/c-program-red-black-tree-insertion/
"""
from __future__ import print_function, division
from collections import deque

# Python implementation for Red-Black Tree Insertion

RED = False
BLACK = True


class Pointer:
    def __init__(self, data):
        self.pointer = data


class Node:
    def __init__(self, data, parent=None, left=None, right=None):
        self.data = data
        self.color = RED
        self.left = left
        self.right = right
        self.parent = parent


class RBTree:
    """Class to represent Red-Black Tree"""

    def __init__(self, root=None):
        self.root = root

    def inorder_helper(self, root):
        """A recursive function to do level order traversal"""
        if root is None:
            return

        self.inorder_helper(root.left)
        print(root.data, end=" ")
        self.inorder_helper(root.right)

    def bst_insert(self, root, pt):
        """A utility function to insert a new node with given key in BST"""
        # If the tree is empty, return a new node
        if root is None:
            return pt.pointer

        # Otherwise, recur down the tree
        if pt.pointer.data < root.data:
            root.left = self.bst_insert(root.left, pt)
            root.left.parent = root
        elif pt.pointer.data > root.data:
            root.right = self.bst_insert(root.right, pt)
            root.right.parent = root

        # return the (unchanged) node pointer
        return root

    def level_order_helper(self, root):
        """Utility function to do level order traversal"""
        if root is None:
            return

        q = deque()
        q.append(root)
        while len(q) != 0:
            temp = q.popleft()
            print(temp.data, end=" ")

            if temp.left is not None:
                q.append(temp.left)

            if temp.right is not None:
                q.append(temp.right)

    def rotate_left(self, pt):
        pt_right = pt.pointer.right
        pt.pointer.right = pt_right.left

        if pt.pointer.right is not None:
            pt.pointer.right.parent = pt

        pt_right.parent = pt.pointer.parent

        if pt.pointer.parent is None:
            self.root = pt_right

        elif pt.pointer == pt.pointer.parent.left:
            pt.pointer.parent.left = pt_right

        else:
            pt.pointer.parent.right = pt_right

        pt_right.left = pt.pointer
        pt.pointer.parent = pt_right

    def rotate_right(self, pt):
        pt_left = pt.pointer.left
        pt.pointer.left = pt_left.right

        if pt.pointer.left is not None:
            pt.pointer.left.parent = pt.pointer

        pt_left.parent = pt.pointer.parent

        if pt.pointer.parent is None:
            self.root = pt_left

        elif pt.pointer == pt.pointer.parent.left:
            pt.pointer.parent.left = pt_left

        else:
            pt.pointer.parent.right = pt_left

        pt_left.right = pt.pointer
        pt.pointer.parent = pt_left

    def min_value_node(self, node):
        """
        Given a non-empty binary search tree, return the node with minum key value found in
        that tree. Note that the entire tree does not need to be searched
        """
        current = node

        # loop down to find the leftmost leaf
        while current.left is not None:
            current = current.left

        return current

    def search(self, key):
        if self.root is None:
            return None
        return self.search_util(key, self.root)

    def search_util(self, key, node):
        """

        :param key:
        :param node: Node
        :return:
        """
        if key == node.data:
            return node

        if key < node.data:
            if node.left is not None:
                return None
            return self.search_util(key, node.left)

        if key >= node.key:
            if node.right is not None:
                return None
            return self.search_util(key, node.right)

        return None

    def tree_minimum(self, node):
        while node.left is not None:
            node = node.left
        return node

    def tree_successor(self, node):
        if node is not None and node.right is not None:
            return self.tree_minimum(node.right)

        successor = node.parent
        while successor is not None and node is successor:
            node = successor
            successor = node.parent
        return successor

    def delete(self, key):
        node = self.search(key)

        if node.left is None or node.right is None:
            y = node
        else:
            y = self.tree_successor(node)

        if y.left is not None:
            x = y.left
        else:
            x = y.right

        x.parent = y.parent

        if y.parent is None:
            self.root = x
        else:
            if y == y.parent.left:
                y.parent.left = x
            else:
                y.parent.right = x

        if y is not node:
            node.key = y.key

        if y.color == BLACK:
            self.delete_fixup(x)

    def delete_fixup(self, node):
        while node != self.root and node.color == BLACK:
            if node == node.parent.left:
                w = node.parent.right
                if w.color == RED:
                    w.color = BLACK
                    node.parent.color = RED
                    self.rotate_left(node.parent)

                if w.left.color == BLACK and w.right.color == BLACK:
                    w.color = RED
                    node = node.parent
                else:
                    if w.right.color == BLACK:
                        w.left.color = BLACK
                        w.color = RED
                        self.rotate_right(w)
                        w = node.parent.right
                    w.color = node.parent.color
                    node.parent.color = BLACK
                    w.right.color = BLACK
                    self.rotate_left(node.parent)
                    node = self.root
            else:
                w = node.parent.left
                if w.color == RED:
                    w.color = BLACK
                    node.parent.color = RED
                    self.rotate_right(node.parent)

                if w.right.color == BLACK and w.left.color == BLACK:

                    w.color = RED
                    node = node.parent
                else:
                    if w.left.color == BLACK:
                        w.right().color = BLACK
                        w.color = RED
                        self.rotate_left(w)
                        w = node.parent.left

                    w.color = node.parent.color
                    node.parent.color = BLACK
                    w.left.color = BLACK
                    self.rotate_right(node.parent)
                    node = self.root

        node.color = BLACK

    def fix_violation(self, pt):
        """This function fixes violations caused by BST insertion"""
        while (pt.pointer != self.root) and (pt.pointer.color != BLACK) and \
                (pt.pointer.parent.color == RED):
            parent_pt = pt.pointer.parent
            grand_parent_pt = pt.pointer.parent.parent

            # Case : A
            # Parent of pt is left child of Grand-parent of pt
            if parent_pt == grand_parent_pt.left:
                uncle_pt = grand_parent_pt.right

                # Case : 1
                # The uncle of pt is also red Only Recoloring required
                if uncle_pt is not None and uncle_pt.color == RED:
                    grand_parent_pt.color = RED
                    parent_pt.color = BLACK
                    uncle_pt.color = BLACK
                    pt.pointer = grand_parent_pt

                else:
                    # Case : 2
                    # pt is right child of its parent Left-rotation required
                    if pt.pointer == parent_pt.right:
                        parentpt_ptr = Pointer(parent_pt)
                        self.rotate_left(parentpt_ptr)
                        parent_pt = parentpt_ptr.pointer

                        pt.pointer = parent_pt
                        parent_pt = pt.pointer.parent

                    # Case : 3
                    # pt is left child of its parent Right-rotation required
                    grandp_ptr = Pointer(grand_parent_pt)
                    self.rotate_right(grandp_ptr)
                    grand_parent_pt = grandp_ptr.pointer

                    parent_pt.color, grand_parent_pt.color = grand_parent_pt.color, \
                                                             parent_pt.color
                    pt.pointer = parent_pt

            # Case : B
            # Parent of pt is right child of Grand-parent of pt
            else:
                uncle_pt = grand_parent_pt.left

                # Case : 1
                # The uncle of pt is also red Only Recoloring required
                if (uncle_pt is not None) and (uncle_pt.color == RED):
                    grand_parent_pt.color = RED
                    parent_pt.color = BLACK
                    uncle_pt.color = BLACK
                    pt.pointer = grand_parent_pt
                else:
                    # Case : 2
                    # pt is left child of its parent Right-rotation required
                    if pt.pointer == parent_pt.left:
                        parentpt_ptr = Pointer(parent_pt)
                        self.rotate_right(parent_pt)
                        parent_pt = parentpt_ptr.pointer

                        pt.pointer = parent_pt
                        parent_pt = pt.pointer.parent

                    # Case : 3
                    # pt is right child of its parent Left-rotation required
                    grandp_ptr = Pointer(grand_parent_pt)
                    self.rotate_left(grandp_ptr)
                    grand_parent_pt = grandp_ptr.pointer

                    parent_pt.color, grand_parent_pt.color = grand_parent_pt.color, \
                                                             parent_pt.color
                    pt.pointer = parent_pt

        self.root.color = BLACK

    def insert(self, data):
        """Function to insert a new node with given data"""
        pt = Pointer(Node(data))

        # Do a normal BST insert
        self.root = self.bst_insert(self.root, pt)

        # fix Red Black Tree violations
        self.fix_violation(pt)

    # Function to do inorder and level order traversals
    def inorder(self):
        self.inorder_helper(self.root)

    def level_order(self):
        self.level_order_helper(self.root)


if __name__ == '__main__':
    # In order Traversal of Created Tree
    # 1  2  3  4  5  6  7
    # Level Order Traversal of Created Tree
    # 6  4  7  2  5  1  3

    # In order Traversal of Created Tree 1  2  3  4  5  6  7
    # Level Order Traversal of Created Tree 6  4  7  2  5  1  3
    #              7
    #             /
    #            6
    #           /
    #          5
    #         /
    #        4
    #       /
    #      3
    #     /
    #    2
    #   /
    #  1

    tree = RBTree()

    tree.insert(7)
    tree.insert(6)
    tree.insert(5)
    tree.insert(3)
    tree.insert(4)
    tree.insert(2)
    tree.insert(1)

    print("Inoder Traversal of Created Tree\n")
    tree.inorder()

    print("\n\nLevel Order Traversal of Created Tree\n")
    tree.level_order()

    # tree.delete(4)

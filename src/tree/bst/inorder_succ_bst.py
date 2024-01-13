"""
Inorder Successor in Binary Search Tree

In Binary Tree, Inorder successor of a node is the next node in Inorder traversal of the Binary
Tree. Inorder Successor is NULL for the last node in Inorder traversal.
In Binary Search Tree, Inorder Successor of an input node can also be defined as the node with the
smallest key greater than the key of input node. So, it is sometimes important to find next node in
sorted order.

Example:

            (20)
            /   \
          (8)   (22)
        /   \
      (4)  (12)
           /  \
        (10)  (14)

In the above diagram, inorder successor of 8 is 10, inorder successor of 10 is 12 and inorder
successor of 14 is 20. """

from __future__ import print_function

# Python program to find the inroder successor in a BST


class Node(object):
    # Constructor to create a new node
    def __init__(self, key, left=None, right=None, parent=None):
        self.data = key
        self.left = left
        self.right = right
        self.parent = parent


class BinarySearchTree(object):
    """
    Method 1 (Uses Parent Pointer)
    In this method, we assume that every node has parent pointer.

    The Algorithm is divided into two cases on the basis of right subtree of the input node being
    empty or not.

    Input: node, root # node is the node whose Inorder successor is needed.
    output: succ # succ is Inorder successor of node.

    1) If right subtree of node is not NULL, then succ lies in right subtree. Do following.
    Go to right subtree and return the node with minimum key value in right subtree.

    2) If right subtree of node is NULL, then succ is one of the ancestors. Do following.
    Travel up using the parent pointer until you see a node which is left child of it's parent.
    The parent of such a node is the succ.

    Time Complexity: O(h) where h is height of tree.
    """

    def __init__(self, root=None):
        self.root = root

    def in_order_successor(self, n):
        # Step 1 of the above algorithm
        if n.right is not None:
            return self.min_value(n.right)

        # Step 2 of the above algorithm
        else:
            p = n.parent
            while p is not None:
                if n != p.right:
                    break
                n = p
                p = p.parent
            return p

    def min_value(self, node):
        """
        Given a non-empty binary search tree, return the minimum data value found in that tree.
        Note that the entire tree doesn't need to be searched

        :param node:
        :return:
        """
        current = node

        # loop down to find the leftmost leaf
        while current is not None:
            if current.left is None:
                break
            current = current.data

        return current

    def insert(self, data):
        self.root = self.insert_util(self.root, data)

    def insert_util(self, node, data):
        """
        Given a binary search tree and a number, inserts a new node with the given number in the
        correct place in the tree. Returns the new root pointer which the caller should then use(
        the standard trick to avoid # using reference parameters) """
        # 1) If tree is empty then return a new singly node
        if node is None:
            return Node(data)
        else:

            # 2) Otherwise, recur down the tree
            if data <= node.data:
                node.left = self.insert_util(node.left, data)
                node.left.parent = node
            else:
                node.right = self.insert_util(node.right, data)
                node.right.parent = node

            # return  the unchanged node pointer
            return node


class BinarySearchTree2(object):
    """
    Method 2 (Search from root)

    Parent pointer is NOT needed in this algorithm. The Algorithm is divided into two cases on
    the basis of right subtree of the input node being empty or not.

    Input: node, root # node is the node whose Inorder successor is needed.
    output: succ # succ is Inorder successor of node.

    1) If right subtree of node is not NULL, then succ lies in right subtree. Do following.
    Go to right subtree and return the node with minimum key value in right subtree.

    2) If right subtree of node is NULL, then start from root and us search like technique.
    Do following.
    Travel down the tree, if a node's data is greater than root's data then go right side,
    otherwise go to left side

    Time Complexity: O(h) where h is height of tree.
    """

    def __init__(self, root=None):
        self.root = root

    def min_value(self, node):
        """
        Given a non-empty binary search tree, return the minimum data value found in that tree.
        Note that the entire tree doesn't need to be searched

        :param node:
        :return:
        """
        current = node

        # loop down to find the leftmost leaf
        while current is not None:
            if current.left is None:
                break
            current = current.data

        return current

    def insert(self, data):
        self.root = self.insert_util(self.root, data)

    def insert_util(self, node, data):
        """
        Given a binary search tree and a number, inserts a new node with the given number in the
        correct place in the tree. Returns the new root pointer which the caller should then use(
        the standard trick to avoid # using reference parameters) """
        # 1) If tree is empty then return a new singly node
        if node is None:
            return Node(data)
        else:

            # 2) Otherwise, recur down the tree
            if data <= node.data:
                temp = self.insert_util(node.left, data)
                node.left = temp
                temp.parent = node
            else:
                temp = self.insert_util(node.right, data)
                node.right = temp
                temp.parent = node

            # return  the unchanged node pointer
            return node

    def in_order_successor(self, n):
        # step 1 of the above algorithm
        if n.right is not None:
            return self.min_value(n.right)

        # Step 2 of the above algorithm
        else:
            succ = None
            # Start from root and search for successor down the tree
            root = self.root
            while root is not None:
                if n.data < root.data:
                    succ = root
                    root = root.left
                elif n.data > root.data:
                    root = root.right
                else:
                    break

        return succ


if __name__ == '__main__':
    print("\n -- Method-1 ---")
    tree = BinarySearchTree()

    tree.insert(20)
    tree.insert(8)
    tree.insert(22)
    tree.insert(4)
    tree.insert(12)
    tree.insert(10)
    tree.insert(14)
    temp = tree.root.left.right.right

    succ = tree.in_order_successor(temp)
    if succ is not None:
        print("\nInorder Successor of %d is %d " % (temp.data, succ.data))
    else:
        print("\nInorder Successor doesn't exist")

    print("\n -- Method-2 ---")
    tree = BinarySearchTree2()

    tree.insert(20)
    tree.insert(8)
    tree.insert(22)
    tree.insert(4)
    tree.insert(12)
    tree.insert(10)
    tree.insert(14)
    temp = tree.root.left.right.right

    succ = tree.in_order_successor(temp)
    if succ is not None:
        print("\nInorder Successor of %d is %d " % (temp.data, succ.data))
    else:
        print("\nInorder Successor doesn't exist")
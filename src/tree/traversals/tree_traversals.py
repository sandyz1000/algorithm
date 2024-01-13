"""
Tree Traversals (Inorder, Preorder and Postorder)
Unlike linear data structures (Array, Linked List, Queues, Stacks, etc) which have only one logical
way to traverse them, trees can be traversed in different ways.

Following are the generally used ways for traversing trees.
        (1)
        /  \
      (2)  (3)
      / \
    (4) (5)

Depth First Traversals:
(a) Inorder (Left, Root, Right) : 4 2 5 1 3
(b) Preorder (Root, Left, Right) : 1 2 4 5 3
(c) Postorder (Left, Right, Root) : 4 5 2 3 1

Breadth First or Level Order Traversal : 1 2 3 4 5
"""
# Python program to for tree traversals
# A class that represents an individual node in a Binary Tree


class Node:
    def __init__(self, key):
        self.left = None
        self.right = None
        self.val = key


# A function to do inorder tree traversal
def printInorder(root):
    if root:
        # First recur on left child
        printInorder(root.left)

        # then print the data of node
        print(root.value),

        # now recur on right child
        printInorder(root.right)


# A function to do postorder tree traversal
def printPostorder(root):
    if root:
        # First recur on left child
        printPostorder(root.left)

        # the recur on right child
        printPostorder(root.right)

        # now print the data of node
        print(root.value),


# A function to do postorder tree traversal
def printPreorder(root):
    if root:
        # First print the data of node
        print(root.value),

        # Then recur on left child
        printPreorder(root.left)

        # Finally recur on right child
        printPreorder(root.right)


if __name__ == '__main__':
    root = Node(1)
    root.left = Node(2)
    root.right = Node(3)
    root.left.left = Node(4)
    root.left.right = Node(5)
    print("Preorder traversal of binary tree is", printPreorder(root))
    print("\nInorder traversal of binary tree is", printInorder(root))
    print("\nPostorder traversal of binary tree is", printPostorder(root))

"""
Morris traversal for Preorder
Using Morris Traversal, we can traverse the tree without using stack and recursion.
The algorithm for Preorder is almost similar to Morris traversal for Inorder.

1)  If left child is null, print the current node data. Move to right child. Else, Make the right
child of the inorder predecessor point to the current node.
Two cases arise:
    a) The right child of the inorder predecessor already points to the current node. Set right
    child to NULL. Move to right child of current node.
    b) The right child is NULL. Set it to current node. Print current node's data and move to left
    child of current node.

2)  Iterate until current node is not NULL.

Limitations:

Morris traversal modifies the tree during the process. It establishes the right links while
moving down the tree and resets the right links while moving up the tree. So the algorithm
cannot be applied if write operations are not allowed.
"""
from __future__ import print_function


class Node(object):
    def __init__(self, data, left=None, right=None):
        self.data = data
        self.left = left
        self.right = right


def morris_traversal_preorder(root):
    """Pre-order traversal without recursion and without stack"""
    while root:
        # If left child is null, print the current node data. Move to right child.
        if root.left is None:
            print("%d" % root.data, end=" ")
            root = root.right
        else:
            current = root.left  # Find inorder predecessor
            while current.right and current.right != root:
                current = current.right

            # If the right child of inorder predecessor already points to this node
            if current.right == root:
                current.right = None
                root = root.right

            # If right child doesn't point to this node, then print this node and make
            # right child point to this node
            else:
                print("%d" % root.data, end=" ")
                current.right = root
                root = root.left


def preorder(root):
    """Function for sStandard pre-order traversal"""
    if root:
        print("%d " % root.data)
        preorder(root.left)
        preorder(root.right)


if __name__ == '__main__':
    #          _1_
    #        /     \
    #       2       3
    #     /   \   /   \
    #    4    5  6     7
    #   / \  / \
    #  8  9 10 11

    root = Node(1)
    root.left = Node(2)
    root.right = Node(3)

    root.left.left = Node(4)
    root.left.right = Node(5)

    root.right.left = Node(6)
    root.right.right = Node(7)

    root.left.left.left = Node(8)
    root.left.left.right = Node(9)

    root.left.right.left = Node(10)
    root.left.right.right = Node(11)

    print("Morris traversals pre order---- ")
    morris_traversal_preorder(root)
    print("\n")
    print("Pre order traversals---- ")
    preorder(root)

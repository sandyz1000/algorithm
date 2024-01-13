"""
Two nodes of a BST are swapped, correct the BST
Two of the nodes of a Binary Search Tree (BST) are swapped. Fix (or correct) the BST.

Input Tree:
         10
        /  \
       5    8
      / \
     2   20

In the above tree, nodes 20 and 8 must be swapped to fix the tree.
Following is the output tree
         10
        /  \
       5    20
      / \
     2   8

The inorder traversal of a BST produces a sorted array. So a simple method is to store inorder
traversal of the input tree in an auxiliary array. Sort the auxiliary array. Finally, insert the
auxiilary array elements back to the BST, keeping the structure of the BST same. Time complexity
of this method is O(nLogn) and auxiliary space needed is O(n).

# Notes:
We can solve this in O(n) time and with a single traversal of the given BST. Since inorder
traversal of BST is always a sorted array, the problem can be reduced to a problem where two
elements of a sorted array are swapped. There are two cases that we need to handle:

1. The swapped nodes are not adjacent in the inorder traversal of the BST.

 For example, Nodes 5 and 25 are swapped in {3 5 7 8 10 15 20 25}.
 The inorder traversal of the given tree is 3 25 7 8 10 15 20 5

If we observe carefully, during inorder traversal, we find node 7 is smaller than the previous
visited node 25. Here save the context of node 25 (previous node). Again, we find that node 5 is
smaller than the previous node 20. This time, we save the context of node 5 ( current node ).
Finally swap the two node's values.

2. The swapped nodes are adjacent in the inorder traversal of BST.
    For example, Nodes 7 and 8 are swapped in {3 5 7 8 10 15 20 25}.
    The inorder traversal of the given tree is 3 5 8 7 10 15 20 25
Unlike case #1, here only one point exists where a node value is smaller than previous node
value. e.g. node 7 is smaller than node 8.
"""
from __future__ import print_function


# Two nodes in the BST's swapped, correct the BST.
# Time Complexity: O(n)

# A binary tree node has data, pointer to left child and a pointer to right child
class Node(object):
    def __init__(self, data, left=None, right=None):
        self.data = data
        self.left = left
        self.right = right


def correct_bst_util(root, first, middle, last, prev):
    """
    This function does inorder traversal to find out the two swapped nodes. It sets three
    pointers, first, middle and last. If the swapped nodes are adjacent to each other,
    then first and middle contain the resultant nodes Else, first and last contain the resultant
    nodes

    :param root: Node
    :param first: Node
    :param middle: Node
    :param last: Node
    :param prev: Node
    :return:
    """
    if root:
        # Recur for the left subtree
        correct_bst_util(root.left, first, middle, last, prev)

        # If this node is smaller than the previous node, it's violating the BST rule.
        if prev and root.data < prev.data:
            # If this is first violation, mark these two nodes as 'first' and 'middle'
            if not first:
                first = prev
                middle = root

            else:  # If this is second violation, mark this node as last
                last = root

        prev = root  # Mark this node as previous

        # Recur for the right subtree
        correct_bst_util(root.right, first, middle, last, prev)


def correct_bst(root):
    """
    A function to fix a given BST where two nodes are swapped. This function uses correctBSTUtil()
    to find out two nodes and swaps the nodes to fix the BST

    :param root: Node
    :return:
    """
    # Initialize pointers needed for correctBSTUtil()
    # structs node *first, *middle, *last, *prev;
    first = middle = last = prev = None

    # Set the pointers to find out two nodes
    correct_bst_util(root, first, middle, last, prev)

    # Fix (or correct) the tree
    if first and last:
        first.data, last.data = last.data, first.data

    elif first and middle:  # Adjacent nodes swapped
        first.data, middle.data = middle.data, first.data

        # else nodes have not been swapped, passed tree is really BST.


# A utility function to print Inoder traversal
def print_inorder(node):
    if node is None:
        return
    print_inorder(node.left)
    print("%d " % node.data, end=" ")
    print_inorder(node.right)


if __name__ == '__main__':
    #       6
    #     /  \
    #    10    2
    #   / \   / \
    #  1   3 7  12
    #  10 and 2 are swapped

    root = Node(6, left=Node(10), right=Node(2))
    root.left.left = Node(1)
    root.left.right = Node(3)
    root.right.right = Node(12)
    root.right.left = Node(7)

    print("Inorder Traversal of the original tree \n")
    print_inorder(root)

    correct_bst(root)

    print("\nInorder Traversal of the fixed tree \n")
    print_inorder(root)

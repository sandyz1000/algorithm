"""
Convert a normal BST to Balanced BST
Given a BST (Binary Search Tree) that may be unbalanced, convert it into a balanced BST that has
minimum possible height.

Examples :
-----------------------------------

Input:
       30
      /
     20
    /
   10
Output:
     20
   /   \
 10     30


Input:
         4
        /
       3
      /
     2
    /
   1
Output:
      3            3           2
    /  \         /  \        /  \
   1    4   OR  2    4  OR  1    3   OR ..
    \          /                   \
     2        1                     4

Input:
          4
        /   \
       3     5
      /       \
     2         6
    /           \
   1             7
Output:
       4
    /    \
   2      6
 /  \    /  \
1    3  5    7

------------------------------------------------------
Explanation:
------------------------------------------------------

A Simple Solution is to traverse nodes in Inorder and one by one insert into a self-balancing BST
like AVL tree. Time complexity of this solution is O(n Log n) and this solution doesn’t guarantee

An Efficient Solution can construct balanced BST in O(n) time with minimum possible height.
Below are steps.

1)  Traverse given BST in inorder and store result in an array. This step takes O(n) time. Note
    that this array would be sorted as inorder traversal of BST always produces sorted sequence.

2)  Build a balanced BST from the above created sorted array using the recursive approach
    discussed here. This step also takes O(n) time as we traverse every element exactly once and
    processing an element takes O(1) time.


"""
from __future__ import print_function


# Python program to convert a left unbalanced BST to a balanced BST
class Node:
    def __init__(self, data, left=None, right=None):
        self.data = data
        self.left = left
        self.right = right


def store_bst_nodes(root, nodes):
    """
    This function traverse the skewed binary tree and stores its nodes pointers in vector nodes[]
    :param root: Node
    :param nodes: list(Node)
    :return:
    """
    if root is None:  # Base case
        return

    # Store nodes in Inorder (which is sorted order for BST)
    store_bst_nodes(root.left, nodes)
    nodes.append(root)
    store_bst_nodes(root.right, nodes)


def build_tree_util(nodes, start, end):
    """
    Recursive function to construct binary tree
    :param nodes: list(Node)
    :param start: int
    :param end: int
    :return:
    """
    if start > end:  # base case
        return None

    # /* Get the middle element and make it root */
    mid = (start + end) // 2
    root = nodes[mid]

    # Using index in Inorder traversal, construct left and right subtress
    root.left = build_tree_util(nodes, start, mid - 1)
    root.right = build_tree_util(nodes, mid + 1, end)
    return root


def build_tree(root):
    """This functions converts an unbalanced BST to a balanced BST"""
    # Store nodes of given BST in sorted order
    nodes = []
    store_bst_nodes(root, nodes)
    # Constucts BST from nodes[]
    n = len(nodes)
    return build_tree_util(nodes, 0, n - 1)


# Function to do preorder traversal of tree
def preOrder(node):
    if node is None:
        return
    print("%d " % node.data, end=" ")
    preOrder(node.left)
    preOrder(node.right)


if __name__ == '__main__':
    # Constructed skewed binary tree is
    #             10
    #            /
    #           8
    #          /
    #         7
    #        /
    #       6
    #      /
    #     5

    root = Node(10)
    root.left = Node(8)
    root.left.left = Node(7)
    root.left.left.left = Node(6)
    root.left.left.left.left = Node(5)

    root = build_tree(root)
    print("Preorder traversal of balanced BST is : \n")
    preOrder(root)

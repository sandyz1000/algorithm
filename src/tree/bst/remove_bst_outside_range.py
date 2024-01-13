"""
Remove BST keys outside the given range
Given a Binary Search Tree (BST) and a range [min, max], remove all keys which are outside the
given range. The modified tree should also be BST.

Example: consider the following BST and range [-10, 13].

         (6)
        /   \
    (-13)   (14)
        \   /   \
      (-8) (13) (15)
            /
          (7)

-------------------------

          (6)
        /   \
      (-8) (13)
            /
          (7)
-------------------------

There are two possible cases for every node.
1) Node's key is outside the given range. This case has two sub-cases.
    a) Node's key is smaller than the min value.
    b) Node's key is greater that the max value.
2) Node's key is in range.

We don't need to do anything for case 2.

In case 1, we need to remove the node and change root of sub-tree rooted with this node. The idea
is to fix the tree in Postorder fashion. When we visit a node, we make sure that its left and
right sub-trees are already fixed.
In case 1.a), we simply remove root and return right sub-tree as new root.
In case 1.b), we remove root and return left sub-tree as new root. """

from __future__ import print_function

# Python program to remove BST keys outside the given range
# Time Complexity: O(n) where n is the number of nodes in given BST.


class Node:
    def __init__(self, key, left=None, right=None):
        self.key = key
        self.left = left
        self.right = right


def remove_outside_range(root, minimum, maximum):
    """
    Removes all nodes having value outside the given range and returns
    the root of modified tree

    :param root:
    :param minimum:
    :param maximum:
    :return:
    """
    if root is None:  # Base Case
        return None

    # First fix the left and right subtrees of root
    root.left = remove_outside_range(root.left, minimum, maximum)
    root.right = remove_outside_range(root.right, minimum, maximum)

    # Now fix the root.  There are 2 possible cases for toot
    # 1.a) Root's key is smaller than min value (root is not in range)
    if root.key < minimum:
        r_child = root.right
        del root
        return r_child

    # 1.b) Root's key is greater than max value (root is not in range)
    if root.key > maximum:
        l_child = root.left
        del root
        return l_child
    return root  # // 2. Root is in range


def insert(root, key):
    """
    A utility function to insert a given key to BST
    :param root:
    :param key:
    :return:
    """
    if root is None:
        return Node(key)

    if root.key > key:
        root.left = insert(root.left, key)

    else:
        root.right = insert(root.right, key)
    return root


def inorder_traversal(root):
    """
    Utility function to traverse the binary tree after conversion
    :param root:
    :return:
    """
    if root:
        inorder_traversal(root.left)
        print(root.key, end=" ")
        inorder_traversal(root.right)


if __name__ == '__main__':
    root = None
    root = insert(root, 6)
    root = insert(root, -13)
    root = insert(root, 14)
    root = insert(root, -8)
    root = insert(root, 15)
    root = insert(root, 13)
    root = insert(root, 7)

    print("Inorder traversal of the given tree is: ")
    inorder_traversal(root)

    root = remove_outside_range(root, -10, 13)

    print("\nInorder traversal of the modified tree is: ")
    inorder_traversal(root)

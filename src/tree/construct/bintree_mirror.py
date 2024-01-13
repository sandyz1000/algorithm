"""
Write an Efficient Function to Convert a Binary Tree into its Mirror Tree

Mirror of a Tree: Mirror of a Binary Tree T is another Binary Tree M(T) with left and right
children of all non-leaf nodes interchanged.

        (1)                    (1)
       /   \                  /   \
    (3)    (2)      ==>     (2)  (3)
          /   \            /   \
        (5)  (4)         (4)   (5)

"""
# A binary tree node has data, pointer to left child and a pointer to right child
# Time & Space Complexities:
# This program is similar to traversal of tree space and time complexities will be same as
# Tree traversal
from collections import deque


class Node(object):
    def __init__(self, data, left=None, right=None):
        self.data = data
        self.left = left
        self.right = right


def mirror(node: Node):
    """
    Change a tree so that the roles of the  left and right pointers are swapped at every node.

     So the tree...
           4
          / \
         2   5
        / \
       1   3

     is changed to...
           4
          / \
         5   2
            / \
           3   1

    """
    if node:
        mirror(node.left)
        mirror(node.right)
        # swap the pointers in this node
        node.left, node.right = node.right, node.left


def is_mirror_iter(root: Node) -> bool:
    # [1,2,2,3,4,4,3]
    q = deque()
    q.append(root)
    q.append(root)
    while q:
        one: Node = q.popleft()
        two: Node = q.popleft()
        if one is None and two is None:
            return True
        if one is None or two is None:
            return False
        if one.data != two.data:
            return False

        q.append(one.left)
        q.append(two.right)
        q.append(one.right)
        q.append(two.left)
    return True


def level_order_sum(root: Node) -> bool:
    import math
    level = 0
    q = deque()
    q.append(root)

    while len(q) != 0:
        summ = 0
        for i in range(math.pow(2, level)):
            if len(q) != 0:
                node = q.popleft()
                summ += node.data
                q.append(node.left)
                q.append(node.right)
            else:
                break

        print(f"Sum at level: {level}-{summ}")


def in_order(node):
    """Helper function to test mirror(). Given a binary search tree, print out its
    data elements in increasing sorted order. """
    if node:
        in_order(node.left)
        print("%d " % node.data)
        in_order(node.right)


if __name__ == '__main__':
    # Inorder traversal of binary tree is : 3 1 5 2 4

    root = Node(1)
    root.left = Node(2)
    root.right = Node(3)
    root.left.left = Node(4)
    root.left.right = Node(5)

    # Print inorder traversal of the input tree
    print("\n Inorder traversal of the constructed tree is \n")
    in_order(root)

    # Convert tree to its mirror
    mirror(root)

    # Print inorder traversal of the mirror tree
    print("\n Inorder traversal of the mirror tree is \n")
    in_order(root)

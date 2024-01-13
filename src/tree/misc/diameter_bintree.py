"""
Diameter of a Binary Tree

https://www.geeksforgeeks.org/diameter-of-a-binary-tree/

The diameter of a tree (sometimes called the width) is the number of nodes on the longest path between
two end nodes. The diagram below shows two trees each with diameter nine, the leaves that form the ends
of a longest path are shaded (note that there is more than one path in each tree of length nine, but no
path longer than nine nodes).



The diameter of a tree T is the largest of the following quantities:

* the diameter of T’s left subtree
* the diameter of T’s right subtree
* the longest path between leaves that goes through the root of T (this can be computed from the heights
of the subtrees of T)
"""


class Node:
    def __init__(self, val, left=None, right=None) -> None:
        self.val = val
        self.left = left
        self.right = right
        self.height = 0


def height(root: Node):
    if root is None:
        return 0
    return 1 + max(height(root.left), height(root.right))


class struct_height:
    def __init__(self, h=0) -> None:
        self.h = h


def diameter(root: Node, height: struct_height):
    if root is None:
        return 0

    # return max(1 + height(root.left) + height(root.right), diameter(root.left), diameter(root.right))

    lh = struct_height(0)
    rh = struct_height(0)

    # Not calculating height everytime
    left_node = diameter(root.left, lh)
    right_node = diameter(root.right, rh)

    height.h = 1 + max(lh.h, rh.h)

    return max(1 + lh.h + rh.h, left_node, right_node)


def main():
    """ 
    Constructed binary tree is  
                1 
            /   \ 
            2      3 
        /  \ 
        4     5 
    """
    root = Node(1)
    root.left = Node(2)
    root.right = Node(3)
    root.left.left = Node(4)
    root.left.right = Node(5)

    print(diameter(root))


if __name__ == "__main__":
    main()

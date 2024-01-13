"""
A program to check if a binary tree is BST or not
A binary search tree (BST) is a node based binary tree data structure which has the following
properties.
    1) The left subtree of a node contains only nodes with keys less than the node's key.
    2) The right subtree of a node contains only nodes with keys greater than the node's key.
    3) Both the left and right subtrees must also be binary search trees.

"""

# Python program to check if a binary tree is bst or not

INT_MAX = 4294967296
INT_MIN = -4294967296


# A binary tree node
class Node:
    # Constructor to create a new node
    def __init__(self, data):
        self.data = data
        self.left = None
        self.right = None


def is_bst(node: Node):
    """Returns true if the given tree is a binary search tree (efficient version)"""
    return is_bst_util(node, INT_MIN, INT_MAX)


def is_bst_util(node: Node, mini: int, maxi: int):
    """
    Return true if the given tree is a BST and its values >= min and <= max
    :param node:
    :param mini:
    :param maxi:
    :return:
    """
    # An empty tree is BST
    if node is None:
        return True

    # False if this node violates min/max constraint
    if node.data < mini or node.data > maxi:
        return False

    # Otherwise check the subtrees recursively tightening the min or max constraint
    return is_bst_util(node.left, mini, node.data - 1) and \
        is_bst_util(node.right, node.data + 1, maxi)


if __name__ == '__main__':
    # Time Complexity: O(n)
    # Auxiliary Space : O(1) if Function Call Stack size is not considered, otherwise O(n)
    root = Node(4)
    root.left = Node(2)
    root.right = Node(5)
    root.left.left = Node(1)
    root.left.right = Node(3)

    print("Is BST") if is_bst(root) else print("Not a BST")

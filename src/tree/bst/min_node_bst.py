"""
Find the node with minimum value in a Binary Search Tree

This is quite simple. Just traverse the node from root to left recursively until left is NULL.
The node whose left is NULL is the node with minimum value.


"""
# Python program to find the node with minimum value in bst


class Node(object):
    def __init__(self, key):  # Constructor to create a new node
        self.data = key
        self.left = None
        self.right = None


def insert(node, data):
    """
    Give a binary search tree and a number, inserts a new node with the given number in the
    correct place in the tree. Returns the new root pointer which the caller should then use
    (the standard trick to avoid using reference parameters).
    :param node:
    :param data:
    :return:
    """
    # 1. If the tree is empty, return a new,
    # single node
    if node is None:
        return Node(data)

    else:
        # 2. Otherwise, recur down the tree
        if data <= node.data:
            node.left = insert(node.left, data)
        else:
            node.right = insert(node.right, data)

        # Return the (unchanged) node pointer
        return node


def min_value(node):
    """
    Given a non-empty binary search tree, return the minimum data value found in that tree.
    Note that the entire tree does not need to be searched.
    Time Complexity: O(n) Worst case happens for left skewed trees.
    :param node:
    :return:
    """
    current = node

    # loop down to find the lefmost leaf
    while current.left is not None:
        current = current.left

    return current.data


if __name__ == '__main__':
    root = None
    root = insert(root, 4)
    insert(root, 2)
    insert(root, 1)
    insert(root, 3)
    insert(root, 6)
    insert(root, 5)

    print("\nMinimum value in BST is %d" % (min_value(root)))

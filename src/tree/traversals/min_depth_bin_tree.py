"""
Find Minimum Depth of a Binary Tree

Given a binary tree, find its minimum depth. The minimum depth is the number of nodes along the shortest path
from root node down to the nearest leaf node.

For example, minimum height of below Binary Tree is 2.

Solution - 1

# The idea is to traverse the given Binary Tree. For every node, check if it is a leaf node. If yes, then return 1.
# If not leaf node then if left subtree is NULL, then recur for right subtree. And if right subtree is NULL,
# then recur for left subtree. If both left and right subtrees are not NULL, then take the minimum of two heights.

Solution - 2

The above method may end up with complete traversal of Binary Tree even when the topmost leaf is close to root. A
Better Solution is to do Level Order Traversal. While doing traversal, returns depth of the first encountered leaf
node. Below is implementation of this solution.

"""
from __future__ import print_function


class Node:
    def __init__(self, key):
        self.data = key
        self.left = None
        self.right = None


def minDepth(root):
    # Corner Case.Should never be hit unless the code is
    # called on root = NULL
    if root is None:
        return 0

    # Base Case : Leaf node.This accounts for height = 1
    if root.left is None and root.right is None:
        return 1

    # If left subtree is Null, recur for right subtree
    if root.left is None:
        return minDepth(root.right) + 1

    # If right subtree is Null , recur for left subtree
    if root.right is None:
        return minDepth(root.left) + 1

    return min(minDepth(root.left), minDepth(root.right)) + 1


def minDepth2(root):
    # Corner Case
    if root is None:
        return 0

    # Create an empty queue for level order traversal
    q = [{'node': root, 'depth': 1}]

    # Enqueue root and initialize depth as 1

    # Do level order traversal
    while len(q) > 0:
        # Remove the front queue item
        queueItem = q.pop(0)

        # Get details of the removed item
        node = queueItem['node']
        depth = queueItem['depth']
        # If this is the first leaf node seen so far
        # then return its depth as answer
        if node.left is None and node.right is None:
            return depth

            # If left subtree is not None, add it to queue
        if node.left is not None:
            q.append({'node': node.left, 'depth': depth + 1})

        # if right subtree is not None, add it to queue
        if node.right is not None:
            q.append({'node': node.right, 'depth': depth + 1})


if __name__ == '__main__':
    root = Node(1)
    root.left = Node(2)
    root.right = Node(3)
    root.left.left = Node(4)
    root.left.right = Node(5)
    print(minDepth(root))

    print(minDepth2(root))

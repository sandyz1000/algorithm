"""
Construct Full Binary Tree using its Preorder traversal and Preorder traversal of its mirror tree

Given two arrays that represent Preorder traversals of a full binary tree and its mirror tree, we need
to write a program to construct the binary tree using these two Preorder traversals.

A Full Binary Tree is a binary tree where every node has either 0 or 2 children.

Note: It is not possible to construct a general binary tree using these two traversal. But we can create
a full binary tree using the above traversals without any ambiguity. For more details refer to this article.


Method 1: Let us consider the two given arrays as preOrder[] = {1, 2, 4, 5, 3, 6, 7} and
preOrderMirror[] = {1 ,3 ,7 ,6 ,2 ,5 ,4}.

In both preOrder[] and preOrderMirror[], the leftmost element is root of tree. Since the tree is full and
array size is more than 1. The value next to 1 in preOrder[], must be left child of root and value next to
1 in preOrderMirror[] must be right child of root. So we know 1 is root and 2 is left child and 3 is the
right child. How to find the all nodes in left subtree? We know 2 is root of all nodes in left subtree and
3 is root of all nodes in right subtree. All nodes from and 2 in preOrderMirror[] must be in left subtree
of root node 1 and all node after 3 and before 2 in preOrderMirror[] must be in right subtree of root node
1. Now we know 1 is root, elements {2, 5, 4} are in left subtree, and the elements {3, 7, 6} are in the right subtree.

           1
        /    \
       /      \
    {2,5,4}  {3,7,6}
We will recursively follow the above approach and get the below tree:

                  1
               /    \
              2      3
            /   \   /  \
           4     5 6    7
"""
from typing import List
# Python3 program to construct full binary tree using its preorder traversal and
# preorder traversal of its mirror tree


class newNode:
    def __init__(self, data):
        self.data = data
        self.left = self.right = None

# A utility function to print inorder
# traversal of a Binary Tree


def prInorder(node):
    if (node is None):
        return
    prInorder(node.left)
    print(node.data, end=" ")
    prInorder(node.right)

# A recursive function to construct Full
# binary tree from pre[] and preM[].
# preIndex is used to keep track of index
# in pre[]. l is low index and h is high
# index for the current subarray in preM[]


def constructBinaryTreeUtil(pre: List[int], preM: List[int], preIndex: int,
                            low: int, high: int, size: int):
    # Base case
    if (preIndex >= size or low > high):
        return None, preIndex

    # The first node in preorder traversal
    # is root. So take the node at preIndex
    # from preorder and make it root, and
    # increment preIndex
    root = newNode(pre[preIndex])
    preIndex += 1

    # If the current subarry has only
    # one element, no need to recur
    if (low == high):
        return root, preIndex

    # Search the next element of
    # pre[] in preM[]
    i = 0
    for i in range(low, high + 1):
        if (pre[preIndex] == preM[i]):
            break

    # construct left and right subtrees
    # recursively
    if (i <= high):

        root.left, preIndex = constructBinaryTreeUtil(pre, preM, preIndex,
                                                      i, high, size)
        root.right, preIndex = constructBinaryTreeUtil(pre, preM, preIndex,
                                                       low + 1, i - 1, size)

    # return root
    return root, preIndex

# function to construct full binary tree
# using its preorder traversal and preorder
# traversal of its mirror tree


def constructBinaryTree(root, pre, preMirror, size):

    preIndex = 0
    preMIndex = 0

    root, x = constructBinaryTreeUtil(pre, preMirror, preIndex,
                                      0, size - 1, size)

    prInorder(root)


# Driver code
if __name__ == "__main__":

    preOrder = [1, 2, 4, 5, 3, 6, 7]
    preOrderMirror = [1, 3, 7, 6, 2, 5, 4]

    size = 7
    root = newNode(0)

    constructBinaryTree(root, preOrder,
                        preOrderMirror, size)

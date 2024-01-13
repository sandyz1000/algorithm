"""
Construct Special Binary Tree from given Inorder traversal
Given Inorder Traversal of a Special Binary Tree in which key of every node is greater than keys in
left and right children, construct the Binary Tree and return root.

---------------------------------------------------
Examples:
---------------------------------------------------

Input: inorder[] = {5, 10, 40, 30, 28}
Output: root of following tree
         40
       /   \
      10     30
     /         \
    5          28

Input: inorder[] = {1, 5, 10, 40, 30, 15, 28, 20}
Output: root of following tree
          40
        /    \
       10    30
      /       \
     5        28
    /        /  \
   1       15   20


---------------------------------------------------
Explanation:
---------------------------------------------------
The idea used in Construction of Tree from given Inorder and Preorder traversals can be used
here. Let the given array is {1, 5, 10, 40, 30, 15, 28, 20}. The maximum element in given array
must be root. The elements on left side of the maximum element are in left subtree and elements
on right side are in right subtree.

         40
      /       \
   {1,5,10}   {30,15,28,20}

We recursively follow above step for left and right subtrees, and finally get the following tree.

          40
        /   \
       10     30
      /         \
     5          28
    /          /  \
   1         15    20

------------------------------------------------------------
Algorithm:
------------------------------------------------------------
1)  Find index of the maximum element in array. The maximum element must be root of Binary Tree.
2)  Create a new tree node 'root' with the data as the maximum value found in step 1.
3)  Call buildTree for elements before the maximum element and make the built tree as left subtree
    of 'root'.
5)  Call buildTree for elements after the maximum element and make the built tree as right subtree
    of 'root'.
6)  return 'root'.

"""
from __future__ import print_function


# program to construct tree from in-order traversal
# Time Complexity: O(n^2)

class Node(object):
    """A binary tree node has data, pointer to left child and a pointer to right child"""
    def __init__(self, data, left=None, right=None):
        self.data = data
        self.left = left
        self.right = right


def build_tree(inorder, start, end):
    """
    Recursive function to construct binary of size len from Inorder traversal inorder[].
    Initial values of start and end should be 0 and len -1.

    :param inorder: list(int)
    :param start: int
    :param end: int
    :return:
    """
    if start > end:
        return None

    # Find index of the maximum element from Binary Tree
    i = maximum(inorder, start, end)

    # Pick the maximum value and make it root
    root = Node(inorder[i])

    # If this is the only element in inorder[start..end], then return it
    if start == end:
        return root

    # Using index in Inorder traversal, construct left and right subtress
    root.left = build_tree(inorder, start, i - 1)
    root.right = build_tree(inorder, i + 1, end)

    return root


def maximum(arr, strt, end):
    """
    UTILITY FUNCTIONS
    Function to find index of the maxim value in arr[start...end]
    :param arr:
    :param strt:
    :param end:
    :return:
    """
    maxim = arr[strt]
    maxind = strt
    for i in range(strt + 1, end + 1):
        if arr[i] > maxim:
            maxim = arr[i]
            maxind = i
    return maxind


def print_inorder(node):
    if node is None:
        return

    print_inorder(node.left)  # first recur on left child
    print("%d " % node.data)  # then print the data of node
    print_inorder(node.right)  # now recur on right child


if __name__ == '__main__':
    # Assume that in order traversal of following tree is given
    #      40
    #    /   \
    #   10     30
    #  /         \
    # 5          28
    inorder = [5, 10, 40, 30, 28]
    size = len(inorder)
    root = build_tree(inorder, 0, size - 1)

    # Let us test the built tree by printing In-order traversal
    print("\n Inorder traversal of the constructed tree is \n")
    print_inorder(root)

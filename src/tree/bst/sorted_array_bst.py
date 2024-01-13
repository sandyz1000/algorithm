"""
Sorted Array to Balanced BST
Given a sorted array. Creates a Balanced Binary Search Tree using array elements.

Examples:

Input:  Array {1, 2, 3}
Output: A Balanced BST
     2
   /  \
  1    3

Input: Array {1, 2, 3, 4}
Output: A Balanced BST
      3
    /  \
   2    4
 /
1

"""
from __future__ import print_function


class TNode(object):
    """A Binary Tree node"""
    def __init__(self, data, left=None, right=None):
        self.data = data
        self.left = None
        self.right = None


def sorted_array_to_bst(arr, start, end):
    """
    A function that constructs Balanced Binary Search Tree from a sorted array
    Time Complexity: O(n)

    --------------------------------------------------------
    Algorithm:
    --------------------------------------------------------
    In the previous post, we discussed construction of BST from sorted Linked List. Constructing
    from sorted array in O(n) time is simpler as we can get the middle element in O(1) time.
    Following is a simple algorithm where we first find the middle node of list and make it root
    of the tree to be constructed.

    1) Get the Middle of the array and make it root.
    2) Recursively do same for left half and right half.
        a) Get the middle of left half and make it left child of the root created in step 1.
        b) Get the middle of right half and make it right child of the root created in step 1.

    :param arr: List[int]
    :param start: int
    :param end: int
    :return:
    """
    if start > end:  # Base Case
        return None

    # Get the middle element and make it root
    mid = (start + end) // 2
    root = TNode(arr[mid])

    # Recursively construct the left subtree and make it left child of root
    root.left = sorted_array_to_bst(arr, start, mid - 1)

    # Recursively construct the right subtree and make it right child of root
    root.right = sorted_array_to_bst(arr, mid + 1, end)
    return root


def pre_order(node):
    """A utility function to print preorder traversal of BST"""
    if node is None:
        return

    print("%d " % node.data)
    pre_order(node.left)
    pre_order(node.right)


if __name__ == '__main__':
    arr = [1, 2, 3, 4, 5, 6, 7]
    n = len(arr)

    # Convert List to BST
    root = sorted_array_to_bst(arr, 0, n - 1)
    print("n PreOrder Traversal of constructed BST ")
    pre_order(root)

"""
Sorted order printing of a given array that represents a BST

Given an array that stores a complete Binary Search Tree, write a function that efficiently prints
the given array in ascending order.

For example, given an array [4, 2, 5, 1, 3], the function should print 1, 2, 3, 4, 5

            4
          /  \
         2    5
        / \
       1   3

Time Complexity: O(n)

Solution:
Inorder traversal of BST prints it in ascending order. The only trick is to modify recursion
termination condition in standard Inorder Tree Traversal.

"""
from __future__ import print_function


def print_sorted(arr, start, end):
    if start > end:
        return
    print_sorted(arr, start * 2 + 1, end)  # // print left subtree
    print("%d" % arr[start], end=" ")  # // print root
    print_sorted(arr, start * 2 + 2, end)  # // print right subtree


if __name__ == '__main__':
    arr = [4, 2, 5, 1, 3]
    arr_size = len(arr)
    print_sorted(arr, 0, arr_size - 1)

"""
Exponential Search
The name of this searching algorithm may be misleading as it works in O(Log n) time.
The name comes from the way it searches an element.

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Given a sorted array an element x to be searched, find position of x in the array.

Input:  arr = [10, 20, 40, 45, 55]
        x = 45
Output: Element found at index 3

Input:  arr = [10, 15, 25, 45, 55]
        x = 15
Output: Element found at index 1
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

------------------------------------------------------
Explanation:
------------------------------------------------------
We have discussed, linear search, binary search for this problem.

Exponential search involves two steps:
1. Find range where element is present
2. Do Binary Search in above found range.

How to find the range where element may be present?
The idea is to start with subarray size 1 compare its last element with x, then try size 2,
then 4 and so on until last element of a subarray is not greater.
Once we find an index i (after repeated doubling of i), we know that the element must be present
between i/2 and i (Why i/2? because we could not find a greater value in previous iteration)

"""
import typing


# Python program to find an element x in a sorted array using Exponential Search

def binary_search(arr: typing.List[int], left: int, right: int, x: int):
    """
    A recursive binary search function. Returns location of x in given array arr[l..r]
    is present, otherwise -1
    :param arr:
    :param l:
    :param r:
    :param x:
    :return:
    """
    if right >= left:
        mid = left + (right - left) // 2

        # If the element is present at the middle itself
        if arr[mid] == x:
            return mid

        # If the element is smaller than mid, then it
        # can only be present in the left subarray
        if arr[mid] > x:
            return binary_search(arr, left, mid - 1, x)

        # Else he element can only be present in the right
        return binary_search(arr, mid + 1, right, x)

    # We reach here if the element is not present
    return -1


def exponential_search(arr: typing.List[int], n: int, x: int):
    """Returns the position of first occurrence of x in array"""
    # IF x is present at first location itself
    if arr[0] == x:
        return 0

    # Find range for binary search by repeated doubling
    i = 1
    while i < n and arr[i] <= x:
        i = i * 2

    # Call binary search for the found range
    return binary_search(arr, i // 2, min(i, n), x)


if __name__ == '__main__':
    arr = [2, 3, 4, 10, 40]
    n = len(arr)
    x = 10
    result = exponential_search(arr, n, x)
    if result == -1:
        print("Element not found in thye array")
    else:
        print("Element is present at index %d" % (result))

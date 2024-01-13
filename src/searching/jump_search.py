"""
Jump Search

Like Binary Search, Jump Search is a searching algorithm for sorted arrays. The basic idea is to
check fewer elements (than linear search) by jumping ahead by fixed steps or skipping some elements
in place of searching all elements.

---------------------------------------------
Example:
---------------------------------------------
Suppose we have an array arr[] of size n and block (to be jumped) size m. Then we search at the
indexes arr[0], arr[m], arr[2m] ... arr[km] and so on. Once we find the interval (arr[km] < x <
arr[(k+1)m]), we perform a linear search operation from the index km to find the element x.

Let's consider the following array: (0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610).
Length of the array is 16. Jump search will find the value of 55 with the following steps assuming
that the block size to be jumped is 4.

STEP 1: Jump from index 0 to index 4
STEP 2: Jump from index 4 to index 8
STEP 3: Jump from index 8 to index 16
STEP 4: Since the element at index 16 is greater than 55 we will jump back step to come to index 9
STEP 5: Perform linear search from index 9 to get the element 55.

What is the optimal block size to be skipped?
In the worst case, we have to do n/m jumps and if the last checked value is greater than the
element to be searched for, we perform m-1 comparisons more for linear search. Therefore the total
number of comparisons in the worst case will be ((n/m) + m-1). The value of the function
((n/m) + m-1) will be minimum when m = math.sqrt(n). 
Therefore, the best step size is m = math.sqrt(n).

------------------------
Notes:
------------------------
Works only sorted arrays.
1) The optimal size of a block to be jumped is O( math.sqrt(n) ). This makes the time complexity
of Jump Search O(math.sqrt(n)).

2) The time complexity of Jump Search is between Linear Search ( ( O(n) ) and Binary Search
( O (Log n) ).

3) Binary Search is better than Jump Search, but Jump search has an advantage that we traverse back
only once (Binary Search may require up to O(Log n) jumps, consider a situation where the element
to be search is the smallest element or smaller than the smallest). So in a systems where jumping
back is costly, we use Jump Search.
"""
from typing import List
import math


# Python program to implement Jump Search
# Time Complexity : O(math.sqrt(n))
# Auxiliary Space : O(1)

def jump_search(arr: List[int], x: int, n: int) -> int:
    """
    :param arr: list
    :param x: int
    :param n: int
    :return:
    """
    # Finding block size to be jumped
    step = math.sqrt(n)

    # Finding the block where element is present (if it is present)
    prev = 0
    while arr[min(step, n) - 1] < x:
        prev = step
        step += math.sqrt(n)
        if prev >= n:
            return -1

    # Doing a linear search for x in block beginning with prev.
    while arr[prev] < x:
        prev += 1
        # If we reached next block or end of array, element is not present.
        if prev == min(step, n):
            return -1

    # If element is found
    if arr[prev] == x:
        return prev

    return -1


if __name__ == '__main__':
    # Fix exception
    arr = [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610]
    x = 55
    n = len(arr)
    # Find the index of 'x' using Jump Search
    index = jump_search(arr, x, n)

    # Print the index where 'x' is located
    print("\nNumber %d is at index %d" % (x, index))

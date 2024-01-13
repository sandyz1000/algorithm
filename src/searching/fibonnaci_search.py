"""
Fibonacci Search
http://www.geeksforgeeks.org/fibonacci-search/

Given a sorted array arr[] of size n and an element x to be searched in it. Return index of x if it
is present in array else return -1.

---------------------------------------------
Examples:
---------------------------------------------
Input:  arr[] = {2, 3, 4, 10, 40}, x = 10
Output:  3
Element x is present at index 3.

Input:  arr[] = {2, 3, 4, 10, 40}, x = 11
Output:  -1
Element x is not present.

Fibonacci Search is a comparison-based technique that uses Fibonacci numbers to search an element
in a sorted array.

Similarities with Binary Search:

1.  Works for sorted arrays
2.  A Divide and Conquer Algorithm.
3.  Has Log n time complexity.

Differences with Binary Search:

1.  Fibonacci Search divides given array in unequal parts
2.  Binary Search uses division operator to divide range. Fibonacci Search doesn't use /, but
    uses + and -. The division operator may be costly on some CPUs.
3.  Fibonacci Search examines relatively closer elements in subsequent steps. So when input array
    is big that cannot fit in CPU cache or even in RAM, Fibonacci Search can be useful.

---------------------------------------------
Background:
---------------------------------------------
Fibonacci Numbers are recursively defined as F(n) = F(n-1) + F(n-2), F(0) = 0, F(1) = 1. First few
Fibonacci Numbers are 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, .....

---------------------------------------------
Observations:
---------------------------------------------
Below observation is used for range elimination, and hence for the O(log(n)) complexity.

F(n - 2) = (1/3)*F(n) and
F(n - 1) = (2/3)*F(n).

---------------------------------------------
Algorithm:
---------------------------------------------
Let the searched element be x.

The idea it to first find the smallest Fibonacci number that is greater than or equal to length of
given array. Let the found fibonacci number be fib (m'th fibonacci number). We use (m-2)'th
Fibonacci number as index (If it is a valid index). Let (m-2)'th Fibonacci Number be i, we
compare arr[i] with x, if x is same, we return i. Else if x is greater, we recur for subarray after
i, else we recur for subarray before i.

Below is complete algorithm
Let arr[0..n-1] be th input array and element to be searched be x.

1. Find the smallest Fibonacci Number greater than or equal n. Let this number be fibM [m'th
  Fibonacci Number]. Let the two Fibonacci numbers preceding it be fibMm1 [(m-1)'th Fibonacci
  Number and fibMm2 [(m-2)'th Fibonacci Number./li>

2. While the array has elements to be inspected:
    a.  Compare x with the last element of the range covered by fibMm2
    b.  If x matches, return index
    c.  Else If x is greater than the element, move the three Fibonacci variables two Fibonacci down,
        indicating elimination of approximately rear two-third of the remaining array.
    d.  Else x is less than the element, move the three Fibonacci variables one Fibonacci down.
        Reset offset to index. Together these indicate elimination of approximately front one-third
        of the remaining array.

3.  Since there might be a single element remaining for comparison, check if fibMm1 is 1. If Yes,
    compare x with that remaining element. If match, return index.

Time Complexity analysis:

The worst case will occur when we have our target in the larger (2/3) fraction of the array,
as we proceed finding it. In other words, we are eliminating the smaller (1/3) fraction of the
array every time. We call once for n, then for(2/3) n, then for (4/9) n and henceforth.
"""
from typing import List

# Python program for Fibonacci Search


def fib_monaccian_search(arr: List[int], x: int, n: int) -> int:
    """Returns index of x if present, else returns -1"""
    # Initialize fibonacci numbers
    fibm_mm2 = 0  # (m-2)'th Fibonacci No.
    fibm_mm1 = 1  # (m-1)'th Fibonacci No.
    fib_m = fibm_mm2 + fibm_mm1  # m'th Fibonacci

    # fib_m is going to store the smallest Fibonacci Number greater than or equal to n
    while fib_m < n:
        fibm_mm2 = fibm_mm1
        fibm_mm1 = fib_m
        fib_m = fibm_mm2 + fibm_mm1

    # Marks the eliminated range from front
    offset = -1

    # while there are elements to be inspected. Note that we compare arr[fibMm2] with x.
    # When fib_m becomes 1, fibMm2 becomes 0
    while fib_m > 1:
        # Check if fibMm2 is a valid location
        i = min(offset + fibm_mm2, n - 1)
        # If x is greater than the value at index fibMm2, cut the subarray array from offset to i
        if arr[i] < x:
            fib_m = fibm_mm1
            fibm_mm1 = fibm_mm2
            fibm_mm2 = fib_m - fibm_mm1
            offset = i

        # If x is greater than the value at index fibMm2, cut the subarray after i+1
        elif arr[i] > x:
            fib_m = fibm_mm2
            fibm_mm1 = fibm_mm1 - fibm_mm2
            fibm_mm2 = fib_m - fibm_mm1

        else:  # element found. return index
            return i

    # comparing the last element with x
    if fibm_mm1 and arr[offset + 1] == x:
        return offset + 1

    # element not found. return -1
    return -1


if __name__ == '__main__':
    # Output: Found at index 8
    arr = [10, 22, 35, 40, 45, 50, 80, 82, 85, 90, 100]
    n = len(arr)
    x = 85
    print("Found at index: %d" % fib_monaccian_search(arr, x, n))

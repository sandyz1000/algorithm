"""
Find k closest elements to a given value
Given a sorted array arr[] and a value X, find the k closest elements to X in arr[].

------------------------------
Examples:
------------------------------
Input: K = 4, X = 35
       arr = [12, 16, 22, 30, 35, 39, 42, 45, 48, 50, 53, 55, 56]
Output: 30 39 42 45

Note that if the element is present in array, then it should not be in output, only the other
closest elements are required.

------------------------------
Explanation:
------------------------------
In the following solutions, it is assumed that all elements of array are distinct.

A simple solution is to do linear search for k closest elements.
1) Start from the first element and search for the crossover point (The point before which elements
are smaller than or equal to X and after which elements are greater). This step takes O(n) time.
2) Once we find the crossover point, we can compare elements on both sides of crossover point to
print k closest elements. This step takes O(k) time.

The time complexity of the above solution is O(n).

An Optimized Solution is to find k elements in O(Logn + k) time. The idea is to use Binary Search
to find the crossover point. Once we find index of crossover point, we can print k closest elements
in O(k) time.

"""
from typing import List


class KClosest(object):
    """
    Function to find the cross over point (the point before which elements are smaller than or
    equal to x and after which greater than x)
    The time complexity of this method is O(Logn + k).
    """

    def find_cross_over_(self, arr: List[int], low: int, high: int, x: int) -> int:
        """
        :param arr: list(int)
        :param low: int
        :param high: int
        :param x: int
        :return:
        """
        # Base cases
        if arr[high] <= x:  # x is greater than all
            return high

        if arr[low] > x:  # x is smaller than all
            return low

        # Find the middle point
        mid = (low + high) // 2  # low + (high - low) // 2

        # If x is same as middle element, then return mid
        if arr[mid] == x:
            return mid

        # If x is greater than arr[mid], then either arr[mid + 1] is ceiling of x
        # or ceiling lies in arr[mid+1...high]
        if arr[mid] < x:
            return self.find_cross_over_(arr, mid + 1, high, x)

        return self.find_cross_over_(arr, low, mid - 1, x)

    def print_kclosest(self, arr: List[int], x: int, k: int, n: int):
        """
        This function prints k closest elements to x in arr[].
        n is the number of elements in arr[]

        :return:
        """
        # Find the crossover point
        left = self.find_cross_over_(arr, 0, n - 1, x)
        right = left + 1  # Right index to search
        count = 0  # To keep track of count of elements already printed

        # If x is present in arr[], then reduce left index
        # Assumption: all elements in arr[] are distinct
        if arr[left] == x:
            left -= 1

        # Compare elements on left and right of crossover
        # point to find the k closest elements
        while left >= 0 and right < n and count < k:
            if x - arr[left] < arr[right] - x:
                print("%d " % arr[left])
                left -= 1
            else:
                print("%d " % arr[right])
                right += 1
            count += 1

        # If there are no more elements on right side, then print left elements
        while count < k and left >= 0:
            print("%d " % arr[left])
            left -= 1
            count += 1

        # If there are no more elements on left side, then
        # print right elements
        while count < k and right < n:
            print("%d " % arr[right])
            right += 1
            count += 1


import random


class KClosestPartition:
    def __init__(self) -> None:
        self.dist = lambda points, i: points[i][0]**2 + points[i][1]**2

    def sort(self, points: List[int], i: int, j: int, K: int):
        # Partially sorts A[i:j+1] so the first K elements are
        # the smallest K elements.
        if i >= j:
            return

        # Put random element as A[i] - this is the pivot
        k = random.randint(i, j)
        points[i], points[k] = points[k], points[i]

        mid = self.partition(points, i, j)
        if K < mid - i + 1:
            self.sort(points, i, mid - 1, K)
        elif K > mid - i + 1:
            self.sort(points, mid + 1, j, K - (mid - i + 1))

    def partition(self, points: List[int], i: int, j: int):
        # Partition by pivot A[i], returning an index mid
        # such that A[i] <= A[mid] <= A[j] for i < mid < j.
        oi = i
        pivot = self.dist(points, i)
        i += 1

        while True:
            while i < j and self.dist(points, i) < pivot:
                i += 1
            while i <= j and self.dist(points, j) >= pivot:
                j -= 1
            if i >= j:
                break
            points[i], points[j] = points[j], points[i]

        points[oi], points[j] = points[j], points[oi]
        return j

    def print_kclosest(self, points: List[int], K: int):
        self.sort(0, len(points) - 1, K)
        return points[:K]


if __name__ == '__main__':
    k_closest = KClosest()
    # Output: 30 39 42 45
    # The time complexity of this method is O(Logn + k).
    arr = [12, 16, 22, 30, 35, 39, 42, 45, 48, 50, 53, 55, 56]
    n = len(arr)
    x, k = 35, 4
    k_closest.print_kclosest(arr, x, 4, n)

    arr = [[3, 3], [5, -1], [-2, 4]]
    K = 2
    KClosestPartition().print_kclosest(arr, K)

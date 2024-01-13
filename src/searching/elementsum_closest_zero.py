"""
Two elements whose sum is closest to zero

Question: An Array of integers is given, both +ve and -ve. You need to find the two elements such
that their sum is closest to zero.

For the below array, program should print -80 and 85.

Algorithm:
1) Sort all the elements of the input array.
2) Use two index variables l and r to traverse from left and right ends respectively. Initialize l
   as 0 and r as n-1.
3) sum = a[l] + a[r]
4) If sum is -ve, then l++
5) If sum is +ve, then r–
6) Keep track of abs min sum.
7) Repeat steps 3, 4, 5 and 6 while l < r Implementation  """

from __future__ import print_function
from typing import List
import sys

# Time Complexity: complexity to sort + complexity of finding the optimum
# pair = O(nlogn) + O(n) = O(nlogn)


class Main:
    def min_abs_sum_pair(self, arr, n):
        # type: (List[int], int) -> None

        # Variables to keep track of current sum and minimum sum
        min_sum, summ = sys.maxsize, 0
        # left and right index variables
        l, r = 0, n - 1
        # variable to keep track of the left and right pair for min_sum
        min_l, min_r = l, n - 1
        if n < 2:  # Array should have at least two elements
            print("Invalid Input")
            return

        # self.sort(arr, 0, n-1)  # Sort the elements
        arr.sort()
        while l < r:
            summ = arr[l] + arr[r]
            # If abs(sum) is less then update the result items
            if abs(summ) < abs(min_sum):
                min_sum = summ
                min_l = l
                min_r = r

            if summ < 0:
                l += 1
            else:
                r -= 1
        print(" The two elements whose sum is minimum are %d and %d" % (arr[min_l], arr[min_r]))

    def partition(self, arr, low, high):
        # type: (List[int], int, int) -> int
        """
        This function takes last element as pivot, places the pivot element at its correct
        position in sorted array, and places all smaller (smaller than pivot) to left of pivot
        and all greater elements to right of pivot """
        pivot = arr[high]
        i = (low - 1)  # index of smaller element
        for j in range(low, high):
            # If current element is smaller than or equal to pivot
            if arr[j] <= pivot:
                i += 1
                arr[i], arr[j] = arr[j], arr[i]

        arr[i + 1], arr[high] = arr[high], arr[i + 1]
        return i + 1

    def sort(self, arr, low, high):
        # type: (List[int], int, int) -> None
        """
        The main function that implements QuickSort()
        arr[] --> Array to be sorted,
        low  --> Starting index,
        high  --> Ending index
        :param arr:
        :param low:
        :param high:
        :return:
        """
        if low < high:
            # pi is partitioning index, arr[pi] is now at right place
            pi = self.partition(arr, low, high)

            # Recursively sort elements before partition and after partition
            self.sort(arr, low, pi - 1)
            self.sort(arr, pi + 1, high)


if __name__ == '__main__':
    # Output: The two elements whose sum is minimum are -80 and 85
    main = Main()
    arr = [1, 60, -10, 70, -80, 85]
    n = len(arr)
    main.min_abs_sum_pair(arr, n)

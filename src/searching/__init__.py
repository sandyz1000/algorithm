from __future__ import print_function, unicode_literals

"""
Notes:
------

1) Stability in sorting algorithms
--------------------------------

A sorting algorithm is said to be stable if two objects with equal keys appear in the same order
in sorted output as they appear in the input unsorted array. Some sorting algorithms are stable
by nature like Insertion sort, Merge Sort, Bubble Sort, etc. And some sorting algorithms are not,
like Heap Sort, Quick Sort, etc.

However, any given sorting algo which is not stable can be modified to be stable. There can be
sorting algo specific ways to make it stable, but in general, any comparison based sorting
algorithm which is not stable by nature can be modified to be stable by changing the key
comparison operation so that the comparison of two keys considers position as a factor for
objects with equal keys.

2) Interpolation search vs Binary search
--------------------------------
Interpolation search works better than Binary Search for a sorted and uniformly distributed array.
On average the interpolation search makes about log(log(n)) comparisons (if the elements are
uniformly distributed), where n is the number of elements to be searched. In the worst case (for
instance where the numerical values of the keys increase exponentially) it can make up to O(n)
comparisons

"""
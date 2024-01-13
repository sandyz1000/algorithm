""" The Ubiquitous Binary Search | Set 1"""


class BinarySearch:
    """
    We all aware of binary search algorithm. Binary search is easiest difficult algorithm to get
    it right. I present some interesting problems that I collected on binary search. There were
    some requests on binary search.

    I request you to honor the code, “I sincerely attempt to solve the problem and ensure there
    are no corner cases”. After reading each problem minimize the browser and try solving it.

    Problem Statement: Given a sorted array of N distinct elements. Find a key in the array using
    least number of comparisons. (Do you think binary search is optimal to search a key in sorted
    array?)

    Without much theory, here is typical binary search algorithm.
    """

    def binary_search(self, A, l, r, key):
        """Returns location of key, or -1 if not found"""
        while l <= r:
            m = l + (r - l) // 2
            if A[m] == key:  # first comparison
                return m
            if A[m] < key:  # second comparison
                l = m + 1
            else:
                r = m - 1
        return -1


# Theoretically we need log N + 1 comparisons in worst case. If we observe, we are using two
# comparisons per iteration except during final successful match, if any. In practice, comparison
#  would be costly operation, it won't be just primitive type comparison. It is more economical
# to minimize comparisons as that of theoretical limit.
# See below figure on initialize of indices in the next implementation.

class UbiquotousBinarySearch2:
    """
    The following implementation uses fewer number of comparisons.
    Invariant: A[l] <= key and A[r] > key
    Boundary: |r - l| = 1
    Input: A[l .... r-1]
    """

    def binary_search(self, A, l, r, key):
        while r - l > 1:
            m = l + (r - l) // 2

            if A[m] <= key:
                l = m
            else:
                r = m

        return l if (A[l] == key) else -1


# In the while loop we are depending only on one comparison. The search space converges to place
# l and r point two different consecutive elements. We need one more comparison to trace search
# status.

class UbquiBinSearch:
    """
    Problem Statement: Given an array of N distinct integers, find floor value of input 'key'. Say,
    A = {-1, 2, 3, 5, 6, 8, 9, 10} and key = 7, we should return 6 as outcome.

    We can use the above optimized implementation to find floor value of key. We keep moving the
    left pointer to right most as long as the invariant holds. Eventually left pointer points an
    element less than or equal to key (by definition floor value). The following are possible
    corner cases,

    —> If all elements in the array are smaller than key, left pointer moves till last element.
    —> If all elements in the array are greater than key, it is an error condition.
    —> If all elements in the array equal and <= key, it is worst case input to our implementation.

    largest value <= key
    Invariant: A[l] <= key and A[r] > key
    Boundary: |r - l| = 1
    Input: A[l .... r-1]
    Precondition: A[l] <= key <= A[r]
    """

    def floor_rec(self, A, l, r, key):
        while r - l > 1:
            m = l + (r - l) // 2
            if A[m] <= key:
                l = m
            else:
                r = m
        return A[l]

    def floor(self, A, size, key):
        # Add error checking if key < A[0]
        if key < A[0]:
            return -1

        # Observe boundaries
        return self.floor_rec(A, 0, size, key)


class UbiquoBinarySearch:
    """
    Problem Statement: Given a sorted array with possible duplicate elements.
    Find number of occurrences of input 'key' in log N time.

    The idea here is finding left and right most occurrences of key in the array using binary
    search. We can modify floor function to trace right most occurrence and left most occurrence.
    Here is implementation,

    Input: Indices Range [l ... r)
    Invariant: A[l] <= key and A[r] > key
    """

    def get_right_position(self, A, l, r, key):
        while r - l > 1:
            m = l + (r - l) // 2
            if A[m] <= key:
                l = m
            else:
                r = m
        return l

    def get_left_position(self, A, l, r, key):
        """
        Input: Indices Range (l ... r]
        Invariant: A[r] >= key and A[l] > key"""
        while r - l > 1:
            m = l + (r - l) // 2
            if A[m] >= key:
                r = m
            else:
                l = m
        return r

    def count_occurances(self, A, size, key):
        # Observe boundary conditions
        left = self.get_left_position(A, -1, size - 1, key)
        right = self.get_right_position(A, 0, size, key)

        # What if the element doesn't exists in the array?
        # The checks helps to trace that element exists
        return right - left + 1 if (A[left] == key and key == A[right]) else 0


class UbiquotousBinarySearch:
    """
    Problem Statement: Given a sorted array of distinct elements, and the array is rotated at an
    unknown position. Find minimum element in the array.

    We can see  pictorial representation of sample input array in the below figure.

        ---- DIAGRAM-GOES-HERE ----

    We converge the search space till l and r points single element. If the middle location falls in
    the first pulse, the condition A[m] < A[r] doesn't satisfy, we exclude the range A[m+1 ... r].
    If the middle location falls in the second pulse, the condition A[m] < A[r] satisfied, we
    converge our search space to A[m+1 … r]. At every iteration we check for search space size, if
    it is 1, we are done.

    Given below is implementation of algorithm. Can you come up with different implementation?


    Exercises:

    1.  A function called signum(x, y) is defined as,

        signum(x, y) = -1 if x < y
                    =  0 if x = y
                    =  1 if x > y
    Did you come across any instruction set in which a comparison behaves like signum function?
    Can it make first implementation of binary search optimal?

    2.  Implement ceil function replica of floor function.

    3.  Discuss with your friends on "Is binary search optimal (results in least number of
        comparisons)? Why not ternary search or interpolation search on sorted array? When do
        you prefer ternary or interpolation search over binary search?"

    4. Draw a tree representation of binary search (believe me, it helps you a lot to understand
    many internals of binary search).

    Binary Search Iidex of minimum rotated array
    """
    def binsearch_index_rotated_array(self, A, l, r):
        if A[l] <= A[r]:
            return l

        while l <= r:
            # Termination condition (l will eventually falls on r, and r always point
            # minimum possible value)
            if l == r:
                return l
            # 'm' can fall in first pulse, second pulse or exactly in the middle
            m = l + (r - l) // 2
            if A[m] < A[r]:
                # min can't be in the range (m < i <= r), we can exclude A[m+1 ... r]
                r = m
            else:
                # min must be in the range (m < i <= r), we must search in A[m+1 ... r]
                l = m + 1

        return -1

    def execute(self, A, size):
        return self.binsearch_index_rotated_array(A, 0, size - 1)

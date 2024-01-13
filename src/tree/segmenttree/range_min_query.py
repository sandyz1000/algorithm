"""
http://www.geeksforgeeks.org/segment-tree-set-1-range-minimum-query/
--------------------------------------------------------------------

In this post, Range Minimum Query problem is discussed as another example where Segment Tree
can be used. Following is problem statement.

We have an arry arr[0 . . . n-1]. We should be able to efficiently find the minimum value from
index qs (query start) to qe (query end) where 0 <= qs <= qe <= n-1.

A simple solution is to run a loop from qs to qe and find minimum element in given range. This
solution takes O(n) time in worst case.

Another solution is to create a 2D array where an entry [i, j] stores the minimum value in range
arr[i..j]. Minimum of a given range can now be calculated in O(1) time, but pre-processing takes
O(n^2) time. Also, this approach needs O(n^2) extra space which may become huge for large input
arrays.

Segment tree can be used to do pre-processing and query in moderate time. With segment tree,
pre-processing time is O(n) and time to for range minimum query is O(Logn). The extra space
required is O(n) to store the segment tree.

Representation of Segment trees
1. Leaf Nodes are the elements of the input array.
2. Each internal node represents minimum of all leaves under it.

Construction of Segment Tree from given array:

We start with a segment arr[0 ... n-1]. and every time we divide the current segment into
two halves(if it has not yet become a segment of length 1), and then call the same procedure
on both halves, and for each such segment, we store the minimum value in a segment tree node.

All levels of the constructed segment tree will be completely filled except the last level.
Also, the tree will be a Full Binary Tree because we
always divide segments in two halves at every level. Since the constructed tree is always full
binary tree with n leaves, there will be n-1 internal nodes.
So total number of nodes will be 2*n - 1. Height of the segment tree will be math.log(n, 2).
Since the tree is represented using array and relation between parent and child indexes must
be maintained, size of memory allocated for segment tree will be 2 * 2^math.log(n, 2) - 1.

"""
import sys
import math


class RangeMinQuery(object):
    def __init__(self):
        pass

    def get_mid(self, s, e):
        """
        A utility function to get the middle index from corner indexes.
        :param s:
        :param e:
        :return:
        """
        return s + (e - s) // 2

    def rmq_util(self, st, ss, se, qs, qe, index):
        """
        A recursive function to get the minimum value in a given range of arr indexes.
        The following are parameters for this function.
        st    --> Pointer to segment tree
        index --> Index of current node in the segment tree. Initially 0 is passed as root is
        always at index 0
        ss & se  --> Starting and ending indexes of the segment represented by current node,
        i.e., st[index]
        qs & qe  --> Starting and ending indexes of query range
        :param ss:
        :param se:
        :param qs:
        :param qe:
        :param index:
        :return:
        """
        # If segment of this node is a part of given range, then return the min of the segment
        if qs <= ss and qe >= se:
            return st[index]

        # If segment of this node is outside the given range
        if se < qs or ss > qe:
            return sys.maxsize

        # If a part of this segment overlaps with the given range
        mid = self.get_mid(ss, se)
        min_value = lambda a, b: a if a < b else b
        return min_value(self.rmq_util(st, ss, mid, qs, qe, 2 * index + 1),
                         self.rmq_util(st, mid + 1, se, qs, qe, 2 * index + 2))

    def rmq(self, st, n, qs, qe):
        """
        Return minimum of elements in range from index qs (quey start) to qe (query end).
        It mainly uses rmq_util()
        :param st:
        :param n:
        :param qs:
        :param qe:
        :return:
        """
        # Check for erroneous input values
        if qs < 0 or qe > n - 1 or qs > qe:
            print("Invalid Input")
            return -1

        return self.rmq_util(st, 0, n - 1, qs, qe, 0)

    def construct_st_util(self, arr, ss, se, st, si):
        """
        A recursive function that constructs Segment Tree for arr[ss..se].
        si is index of current node in segment tree st
        :param arr:
        :param ss:
        :param se:
        :param st:
        :param si:
        :return:
        """
        # If there is one element in arr, store it in current node of segment tree and return
        if ss == se:
            st[si] = arr[ss]
            return arr[ss]

        # If there are more than one elements, then recur for left and right subtrees and store
        # the minimum of two values in this node
        min_value = lambda a, b: a if a < b else b
        mid = self.get_mid(ss, se)
        st[si] = min_value(self.construct_st_util(arr, ss, mid, st, si * 2 + 1),
                           self.construct_st_util(arr, mid + 1, se, st, si * 2 + 2))
        return st[si]

    def construct_st(self, arr, n):
        """
        Function to construct segment tree from given arr. This function allocates memory for
        segment tree and calls constructSTUtil() to fill the allocated memory.
        :param arr: list(int)
        :param n: int
        :return:
        """
        # Height of segment tree
        x = int(math.ceil(math.log(n, 2)))

        # Maximum size of segment tree
        max_size = 2 * pow(2, x) - 1
        st = [0] * max_size

        # Fill the allocated memory st
        self.construct_st_util(arr, 0, n - 1, st, 0)
        # Return the constructed segment tree
        return st


if __name__ == '__main__':
    # Output: Minimum of values in range [1, 5] is = 2
    arr = [1, 3, 2, 7, 9, 11]
    n = len(arr)
    rsq = RangeMinQuery()
    st = rsq.construct_st(arr, n)
    qs, qe = 1, 5  # Starting index of query range and Ending index of query range
    print("Minimum of values in range [%d, %d] is = %d\n" % (qs, qe, rsq.rmq(st, n, qs, qe)))

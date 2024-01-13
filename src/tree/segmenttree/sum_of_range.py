"""
http://www.geeksforgeeks.org/segment-tree-set-1-sum-of-given-range/
--------------------------------------------------------------------

We have an array arr[0 . . . n-1]. We should be able to
1 Find the sum of elements from index l to r where 0 <= l <= r <= n-1
2 Change value of a specified element of the array to a new value x. We need to do arr[i] = x
where 0 <= i <= n-1.

A simple solution is to run a loop from l to r and calculate sum of elements in given range. To
update a value, simply do arr[i] = x. The first operation takes O(n) time and second operation
takes O(1) time.

Another solution is to create another array and store sum from start to i at the ith index in
this array. Sum of a given range can now be calculated in O(1) time, but update operation takes
O(n) time now. This works well if the number of query operations are large and very few updates.

What if the number of query and updates are equal? Can we perform both the operations in O(log n)
time once given the array? We can use a Segment Tree to do both operations in O(Logn) time.

Representation of Segment trees 1. Leaf Nodes are the elements of the input array. 2. Each
internal node represents some merging of the leaf nodes. The merging may be different for
different problems. For this problem, merging is sum of leaves under a node.

An array representation of tree is used to represent Segment Trees. For each node at index i,
the left child is at index 2*i+1, right child at 2*i+2 and the parent is at [i-1/2].

"""
import math


class SumOfRange(object):
    def get_mid(self, s, e):
        """
        A utility function to get the middle index from corner indexes.
        :param s: int
        :param e: int
        """
        return s + (e - s) // 2

    def get_sum_utils(self, st, ss, se, qs, qe, si):
        """
        A recursive function to get the sum of values in given range
        of the arr. The following are parameters for this function.
        st --> Pointer to segment tree
        si --> Index of current node in the segment tree. Initially 0 is passed as root is
        always at index 0
        ss & se  --> Starting and ending indexes of the segment represented by current
        node, i.e., st[si]
        qs & qe  --> Starting and ending indexes of query range
        :param st: list(int)
        :param si: int
        :param se: int
        :param qs: int
        :param qe: int
        :param si: int
        :return:
        """
        # If segment of this node is a part of given range, then return the sum of the segment
        if qs <= ss and qe >= se:
            return st[si]
        # If segment of this node is outside the given range
        if se < qs or ss > qe:
            return 0

        # If a part of this segment overlaps with the given range
        mid = self.get_mid(ss, se)
        return self.get_sum_utils(st, ss, mid, qs, qe, 2 * si + 1) + \
               self.get_sum_utils(st, mid + 1, se, qs, qe, 2 * si + 2)

    def update_value_utils(self, st, ss, se, i, diff, si):
        """
        A recursive function to update the nodes which have the given index in their range.
        The following are parameters
        st, si, ss and se are same as getSumUtil()
        i --> index of the element to be updated. This index is in input arr.
        diff --> Value to be added to all nodes which have i in range
        :param st: list(int)
        :param ss: int
        :param se: int
        :param i: int
        :param diff: int
        :param si: int
        :return:
        """
        # Base Case: If the input index lies outside the range of this segment
        if i < ss or i > se:
            return -1

        # If the input index is in range of this node, then update the value of the
        # node and its children
        st[si] = st[si] + diff
        if se != ss:
            mid = self.get_mid(ss, se)
            self.update_value_utils(st, ss, mid, i, diff, 2 * si + 1)
            self.update_value_utils(st, mid + 1, se, i, diff, 2 * si + 2)

    def get_sum(self, st, n, qs, qe):
        """
        Return sum of elements in range from index qs (quey start) to qe (query end).
        It mainly uses get_sum_utils()
        :param st: list(int)
        :param n: int
        :param qs: int
        :param qe: int
        :return:
        """
        # Check for erroneous input values
        if qs < 0 or qe > n - 1 or qs > qe:
            print("Invalid Input")
            return -1

        return self.get_sum_utils(st, 0, n - 1, qs, qe, 0)

    def update_value(self, arr, st, n, i, new_val):
        """
        The function to update a value in input arr and segment tree.
        It uses updateValueUtil() to update the value in segment tree
        :param arr: list(int)
        :param st: list(int)
        :param n: int
        :param i: int
        :param new_val: int
        :return:
        """
        # Check for erroneous input index
        if i < 0 or i > n - 1:
            print("Invalid input")
            return -1

        # Get the difference between new value and old value
        diff = new_val - arr[i]

        # Update the value in _array
        arr[i] = new_val

        # Update the values of nodes in segment tree
        self.update_value_utils(st, 0, n - 1, i, diff, 0)

    def construct_st(self, arr, n):
        """
        Function to construct segment tree from given arr. This function
        allocates memory for segment tree and calls constructSTUtil() to
        fill the allocated memory
        :param arr:
        :param n:
        :return:
        """
        # Allocate memory for segment tree
        # Height of segment tree
        x = int(math.ceil(math.log(n, 2)))

        # Maximum size of segment tree
        max_size = 2 * int(math.pow(2, x)) - 1

        # Allocate memory
        st = [0] * max_size
        self.construct_st_utils(arr, 0, n - 1, st, 0)
        return st

    def construct_st_utils(self, arr, ss, se, st, si):
        """
        A recursive function that constructs Segment Tree for arr[ss..se]. si is index of
        current node in segment tree st
        :param arr: list(int)
        :param ss: int
        :param se: int
        :param st: int
        :param si: int
        :return:
        """
        # If there is one element in _array, store it in current node of
        # segment tree and return
        if ss == se:
            st[si] = arr[ss]
            return arr[ss]

        # If there are more than one elements, then recur for left and right subtrees
        # and store the sum of values in this node
        mid = self.get_mid(ss, se)
        st[si] = self.construct_st_utils(arr, ss, mid, st, si * 2 + 1) + \
                 self.construct_st_utils(arr, mid + 1, se, st, si * 2 + 2)
        return st[si]


if __name__ == '__main__':
    # Sum of values in given range = 15
    # Updated sum of values in given range = 22
    arr = [1, 3, 5, 7, 9, 11]
    n = len(arr)
    # Build segment tree from given _array
    sum_range = SumOfRange()
    st = sum_range.construct_st(arr, n)

    # Print sum of values in _array from index 1 to 3
    print("Sum of values in given range = %dn" % sum_range.get_sum(st, n, 1, 3))

    # Update: set arr[1] = 10 and update corresponding segment tree nodes
    sum_range.update_value(arr, st, n, 1, 10)

    # Find sum after the value is updated
    print("Updated sum of values in given range = %dn" % sum_range.get_sum(st, n, 1, 3))

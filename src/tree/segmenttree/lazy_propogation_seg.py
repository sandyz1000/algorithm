# coding=utf-8
"""Lazy Propagation in Segment Tree
Segment tree is introduced in previous post with an example of range sum problem. We have used the
same "Sum of given Range" problem to explain Lazy propagation

How does update work in Simple Segment Tree?
In the previous post, update function was called to update only a single value in array. Please
note that a single value update in array may cause multiple updates in Segment Tree as there may be
many segment tree nodes that have a single array element in their ranges.

Below is simple logic used in previous post.
1) Start with root of segment tree.
2) If array index to be updated is not in current node’s range, then return
3) Else update current node and recur for children.

------------------------------------------------
Explanation:
------------------------------------------------

Lazy Propagation – An optimization to make range updates faster

When there are many updates and updates are done on a range, we can postpone some updates (avoid
recursive calls in update) and do those updates only when required.

Please remember that a node in segment tree stores or represents result of a query for a range of
indexes. And if this node’s range lies within the update operation range, then all descendants of
the node must also be updated. For example consider the node with value 27 in above diagram,
this node stores sum of values at indexes from 3 to 5. If our update query is for range 2 to 5,
then we need to update this node and all descendants of this node. With Lazy propagation,
we update only node with value 27 and postpone updates to its children by storing this update
information in separate nodes called lazy nodes or values. We create an array lazy[] which
represents lazy node. Size of lazy[] is same as array that represents segment tree, which is
tree[] in below code.

The idea is to initialize all elements of lazy[] as 0. A value 0 in lazy[i] indicates that there
are no pending updates on node i in segment tree. A non-zero value of lazy[i] means that this
amount needs to be added to node i in segment tree before making any query to the node.

==Is there any change in Query Function also?==

Since we have changed update to postpone its operations, there may be problems if a query is made
to a node that is yet to be updated. So we need to update our query method also which is
getSumUtil in previous post. The getSumUtil() now first checks if there is a pending update and
if there is, then updates the node. Once it makes sure that pending update is done, it works same
as the previous getSumUtil()."""

from __future__ import print_function


MAX = 1000


class LazyPropogationSegmentTree(object):
    def __init__(self):
        self.tree = [0 for i in range(MAX)]  # To store segment tree
        self.lazy = [0 for i in range(MAX)]  # To store pending updates

    def get_sum_utils(self, ss, se, qs, qe, si):
        """
        A recursive function to get the sum of values in given range of the arr.
        The following are parameters for this function.
        si --> Index of current node in the segment tree. Initially 0 is passed as
        root is always at' index 0
        ss & se  --> Starting and ending indexes of the segment represented by current node,
                     i.e., tree[si]
        qs & qe  --> Starting and ending indexes of query range
        :type ss: int
        :type se: int
        :type qs: int
        :type qe: int
        :type si: int
        :return:
        """
        # If lazy flag is set for current node of segment tree, then there are some pending
        # updates. So we need to make sure that the pending updates are done before processing
        # the sub sum query
        if self.lazy[si] != 0:
            # Make pending updates to this node. Note that this node represents sum of
            # elements in arr[ss..se] and all these elements must be increased by lazy[si]
            self.tree[si] += (se - ss + 1) * self.lazy[si]

            # checking if it is not leaf node because if it is leaf node
            # then we cannot go further
            if ss != se:
                # Since we are not yet updating children os si,
                # we need to set lazy values for the children
                self.lazy[si * 2 + 1] += self.lazy[si]
                self.lazy[si * 2 + 2] += self.lazy[si]

            # unset the lazy value for current node as it has been updated
            self.lazy[si] = 0

        # Out of range
        if ss > se or ss > qe or se < qs:
            return 0

        # At this point we are sure that pending lazy updates are done for current node. So we
        # can return value (same as it was for query in our previous post)

        # If this segment lies in range
        if ss >= qs and se <= qe:
            return self.tree[si]

        # If a part of this segment overlaps with the given range
        mid = (ss + se) // 2
        return self.get_sum_utils(ss, mid, qs, qe, 2 * si + 1) + \
               self.get_sum_utils(mid + 1, se, qs, qe, 2 * si + 2)

    def update_range_utils(self, si, ss, se, us, ue, diff):
        """
        Ideally, we should not use global variables and large constant-sized arrays,
        we have done it here for simplicity.

        si -> index of current node in segment tree
        ss and se -> Starting and ending indexes of elements for which current
        nodes stores sum.
        us and ue -> starting and ending indexes of update query
        diff -> which we need to add in the range us to ue

        If lazy value is non-zero for current node of segment tree, then there are some pending
        updates. So we need to make sure that the pending updates are done before making new
        updates. Because this value may be used by parent after recursive calls (See last line of
        this function)
        :return:
        """
        if si < len(self.lazy) and self.lazy[si] != 0:
            # Make pending updates using value stored in lazy nodes
            self.tree[si] += (se - ss + 1) * self.lazy[si]

            # checking if it is not leaf node because if it is leaf node
            # then we cannot go further
            if ss != se:
                # We can postpone updating children we don't need their new values now. Since we
                # are not yet updating children of si, we need to set lazy flags for the children
                self.lazy[si * 2 + 1] += self.lazy[si]
                self.lazy[si * 2 + 2] += self.lazy[si]

            # Set the lazy value for current node as 0 as it has been updated
            self.lazy[si] = 0

        # out of range
        if ss > se or ss > ue or se < us:
            return

            # Current segment is fully in range
        if si < len(self.tree) and ss >= us and se <= ue:
            # Add the difference to current node
            self.tree[si] += (se - ss + 1) * diff

            # same logic for checking leaf node or not
            if ss != se:
                # This is where we store values in lazy nodes, rather than updating the
                # segment tree itself. Since we don't need these updated values now
                # we postpone updates by storing values in lazy[]
                self.lazy[si * 2 + 1] += diff
                self.lazy[si * 2 + 2] += diff

                return

        # If not completely in rang, but overlaps, recur for children,
        mid = (ss + se) // 2
        self.update_range_utils(si * 2 + 1, ss, mid, us, ue, diff)
        self.update_range_utils(si * 2 + 2, mid + 1, se, us, ue, diff)

        # And use the result of children calls to update this node
        self.tree[si] = self.tree[si * 2 + 1] + self.tree[si * 2 + 2]

    def construct_st(self, arr, n):
        """
        Function to construct segment tree from given arr. This function allocates memory for
        segment tree and calls constructSTUtil() to fill the allocated memory
        :type arr: list(int)
        :type n: int
        :return:
        """
        self.construct_st_utils(arr, 0, n - 1, 0)

    def construct_st_utils(self, arr, ss, se, si):
        """
        A recursive function that constructs Segment Tree for arr[ss..se]. si is index of
        current node in segment tree st.
        :type arr: list(int)
        :type ss: int
        :type se: int
        :type si: int
        :return:
        """
        # out of range as ss can never be greater than se
        if ss > se:
            return

        # If there is one element in arr, store it in current node of segment tree and return
        if ss == se:
            self.tree[si] = arr[ss]
            return

        # If there are more than one elements, then recur for left and right subtrees and store
        # the sum of values in this node
        mid = (ss + se) // 2
        self.construct_st_utils(arr, ss, mid, si * 2 + 1)
        self.construct_st_utils(arr, mid + 1, se, si * 2 + 2)

        self.tree[si] = self.tree[si * 2 + 1] + self.tree[si * 2 + 2]

    def get_sum(self, n, qs, qe):
        """
        Return sum of elements in range from index qs (quey start) to qe (query end).
        It mainly uses self.get_sum_utils() Check for erroneous input values
        :return:
        """
        if qs < 0 or qe > n - 1 or qs > qe:
            print("Invalid Input")
        return self.get_sum_utils(0, n - 1, qs, qe, 0)

    def update_range(self, n, us, ue, diff):
        """
        Function to update a range of values in segment tree
        us and eu -> starting and ending indexes of update query
        ue  -> ending index of update query
        diff -> which we need to add in the range us to ue
        :type n: int
        :type us: int
        :type ue: int
        :type diff: int
        :return:
        """
        self.update_range_utils(0, 0, n - 1, us, ue, diff)


if __name__ == '__main__':
    # Output:
    # Sum of values in given range = 15
    # Updated sum of values in given range = 45
    arr = [1, 3, 5, 7, 9, 11]
    n = len(arr)

    seg_tree = LazyPropogationSegmentTree()

    # Build segment tree from given arr
    seg_tree.construct_st(arr, n)
    print("Sum of values in given range = %d\n" % seg_tree.get_sum(n, 1, 3))

    # Add 10 to all nodes at indexes from 1 to 5.
    seg_tree.update_range(n, 1, 5, 10)
    # Find sum after the value is updated
    print("Updated sum of values in given range = %d\n" % seg_tree.get_sum(n, 1, 3))

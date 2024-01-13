# coding=utf-8
"""Persistent Segment Tree | Set 1 (Introduction)

- - - - - - - - - - - - - - - - - - - - - - - - -
Prerequisite : Segment Tree
               Persistency in Data Structure

- - - - - - - - - - - - - - - - - - - - - - - - -

Segment Tree is itself a great data structure that comes into play in many cases. In this post we
will introduce the concept of Persistency in this data structure. Persistency, simply means to
retain the changes. But obviously, retaining the changes cause extra memory consumption and hence
affect the Time Complexity.

Our aim is to apply persistency in segment tree and also to ensure that it does not take more
than O(log n) time and space for each change.

Let's think in terms of versions i.e. for each change in our segment tree we create a new version
of it. We will consider our initial version to be Version-0. Now, as we do any update in the
segment tree we will create a new version for it and in similar fashion track the record for all
versions.

But creating the whole tree for every version will take O(n log n) extra space and O(n log n)
time. So, this idea runs out of time and memory for large number of versions.

Let's exploit the fact that for each new update(say point update for simplicity) in segment tree,
At max logn nodes will be modified. So, our new version will only contain these log n new nodes
and rest nodes will be the same as previous version. Therefore, it is quite clear that for each
new version we only need to create these log n new nodes whereas the rest of nodes can be shared
from the previous version.

Consider the below figure for better visualization(click on the image for better view) :-
persistent segtree

Consider the segment tree with green nodes . Lets call this segment tree as version-0. The left
child for each node is connected with solid red edge where as the right child for each node is
connected with solid purple edge. Clearly, this segment tree consists of 15 nodes.

Now consider we need to make change in the leaf node 13 of version-0.
So, the affected nodes will be – node 13 , node 6 , node 3 , node 1.
Therefore, for the new version (Version-1) we need to create only these 4 new nodes.

Now, lets construct version-1 for this change in segment tree. We need a new node 1 as it is
affected by change done in node 13. So , we will first create a new node 1`(yellow color) . The
left child for node 1` will be the same for left child for node 1 in version-0. So, we connect
the left child of node 1` with node 2 of version-0(red dashed line in figure). Let's now examine
the right child for node 1` in version-1. We need to create a new node as it is affected . So we
create a new node called node 3` and make it the right child for node 1`(solid purple edge
connection).

In the similar fashion we will now examine for node 3`. The left child is affected , So we create
a new node called node 6` and connect it with solid red edge with node 3` , where as the right
child for node 3` will be the same as right child of node 3 in version-0. So, we will make the
right child of node 3 in version-0 as the right child of node 3` in version-1(see the purple dash
edge.)

Same procedure is done for node 6` and we see that the left child of node 6` will be the left
child of node 6 in version-0(red dashed connection) and right child is newly created node called
node 13`(solid purple dashed edge).

Each yellow color node is a newly created node and dashed edges are the inter-connection between
the different versions of the segment tree.

Now, the Question arises : How to keep track of all the versions?
- We only need to keep track the first root node for all the versions and this will serve the
purpose to track all the newly created nodes in the different versions. For this purpose we can
maintain an array of pointers to the first node of segment trees for all versions.

================================================================================================
Let's consider a very basic problem to see how to implement persistence in segment tree

Problem : Given an array A[] and different point update operations.Considering
each point operation to create a new version of the array. We need to answer
the queries of type
Q v l r : output the sum of elements in range l to r just after the v-th update.

We will create all the versions of the segment tree and keep track of their root node.Then for each
range sum query we will pass the required version's root node in our query function and output the
required sum."""

MAXN = 100


class Node(object):
    """
    data type for individual node in the segment tree
    """
    def __init__(self, left, right, value):
        self.left = left
        self.right = right
        self.value = value


class PersisentSegmentTree(object):
    def __init__(self):
        self.arr = [0] * MAXN  # input arr
        self.version = [None] * MAXN  # root pointers for all versions

    def build(self, node, low, high):
        """
        Constructs Version-0 Time Complexity : O(nlogn)
        :param node: Node
        :param low: int
        :param high: int
        :return:
        """
        if low == high:
            node.value = self.arr[low]
            return

        mid = (low + high) // 2
        node.left = Node(None, None, 0)
        node.right = Node(None, None, 0)
        self.build(node.left, low, mid)
        self.build(node.right, mid + 1, high)
        node.value = node.left.value + node.right.value

    def upgrade(self, prev, curr, low, high, idx, value):
        """
        * Upgrades to new Version
        * @param prev : points to node of previous version
        * @param cur  : points to node of current version
        * Time Complexity : O(logn)
        * Space Complexity : O(logn)
        :param prev: Node
        :param curr: Node
        :param low: int
        :param high: int
        :param idx: int
        :param value: int
        :return:
        """
        if idx > high or idx < low or low > high:
            return
        if low == high:
            curr.value = value  # modification in new version
            return

        mid = (low + high) // 2
        if idx <= mid:
            # link to right child of previous version
            curr.right = prev.right
            # create new node in current version
            curr.left = Node(None, None, 0)
            self.upgrade(prev.left, curr.left, low, mid, idx, value)
        else:
            # link to left child of previous version
            curr.left = prev.left
            # create new node for current version
            curr.right = Node(None, None, 0)
            self.upgrade(prev.right, curr.right, mid + 1, high, idx, value)

        # calculating data for current version by combining previous version and current modification
        curr.value = curr.left.value + curr.right.value

    def query(self, node, low, high, left, right):
        """
        :param node: Node
        :param low: int
        :param high: int
        :param left: int
        :param right: int
        :return:
        """
        if left > high or right < low or low > high:
            return 0
        if left <= low and high <= right:
            return node.value

        mid = (low + high) // 2
        p1 = self.query(node.left, low, mid, left, right)
        p2 = self.query(node.right, mid + 1, high, left, right)
        return p1 + p2


if __name__ == '__main__':
    # Time Complexity : The time complexity will be the same as the query and point update
    # operation in the segment tree as we can consider the extra node creation step to be done in
    #  O(1). Hence, the overall Time Complexity per query for new version creation and range sum
    # query will be O(log n).

    A = [1, 2, 3, 4, 5]
    n = len(A)
    pst = PersisentSegmentTree()

    for i in range(n):
        pst.arr[i] = A[i]

    # creating Version-0
    root = Node(None, None, 0)
    pst.build(root, 0, n - 1)

    # storing root node for version-0
    pst.version[0] = root

    # upgrading to version-1
    pst.version[1] = Node(None, None, 0)
    pst.upgrade(pst.version[0], pst.version[1], 0, n - 1, 4, 1)

    # upgrading to version-2
    pst.version[2] = Node(None, None, 0)
    pst.upgrade(pst.version[1], pst.version[2], 0, n - 1, 2, 10)

    print("In version 1 , query(0,4) : ", pst.query(pst.version[1], 0, n - 1, 0, 4))
    print("In version 2 , query(3,4) : ", pst.query(pst.version[2], 0, n - 1, 3, 4))
    print("In version 0 , query(0,3) : ", pst.query(pst.version[0], 0, n - 1, 0, 3))

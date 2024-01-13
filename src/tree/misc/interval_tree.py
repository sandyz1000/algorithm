"""
Interval Tree

Consider a situation where we have a set of intervals and we need following operations to be
implemented efficiently. 1) Add an interval 2) Remove an interval 3) Given an interval x,
find if x overlaps with any of the existing intervals.

Interval Tree: The idea is to augment a self-balancing Binary Search Tree (BST) like Red Black
Tree, AVL Tree, etc to maintain set of intervals so that all operations can be done in O(Logn)
time.

Every node of Interval Tree stores following information.
a) i: An interval which is represented as a pair [low, high]
b) max: Maximum high value in subtree rooted with this node.

The low value of an interval is used as key to maintain order in BST. The insert and delete
operations are same as insert and delete in self-balancing BST used Interval tree is mainly a
geometric data structure and often used for windowing queries, for instance, to find all roads on
a computerized map inside a rectangular viewport, or to find all visible elements inside a
three-dimensional scene (Source Wiki).

                   [15,20|40]
                  /         \
            [10,30|30]    [17,19|40]
              /     \           \
        [5,20|20] [12,15|15]   [30,40|40]

The main operation is to search for an overlapping interval. Following is algorithm for searching
an overlapping interval x in an Interval tree rooted with root.

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Interval overlappingIntervalSearch(root, x)
1) If x overlaps with root's interval, return the root's interval.
2) If left child of root is not empty and the max in left child is greater than x's low
 value, recur for left child
3) Else recur for right child.
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

----------------------------------------
Algorithm:
----------------------------------------

How does the above algorithm work?
Let the interval to be searched be x. We need to prove this in for following two cases.

Case 1: When we go to right subtree, one of the following must be true.
a) There is an overlap in right subtree: This is fine as we need to return one overlapping interval.
b) There is no overlap in either subtree: We go to right subtree only when either left is NULL or
maximum value in left is smaller than x.low. So the interval cannot be present in left subtree.

Case 2: When we go to left subtree, one of the following must be true.
a) There is an overlap in left subtree: This is fine as we need to return one overlapping interval.
b) There is no overlap in either subtree: This is the most important part. We need to consider
    following facts.
... We went to left subtree because x.low <= max in left subtree
... max in left subtree is a high of one of the intervals let us say [a, max] in left subtree.
... Since x doesn't overlap with any node in left subtree x.low must be smaller than 'a'.
... All nodes in BST are ordered by low value, so all nodes in right subtree must have low value
    greater than 'a'.
... From above two facts, we can say all intervals in right subtree have low value greater than
    x.low. So x cannot overlap with any interval in right subtree.


Interval Tree vs Segment Tree Both segment and interval trees store intervals. Segment tree is
mainly optimized for queries for a given point, and interval trees are mainly optimized for
overlapping queries for a given interval
"""
from __future__ import print_function


# Structure to represent an interval
class Interval(object):
    def __init__(self, low, high):
        self.low = low
        self.high = high


# Structure to represent a node in Interval Search Tree
class ITNode(object):
    def __init__(self, interval: Interval, maximum: int, left=None, right=None):
        """
        :type interval: Interval
        :type max: int
        :type left: ITNode
        :type right: ITNode
        """
        self.interval = interval  # 'i' could also be a normal variable
        self.max = maximum
        self.left = left
        self.right = right


class IntervalTree(object):
    def insert(self, root: ITNode, interval: Interval):
        """
        A utility function to insert a new Interval Search Tree Node. This is similar to BST
        Insert. Here the low value of interval is used to maintain
        BST property

        :param root: ITNode
        :param interval: Interval
        :return:
        """
        # Base case: Tree is empty, new node becomes root
        if root is None:
            return self.new_node(interval)
        
        # Get low value of interval at root
        # If node value is smaller than root, then new interval goes to left subtree
        if interval.low < root.interval.low:
            root.left = self.insert(root.left, interval)
        # Else, new node goes to right subtree.
        else:
            root.right = self.insert(root.right, interval)

        # Update the max value of this ancestor if needed
        if root.max < interval.high:
            root.max = interval.high

        return root

    def new_node(self, i):
        """
        A utility function to create a new Interval Search Tree Node
        :param i: Interval
        :return:
        """
        return ITNode(i, i.high)

    def overlap_search(self, root, interval):
        """
        The main function that searches a given interval i in a given Interval Tree.

        :param root: ITNode
        :param interval: Interval
        :return:
        """
        # Base Case, tree is empty
        if root is None:
            return None

        # If given interval overlaps with root
        if self.do_overlap(root.interval, interval):
            return root.interval

        # If left child of root is present and max of left child is greater than or equal to
        # given interval, then i may overlap with an interval is left subtree
        if root.left is not None and root.left.max >= interval.low:
            return self.overlap_search(root.left, interval)

        # Else interval can only overlap with right subtree
        else:
            return self.overlap_search(root.right, interval)

    def do_overlap(self, i1, i2):
        """
        A utility function to check if given two intervals overlap
        TODO: Check interval i1.high >= i2.low >= i1.low
        :param i1: Interval
        :param i2: Interval
        :return:
        """
        return True if i1.low <= i2.high and i2.low <= i2.high else False

    def in_order(self, root):
        """
        :param root: ITNode
        :return:
        """
        if root is None:
            return None

        self.in_order(root.left)
        print("[ %d, %d ] max = %d" % (root.interval.low, root.interval.high, root.max))
        self.in_order(root.right)


if __name__ == '__main__':
    it = IntervalTree()
    ints = [
        Interval(15, 20), Interval(10, 30), Interval(17, 19), Interval(5, 20),
        Interval(12, 15), Interval(30, 40)]

    n = len(ints)
    root = None
    for i, _interval in enumerate(ints):
        root = it.insert(root, _interval)
    print("Inorder traversal of constructed Interval Tree is\n")

    it.in_order(root)

    interval = Interval(6, 7)

    print("\nSearching for interval [ %d , %d]" % (interval.low, interval.high))
    res = it.overlap_search(root, interval)
    if res is not None:
        print("\nOverlaps with [ %d, %d]" % (res.low, res.high))
    else:
        print("\nNo Overlapping Interval")

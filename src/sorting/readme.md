# Notes:
------

### When does the worst case of Quicksort occur?


The answer depends on strategy for choosing pivot. In early versions of Quick Sort where leftmost
(or rightmost) element is chosen as pivot, the worst occurs in following cases.

1) Array is already sorted in same order.
2) Array is already sorted in reverse order.
3) All elements are same (special case of case 1 and 2)

Since these cases are very common use cases, the problem was easily solved by choosing either a
random index for the pivot, choosing the middle index of the partition or (especially for longer
partitions) choosing the median of the first, middle and last element of the partition for the
pivot. With these modifications, the worst case of Quick sort has less chances to occur, but worst
case can still occur if the input array is such that the maximum (or minimum) element is always
chosen as pivot.


### Lower bound for comparison based sorting algorithms

The problem of sorting can be viewed as following.
Input: A sequence of n numbers <a1, a2, . . . , an>.
Output: A permutation (reordering) <a'1, a'2, . . . , a'n> of the input sequence such that
a'1 <= a‘2 .... <= a'n.

A sorting algorithm is comparison based if it uses comparison operators to find the order between
two numbers.  Comparison sorts can be viewed abstractly in terms of decision trees. A decision
tree is a full binary tree that represents the comparisons between elements that are performed by
a particular sorting algorithm operating on an input of a given size. The execution of the sorting
algorithm corresponds to tracing a path from the root of the decision tree to a leaf. At each
internal node, a comparison ai <= aj is made. The left subtree then dictates subsequent comparisons
for ai <= aj, and the right subtree dictates subsequent comparisons for ai > aj. When we come to a
leaf, the sorting algorithm has established the ordering. So we can say following about the decision
tree.


Which sorting algorithm makes minimum number of memory writes?
--------------------------------------------------------------

Minimizing the number of writes is useful when making writes to some huge data set is very
expensive, such as with EEPROMs or Flash memory, where each write reduces the lifespan of the
memory.
Among the sorting algorithms that we generally study in our data structure and algorithm courses,
Selection Sort makes least number of writes (it makes O(n) swaps).  But, Cycle Sort almost
always makes less number of writes compared to Selection Sort.  In Cycle Sort, each value is
either written zero times, if it’s already in its correct position, or written one time to its
correct position. This matches the minimal number of overwrites required for a completed
in-place sort.


Why Quick Sort preferred for Arrays and Merge Sort for Linked Lists?
--------------------------------------------------------------

Why is Quick Sort preferred for arrays?

Below are recursive and iterative implementations of Quick Sort and Merge Sort for arrays.

Recursive Quick Sort for array.
Iterative Quick Sort for arrays.
Recursive Merge Sort for arrays
Iterative Merge Sort for arrays

1) Quick Sort in its general form is an in-place sort (i.e. it doesn't require any extra storage)
whereas merge sort requires O(N) extra storage, N denoting the array size which may be quite
expensive. Allocating and de-allocating the extra space used for merge sort increases the running
time of the algorithm.

2) Comparing average complexity we find that both type of sorts have O(NlogN) average complexity but
the constants differ. For arrays, merge sort loses due to the use of extra O(N) storage space.

3) Most practical implementations of Quick Sort use randomized version. The randomized version has
expected time complexity of O(nLogn). The worst case is possible in randomized version also, but
worst case doesn't occur for a particular pattern (like sorted array) and randomized Quick Sort
works well in practice.

4) Quick Sort is also a cache friendly sorting algorithm as it has good locality of reference when
used for arrays.

5) Quick Sort is also tail recursive, therefore tail call optimizations is done.


### Why is Merge Sort preferred for Linked Lists?

Below are implementations of Quicksort and Mergesort for singly and doubly linked lists.

Quick Sort for Doubly Linked List
Quick Sort for Singly Linked List
Merge Sort for Singly Linked List
Merge Sort for Doubly Linked List

1) In case of linked lists the case is different mainly due to difference in memory allocation of
arrays and linked lists. Unlike arrays, linked list nodes may not be adjacent in memory.

2) Unlike array, in linked list, we can insert items in the middle in O(1) extra space and O(1) time
Therefore merge operation of merge sort can be implemented without extra space for linked lists.

3) In arrays, we can do random access as elements are continuous in memory. Let us say we have an
integer (4-byte) array A and let the address of A[0] be x then to access A[i], we can directly
access the memory at (x + i*4). Unlike arrays, we can not do random access in linked list.

3) Quick Sort requires a lot of this kind of access. In linked list to access i’th index, we have to
travel each and every node from the head to i’th node as we don’t have continuous block of memory.
Therefore, the overhead increases for quick sort. Merge sort accesses data sequentially and the
need of random access is low.


"""
K-ary Heap
http://www.geeksforgeeks.org/k-ary-heap/

Prerequisite - Binary Heap

K-ary heaps are a generalization of binary heap(K=2) in which each node have K children instead
of 2. Just like binary heap, it follows two properties:

1) Nearly complete binary tree, with all levels having maximum number of nodes except the last,
which is filled in left to right manner.

2) Like Binary Heap, it can be divided into two categories: (a) Max k-ary heap (key at root is
greater than all descendants and same is recursively true for all nodes). (b) Min k-ary heap (key
at root is smaller than all descendants and same is recursively true for all nodes)

Examples:
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - +
3-ary max heap - root node is maximum
                 of all nodes
        _10_
     /    |   \
   7      9     8
 / | \   /
4  6  5 7


3-ary min heap -root node is minimum
                of all nodes
         10
      /   |  \
    12    11  13
  / | \
14 15 18

The height of a complete k-ary tree with n-nodes is given by logkn.
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - +

==Applications of K-ary Heap:==

1.  K-ary heap when used in the implementation of priority queue allows faster decrease key
    operation as compared to binary heap ( O(log2n)) for binary heap vs O(logkn) for K-ary heap).
    Nevertheless, it causes the complexity of extractMin() operation to increase to O(k log kn) as
    compared to the complexity of O(log2n) when using binary heaps for priority queue. This allows
    K-ary heap to be more efficient in algorithms where decrease priority operations are more
    common than extractMin() operation.Example: Dijkstra's algorithm for single source shortest
    path and Prim's algorithm for minimum spanning tree

2.  K-ary heap has better memory cache behaviour than a binary heap which allows them to run more
    quickly in practice, although it has a larger worst case running time of both extractMin() and
    delete() operation (both being O(k log kn) ).

--------------------------------------------------------
==Implementation==
--------------------------------------------------------
Assuming 0 based indexing of array, an array represents a K-ary heap such that for any node
we consider:
1.  Parent of the node at index i (except root node) is located at index (i-1)/k
2.  Children of the node at index i are at indices (k*i)+1 , (k*i)+2 .... (k*i)+k
3.  The last non-leaf node of a heap of size n is located at index (n-1)/k

==buildHeap() :== Builds a heap from an input array.
This function runs a loop starting from the last non-leaf node all the way up to the root node,
calling a function restoreDown(also known as maHeapify) for each index that restores the passed
index at the correct position of the heap by shifting the node down in the K-ary heap building it
in a bottom up manner.

Why do we start the loop from the last non-leaf node ?
Because all the nodes after that are leaf nodes which will trivially satisfy the heap property as
they don't have any children and hence, are already roots of a K-ary max heap.

==restoreDown() (or maxHeapify) : Used to maintain heap property.==
It runs a loop where it finds the maximum of all the node's children, compares it with its own
value and swaps if the max(value of all children) > (value at node). It repeats this step until
the node is restored into its original position in the heap.

==extractMax(): Extracting the root node.==
A k-ary max heap stores the largest element in its root. It returns the root node, copies last
node to the first, calls restore down on the first node thus maintaining the heap property.

==insert(): Inserting a node into the heap==
This can be achieved by inserting the node at the last position and calling restoreUp() on the
given index to restore the node at its proper position in the heap. restoreUp() iteratively
compares a given node with its parent, since in a max heap the parent is always greater than or
equal to its children nodes, the node is swapped with its parent only when its key is greater
than the parent.  """

from __future__ import print_function


# Python program to demonstrate all operations of k-ary Heap
class Pointer:
    def __init__(self, value):
        self.value = value


class KAryHeap:
    """
    Time Complexity Analysis

    1. For a k-ary heap, with n nodes the maximum height of the given heap will be logkn. So
    restoreUp() run for maximum of logkn times (as at every iteration the node is shifted one
    level up is case of restoreUp() or one level down in case of restoreDown).

    2. restoreDown() calls itself recursively for k children. So time complexity of this functions
    is O(k logkn).

    3. Insert and decreaseKey() operations call restoreUp() once. So complexity is O(logkn).

    4. Since extractMax() calls restoreDown() once, its complexity O(klogkn)

    5. Time complexity of build heap is O(n) (Analysis is similar to binary heap)

    """

    def restore_down(self, arr, length, index, k):
        """
        function to heapify (or restore the max- heap property).
        This is used to build a k-ary heap and in extractMin()
        att[] -- Array that stores heap
        length -- Size of array
        index -- index of element to be restored (or heapified)
        """
        # child array to store indexes of all the children of given node
        child = [0] * (k + 1)
        while True:
            # child[i]=-1 if the node is a leaf children (no children)
            for i in range(1, k + 1):
                child[i] = (k * index + i) if ((k * index + i) < length) else -1

            # max_child stores the maximum child and max_child_index holds its index
            max_child, max_child_index = -1, 0

            # loop to find the maximum of all the children of a given node
            for i in range(1, k + 1):
                if child[i] != -1 and arr[child[i]] > max_child:
                    max_child_index = child[i]
                    max_child = arr[child[i]]

            # leaf node
            if max_child == -1:
                break

            # swap only if the key of max_child_index is greater than the key of node
            if arr[index] < arr[max_child_index]:
                arr[index], arr[max_child_index] = arr[max_child_index], arr[index]

            index = max_child_index

    def restore_up(self, arr, index, k):
        """Restores a given node up in the heap. This is used in decreaseKey() and insert()"""
        # parent stores the index of the parent variable of the node
        parent = (index - 1) // k

        # Loop should only run till root node in case the element inserted is the maximum
        # restore up will send it to the root node
        while parent >= 0:
            if arr[index] > arr[parent]:
                arr[index], arr[parent] = arr[parent], arr[index]
                index = parent
                parent = (index - 1) // k
            else:  # node has been restored at the correct position
                break

    def build_heap(self, arr, n, k):
        """Function to build a heap of arr[0..n-1] and value of k."""
        # Heapify all internal nodes starting from last non-leaf node all the way upto
        # the root node and calling restore down on each
        for i in range((n - 1) // k, -1, -1):
            self.restore_down(arr, n, i, k)

    def insert(self, arr, n_ptr, k, elem):
        """
        Function to insert a value in a heap. Parameters are the array, size of heap,
        value k and the element to be inserted
        """
        # Put the new element in the last position
        arr[n_ptr.value] = elem

        # Increase heap size by 1
        n_ptr.value = n_ptr.value + 1

        # Call restoreUp on the last index
        self.restore_up(arr, n_ptr.value - 1, k)

    def extract_max(self, arr, n_ptr, k):
        """
        Function that returns the key of root node of the heap and then restores
        the heap property of the remaining nodes"""
        # Stores the key of root node to be returned
        max = arr[0]

        # Copy the last node's key to the root node
        arr[0] = arr[n_ptr.value - 1]

        # Decrease heap size by 1
        n_ptr.value = n_ptr.value - 1

        # Call restoreDown on the root node to restore it to the correct position in the heap
        self.restore_down(arr, n_ptr.value, 0, k)
        return max


if __name__ == '__main__':
    # Output
    # Built Heap : 10 9 6 7 8 4 5
    # Heap after insertion of 3:  10 9 6 7 8 4 5 3
    # Extracted max is 10
    # Heap after extract max:  9 8 6 7 3 4 5

    capacity = 100
    arr = [0] * capacity
    for a, value in enumerate([4, 5, 6, 7, 8, 9, 10]):
        arr[a] = value

    n = 7
    k = 3
    heap = KAryHeap()

    heap.build_heap(arr, n, k)

    print("Built Heap : \n")
    for i in range(n):
        print("%d " % arr[i], end=" ")

    element = 3
    n_ptr = Pointer(n)
    heap.insert(arr, n_ptr, k, element)
    n = n_ptr.value
    print("\nHeap after insertion of %d:" % element)
    for i in range(n):
        print("%d " % arr[i], end=" ")

    n_ptr = Pointer(n)
    print("\nExtracted max is %d" % heap.extract_max(arr, n_ptr, k))

    print("\nHeap after extract max:")
    for i in range(n):
        print("%d " % arr[i], end=" ")

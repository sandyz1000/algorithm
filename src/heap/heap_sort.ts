/* """
==Heap Sort==

Heap sort is a comparison based sorting technique based on Binary Heap data structure. It is
similar to selection sort where we first find the maximum element and place the maximum element
at the end. We repeat the same process for remaining element.

==What is Binary Heap?==

Let us first define a Complete Binary Tree. A complete binary tree is a binary tree in which
every level, except possibly the last, is completely filled, and all nodes are as far left as
possible (Source Wikipedia)

A Binary Heap is a Complete Binary Tree where items are stored in a special order such that value
in a parent node is greater(or smaller) than the values in its two children nodes. The former is
called as max heap and the latter is called min heap. The heap can be represented by binary tree
or array.

==Why array based representation for Binary Heap?==

Since a Binary Heap is a Complete Binary Tree, it can be easily represented as array and array
based representation is space efficient. If the parent node is stored at index I, the left child
can be calculated by 2 * I + 1 and right child by 2 * I + 2 (assuming the indexing starts at 0).

==Heap Sort Algorithm for sorting in increasing order:==
1. Build a max heap from the input data.

2. At this point, the largest item is stored at the root of the heap. Replace it with the last
item of the heap followed by reducing the size of heap by 1. Finally, heapify the root of tree.

3. Repeat above steps while size of heap is greater than 1.

==How to build the heap?==
Heapify procedure can be applied to a node only if its children nodes are heapified. So the
heapification must be performed in the bottom up order.

Lets understand with the help of an example:
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

Input data: 4, 10, 3, 5, 1
            4(0)
            /   \
        10(1)   3(2)
        /   \
    5(3)    1(4)

The numbers in bracket represent the indices in the array representation of data.

Applying heapify procedure to index 1:
            4(0)
            /   \
        10(1)    3(2)
        /   \
    5(3)    1(4)

Applying heapify procedure to index 0:
            10(0)
            /  \
        5(1)  3(2)
        /   \
    4(3)    1(4)

The heapify procedure calls itself recursively to build heap in top down manner.

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

Notes:
Heap sort is an in-place algorithm.
Its typical implementation is not stable, but can be made stable (See this)

Time Complexity: Time complexity of heapify is O(Logn). Time complexity of createAndBuildHeap()
is O(n) and overall time complexity of Heap Sort is O(nLogn).

*/


function heapify(arr: number[], size: number, index: number): void {
  let largest = index; // Initialize largest as root
  const left = 2 * index + 1; // left = 2*i + 1
  const right = 2 * index + 2; // right = 2*i + 2

  // See if left child of root exists and is greater than root
  if (left < size && arr[index] < arr[left]) {
    largest = left;
  }

  // See if right child of root exists and is greater than root
  if (right < size && arr[largest] < arr[right]) {
    largest = right;
  }

  // Change root, if needed
  if (largest !== index) {
    [arr[index], arr[largest]] = [arr[largest], arr[index]]; // swap

    // Heapify the root.
    heapify(arr, size, largest);
  }
}

function heapSort(arr: number[]): void {
  const n = arr.length;

  // Build a max heap.
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, n, i);
  }

  // One by one extract elements
  for (let i = n - 1; i > 0; i--) {
    [arr[i], arr[0]] = [arr[0], arr[i]]; // swap
    heapify(arr, i, 0);
  }
}

// Driver code
if (require.main === module) {
  // Example usage
  const arr = [12, 11, 13, 5, 6, 7];
  // const arr = [4, 10, 3, 5, 1];
  heapSort(arr);
  console.log("Sorted array is", arr.join(" "));

}
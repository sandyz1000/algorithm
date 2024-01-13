/* Heap Sort

Heap sort is a comparison based sorting technique based on Binary Heap data structure. It is
similar to selection sort where we first find the maximum element and place the maximum element at
the end. We repeat the same process for remaining element.

What is Binary Heap?
Let us first define a Complete Binary Tree. A complete binary tree is a binary tree in which every
level, except possibly the last, is completely filled, and all nodes are as far left as possible.

A Binary Heap is a Complete Binary Tree where items are stored in a special order such that value
in a parent node is greater(or smaller) than the values in its two children nodes. The former is
called as max heap and the latter is called min heap. The heap can be represented by binary tree
or array.

Why array based representation for Binary Heap?
Since a Binary Heap is a Complete Binary Tree, it can be easily represented as array and array
based representation is space efficient. If the parent node is stored at index I, the left child
can be calculated by 2 * I + 1 and right child by 2 * I + 2 (assuming the indexing starts at 0).

Heap Sort Algorithm for sorting in increasing order:
1.  Build a max heap from the input data.
2.  At this point, the largest item is stored at the root of the heap. Replace it with the last
    item of the heap followed by reducing the size of heap by 1. Finally, heapify the root of tree.
3.  Repeat above steps while size of heap is greater than 1.

How to build the heap?
Heapify procedure can be applied to a node only if its children nodes are heapified. So the
heapification must be performed in the bottom up order.

Input data: 4, 10, 3, 5, 1
            
            4(0)
            /   \
        10(1)   3(2)
        /   \
     5(3)   1(4)

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

# Time Complexity: Time complexity of heapify is O(Logn).
# Time complexity: Of create_and_build_heap() is O(n) and
# Overall Time complexity: Heap Sort is O(nLogn).

*/

export class HeapSort {
    heapify(arr: number[], n: number, i: number): void {
        let largest = i;
        const l = 2 * i + 1;
        const r = 2 * i + 2;

        if (l < n && arr[i] < arr[l]) {
            largest = l;
        }

        if (r < n && arr[largest] < arr[r]) {
            largest = r;
        }

        if (largest !== i) {
            [arr[i], arr[largest]] = [arr[largest], arr[i]];
            this.heapify(arr, n, largest);
        }
    }

    heapSort(arr: number[]): void {
        const n = arr.length;

        for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
            this.heapify(arr, n, i);
        }

        for (let i = n - 1; i > 0; i--) {
            [arr[i], arr[0]] = [arr[0], arr[i]];
            this.heapify(arr, i, 0);
        }
    }
}

if (require.main === module) {
    const heapSort = new HeapSort();
    const arr = [12, 11, 13, 5, 6, 7];

    heapSort.heapSort(arr);

    console.log("Sorted array is");
    for (const element of arr) {
        console.log(element);
    }
}

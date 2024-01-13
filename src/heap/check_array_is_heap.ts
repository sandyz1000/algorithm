/* """
How to check if a given array represents a Binary Heap?
Given an array, how to check if the given array represents a Binary Max-Heap.

==Example:==

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Input:  arr[] = {90, 15, 10, 7, 12, 2}
Output: True

The given array represents below tree
       90
     /    \
   15      10
  /  \     /
 7    12  2

The tree follows max-heap property as every node is greater than all of its descendants.

Input:  arr[] = {9, 15, 10, 7, 12, 11}
Output: False

The given array represents below tree
       9
     /   \
   15     10
  /  \    /
 7    12 11

The tree doesn't follows max-heap property 9 is smaller than 15 and 10, and 10 is smaller
than 11.
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -


A Simple Solution is to first check root, if it's greater than all of its descendants. Then
check for children of root. Time complexity of this solution is O(n^2)

An Efficient Solution is to compare root only with its children (not all descendants),
if root is greater than its children and same is true for for all nodes, then tree is
max-heap (This conclusion is based on transitive property of > operator, i.e., if x > y and y
> z, then x > z).

The last internal node is present at index (2n-2)/2 assuming that indexing begins with 0.

Time complexity of this solution is O(n). The solution is similar to preorder traversal
of Binary Tree.
-------------------------------------------------------
Returns true if arr[i..n-1] represents a max-heap
Time complexity of this solution is O(n).
The solution is similar to preorder traversal of Binary Tree.



 */

function isHeapRecursive(arr: number[], i: number, n: number): boolean {
    if (i > (n - 2) / 2) {
        return true;
    }

    const size = arr.length;
    if (
        (2 * i + 1 < size && arr[i] >= arr[2 * i + 1]) &&
        (2 * i + 2 < size && arr[i] >= arr[2 * i + 2]) &&
        isHeapRecursive(arr, 2 * i + 1, n) &&
        isHeapRecursive(arr, 2 * i + 2, n)
    ) {
        return true;
    }

    return false;
}

function isHeap(arr: number[], n: number): boolean {
    for (let i = 0; i <= (n - 2) / 2; i++) {
        if (2 * i + 1 < arr.length && arr[2 * i + 1] > arr[i]) {
            return false;
        }

        if (2 * i + 2 < arr.length && arr[2 * i + 2] > arr[i]) {
            return false;
        }
    }
    return true;
}

// Code execution starts here
if (require.main === module) {
    // Output: Yes
    const arr = [90, 15, 10, 7, 12, 2, 7, 3];
    const n = arr.length;

    console.log("\n ---- Iterative method --- \n");
    console.log(isHeap(arr, n) ? "Yes" : "No");
}

/* """
Search an element in a sorted and rotated array

An element in a sorted array can be found in O(log n) time via binary search. But suppose we
rotate an ascending order sorted array at some pivot unknown to you beforehand. So for instance,
1 2 3 4 5 might become 3 4 5 1 2.

Devise a way to find an element in the rotated array in O(logn) time.

Input  : arr[] = {5, 6, 7, 8, 9, 10, 1, 2, 3};
         key = 3
Output : Found at index 8

------------------------------------
Explanation:
------------------------------------
All solutions provided here assume that all elements in array are distinct.

The idea is to find the pivot point, divide the array in two sub-arrays and call binary
search. The main idea for finding pivot is - for a sorted (in increasing order) and pivoted
array, pivot element is the only element for which next element to it is smaller than it.
Using above criteria and binary search methodology we can get pivot element in O(logn) time

Input arr = [3, 4, 5, 1, 2]
Element to Search = 1
1) Find out pivot point and divide the array in two sub-arrays. (pivot = 2) # Index of 5
2) Now call binary search for one of the two sub-arrays.
    (a) If element is greater than 0th element then search in left array
    (b) Else Search in right array (1 will go in else as 1 < 0th element(3))
3) If element is found in selected sub-array then return index Else return -1.

 */


function pivotedBinarySearch(arr: number[], n: number, key: number): number {
    const pivot = findPivot(arr, 0, n - 1);

    // If we didn't find a pivot, then the array is not rotated at all
    if (pivot === -1) {
        return binarySearch(arr, 0, n - 1, key);
    }

    // If we found a pivot, then first compare with pivot and then
    // search in two subarrays around pivot
    if (arr[pivot] === key) {
        return pivot;
    }
    if (arr[0] <= key) {
        return binarySearch(arr, 0, pivot - 1, key);
    }
    return binarySearch(arr, pivot + 1, n - 1, key);
}

function findPivot(arr: number[], low: number, high: number): number {
    // Base cases
    if (high < low) {
        return -1;
    }

    if (high === low) {
        return low;
    }

    const mid = Math.floor((low + high) / 2);
    if (mid < high && arr[mid] > arr[mid + 1]) {
        return mid;
    }

    if (mid > low && arr[mid] < arr[mid - 1]) {
        return mid - 1;
    }

    if (arr[low] >= arr[mid]) {
        return findPivot(arr, low, mid - 1);
    } else {
        return findPivot(arr, mid + 1, high);
    }
}

function binarySearch(arr: number[], low: number, high: number, key: number): number {
    // Standard Binary Search function
    if (high < low) {
        return -1;
    }

    const mid = Math.floor((low + high) / 2);
    if (key === arr[mid]) {
        return mid;
    }

    if (key > arr[mid]) {
        return binarySearch(arr, mid + 1, high, key);
    }

    return binarySearch(arr, low, mid - 1, key);
}

if (require.main === module) {
    // Example usage
    const arr1 = [5, 6, 7, 8, 9, 10, 1, 2, 3];
    const n = arr1.length;
    const key = 3;
    console.log("Index: " + pivotedBinarySearch(arr1, n, key));
}
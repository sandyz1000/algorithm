/* 
Find the Rotation Count in Rotated Sorted array

Consider an array of distinct numbers sorted in increasing order. The array has been rotated
(anti-clockwise) k number of times. Given such an array, find the value of k.

------------------------------------
Examples:
------------------------------------
Input : arr[] = {15, 18, 2, 3, 6, 12}
Output: 2
Explanation : Initial array must be {2, 3, 6, 12, 15. 18}. We get the given array after
rotating the initial array twice.

Input : arr[] = {7, 9, 11, 12, 5}
Output: 4

Input: arr[] = {7, 9, 11, 12, 15};
Output: 0

Time Complexity : O(Log n)
Auxiliary Space : O(1) if we use iterative Binary Search is used


Returns count of rotations for an array which is first sorted
in ascending order, then rotated
 */

function countRotations(arr: number[], low: number, high: number): number {
    // This condition is needed to handle the case when the array is not rotated at all
    if (high < low) {
        return 0;
    }

    // If there is only one element left
    if (high === low) {
        return low;
    }

    // Find mid
    const mid = low + Math.floor((high - low) / 2);

    // Check if element (mid+1) is the minimum element.
    // Consider the cases like {3, 4, 5, 1, 2}
    if (mid < high && arr[mid + 1] < arr[mid]) {
        return mid + 1;
    }

    // Check if mid itself is the minimum element
    if (mid > low && arr[mid] < arr[mid - 1]) {
        return mid;
    }

    // Decide whether we need to go to the left half or right half
    if (arr[high] > arr[mid]) {
        return countRotations(arr, low, mid - 1);
    }

    return countRotations(arr, mid + 1, high);
}

if (require.main === module) {
// Example usage
const arr = [15, 18, 2, 3, 6, 12];
const n = arr.length;
console.log(countRotations(arr, 0, n - 1));
}
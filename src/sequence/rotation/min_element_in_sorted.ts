/* 
Find the minimum element in a sorted and rotated array

A sorted array is rotated at some unknown point, find the minimum element in it.

Input: {5, 6, 1, 2, 3, 4}
Output: 1

How to handle duplicates?
It turned out that duplicates can't be handled in O(Logn) time in all cases.
The special cases that cause problems are like {2, 2, 2, 2, 2, 2, 2, 2, 0, 1, 1, 2} and
{2, 2, 2, 0, 2, 2, 2, 2, 2, 2, 2, 2}.
It doesn't look possible to go to left half or right half by doing constant number of comparisons
at the middle. So the problem with repetition can be solved in O(n) worst case. 

 */



function findMin(arr: number[], low: number, high: number): number {
    // This condition is needed to handle the case when the array is not rotated at all
    if (high < low) {
        return arr[0];
    }

    // If there is only one element left
    if (high === low) {
        return arr[low];
    }

    // Find mid
    const mid = Math.floor((low + high) / 2);

    // Check if element (mid+1) is the minimum element. Consider the cases like [3, 4, 5, 1, 2]
    if (mid < high && arr[mid + 1] < arr[mid]) {
        return arr[mid + 1];
    }

    // Check if mid itself is the minimum element
    if (mid > low && arr[mid] < arr[mid - 1]) {
        return arr[mid];
    }

    // Decide whether we need to go to the left half or right half
    if (arr[high] > arr[mid]) {
        return findMin(arr, low, mid - 1);
    }

    return findMin(arr, mid + 1, high);
}

if (require.main === module) {
    // Example usage
    const arr1 = [5, 6, 1, 2, 3, 4];
    const n1 = arr1.length;
    console.log("The minimum element is " + findMin(arr1, 0, n1 - 1));
    
    const arr8 = [2, 3, 4, 5, 6, 7, 8, 1];
    const n8 = arr8.length;
    console.log("The minimum element is " + findMin(arr8, 0, n8 - 1));
    
    const arr9 = [3, 4, 5, 1, 2];
    const n9 = arr9.length;
    console.log("The minimum element is " + findMin(arr9, 0, n9 - 1));
}

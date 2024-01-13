/* """
Find the maximum element in an array which is first increasing and then decreasing
Given an array of integers which is initially increasing and then decreasing,
find the maximum value in the array.

Input: arr = [8, 10, 20, 80, 100, 200, 400, 500, 3, 2, 1]
Output: 500
------------------------------------------
Input: arr = [1, 3, 50, 10, 9, 7, 6]
Output: 50
------------------------------------------
Corner case (No decreasing part)
Input: arr = [10, 20, 30, 40, 50]
Output: 50
------------------------------------------
Corner case (No increasing part)
Input: arr = [120, 100, 80, 20, 0]
Output: 120
------------------------------------------

We can modify the standard Binary Search algorithm for the given type of arrays.
1)  If the mid element is greater than both of its adjacent elements, then mid is the maximum.
2)  If mid element is greater than its next element and smaller than the previous element then
    maximum lies on left side of mid. Example array: {3, 50, 10, 9, 7, 6}
3)  If mid element is smaller than its next element and greater than the previous element then
    maximum lies on right side of mid. Example array: {2, 4, 6, 8, 10, 3, 1}

Time Complexity: O(Logn)
This method works only for distinct numbers. For example, it will not work for an array
like {0, 1, 1, 2, 2, 2, 2, 2, 3, 4, 4, 5, 3, 3, 2, 2, 1, 1}.

 */

function findMaximum(arr: number[], low: number, high: number): number {
    // Base Case: Only one element is present in arr[low..high]
    if (low == high) {
        return arr[low];
    }

    // If there are two elements and the first is greater, then the first element is maximum
    if (high == low + 1 && arr[low] >= arr[high]) {
        return arr[low];
    }

    // If there are two elements and the second is greater, then the second element is maximum
    else if (high == low + 1 && arr[low] < arr[high]) {
        return arr[high];
    }

    const mid = Math.floor((low + high) / 2);

    // If we reach a point where arr[mid] is greater than both of its adjacent elements arr[mid-1]
    // and arr[mid+1], then arr[mid] is the maximum element
    if (arr[mid] > arr[mid + 1] && arr[mid] > arr[mid - 1]) {
        return arr[mid];
    }

    // If arr[mid] is greater than the next element and smaller than the previous element,
    // then the maximum lies on the left side of mid
    if (arr[mid + 1] < arr[mid] && arr[mid] < arr[mid - 1]) {
        return findMaximum(arr, low, mid - 1);
    }

    // When arr[mid] is greater than arr[mid-1] and smaller than arr[mid+1]
    return findMaximum(arr, mid + 1, high);
}

if (require.main === module) {
    // Test
    const arr = [1, 3, 50, 10, 9, 7, 6];
    const n = arr.length;
    console.log("The maximum element is " + findMaximum(arr, 0, n - 1));
}

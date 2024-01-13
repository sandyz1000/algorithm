/* """
Divide and Conquer | Set 3 (Maximum Subarray Sum)
You are given a one dimensional array that may contain both positive and negative integers, find
the sum of contiguous subarray of numbers which has the largest sum.

-------------------------------------------
Example:
-------------------------------------------
If the given array is [-2, -5, 6, -2, -3, 1, 5, -6], then the maximum subarray sum is 7
[ 6, -2, -3, 1, 5, ]

Using Divide and Conquer approach, we can find the maximum subarray sum in O(nLogn) time.
Following is the Divide and Conquer algorithm.

1) Divide the given array in two halves
2) Return the maximum of following three
   a) Maximum subarray sum in left half (Make a recursive call)
   b) Maximum subarray sum in right half (Make a recursive call)
   c) Maximum subarray sum such that the subarray crosses the midpoint

The lines 2.a and 2.b are simple recursive calls. How to find maximum subarray sum such that
the subarray crosses the midpoint? We can easily find the crossing sum in linear time. The idea
is simple, find the maximum sum starting from mid point and ending at some point on left of
mid, then find the maximum sum starting from mid + 1 and ending with sum point on right of
mid + 1. Finally, combine the two and return.

Time Complexity: maxSubArraySum() is a recursive method and time complexity can be expressed as
following recurrence relation. T(n) = 2T(n/2) + O(n)


# A Divide and Conquer based program for maximum subarray sum problem
 */

export const INT_MIN = -Number.MAX_SAFE_INTEGER;

function maxCrossingSum(arr: number[], low: number, mid: number, high: number): number {
    // Include elements on the left of mid.
    let summation = 0;
    let leftSum = INT_MIN;
    for (let i = mid; i >= low; i--) {
        summation += arr[i];
        leftSum = Math.max(summation, leftSum);
    }

    // Include elements on the right of mid.
    summation = 0;
    let rightSum = INT_MIN;
    for (let i = mid + 1; i <= high; i++) {
        summation += arr[i];
        rightSum = Math.max(summation, rightSum);
    }

    // Return the sum of elements on the left and right of mid.
    return leftSum + rightSum;
}

function maxSubArraySum(arr: number[], low: number, high: number): number {
    // Base Case: Only one element.
    if (low === high) {
        return arr[low];
    }

    const mid = Math.floor((low + high) / 2);  // Find the middle point.

    // Return the maximum of the following three possible cases:
    // a) Maximum subarray sum in the left half.
    // b) Maximum subarray sum in the right half.
    // c) Maximum subarray sum such that the sub-array crosses the midpoint.
    return Math.max(
        maxSubArraySum(arr, low, mid),
        maxSubArraySum(arr, mid + 1, high),
        maxCrossingSum(arr, low, mid, high)
    );
}

if (require.main === module) {
    // Example usage
    const arr: number[] = [-2, -1];
    // const arr: number[] = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
    // const arr: number[] = [1, 2];
    const n: number = arr.length;
    const maxSum: number = maxSubArraySum(arr, 0, n - 1);
    console.log("Maximum contiguous sum is", maxSum);
}

/* 
Given a sorted array and a number x, find the pair in array whose sum is closest to x

Examples:
------------------------------
Input: arr = [10, 22, 28, 29, 30, 40], x = 54
Output: 22 and 30

Input: arr = [1, 3, 4, 7, 10], x = 15
Output: 4 and 10

A simple solution is to consider every pair and keep track of closest pair (absolute difference
between pair sum and x is minimum). Finally print the closest pair.

Time complexity of this solution is O(n^2)

Efficient Method:
===============================
An efficient solution can find the pair in O(n) time

1) Initialize a variable diff as infinite (Diff is used to store the difference between pair
and x).  We need to find the minimum diff.
2) Initialize two index variables l and r in the given sorted array.
       (a) Initialize first to the leftmost index:  l = 0
       (b) Initialize second  the rightmost index:  r = n-1
3) Loop while l < r.
       (a) If  abs(arr[l] + arr[r] - sum) < diff  then update diff and result
       (b) Else if(arr[l] + arr[r] <  sum )  then l++
       (c) Else r--

 */

const INT_MAX: number = Number.MAX_SAFE_INTEGER;

function printClosest(arr: number[], n: number, x: number): void {
    // To store indexes of result pair
    let res_l: number = 0;
    let res_r: number = 0;

    // Initialize left and right indexes and difference between pair sum and x
    let left: number = 0;
    let right: number = n - 1;
    let diff: number = INT_MAX;

    // While there are elements between l and r
    while (right > left) {
        // Check if this pair is closer than the closest pair so far
        if (Math.abs(arr[left] + arr[right] - x) < diff) {
            res_l = left;
            res_r = right;
            diff = Math.abs(arr[left] + arr[right] - x);
        }

        // If this pair has more sum, move to smaller values.
        if (arr[left] + arr[right] > x) {
            right--;
        }
        // Move to larger values
        else {
            left++;
        }
    }

    console.log(`The closest pair is ${arr[res_l]} and ${arr[res_r]}`);
}

if (require.main === module) {
    const arr: number[] = [10, 22, 28, 29, 30, 40];
    const x: number = 54;
    const n: number = arr.length;
    printClosest(arr, n, x);
}

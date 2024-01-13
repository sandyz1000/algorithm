/* Dynamic Programming implementation of longest bitonic subsequence problem

Given an array arr[0 ... n-1] containing n positive integers, a subsequence of arr[] is called
Bitonic if it is first increasing, then decreasing. Write a function that takes an array as
argument and returns the length of the longest bitonic subsequence.
A sequence, sorted in increasing order is considered Bitonic with the decreasing part as empty.
Similarly, decreasing order sequence is considered Bitonic with the increasing part as empty.

Examples:

Input arr[] = {1, 11, 2, 10, 4, 5, 2, 1};
Output: 6 (A Longest Bitonic Subsequence of length 6 is 1, 2, 10, 4, 2, 1)

Input arr[] = {12, 11, 40, 5, 3, 1}
Output: 5 (A Longest Bitonic Subsequence of length 5 is 12, 11, 5, 3, 1)

Input arr[] = {80, 60, 30, 40, 20, 10}
Output: 5 (A Longest Bitonic Subsequence of length 5 is 80, 60, 30, 20, 10)

 */

function lbs(arr: number[]): number {
  const n: number = arr.length;

  // Allocate memory for LIS[] and initialize LIS values as 1 for all indexes
  const lis: number[] = Array(n).fill(1);

  // Compute LIS values from left to right
  for (let i = 1; i < n; i++) {
    for (let j = 0; j < i; j++) {
      if (arr[i] > arr[j] && lis[i] < lis[j] + 1) {
        lis[i] = lis[j] + 1;
      }
    }
  }

  // Allocate memory for LDS and initialize LDS values for all indexes
  const lds: number[] = Array(n).fill(1);

  // Compute LDS values from right to left
  for (let i = n - 1; i >= 0; i--) {
    for (let j = n - 1; j > i; j--) {
      if (arr[i] > arr[j] && lds[i] < lds[j] + 1) {
        lds[i] = lds[j] + 1;
      }
    }
  }

  // Return the maximum value of (lis[i] + lds[i] - 1)
  let maximum: number = lis[0] + lds[0] - 1;
  for (let i = 1; i < n; i++) {
    maximum = Math.max(lis[i] + lds[i] - 1, maximum);
  }

  return maximum;
}

if (require.main === module) {
  // Test case
  const arr: number[] = [0, 8, 4, 12, 2, 10, 6, 14, 1, 9, 5, 13, 3, 11, 7, 15];
  console.log("Length of LBS is", lbs(arr));

}

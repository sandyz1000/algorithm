/* 
Dynamic Programming bsed Python implementation of Maximum Sum Increasing Subsequence
(MSIS) problem
https://www.geeksforgeeks.org/maximum-sum-increasing-subsequence-dp-14/

Given an array of n positive integers. Write a program to find the sum of maximum sum
subsequence of the given array such that the intgers in the subsequence are sorted in increasing
order. For example, if input is {1, 101, 2, 3, 100, 4, 5}, then output should be 106 (1 + 2 + 3 +
100), if the input array is {3, 4, 5, 10}, then output should be 22 (3 + 4 + 5 + 10) and if the
input array is {10, 5, 4, 3}, then output should be 10

 */

function maxSumIS(arr: number[]): number {
  const n: number = arr.length;

  // Initialize msis values for all indexes
  const msis: number[] = Array.from({ length: n }, (_, i) => arr[i]);

  // Compute maximum sum values in bottom-up manner
  for (let i = 1; i < n; i++) {
    for (let j = 0; j < i; j++) {
      if (arr[i] > arr[j] && msis[i] < msis[j] + arr[i]) {
        msis[i] = msis[j] + arr[i];
      }
    }
  }

  // Pick the maximum of all msis values
  return Math.max(...msis);
}

if (require.main === module) {
  // Test case
  const arr: number[] = [1, 101, 2, 3, 100, 4, 5];
  console.log("Sum of the maximum sum increasing subsequence is", maxSumIS(arr));
}
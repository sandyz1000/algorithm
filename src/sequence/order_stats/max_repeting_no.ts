/* 
Find the maximum repeating number in O(n) time and O(1) extra space

Given an array of size n, the array contains numbers in range from 0 to k-1 where k is a
positive integer and k <= n. Find the maximum repeating number in this array. For example,
let k be 10 the given array be arr[] = {1, 2, 2, 2, 0, 2, 0, 2, 3, 8, 0, 9, 2, 3},
the maximum repeating number would be 2. Expected time complexity is O(n) and extra space
allowed is O(1). Modifications to array are allowed.


Description:
------------------------------------------------------------------

The naive approach is to run two loops, the outer loop picks an element one by one,
the inner loop counts number of occurrences of the picked element. Finally return
the element with maximum count. Time complexity of this approach is O(n^2).

A better approach is to create a count array of size k and initialize all elements
of count[] as 0. Iterate through all elements of input array, and for every element
arr[i], increment count[arr[i]]. Finally, iterate through count[] and return the
index with maximum value. This approach takes O(n) time, but requires O(k) space.

------------------------------------------------------------------
Algorithm:
------------------------------------------------------------------

Following is the O(n) time and O(1) extra space approach. Let us understand the
approach with a simple example where arr[] = {2, 3, 3, 5, 3, 4, 1, 7}, k = 8,
n = 8 (number of elements in arr[]).

1) Iterate though input array arr[], for every element arr[i], increment arr[arr[
i]%k] by k (arr[] becomes {2, 11, 11, 29, 11, 12, 1, 15 })

2) Find the maximum value in the modified array (maximum value is 29). Index of the
maximum value is the maximum repeating element (index of 29 is 3).

3) If we want to get the original array back, we can iterate through the array one
more time and do arr[i] = arr[i] % k where i varies from 0 to n-1.

How does the above algorithm work? Since we use arr[i]%k as index and add value k
at the index arr[i]%k, the index which is equal to maximum repeating element will
have the maximum value in the end. Note that k is added maximum number of times at
the index equal to maximum repeating element and all array elements are smaller
than k.

Returns maximum repeating element in arr[0..n-1]. The array elements are in
range from 0 to k-1

 */


function maxRepeating(arr: number[], n: number, k: number): number {
    // Iterate through the input array, for every element arr[i], increment arr[arr[i] % k] by k
    for (let i = 0; i < n; i++) {
        arr[arr[i] % k] += k;
    }

    // Find the index of the maximum repeating element
    let maximum = arr[0];
    let result = 0;
    for (let i = 1; i < n; i++) {
        if (arr[i] > maximum) {
            maximum = arr[i];
            result = i;
        }
    }

    // Uncomment this code to get the original array back
    // arr = arr.map((value) => value % k);
    return result;  // Return the index of the maximum element
}

if (require.main === module) {
    // Test
    const arr = [2, 3, 3, 5, 3, 4, 1, 7];
    const n = arr.length;
    const k = 8;
    console.log("The maximum repeating number is ", maxRepeating(arr, n, k));
}

/* """
Count distinct elements in every window of size k
Given an array of size n and an integer k, return the of count of distinct numbers in all windows
of size k.

==Example:==

- - - - - - - - - - - -- - - - - - - - - - - - - - - - - - - - +
Input:  arr = {1, 2, 1, 3, 4, 2, 3}, k = 4
Output:
3
4
4
3

==Explanation:==

First window is {1, 2, 1, 3}, count of distinct numbers is 3
Second window is {2, 1, 3, 4} count of distinct numbers is 4
Third window is {1, 3, 4, 2} count of distinct numbers is 4
Fourth window is {3, 4, 2, 3} count of distinct numbers is 3
- - - - - - - - - - - -- - - - - - - - - - - - - - - - - - - - +


Simple TS program to count distinct elements in every window of size k

### Method - 1
A Simple Solution is to traverse the given array, consider every window in it and count
distinct elements in the window. Below is implementation of simple solution

Time complexity of the above solution is O(nk^2). We can improve time complexity to O(nkLogk) by
modifying countWindowDistinct() to use sorting. The function can further be optimized to
use hashing to find distinct elements in a window. With hashing the time complexity becomes
O(nk). Below is a different approach that works in O(n) time.

### Method - 2
An Efficient Solution is to use the count of previous window, while sliding the window. The
    idea is to create a hash map that stores elements of current widow. When we slide the window,
    we remove an element from hash and add an element. We also keep track of distinct elements.

    Below is algorithm.
    1) Create an empty hash map. Let hash map be hM
    2) Initialize distinct element count 'dist_count' as 0.
    3) Traverse through first window and insert elements of first window to hM. The elements are
    used as key and their counts as value in hM. Also keep updating ‘dist_count’
    4) Print 'dist_count' for first window.
    5) Traverse through remaining array (or other windows).
      a) Remove the first element of previous window.
      If the removed element appeared only once remove it from hM and do "dist_count–"
      Else (appeared multiple times in hM) decrement its count in hM

      b) Add the current element (last element of new window)
      If the added element is not present in hM add it to hM and do "dist_count++"
      Else (the added element appeared multiple times) increment its count in hM

    Time complexity of the above solution is O(n).
 */

// Method -1
const countDistinct1 = (arr: number[], n: number, k: number): void => {
  const countWindowDistinct = (win: number[], k: number): void => {
    let distCount = 0;
  
    // Traverse the window
    for (let i = 0; i < k; i++) {
      // Check if element arr[i] exists in arr[0..i-1]
      let j = 0;
      while (j < i) {
        if (win[i] === win[j]) {
          break;
        }
        j++;
      }
      if (j === i) {
        distCount += 1;
      }
    }
    console.log(distCount);
  }
  // Traverse through every window
  for (let i = 0; i < n - k + 1; i++) {
    countWindowDistinct(arr.slice(i, n), k);
  }
}

const countDistinct2 = (arr: number[], n: number, k: number): void => {
  // Creates an empty hashmap hm
  const hm: { [key: number]: number } = {};

  // initialize distinct element count for current window
  let distCount = 0;

  // Traverse the first window and store count of every element in hash map
  for (let i = 0; i < k; i++) {
    if (!(arr[i] in hm)) {
      hm[arr[i]] = 1;
      distCount += 1;
    } else {
      hm[arr[i]] += 1;
    }
  }

  // Print count of first window
  console.log(distCount);

  // Traverse through the remaining array
  for (let i = k; i < n; i++) {
    // Remove first element of the previous window
    // If there was only one occurrence, then reduce the distinct count.
    if (hm[arr[i - k]] === 1) {
      delete hm[arr[i - k]];
      distCount -= 1;
    } else {
      // reduce count of the removed element
      hm[arr[i - k]] -= 1;
    }

    // Add a new element to the current window.
    // If this element appears for the first time, increment the distinct element count.
    if (!(arr[i] in hm)) {
      hm[arr[i]] = 1;
      distCount += 1;
    } else {
      // Increment the distinct element count
      hm[arr[i]] += 1;
    }
    console.log(distCount);  // Print count of the current window
  }
}

if (require.main === module) {

  const arr = [1, 2, 1, 3, 4, 2, 3];
  const k = 4;
  const n = arr.length;

  console.log("Method-1: Count distinct elements in every window of size k");
  countDistinct1(arr, n, k);

  console.log("\nMethod-2: Count distinct elements in every window of size k");
  countDistinct2(arr, n, k);

}
/* Find median in row wise sorted matrix

We are given a row wise sorted matrix of size r*c, we need to find the median of the matrix given.
It is assumed that r*c is always odd.

----------------------------------------
Examples:
----------------------------------------
Input : 1 3 5
        2 6 9
        3 6 9
Output : Median is 5
If we put all the values in a sorted
array A[] = 1 2 3 3 5 6 6 9 9)

Input: 1 3 4
       2 5 6
       7 8 9
Output: Median is 5

----------------------------------------
Simple Method:
----------------------------------------
The simplest method to solve this problem is to store all the elements of the given
matrix in an array of size r*c. Then find the median element in this array.This seems to be the
simplest method but it would take extra memory.

Time Complexity = O(r*c)
Auxiliary Space = O(r*c)

----------------------------------------
Method-2
----------------------------------------
An efficient approach for this problem is to use binary search algorithm. The idea is that for a
number to be median there should be exactly (n/2) numbers which are less than this number. So,
we try to find the count of numbers less than all the numbers. Below is the step by step
algorithm for this approach:

----------------------------------------
Algorithm:
----------------------------------------
1.  First we find the minimum and maximum elements in the matrix. Minimum element can be easily
    found by comparing the first element of each row, and similarly the maximum element can be
    found by comparing the last element of each row.
2.  Then we use binary search on our range of numbers from minimum to maximum, we find the mid of
    the min and max, and get count of numbers less than our mid. And accordingly change the min or
    max.
3.  For a number to be median, there should be (r*c)/2 numbers smaller than that number. So for
    every number, we get the count of numbers less than that by using upper_bound() in each row of
    matrix, if it is less than the required count, the median must be greater than the selected
    number, else the median must be less than or equal to the selected number.
 */
// TypeScript program to find median of matrix sorted row wise

// Example usage
// const array = [1, 3, 5, 7, 9];
// const x = 6;

// const index = bisectRight(array, x);
// console.log("Index to insert", x, "is:", index);
function bisectRight(arr: number[], x: number): number {
  let left = 0;
  let right = arr.length;

  while (left < right) {
    const mid = Math.floor((left + right) / 2);

    if (arr[mid] <= x) {
      left = mid + 1;
    } else {
      right = mid;
    }  
  }  

  return left;
}  


// Function to find median in the matrix
function binaryMedian(m: number[][], r: number, c: number): void {
  let mi = m[0][0];
  let mx = 0;

  for (let i = 0; i < r; i++) {
    if (m[i][0] < mi) {
      mi = m[i][0];
    }
    if (m[i][c - 1] > mx) {
      mx = m[i][c - 1];
    }
  }

  const desired = (r * c + 1) / 2;

  while (mi < mx) {
    const mid = mi + Math.floor((mx - mi) / 2);
    let place = 0;

    // Find count of elements smaller than mid
    for (let i = 0; i < r; i++) {
      let j = 0;
      while (j < c && m[i][j] <= mid) {
        j++;
      }
      place += j;
    }

    if (place < desired) {
      mi = mid + 1;
    } else {
      mx = mid;
    }
  }

  console.log("Median is", mi);
}

// Main function
if (require.main === module) {
  // Time Complexity: O(32 * r * log(c)). The upper bound function will take log(c) time and is
  // performed for each row. And since the numbers will be max of 32 bit, so binary search of
  // numbers from min to max will be performed in at most 32 ( log2(2^32) = 32 ) operations.
  // Auxiliary Space : O(1)

  const r = 3;
  const c = 3;
  const m = [
    [1, 3, 5],
    [2, 6, 9],
    [3, 6, 9],
  ];

  binaryMedian(m, r, c);
}

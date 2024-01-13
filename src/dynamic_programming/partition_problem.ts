/* Dynamic Programming | Set 18 (Partition problem)

Partition problem is to determine whether a given set can be partitioned into two subsets such
that the sum of elements in both subsets is same.

----------------------------------------------
Examples
----------------------------------------------

arr[] = {1, 5, 11, 5}
Output: true
The array can be partitioned as {1, 5, 5} and {11}

arr[] = {1, 5, 3}
Output: false
The array cannot be partitioned into equal sum sets.

----------------------------------------------
Algorithm:
----------------------------------------------

Following are the two main steps to solve this problem:
1)  Calculate sum of the array. If sum is odd, there can not be two subsets with equal
    sum, so return false.
2)  If sum of array elements is even, calculate sum/2 and find a subset of array with
    sum equal to sum/2.

Following are the two main steps to solve this problem:
1)  Calculate sum of the array. If sum is odd, there can not be two subsets with equal sum, so
    return false.
2)  If sum of array elements is even, calculate sum/2 and find a subset of array with sum equal to
    sum/2.

The first step is simple. The second step is crucial, it can be solved either using recursion or
Dynamic Programming.
 */


function isSubsetSum(arr: number[], n: number, summation: number): boolean {
  // Base Cases
  if (summation === 0) {
    return true;
  }

  if (n === 0 && summation) {
    return false;
  }

  // If the last element is greater than the sum, then ignore it
  if (arr[n - 1] > summation) {
    return isSubsetSum(arr, n - 1, summation);
  }

  // Check if the sum can be obtained by including or excluding the last element
  return isSubsetSum(arr, n - 1, summation) || isSubsetSum(arr, n - 1, summation - arr[n - 1]);
}

function findPartitionRecursive(arr: number[], n: number): boolean {
  // Calculate the sum of the elements in the array
  const summ = arr.reduce((sum, element) => sum + element, 0);

  // If the sum is odd, there cannot be two subsets with equal sum
  if (summ % 2 !== 0) {
    return false;
  }

  // Find if there is a subset with a sum equal to half of the total sum
  return isSubsetSum(arr, n, summ / 2);
}

function findPartitionDP(arr: number[], n: number): boolean {
  const summ = arr.reduce((sum, element) => sum + element, 0);

  if (summ % 2 !== 0) {
    return false;
  }

  const part: boolean[][] = new Array(summ / 2 + 1).fill(false).map(() => new Array(n + 1).fill(false));

  // Initialize the top row as true
  for (let i = 0; i <= n; i++) {
    part[0][i] = true;
  }

  // Fill the partition table in a bottom-up manner
  for (let i = 1; i <= summ / 2; i++) {
    for (let j = 1; j <= n; j++) {
      part[i][j] = part[i][j - 1];
      if (i >= arr[j - 1]) {
        part[i][j] = part[i][j] || part[i - arr[j - 1]][j - 1];
      }
    }
  }

  // Uncomment this part to print the table
  for (let i = 1; i <= summ / 2; i++) {
    const output: string[] = [];
    for (let j = 0; j <= n; j++) {
      output.push(`${part[i][j] ? 1 : 0}`);
    }
    console.log(output);
  }

  return part[summ / 2][n];
}

if (require.main === module) {
  // Test cases
  const arr1 = [3, 1, 5, 9, 12];
  const arr2 = [3, 1, 1, 2, 2, 1];
  const n1 = arr1.length;
  const n2 = arr2.length;

  console.log("Using Recursive Approach:");
  console.log(findPartitionRecursive(arr1, n1) ? "Can be divided into two subsets of equal sum" : "Cannot be divided into two subsets of equal sum");
  console.log(findPartitionRecursive(arr2, n2) ? "Can be divided into two subsets of equal sum" : "Cannot be divided into two subsets of equal sum");

  console.log("\nUsing Dynamic Programming Approach:");
  console.log(findPartitionDP(arr1, n1) ? "Can be divided into two subsets of equal sum" : "Cannot be divided into two subsets of equal sum");
  console.log(findPartitionDP(arr2, n2) ? "Can be divided into two subsets of equal sum" : "Cannot be divided into two subsets of equal sum");
}
/* The Longest Increasing Subsequence (LIS) problem is to find the length of the longest
subsequence of a given sequence such that all elements of the subsequence are sorted in
increasing order. For example, the length of LIS for {10, 22, 9, 33, 21, 50, 41, 60, 80} is 6 and
LIS is {10, 22, 33, 50, 60, 80}.

Examples:
Input  : arr[] = {3, 10, 2, 1, 20}
Output : Length of LIS = 3
The longest increasing subsequence is 3, 10, 20

Input  : arr[] = {3, 2}
Output : Length of LIS = 1
The longest increasing subsequences are {3} and {2}

Input : arr[] = {50, 3, 10, 7, 40, 80}
Output : Length of LIS = 4
The longest increasing subsequence is {3, 7, 40, 80}

----------------------------------
Explanation:
----------------------------------
To make use of recursive calls, this function must return two things:
1) Length of LIS ending with element arr[n-1]. We use max_ending_here for this purpose
2) Overall maximum, as the LIS may end with an element before arr[n-1] is used as *maximum*
for this purpose. The value of LIS of full array of size n is stored in variable *maximum*
which is our final result

-----------------------------------
Optimal Substructure:
-----------------------------------
Let arr[0..n-1] be the input array and L(i) be the length of the LIS ending at index i such that
arr[i] is the last element of the LIS.
Then, L(i) can be recursively written as:
L(i) = 1 + max( L(j) ) where 0 < j < i and arr[j] < arr[i]; or
L(i) = 1, if no such j exists.

To find the LIS for a given array, we need to return max(L(i)) where 0 < i < n.
Thus, we see the LIS problem satisfies the optimal substructure property as the main problem can be
solved using solutions to subproblems.

------------------------------------
Overlapping Subproblems:
------------------------------------
Considering the above implementation, following is recursion tree for an array of size 4. lis(n)
gives us the length of LIS for arr[].

                lis(4)
            /           \ 
          lis(3)        lis(2) lis(1)
         /              /
       lis(2) lis(1) lis(1)
       /
    lis(1)

We can see that there are many subproblems which are solved again and again. So this problem has
Overlapping Substructure property and re-computation of same subproblems can be avoided by either
using Memoization or Tabulation. Following is a tabulated implementation for the LIS problem.

Note that the time complexity of the above Dynamic Programming (DP) solution is O(n^2) and there
is a O(nLogn) solution for the LIS problem. We have not discussed the O(n Log n) solution here as
the purpose of this post is to explain Dynamic Programming with a simple example.

See below post for O(n Log n) solution.
http://www.geeksforgeeks.org/longest-monotonically-increasing-subsequence-size-n-log-n/
 */

function lis(nums: number[]): number {
  const memo: Map<string, number> = new Map();

  function lengthOfLISUtils(nums: number[], prev: number, curr: number): number {
    if (curr === nums.length) return 0;
    const key: string = `${prev}_${curr}`;
    if (memo.has(key)) return memo.get(key)!;

    let taken: number = 0;
    if (nums[curr] > prev) {
      taken = 1 + lengthOfLISUtils(nums, nums[curr], curr + 1);
    }
    const notTaken: number = lengthOfLISUtils(nums, prev, curr + 1);
    const result: number = Math.max(taken, notTaken);

    memo.set(key, result);
    return result;
  }

  return lengthOfLISUtils(nums, Number.MIN_SAFE_INTEGER, 0);
}

function lisDP(arr: number[]): number {
  const n: number = arr.length;
  const lis: number[] = Array(n).fill(1);

  for (let i = 1; i < n; i++) {
    for (let j = 0; j < i; j++) {
      if (arr[i] > arr[j] && lis[i] < lis[j] + 1) {
        lis[i] = lis[j] + 1;
      }
    }
  }

  return Math.max(...lis);
}

function lisMonoqueue(arr: number[]): number {
  const stack: number[] = [];
  let right: number = arr.length - 1;
  let lis: number = 0;

  while (right !== -1) {
    while (stack.length !== 0 && arr[right] >= stack[stack.length - 1]) {
      lis = Math.max(stack.length, lis);
      stack.pop();
    }

    stack.push(arr[right]);
    right--;
  }

  return Math.max(lis, stack.length);
}

if (require.main === module) {
  // Test case
  const arr: number[] = [10, 22, 9, 33, 21, 50, 41, 60];
  // const arr: number[] = [50, 3, 10, 7, 40, 80];
  // const arr: number[] = [3, 10, 2, 1, 20];
  // console.log("Length of lis is", lisDP(arr));
  console.log("Length of lis is", lis(arr));
  // console.log("Length of lis is", lisMonoqueue(arr));
}
/* 
Fill two instances of all numbers from 1 to n in a specific way

Given a number n, create an array of size 2n such that the array contains 2 instances of every
number from 1 to n, and the number of elements between two instances of a number i is equal to i.
If such a configuration is not possible, then print the same.

Examples:

Input: n = 3
Output: res[] = {3, 1, 2, 1, 3, 2}

Input: n = 2
Output: Not Possible

Input: n = 4
Output: res[] = {4, 1, 3, 1, 2, 4, 3, 2}

One solution is to Backtracking. The idea is simple, we place two instances of n at a place,
then recur for n-1. If recurrence is successful, we return true, else we backtrack and try
placing n at different location

 */

function fillUtil(res: number[], curr: number, n: number): boolean {
  if (curr === 0) {
    return true;
  }

  for (let i = 0; i < 2 * n - curr - 1; i++) {
    if (res[i] === 0 && res[i + curr + 1] === 0) {
      res[i] = res[i + curr + 1] = curr;
      if (fillUtil(res, curr - 1, n)) {
        return true;
      }
      res[i] = res[i + curr + 1] = 0;
    }
  }

  return false;
}

function fill(n: number): void {
  const res: number[] = new Array<number>(2 * n).fill(0);

  if (fillUtil(res, n, n)) {
    console.log(res.join(" "));
  } else {
    console.log("Not Possible");
  }
}

fill(7);
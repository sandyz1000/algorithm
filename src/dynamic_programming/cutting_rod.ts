
/* Given a rod of length n inches and an array of prices that contains prices of all pieces of
size smaller than n. Determine the maximum value obtainable by cutting up the rod and selling the
pieces.

For example,
==============================
If length of the rod is 8 and the values of different pieces are given as
following, then the maximum obtainable value is 22 (by cutting in two pieces of lengths 2 and 6)

length   | 1   2   3   4   5   6   7   8
--------------------------------------------
price    | 1   5   8   9  10  17  17  20

And if the prices are as following, then the maximum obtainable value is 24 (by cutting in eight
pieces of length 1)

length   | 1   2   3   4   5   6   7   8
--------------------------------------------
price    | 3   5   8   9  10  17  17  20

cR() ---> cutRod()

                             cR(4)
                  /        /
                 /        /
             cR(3)       cR(2)     cR(1)   cR(0)
            /  |         /         |
           /   |        /          |
      cR(2) cR(1) cR(0) cR(1) cR(0) cR(0)
     /        |          |
    /         |          |
  cR(1) cR(0) cR(0)      cR(0)
   /
 /
CR(0)

In the above partial recursion tree, cR(2) is being solved twice. We can see that there are many
sub problems which are solved again and again. Since same suproblems are called again,
this problem has Overlapping Subprolems property. So the Rod Cutting problem has both properties
(see this and this) of a dynamic programming problem. Like other typical Dynamic Programming(DP)
problems, re-computations of same subproblems can be avoided by constructing a temporary array
val[] in bottom up manner.

 */

export const INT_MIN: number = -Infinity;

function cutRodRec(price: number[], n: number): number {
  if (n <= 0) {
    return 0;
  }
  let maxVal: number = INT_MIN;

  // Recursively cut the rod in different pieces and compare different configurations
  for (let i = 0; i < n; i++) {
    maxVal = Math.max(maxVal, price[i] + cutRodRec(price, n - i - 1));
  }

  return maxVal;
}

function cutRodDP(price: number[], n: number): number {
  const val: number[] = Array(n + 1).fill(0);
  val[0] = 0;

  // Build the table val[] in a bottom-up manner and return the last entry from the table
  for (let i = 1; i <= n; i++) {
    let maxVal: number = INT_MIN;
    for (let j = 0; j < i; j++) {
      maxVal = Math.max(maxVal, price[j] + val[i - j - 1]);
    }
    val[i] = maxVal;
  }

  return val[n];
}

if (require.main === module) {
  // Test case
  const pieces: number[] = [1, 2, 3, 4, 5, 6, 7, 8];
  const arr: number[] = [2, 5, 6, 9, 16, 17, 17, 20];
  const size: number = arr.length;

  console.log("Maximum Obtainable Value is " + cutRodRec(arr, size));
  console.log("Dynamic Programming Method: " + cutRodDP(arr, size));
}
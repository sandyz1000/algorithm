/* Given a value N, if we want to make change for N cents, and we have infinite supply of each of
S = {S1, S2, .. , Sm} valued coins, how many ways can we make the change?
The order of coins doesn't matter.

For example, for N = 4 and S = {1,2,3}, there are four solutions: {1,1,1,1},{1,1,2},{2,2},{1,3}.
So output should be 4. For N = 10 and S = {2, 3, 5, 6}, there are five solutions: {2,2,2,2,2},
{2,2,3,3}, {2,2,6}, {2,3,5} and {5,5}. So the output should be 5.

---------------------
Optimal Substructure:
---------------------
To count total number solutions, we can divide all set solutions in two sets.
1) Solutions that do not contain mth coin (or Sm).
2) Solutions that contain at least one Sm.

Let count(S[], m, n) be the function to count the number of solutions, then it can be written as
sum of count(S[], m-1, n) and count(S[], m, n-Sm).

Therefore, the problem has optimal substructure property as the problem can be solved using
solutions to sub problems.

-------------------------
Overlapping Sub-problems:
-------------------------
The function C({1}, 3) is called two times. If we draw the complete tree, then we can see that
there are many sub problems being called more than once.

C() --> count()
                           C({1,2,3}, 5)
                          /
                         /
             C({1,2,3}, 2)                 C({1,2}, 5)
            /                             /
           /                             /
C({1,2,3}, -1)  C({1,2}, 2)        C({1,2}, 3)    C({1}, 5)
               /                 /                /
              /                 /                /
    C({1,2},0)  C({1},2)   C({1,2},1) C({1},3)  C({1}, 4)  C({}, 5)
                   /       /             /         /
                  /       /             /         /
                .      .  .     .   .     .   C({1}, 3) C({}, 4)
                                               /
                                              /
                                             .      .

Since same sub problems are called again, this problem has Overlapping Sub problems property. So
the Coin Change problem has both properties (see this and this) of a dynamic programming problem.
Like other typical Dynamic Programming(DP) problems, re-computations of same sub-problems can be
avoided by constructing a temporary array table[][] in bottom up manner.

 */

function recursiveCount(S: number[], m: number, n: number): number {
  if (n === 0) {
    return 1;
  }

  if (n < 0 || (m <= 0 && n >= 1)) {
    return 0;
  }

  return recursiveCount(S, m - 1, n) + recursiveCount(S, m, n - S[m - 1]);
}

// Dynamic Programming Python implementation of Coin Change problem
// Time Complexity: O(m*amount)
// Space Complexity: O(m*amount)
function dynamicProgrammingCount1(S: number[], m: number, totalAmount: number): number {
  const table: number[][] = Array.from({ length: totalAmount + 1 }, () => Array(m).fill(0));

  for (let amount = 0; amount < m; amount++) {
    table[0][amount] = 1;
  }

  for (let amount = 1; amount <= totalAmount; amount++) {
    for (let selectedCoin = 0; selectedCoin < m; selectedCoin++) {
      const x = amount - S[selectedCoin] >= 0 ? table[amount - S[selectedCoin]][selectedCoin] : 0;
      const y = selectedCoin >= 1 ? table[amount][selectedCoin - 1] : 0;

      table[amount][selectedCoin] = x + y;
    }
  }

  return table[totalAmount][m - 1];
}

//  Dynamic Programming Python implementation of Coin Change problem
// Time Complexity: O(mn)
// Space Complexity: O(n)
function dynamicProgrammingCount2(S: number[], m: number, total: number): number {
  // table[i] will be storing the number of solutions for
  // value i. We need n+1 rows as the table is constructed
  // in bottom up manner using the base case (n = 0)
  // Initialize all table values as 0
  const table: number[] = Array(total + 1).fill(0);
  // Base case (If given value is 0)
  table[0] = 1;

  // Pick all coins one by one and update the table[] values
  // after the index greater than or equal to the value of the
  // picked coin
  for (let i = 0; i < m; i++) {
    for (let j = S[i]; j <= total; j++) {
      table[j] += table[j - S[i]];
    }
  }

  return table[total];
}

if (require.main === module) {
  const arr: number[] = [1, 2, 3];
  const n: number = 4;
  const m: number = arr.length;

  console.log("Recursive method:", recursiveCount(arr, m, n));
  console.log("DP 1 method:", dynamicProgrammingCount1(arr, m, n));
  console.log("DP 2 method:", dynamicProgrammingCount2(arr, m, n));
}


/* Matrix Chain Multiplication | DP-8
===================================
https://www.geeksforgeeks.org/matrix-chain-multiplication-dp-8/

Given a sequence of matrices, find the most efficient way to multiply these matrices together.
The problem is not actually to perform the multiplications, but merely to decide in which order
to perform the multiplications.

We have many options to multiply a chain of matrices because matrix multiplication is associative.
In other words, no matter how we parenthesize the product, the result will be the same. For example,
if we had four matrices A, B, C, and D, we would have:

    (ABC)D = (AB)(CD) = A(BCD) = ....
However, the order in which we parenthesize the product affects the number of simple arithmetic operations
needed to compute the product, or the efficiency. For example, suppose A is a 10 × 30 matrix, B is a 30 × 5 matrix,
and C is a 5 × 60 matrix.

Then,
    (AB)C = (10×30×5) + (10×5×60) = 1500 + 3000 = 4500 operations
    A(BC) = (30×5×60) + (10×30×60) = 9000 + 18000 = 27000 operations.
Clearly the first parenthesization requires less number of operations.

Given an array p[] which represents the chain of matrices such that the ith matrix Ai is of dimension p[i-1] x p[i].
We need to write a function MatrixChainOrder() that should return the minimum number of multiplications needed
to multiply the chain.

----------------------------------------------------------------
Input: p[] = {40, 20, 30, 10, 30}
  Output: 26000
  There are 4 matrices of dimensions 40x20, 20x30, 30x10 and 10x30.
  Let the input 4 matrices be A, B, C and D.  The minimum number of
  multiplications are obtained by putting parenthesis in following way
  (A(BC))D --> 20*30*10 + 40*20*10 + 40*10*30

  Input: p[] = {10, 20, 30, 40, 30}
  Output: 30000
  There are 4 matrices of dimensions 10x20, 20x30, 30x40 and 40x30.
  Let the input 4 matrices be A, B, C and D.  The minimum number of
  multiplications are obtained by putting parenthesis in following way
  ((AB)C)D --> 10*20*30 + 10*30*40 + 10*40*30

  Input: p[] = {10, 20, 30}
  Output: 6000
  There are only two matrices of dimensions 10x20 and 20x30. So there
  is only one way to multiply the matrices, cost of which is 10*20*30

----------------------------------------------------------------

 */


function matrixChainOrderRec(arr: number[], i: number, j: number): number {
  if (i === j) {
    return 0;
  }

  let minCount = Number.MAX_SAFE_INTEGER;

  for (let k = i; k < j; k++) {
    const count = matrixChainOrderRec(arr, i, k) + matrixChainOrderRec(arr, k + 1, j) + arr[i - 1] * arr[k] * arr[j];
    minCount = Math.min(count, minCount);
  }

  return minCount;
}

function matrixChainOrder(arr: number[], n: number): number {
  const minMul: number[][] = Array.from({ length: n }, () => Array(n).fill(0));

  for (let i = 1; i < n; i++) {
    minMul[i][i] = 0;
  }

  for (let L = 2; L < n; L++) {
    for (let i = 1; i <= n - L; i++) {
      const j = i + L - 1;
      minMul[i][j] = Number.MAX_SAFE_INTEGER;

      for (let k = i; k < j; k++) {
        const count = minMul[i][k] + minMul[k + 1][j] + arr[i - 1] * arr[k] * arr[j];
        minMul[i][j] = Math.min(count, minMul[i][j]);
      }
    }
  }

  return minMul[1][n - 1];
}

if (require.main === module) {
  // Test cases
  const arr1: number[] = [1, 2, 3, 4];
  const size1: number = arr1.length;
  console.log("Minimum number of multiplications is", matrixChainOrder(arr1, size1));

  const arr2: number[] = [1, 2, 3, 4, 3];
  const size2: number = arr2.length;
  console.log("Minimum number of multiplications is", matrixChainOrderRec(arr2, 1, size2 - 1));
}
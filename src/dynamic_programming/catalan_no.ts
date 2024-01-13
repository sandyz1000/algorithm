
/* Program for nth Catalan Number
Catalan numbers are a sequence of natural numbers that occurs in many interesting counting
problems like following.

1) Count the number of expressions containing n pairs of parentheses which are correctly matched.
For n = 3, possible expressions are ((())), ()(()), ()()(), (())(), (()()).

2) Count the number of possible Binary Search Trees with n keys (See this)

3) Count the number of full binary trees (A rooted binary tree is full if every vertex has either
two children or no children) with n+1 leaves.

See this for more applications.

The first few Catalan numbers for n = 0, 1, 2, 3, .... are 1, 1, 2, 5, 14, 42, 132, 429, 1430,
4862, ....  */

import { stdout } from "process";

function catalanRec(n: number): number {
  if (n <= 1) {
    return 1;
  }

  let res = 0;
  for (let i = 0; i < n; i++) {
    res += catalanRec(i) * catalanRec(n - i - 1);
  }

  return res;
}

function catalanDp(n: number): number {
  if (n === 0 || n === 1) {
    return 1;
  }

  const catalan: number[] = new Array(n + 1).fill(0);
  catalan[0] = 1;
  catalan[1] = 1;

  for (let i = 2; i <= n; i++) {
    catalan[i] = 0;
    for (let j = 0; j < i; j++) {
      catalan[i] += catalan[j] * catalan[i - j - 1];
    }
  }

  return catalan[n];
}

function binomialCoefficient(n: number, k: number): number {
  if (k > n - k) {
    k = n - k;
  }

  let res = 1;
  for (let i = 0; i < k; i++) {
    res = res * (n - i);
    res = res / (i + 1);
  }

  return res;
}

// A Binomial coefficient based function to find nth catalan number in O(n) time
function catalan(n: number): number {
  const c = binomialCoefficient(2 * n, n);
  return c / (n + 1);
}

if (require.main === module) {
  // Driver Program to test above function
  catalanRec(5);
  console.log("\n");

  for (let i = 0; i < 11; i++) {
    stdout.write(`${catalanDp(i)},`);
  }
  console.log("\n");

  for (let i = 0; i < 11; i++) {
    stdout.write(`${catalan(i)},`);
  }
  console.log("\n");
}
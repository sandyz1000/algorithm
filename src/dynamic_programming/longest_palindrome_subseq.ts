/* Dynamic Programming | Set 12 (Longest Palindromic Subsequence)

http://www.geeksforgeeks.org/dynamic-programming-set-12-longest-palindromic-subsequence/

Given a sequence, find the length of the longest palindromic subsequence in it. For example,
if the given sequence is "BBABCBCAB", then the output should be 7 as "BABCBAB" is the longest
palindromic subsequence in it. "BBBBB" and "BBCBB" are also palindromic subsequences of the given
sequence, but not the longest ones.

The naive solution for this problem is to generate all subsequences of the given sequence and
find the longest palindromic subsequence. This solution is exponential in term of time
complexity. Let us see how this problem possesses both important properties of a Dynamic
Programming (DP) Problem and can efficiently solved using Dynamic Programming.

1) Optimal Substructure:
---------------------------
Let X[0..n-1] be the input sequence of length n and L(0, n-1) be the length of the longest
palindromic subsequence of X[0..n-1].

If last and first characters of X are same, then L(0, n-1) = L(1, n-2) + 2.
Else L(0, n-1) = MAX (L(1, n-1), L(0, n-2)).

------------------------------------------------------------------
Following is a general recursive solution with all cases handled.
------------------------------------------------------------------
// Everay single character is a palindrom of length 1
L(i, i) = 1 for all indexes i in given sequence

// IF first and last characters are not same
If (X[i] != X[j])  L(i, j) =  max{L(i + 1, j),L(i, j - 1)}

// If there are only 2 characters and both are same
Else if (j == i + 1) L(i, j) = 2

// If there are more than two characters, and first and last
// characters are same
Else L(i, j) =  L(i + 1, j - 1) + 2
------------------------------------------------------------------


2) Overlapping Subproblems:
----------------------------
Following is simple recursive implementation of the LPS problem. The implementation simply follows
the recursive structure mentioned above.

Considering the above implementation, following is a partial recursion tree for a sequence of
length 6 with all different characters.

               L(0, 5)
             /        \
            /          \
        L(1,5)          L(0,4)
       /    \            /    \
      /      \          /      \
  L(2,5)    L(1,4)  L(1,4)  L(0,3)

In the above partial recursion tree, L(1, 4) is being solved twice. If we draw the complete
recursion tree, then we can see that there are many subproblems which are solved again and again.
Since same suproblems are called again, this problem has Overlapping Subprolems property. So LPS
problem has both properties (see this and this) of a dynamic programming problem. Like other
typical Dynamic Programming(DP) problems, recomputations of same subproblems can be avoided by
constructing a temporary array L[][] in bottom up manner.

 */

function lps(seq: string, i: number, j: number): number {
  if (i === j) {
    return 1;
  }

  if (seq[i] === seq[j] && i + 1 === j) {
    return 2;
  }

  if (seq[i] === seq[j]) {
    return lps(seq, i + 1, j - 1) + 2;
  }

  return Math.max(lps(seq, i, j - 1), lps(seq, i + 1, j));
}

function lpsDP(str: string): number {
  const n: number = str.length;
  const L: number[][] = Array.from({ length: n }, () => Array(n).fill(0));

  for (let i = 0; i < n; i++) {
    L[i][i] = 1;
  }

  for (let cl = 2; cl <= n; cl++) {
    for (let i = 0; i < n - cl + 1; i++) {
      const j = i + cl - 1;
      if (str[i] === str[j] && cl === 2) {
        L[i][j] = 2;
      } else if (str[i] === str[j]) {
        L[i][j] = L[i + 1][j - 1] + 2;
      } else {
        L[i][j] = Math.max(L[i][j - 1], L[i + 1][j]);
      }
    }
  }

  return L[0][n - 1];
}

if (require.main === module) {
  // Test case
  const seq: string = "GEEKS FOR GEEKS";
  const n: number = seq.length;
  const start: number = Date.now();
  console.log("The length of the LPS is", lps(seq, 0, n - 1));
  console.log("Total execution time:", Date.now() - start);
  // console.log("The length of the LPS is", lpsDP(seq));
}
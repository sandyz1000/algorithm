
/* Dynamic Programming | Set 5 (Edit Distance)
http://www.geeksforgeeks.org/dynamic-programming-set-5-edit-distance/

Given two strings str1 and str2 and below operations that can performed on str1. Find minimum
number of edits (operations) required to convert 'str1' into 'str2'.

Insert
Remove
Replace

What are the sub problems in this case?

The idea is process all characters one by one staring from either from left or right sides of both
strings.

Let we traverse from right corner, there are two possibilities for every pair of character being
traversed.

m: Length of str1 (first string)
n: Length of str2 (second string)

If last characters of two strings are same, nothing much to do. Ignore last characters and get
count for remaining strings. So we recur for lengths m-1 and n-1.
Else (If last characters are not same), we consider all operations on 'str1', consider all three
operations on last character  of first string, recursively compute minimum cost for all three
operations and take minimum of three values.

Insert: Recur for m and n-1
Remove: Recur for m-1 and n
Replace: Recur for m-1 and n-1

Time Complexity: O(m x n)
Auxiliary Space: O(m x n)

 */

function editDistance(str1: string, str2: string, m: number, n: number): number {
  // If the first string is empty, the only option is to insert all characters of the second string into the first
  if (m === 0) {
    return n;
  }

  // If the second string is empty, the only option is to remove all characters of the first string
  if (n === 0) {
    return m;
  }

  // If last characters of two strings are the same, nothing much to do.
  // Ignore last characters and get the count for the remaining strings.
  if (str1[m - 1] === str2[n - 1]) {
    return editDistance(str1, str2, m - 1, n - 1);
  }

  // If last characters are not the same, consider all three operations on the last character of the first string,
  // recursively compute the minimum cost for all three operations and take the minimum of three values.
  return 1 + Math.min(
    editDistance(str1, str2, m, n - 1),    // Insert
    editDistance(str1, str2, m - 1, n),    // Remove
    editDistance(str1, str2, m - 1, n - 1) // Replace
  );
}

function editDistDP(str1: string, str2: string, m: number, n: number): number {
  // Create a table to store results of subproblems
  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  // Fill dp[][] in bottom-up manner
  for (let i = 0; i <= m; i++) {
    for (let j = 0; j <= n; j++) {
      // If the first string is empty, the only option is to insert all characters of the second string
      if (i === 0) {
        dp[i][j] = j; // Min. operations = j
      }
      // If the second string is empty, the only option is to remove all characters of the first string
      else if (j === 0) {
        dp[i][j] = i; // Min. operations = i
      }
      // If last characters are the same, ignore the last char and recur for the remaining string
      else if (str1[i - 1] === str2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      }
      // If last characters are different, consider all possibilities and find the minimum
      else {
        dp[i][j] = 1 + Math.min(
          dp[i][j - 1],   // Insert
          dp[i - 1][j],   // Remove
          dp[i - 1][j - 1] // Replace
        );
      }
    }
  }

  return dp[m][n];
}


if (require.main === module) {
  // Test case
  const str1: string = "sunday";
  const str2: string = "saturday";
  console.log("Recursive method: " + editDistance(str1, str2, str1.length, str2.length));
  console.log("Dynamic Programming Method: " + editDistDP(str1, str2, str1.length, str2.length));
}
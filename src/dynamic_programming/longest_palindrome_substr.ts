/* Longest Palindromic Substring | Set 1

Given a string, find the longest substring which is palindrome. For example, if the given
string is "forgeeksskeegfor", the output should be "geeksskeeg".

Method 1 ( Brute Force )
------------------------------------
The simple approach is to check each substring whether the substring is
a palindrome or not. We can run three loops, the outer two loops pick all substrings one by one
by fixing the corner characters, the inner loop checks whether the picked substring is palindrome
or not.

Time complexity: O ( n^3 )
Auxiliary complexity: O ( 1 )

Method 2 ( Dynamic Programming )
------------------------------------
The time complexity can be reduced by storing results of
sub-problems. The idea is similar to this post. We maintain a boolean table[n][n] that is filled
in bottom up manner. The value of table[i][j] is true, if the substring is palindrome, otherwise
false. To calculate table[i][j], we first check the value of table[i+1][j-1], if the value is
true and str[i] is same as str[j], then we make table[i][j] true. Otherwise, the value of table[
i][j] is made false.

Method 3 (Without using additional space)
------------------------------------------
Time complexity: O ( n^2 )
Auxiliary Space: O ( n^2 )

The time complexity of the Dynamic Programming based solution is O(n^2) and it requires O(n^2)
extra space. We can find the longest palindrome substring in (n^2) time with O(1) extra space.
The idea is to generate all even length and odd length palindromes and keep track of the longest
palindrome seen so far.

Step to generate odd length palindrome:
Fix a centre and expand in both directions for longer palindromes.

Step to generate even length palindrome
Fix two centre ( low and high ) and expand in both directions for longer palindromes.
 */

class LongestPalinSubstring {
  printSubstr(stream: string, low: number, high: number): void {
    for (let i = low; i <= high; i++) {
      console.log(stream[i]);
    }
  }

  longestPalSubstr(mString: string): number {
    const n: number = mString.length;
    const table: boolean[][] = Array.from({ length: n }, () => Array(n).fill(false));

    let maxLength: number = 1;
    for (let i = 0; i < n; i++) {
      table[i][i] = true;
    }

    let start: number = 0;
    for (let i = 0; i < n - 1; i++) {
      if (mString[i] === mString[i + 1]) {
        table[i][i + 1] = true;
        start = i;
        maxLength = 2;
      }
    }

    for (let k = 3; k <= n; k++) {
      for (let i = 0; i < n - k + 1; i++) {
        const j = i + k - 1;
        if (table[i + 1][j - 1] && mString[i] === mString[j]) {
          table[i][j] = true;
          if (k > maxLength) {
            start = i;
            maxLength = k;
          }
        }
      }
    }

    console.log("Longest palindrome substring is:");
    this.printSubstr(mString, start, start + maxLength - 1);
    return maxLength;
  }
}

class LongestPalinSubstringOptimised {
  longestPalSubstring(mString: string): number {
    let maxLength: number = 1;
    let start: number = 0;
    const length: number = mString.length;

    for (let i = 1; i < length; i++) {
      let low: number = i - 1;
      let high: number = i;
      while (low >= 0 && high < length && mString[low] === mString[high]) {
        if (high - low + 1 > maxLength) {
          start = low;
          maxLength = high - low + 1;
        }
        low--;
        high++;
      }

      low = i - 1;
      high = i + 1;
      while (low >= 0 && high < length && mString[low] === mString[high]) {
        if (high - low + 1 > maxLength) {
          start = low;
          maxLength = high - low + 1;
        }
        low--;
        high++;
      }
    }

    console.log("Longest palindrome substring is:");
    console.log(mString.slice(start, start + maxLength));
    return maxLength;
  }
}

if (require.main === module) {
  // Test cases
  const string: string = "forgeeksskeegfor";

  console.log("\n---- Method-2 ----");
  const testMethod2 = new LongestPalinSubstring();
  console.log("Length is:", testMethod2.longestPalSubstr(string));

  console.log("\n---- Method-3 ----");
  const testMethod3 = new LongestPalinSubstringOptimised();
  console.log("Length is:", testMethod3.longestPalSubstring(string));
}
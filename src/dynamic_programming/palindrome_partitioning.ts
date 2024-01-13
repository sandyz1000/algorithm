/* Dynamic Programming | Set 17 (Palindrome Partitioning)

Given a string, a partitioning of the string is a palindrome partitioning if every substring
of the partition is a palindrome.

For example, "aba|b|bbabb|a|b|aba" is a palindrome partitioning of "ababbbabbababa".
Determine the fewest cuts needed for palindrome partitioning of a given string.

For example, minimum 3 cuts are needed for "ababbbabbababa".
The three cuts are "a|babbbab|b|ababa".

1) If a string is palindrome, then minimum 0 cuts are needed.
2) If a string of length n containing all different characters, then minimum n-1 cuts are needed.

========================================
Examples :

Input : str = “geek”
Output : 2
We need to make minimum 2 cuts, i.e., “g ee k”

Input : str = “aaaa”
Output : 0
The string is already a palindrome.

Input : str = “abcde”
Output : 4

Input : str = “abbac”
Output : 1
========================================

This problem is a variation of Matrix Chain Multiplication problem. If the string is a palindrome, 
then we simply return 0. Else, like the Matrix Chain Multiplication problem, we try making cuts at 
all possible places, recursively calculate the cost for each cut and return the minimum value.

Let the given string be str and minPalPartion() be the function that returns the fewest cuts needed 
for palindrome partitioning. following is the optimal substructure property.

Using Recursion
================
// i is the starting index and j is the ending index. i must be passed as 0 and j as n-1
minPalPartion(str, i, j) = 0 if i == j. // When string is of length 1.
minPalPartion(str, i, j) = 0 if str[i..j] is palindrome.

// If none of the above conditions is true, then minPalPartion(str, i, j) can be 
// calculated recursively using the following formula.
minPalPartion(str, i, j) = Min { minPalPartion(str, i, k) + 1 +
                                 minPalPartion(str, k+1, j) } 
                           where k varies from i to j-1
================
 */

function isPalindrome(x: string): boolean {
    return x === x.split('').reverse().join('');
}

function minPalPartionRec(string: string, i: number, j: number): number {
    if (i >= j || isPalindrome(string.substring(i, j + 1))) {
        return 0;
    }
    let ans = Number.POSITIVE_INFINITY;
    for (let k = i; k < j; k++) {
        const count = 1 + minPalPartionRec(string, i, k) + minPalPartionRec(string, k + 1, j);
        ans = Math.min(ans, count);
    }
    return ans;
}

function minPalPartion(m_string: string): number {
    const n = m_string.length;
    const C: number[][] = Array.from({ length: n }, () => Array(n).fill(0));
    const P: boolean[][] = Array.from({ length: n }, () => Array(n).fill(false));

    for (let index = 0; index < n; index++) {
        P[index][index] = true;
        C[index][index] = 0;
    }

    for (let L = 2; L <= n; L++) {
        for (let index = 0; index <= n - L; index++) {
            const j = index + L - 1;
            if (L === 2) {
                P[index][j] = m_string[index] === m_string[j];
            } else {
                P[index][j] = m_string[index] === m_string[j] && P[index + 1][j - 1];
            }

            if (P[index][j]) {
                C[index][j] = 0;
            } else {
                C[index][j] = Number.POSITIVE_INFINITY;
                for (let k = index; k < j; k++) {
                    C[index][j] = Math.min(C[index][j], C[index][k] + C[k + 1][j] + 1);
                }
            }
        }
    }

    return C[0][n - 1];
}

function minPalPartionOptimised(m_string: string): number {
    const n = m_string.length;
    const C: number[] = Array(n).fill(0);
    const P: boolean[][] = Array.from({ length: n }, () => Array(n).fill(false));

    for (let i = 0; i < n; i++) {
        P[i][i] = true;
    }

    for (let L = 2; L <= n; L++) {
        for (let i = 0; i <= n - L; i++) {
            const j = i + L - 1;
            if (L === 2) {
                P[i][j] = m_string[i] === m_string[j];
            } else {
                P[i][j] = m_string[i] === m_string[j] && P[i + 1][j - 1];
            }
        }
    }

    for (let i = 0; i < n; i++) {
        if (P[0][i]) {
            C[i] = 0;
        } else {
            C[i] = Number.POSITIVE_INFINITY;
            for (let j = 0; j < i; j++) {
                if (P[j + 1][i] && 1 + C[j] < C[i]) {
                    C[i] = 1 + C[j];
                }
            }
        }
    }

    return C[n - 1];
}

const string = "ababbbabbababa";

console.log("Min cuts needed for Palindrome Partitioning is", minPalPartionRec(string, 0, string.length - 1));
console.log("Method-1: Min cuts needed for Palindrome Partitioning is", minPalPartion(string));
console.log("Method-2: Min cuts needed for Palindrome Partitioning is", minPalPartionOptimised(string));

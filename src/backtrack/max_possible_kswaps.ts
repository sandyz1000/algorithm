
/* 
Find Maximum number possible by doing at-most K swaps

Given a positive integer, find maximum integer possible by doing at-most K swap operations on
its digits.

Examples:

Input: M = 254, K = 1
Output: 524

Input: M = 254, K = 2
Output: 542

Input: M = 68543, K = 1
Output: 86543

Input: M = 7599, K = 2
Output: 9975

Input: M = 76543, K = 1
Output: 76543

Input: M = 129814999, K = 4
Output: 999984211

Idea is to consider every digit and swap it with digits following it one at a time and see if it
leads to the maximum number. We repeat the process K times. The code can be further optimized if
we swap only if current digit is less than the following digit.

 */

export class Maximum {
    constructor(public val: string) { }
}

/* 
find maximum integer possible by doing at-most K swap operations on its
digits. function to find maximum integer possible by doing at-most K swap operations on its
digits
*/
function findMaximumNum(m_string: string[], k: number, maximum: Maximum): void {
    if (k === 0) {
        return;
    }

    const n = m_string.length;

    for (let i = 0; i < n - 1; i++) {
        for (let j = i + 1; j < n; j++) {
            if (m_string[i] < m_string[j]) {
                [m_string[i], m_string[j]] = [m_string[j], m_string[i]];

                if (m_string.join("") > maximum.val) {
                    maximum.val = m_string.join("");
                }

                findMaximumNum(m_string, k - 1, maximum);

                [m_string[i], m_string[j]] = [m_string[j], m_string[i]];
            }
        }
    }
}

if (require.main === module) {
    // Output: 999984211
    const m_string: string[] = Array.from("129814999");
    const k: number = 4;

    const maximum = new Maximum(m_string.join(""));
    findMaximumNum(m_string, k, maximum);
    console.log(maximum.val);
}


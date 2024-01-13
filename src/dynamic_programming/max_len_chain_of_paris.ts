/* 
You are given n pairs of numbers. In every pair, the first number is always smaller than the
second number. A pair (c, d) can follow another pair (a, b) if b < c. Chain of pairs can be
formed in this fashion. Find the longest chain which can be formed from a given set of pairs.
Source: Amazon Interview | Set 2

For example, if the given pairs are {{5, 24}, {39, 60}, {15, 28}, {27, 40}, {50, 90} }, then the
longest chain that can be formed is of length 3, and the chain is {{5, 24}, {27, 40}, {50, 90}}

This problem is a variation of standard Longest Increasing Subsequence problem. Following is a
simple two step process.

1) Sort given pairs in increasing order of first (or smaller) element.
2) Now run a modified LIS process where we compare the second element of already finalized LIS with
the first element of new LIS being constructed.

 */

export class Pair {
    constructor(public a: number, public b: number) {}
}

function maxChainLength(arr: Pair[]): number {
    const n: number = arr.length;
    let maximum: number = 0;

    // Initialize MCL (maximum chain length) values for all indexes
    const mcl: number[] = new Array(n).fill(1);

    // Compute optimized chain length values in bottom-up manner
    for (let i = 1; i < n; i++) {
        for (let j = 0; j < i; j++) {
            if (arr[i].a > arr[j].b && mcl[i] < mcl[j] + 1) {
                mcl[i] = mcl[j] + 1;
            }
        }
    }

    // mcl[i] now stores the maximum chain length ending with pair i

    // Pick maximum of all MCL values
    for (let i = 0; i < n; i++) {
        if (maximum < mcl[i]) {
            maximum = mcl[i];
        }
    }

    return maximum;
}

// Test case
const arr: Pair[] = [new Pair(5, 24), new Pair(15, 25), new Pair(27, 40), new Pair(50, 60)];
console.log(`Length of maximum size chain is ${maxChainLength(arr)}`);

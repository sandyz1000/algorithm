// """
// http://www.geeksforgeeks.org/palindrome-substring-queries/

// Palindrome Substring Queries
// Given a string and several queries on the substrings of the given input string to check whether the
// substring is a palindrome or not.

// Examples:
// Suppose our input string is "abaaabaaaba" and the queries- [0, 10], [5, 8], [2, 5], [5, 9]

// We have to tell that the substring having the starting and ending indices as above is a palindrome
// or not.

// [0, 10] → Substring is "abaaabaaaba" which is a palindrome.
// [5, 8] → Substring is "baaa" which is not a palindrome.
// [2, 5] → Substring is "aaab" which is not a palindrome.
// [5, 9] → Substring is "baaab" which is a palindrome.

// Let us assume that there are Q such queries to be answered and N be the length of our input string.
// There are the following two ways to answer these queries

// -----------------------------------------------------------
// Explanation:
// -----------------------------------------------------------

// Method 1 (Naive)

// One by one we go through all the substrings of the queries and check whether the substring under
// consideration is a palindrome or not.
// Since there are Q queries and each query can take O(N) worse case time to answer, this method
// takes O(Q.N) time in the worst case. Although this is an in-place/space-efficient algorithm,
// but still there are more efficient method to do this.
// """

export class Query {
    L: number;
    R: number;

    constructor(L: number, R: number) {
        this.L = L;
        this.R = R;
    }
}

const p = 101;
const MOD = 1000000007;

function isPalindrome(mystring: string, L: number, R: number): boolean {
    while (R > L) {
        L++;
        R--;
        if (mystring[L] !== mystring[R]) {
            return false;
        }
    }
    return true;
}

function modPow(base: number, exponent: number): number {
    if (exponent === 0) {
        return 1;
    }
    if (exponent === 1) {
        return base;
    }

    const temp = modPow(base, Math.floor(exponent / 2));
    if (exponent % 2 === 0) {
        return (temp % MOD * temp % MOD) % MOD;
    } else {
        return (((temp % MOD * temp % MOD) % MOD) * base % MOD) % MOD;
    }
}

function findMmi(n: number): number {
    return modPow(n, MOD - 2);
}

function computePrefixHash(mystring: string, n: number, prefix: number[], power: number[]): void {
    prefix[0] = 0;
    prefix[1] = mystring.charCodeAt(0);
    for (let i = 2; i <= n; i++) {
        prefix[i] = (prefix[i - 1] % MOD + (mystring.charCodeAt(i - 1) % MOD * power[i - 1] % MOD) % MOD) % MOD;
    }
}

function computeSuffixHash(mystring: string, n: number, suffix: number[], power: number[]): void {
    suffix[0] = 0;
    suffix[1] = mystring.charCodeAt(n - 1);

    let i = n - 2;
    let j = 2;
    while (i >= 0 && j <= n) {
        suffix[j] = (suffix[j - 1] % MOD + (mystring.charCodeAt(i) % MOD * power[j - 1] % MOD) % MOD) % MOD;
        i--;
        j++;
    }
}

function queryResults(mystring: string, queries: Query[], m: number, n: number, prefix: number[], suffix: number[], power: number[]): void {
    for (let i = 0; i < m; i++) {
        const L = queries[i].L;
        const R = queries[i].R;

        const hashLR = ((prefix[R + 1] - prefix[L] + MOD) % MOD * findMmi(power[L]) % MOD) % MOD;
        const reverseHashLR = ((suffix[n - L] - suffix[n - R - 1] + MOD) % MOD * findMmi(power[n - R - 1]) % MOD) % MOD;

        if (hashLR === reverseHashLR) {
            if (isPalindrome(mystring, L, R)) {
                console.log(`The Substring [${L} ${R}] is a palindrome\n`);
            } else {
                console.log(`The Substring [${L} ${R}] is not a palindrome\n`);
            }
        } else {
            console.log(`The Substring [${L} ${R}] is not a palindrome\n`);
        }
    }
}

function computePowers(power: number[], n: number): void {
    power[0] = 1;

    for (let i = 1; i <= n; i++) {
        power[i] = (power[i - 1] % MOD * p % MOD) % MOD;
    }
}

if (require.main === module) {
    const string = "abaaabaaaba";
    const n = string.length;

    const power = new Array(n + 1).fill(0);

    computePowers(power, n);
    const prefix = new Array(n + 1).fill(0);
    const suffix = new Array(n + 1).fill(0);

    computePrefixHash(string, n, prefix, power);
    computeSuffixHash(string, n, suffix, power);

    const queries = [new Query(0, 10), new Query(5, 8), new Query(2, 5), new Query(5, 9)];
    const m = queries.length;

    queryResults(string, queries, m, n, prefix, suffix, power);
}

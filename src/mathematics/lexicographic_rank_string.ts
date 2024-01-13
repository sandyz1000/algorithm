/* """
Lexicographic rank of a string
Given a string, find its rank among all its permutations sorted lexicographically.
For example, rank of "abc" is 1, rank of "acb" is 2, and rank of "cba" is 6.

Examples:
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Input : str[] = "acb"
Output : Rank = 2

Input : str[] = "string"
Output : Rank = 598

Input : str[] = "cba"
Output : Rank = 6
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

For simplicity, let us assume that the string does not contain any duplicated characters.

One simple solution is to initialize rank as 1, generate all permutations in lexicographic order.
After generating a permutation, check if the generated permutation is same as given string, if
same, then return rank, if not, then increment the rank by 1. The time complexity of this solution
will be exponential in worst case. Following is an efficient solution.

Let the given string be "STRING". In the input string, 'S' is the first character. There are total
6 characters and 4 of them are smaller than 'S'. So there can be 4 * 5! smaller strings where first
character is smaller than 'S', like following

R X X X X X
I X X X X X
N X X X X X
G X X X X X

Now let us Fix S' and find the smaller strings staring with 'S'.

Repeat the same process for T, rank is 4*5! + 4*4! + ....

Now fix T and repeat the same process for R, rank is 4*5! + 4*4! + 3*3! + ...

Now fix R and repeat the same process for I, rank is 4*5! + 4*4! + 3*3! + 1*2! + ....

Now fix I and repeat the same process for N, rank is 4*5! + 4*4! + 3*3! + 1*2! + 1*1! + ...

Now fix N and repeat the same process for G, rank is 4*5! + 4*4 + 3*3! + 1*2! + 1*1! + 0*0!

Rank = 4*5! + 4*4! + 3*3! + 1*2! + 1*1! + 0*0! = 597

Since the value of rank starts from 1, the final rank = 1 + 597 = 598

 */

// The time complexity of the above solution is O(n^2) A utility function to find factorial of n
// # We can reduce the time complexity to O(n) by creating an auxiliary array of size 256.
// # See following code.

// # A O(n) solution for finding rank of string


export class LexicographicRank {
    fact(n: number): number {
        return n <= 1 ? 1 : n * this.fact(n - 1);
    }

    populateAndIncreaseCount(count: number[], mString: string[]): void {
        for (let i = 0; i < mString.length; i++) {
            count[mString[i].charCodeAt(0)] += 1;
        }

        for (let i = 1; i < 256; i++) {
            count[i] += count[i - 1];
        }
    }

    updateCount(count: number[], ch: string): void {
        for (let i = ch.charCodeAt(0); i < MAX_CHAR; i++) {
            count[i] -= 1;
        }
    }

    findRank(mString: string[]): number {
        const length = mString.length;
        let mul = this.fact(length);
        let rank = 1;

        const count: number[] = new Array(MAX_CHAR).fill(0);

        this.populateAndIncreaseCount(count, mString);

        for (let i = 0; i < length; i++) {
            mul /= length - i;

            rank += count[mString[i].charCodeAt(0) - 1] * mul;
            this.updateCount(count, mString[i]);
        }

        return rank;
    }
}

const MAX_CHAR = 256;

function fact(n: number): number {
    let f = 1;
    while (n >= 1) {
        f *= n;
        n = n - 1;
    }
    return f;
}

function findSmallerInRight(st: string[], low: number, high: number): number {
    let countRight = 0;
    let i = low + 1;
    while (i <= high) {
        if (st[i] < st[low]) {
            countRight += 1;
        }
        i += 1;
    }
    return countRight;
}

function findRank(st: string[]): number {
    const ln = st.length;
    let mul = fact(ln);
    let rank = 1;
    let i = 0;

    while (i < ln) {
        mul = mul / (ln - i);

        const countRight = findSmallerInRight(st, i, ln - 1);
        rank = rank + countRight * mul;
        i = i + 1;
    }

    return rank;
}

if (require.main === module) {
    let st: string[] = "string".split("");
    console.log("Method-1:", findRank(st));

    const lexRank = new LexicographicRank();
    console.log("Method-2:", lexRank.findRank(st));
}

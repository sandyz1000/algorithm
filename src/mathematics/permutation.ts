/* """
Write a program to print all permutations of a given string
A permutation, also called an "arrangement number" or "order," is a rearrangement of the
elements of an ordered list S into a one-to-one correspondence with S itself. A string of
length n has n! permutation.
Source: Mathword(http://mathworld.wolfram.com/Permutation.html)

Below are the permutations of string ABC.
ABC ACB BAC BCA CBA CAB


This function takes three parameters:
1. String
2. Starting index of the string
3. Ending index of the string.
Time Complexity: O(n*n!) Note that there are n! permutations and it requires O(n)
time to print a a permutation.

*/

class Permutation {
    static permute(a: string[], l: number, r: number): void {
        if (l === r) {
            console.log(a.join(""));
        } else {
            for (let i = l; i <= r; i++) {
                [a[l], a[i]] = [a[i], a[l]];
                Permutation.permute(a, l + 1, r);
                [a[l], a[i]] = [a[i], a[l]]; // backtrack
            }
        }
    }
}

if (require.main === module) {
    // Test
    const string: string = "ABC";
    const n: number = string.length;
    const a: string[] = Array.from(string);
    Permutation.permute(a, 0, n - 1);
}


class GFG {
    // Function returns approximate value of e^x using sum of first n terms of Taylor Series
    exponential = (n: number, x: number): number => {
        // initialize sum of series
        let summation: number = 1;
        for (let i = n - 1; i > 0; i--) {
            summation = 1 + x * summation / i;
        }

        return summation;
    }
}

if (require.main === module) {

    // Test
    const test = new GFG();
    const n: number = 10;
    const x: number = 1;
    console.log(`e^x = ${test.exponential(n, x)}`);
}

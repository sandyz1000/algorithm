/* """
Print all permutations in sorted (lexicographic) order

http://www.geeksforgeeks.org/lexicographic-permutations-of-string/

Given a string, print all permutations of it in sorted order. For example, if the input string is
"ABC", then output should be "ABC, ACB, BAC, BCA, CAB, CBA".

We have discussed a program to print all permutations in this post, but here we must print the
permutations in increasing order.

Following are the steps to print the permutations lexicographic-ally

1. Sort the given string in non-decreasing order and print it. The first permutation is always
the string sorted in non-decreasing order.

2. Start generating next higher permutation. Do it until next higher permutation is not possible.
If we reach a permutation where all characters are sorted in non-increasing order, then that
permutation is the last permutation.

Steps to generate the next higher permutation:

1. Take the previously printed permutation and find the rightmost character in it, which is
smaller than its next character. Let us call this character as 'first character'.

2. Now find the ceiling of the 'first character'. Ceiling is the smallest character on right of
'first character', which is greater than 'first character'. Let us call the ceil character as
'second character'.

3. Swap the two characters found in above 2 steps.

4. Sort the substring (in non-decreasing order) after the original index of 'first character'.

Let us consider the string "ABCDEF". Let previously printed permutation be "DCFEBA". The next
permutation in sorted order should be "DEABCF". Let us understand above steps to find next
permutation. The 'first character' will be 'C'. The 'second character' will be 'E'. After
swapping these two, we get "DEFCBA". The final step is to sort the substring after the character
original index of 'first character'. Finally, we get "DEABCF". """

# Following function is needed for library function qsort().
# Refer http://www.cplusplus.com/reference/clibrary/cstdlib/qsort/

*/
export class PermutationLexicographic {
    compare(a: string, b: string): number {
        return a.charCodeAt(0) - b.charCodeAt(0);
    }

    findCeil(mString: string[], first: string, l: number, h: number): number {
        let ceilIndex: number = l;
        for (let i = l + 1; i <= h; i++) {
            if (first < mString[i] && mString[i] < mString[ceilIndex]) {
                ceilIndex = i;
            }
        }
        return ceilIndex;
    }

    sortedPermutations(mString: string[]): void {
        const size: number = mString.length;
        mString.sort(this.compare);
        let isFinished: boolean = false;

        while (!isFinished) {
            console.log(mString.join(""));

            let i: number = size - 2;
            while (i >= 0) {
                if (mString[i] < mString[i + 1]) {
                    break;
                }
                i--;
            }

            if (i === -1) {
                isFinished = true;
            } else {
                const ceilIndex: number = this.findCeil(mString, mString[i], i + 1, size - 1);
                [mString[i], mString[ceilIndex]] = [mString[ceilIndex], mString[i]];
                mString = [...mString.slice(0, i + 1), ...mString.slice(i + 1).reverse()];
            }
        }
    }
}

export class PermutationLexicographicOptimized {
    reverse(mString: string[], l: number, h: number): void {
        while (l < h) {
            [mString[l], mString[h]] = [mString[h], mString[l]];
            l++;
            h--;
        }
    }

    findCeil(mString: string[], first: string, l: number, h: number): number {
        let ceilIndex: number = l;
        for (let i = l + 1; i <= h; i++) {
            if (first < mString[i] && mString[i] < mString[ceilIndex]) {
                ceilIndex = i;
            }
        }
        return ceilIndex;
    }

    sortedPermutations(mString: string[]): void {
        const size: number = mString.length;
        mString.sort();
        let isFinished: boolean = false;

        while (!isFinished) {
            console.log(mString.join(""));

            let i: number;
            for (i = size - 2; i >= 0; i--) {
                if (mString[i] < mString[i + 1]) {
                    break;
                }
            }

            if (i === -1) {
                isFinished = true;
            } else {
                const ceilIndex: number = this.findCeil(mString, mString[i], i + 1, size - 1);
                [mString[i], mString[ceilIndex]] = [mString[ceilIndex], mString[i]];
                this.reverse(mString, i + 1, size - 1);
            }
        }
    }
}

if (require.main === module) {
    // Test
    const mString: string = "ABCD";
    const test1: PermutationLexicographic = new PermutationLexicographic();
    console.log("\nMethod-1 - - -\n");
    test1.sortedPermutations([...mString]);
    
    const test2: PermutationLexicographicOptimized = new PermutationLexicographicOptimized();
    console.log("\nMethod-2 - - -\n");
    test2.sortedPermutations([...mString]);
}

/* 

K'th Smallest/Largest Element in Unsorted Array | Set 2 (Expected Linear Time)
We recommend to read following post as a prerequisite of this post.

Given an array and a number k where k is smaller than size of array, we need to find the k'th
smallest element in the given array. It is given that ll array elements are distinct.

------------------------------------------------
Examples:
------------------------------------------------
Input: arr = {7, 10, 4, 3, 20, 15}, k = 3
Output: 7

Input: arr = {7, 10, 4, 3, 20, 15}, k = 4
Output: 10

------------------------------------------------
Explanation:
------------------------------------------------

We already discussed an expected linear time algorithm. In this post, a worst case linear time
method is discussed. The idea in this new method is similar to quickSelect(), we get worst case
linear time by selecting a pivot that divides array in a balanced way (there are not very few
elements on one side and many on other side). After the array is divided in a balanced way,
we apply the same steps as used in quickSelect() to decide whether to go left or right of pivot.
Python implementation of worst case linear time algorithm to find k'th smallest element A simple
function to find median of arr[]. This is called only for an array of size 5 in this program.

Time Complexity:

The worst case time complexity of the above solution is still O(n^2). In worst case,
the randomized function may always pick a corner element. The expected time complexity of above
randomized QuickSelect is Theta(n), see CLRS book or MIT video lecture for proof. The assumption
in the analysis is, random number generator is equally likely to generate any number in the input
range.
 */


export class KthSmallest {
    MAX_VALUE: number;

    constructor() {
        this.MAX_VALUE = Number.MAX_SAFE_INTEGER;
    }

    kth_smallest(arr: number[], l: number, r: number, k: number): number {
        if (0 < k && k <= r - l + 1) {
            const pos = this.random_partition(arr, l, r);

            if (pos - l === k - 1) {
                return arr[pos];
            }

            if (pos - l > k - 1) {
                return this.kth_smallest(arr, l, pos - 1, k);
            }

            return this.kth_smallest(arr, pos + 1, r, k - 1 - (pos - l));
        }

        return this.MAX_VALUE;
    }

    partition(arr: number[], l: number, r: number): number {
        const x = arr[r];
        let i = l;

        for (let j = l; j < r; j++) {
            if (arr[j] <= x) {
                [arr[i], arr[j]] = [arr[j], arr[i]];
                i++;
            }
        }

        [arr[i], arr[r]] = [arr[r], arr[i]];
        return i;
    }

    random_partition(arr: number[], l: number, r: number): number {
        const n = r - l + 1;
        const pivot = Math.floor(Math.random() * n);
        [arr[l + pivot], arr[r]] = [arr[r], arr[l + pivot]];
        return this.partition(arr, l, r);
    }
}

if (require.main === module) {
    // Test
    const ob = new KthSmallest();
    const arr = [12, 3, 5, 7, 4, 19, 26];
    const n = arr.length;
    const k = 3;
    console.log(`K'th smallest element is ${ob.kth_smallest(arr, 0, n - 1, k)}`);
}

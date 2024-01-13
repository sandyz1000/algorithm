/* """
Find k pairs with smallest sums in two arrays

Given two integer arrays arr1[] and arr2[] sorted in ascending order and an integer k.
Find k pairs with smallest sums such that one element of a pair belongs to arr1[] and other
element belongs to arr2[]

Examples:

Input :  arr1 = [1, 7, 11]
         arr2 = [2, 4, 6]
         k = 3
Output : [1, 2],
         [1, 4],
         [1, 6]

Explanation:
The first 3 pairs are returned
from the sequence [1, 2], [1, 4], [1, 6], [7, 2], [7, 4], [11, 2], [7, 6], [11, 4], [11, 6]

We one by one find k smallest sum pairs, starting from least sum pair. The idea is to keep
track of all elements of arr2[] which have been already considered for every element arr1[i1]
so that in an iteration we only consider next element. For this purpose, we use an index
array index2[] to track the indexes of next elements in the other array. It simply means that
which element of second array to be added with the element of first array in each and every
iteration. We increment value in index array for the element that forms next minimum value
pair.

#### Time Complexity : O(k*n1)

Function to find k pairs with least sum such that one element of a pair is from arr1[] and
other element is from arr2[]


*/

export const INT_MAX = Number.MAX_SAFE_INTEGER;

function kSmallestPair(arr1: number[], n1: number, arr2: number[], n2: number, k: number): void {
    if (k > n1 * n2) {
        console.log("k pairs don't exist");
        return;
    }

    // Stores current index in arr2[] for every element of arr1[]
    const index2: number[] = new Array(n1).fill(0);

    while (k > 0) {
        // Initialize current pair sum as infinite
        let minSum = INT_MAX;
        let minIndex = 0;

        // To pick the next pair, traverse all elements of arr1[]
        // For every element, find the corresponding current element in arr2[]
        // and pick the minimum of all formed pairs.
        for (let i1 = 0; i1 < n1; i1++) {
            // Check if the current element of arr1[] plus the element of arr2[] to be used gives the minimum sum
            if (index2[i1] < n2 && arr1[i1] + arr2[index2[i1]] < minSum) {
                minIndex = i1; // Update index that gives the minimum
                minSum = arr1[i1] + arr2[index2[i1]]; // Update minimum sum
            }
        }

        console.log(`(${arr1[minIndex]}, ${arr2[index2[minIndex]]})`);
        index2[minIndex]++;
        k--;
    }
}

// Output
// (1, 2)
// (1, 4)
// (3, 2)
// (3, 4)
if (require.main === module) {
    const arr1: number[] = [1, 3, 11];
    const n1: number = arr1.length;
    const arr2: number[] = [2, 4, 8];
    const n2: number = arr2.length;
    const k: number = 4;
    
    kSmallestPair(arr1, n1, arr2, n2, k);
}

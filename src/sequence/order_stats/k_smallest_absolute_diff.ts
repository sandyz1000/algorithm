/* """
k-th smallest absolute difference of two elements in an array

We are given an array of size n containing positive integers. The absolute difference between
values at indices i and j is |a[i] - a[j]|. There are n*(n-1)/2 such pairs and we are asked to
print the kth (1 <= k <= n*(n-1)/2) smallest absolute difference among all these pairs.

Input  : a = [1, 2, 3, 4], k = 3
Output : 1
The possible absolute differences are : [1, 2, 3, 1, 2, 1]

Explanation: The 3rd smallest value among these is 1.
---------------------------------
Input : n = 2 a = [10, 10] k = 1
Output : 0

## Algorithm: 
Naive Method is to find all the n*(n-1)/2 possible absolute differences in O(n^2) and store
    them in an array. Then sort this array and print the k-th minimum value from this array. This
    will take time O(n^2 + n^2 * log(n^2)) = O(n^2 + 2*n^2*log(n)).

    The naive method won't be efficient for large values of n, say n = 10^5.

    An Efficient Solution is based on Binary Search.
    - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    1) Sort the given array a[].
    2) We can easily find the least possible absolute difference in O(n) after sorting. The
    largest possible difference will be a[n-1] - a[0] after sorting the array. Let low =
    minimum_difference and high = maximum_difference.

    3) while low < high:
    4)     mid = (low + high)/2
    5)     if ((number of pairs with absolute difference <= mid) < k):
    6)        low = mid + 1
    7)     else:
    8)        high = mid
    9) return low

    We need a function that will tell us number of pairs with difference <= mid efficiently.
    Since our array is sorted, this part can be done like this:

    - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    1) result = 0
    2) for i = 0 to n-1:
    3)     result = result + (upper_bound(a+i, a+n, a[i] + mid) - (a+i+1))
    4) return result
    - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    Here upper_bound is a variant of binary search which returns a pointer to the first element
    from a[i] to a[n-1] which is greater than a[i] + mid. Let the pointer returned be j. Then
    a[i] + mid < a[j]. Thus, subtracting (i+1) from this will give us the number of values whose
    difference with a[i] is <= mid. We sum this up for all indices from 0 to n-1 and get the
    answer for current mid.

    --------------------------------
    The Time complexity of the algorithm is O( n*logn + n*logn*logn). Sorting takes O(n*logn).
    After that the main binary search over low and high takes O(n*logn*logn) time because each call
    to the function int f(int c, int n, int* a) takes time O(n*logn).

 */


export class BinarySearch {
    static bisectRight(arr: number[], x: number, lo: number = 0): number {
        let left = lo;
        let right = arr.length;

        while (left < right) {
            const mid = Math.floor((left + right) / 2);
            if (arr[mid] <= x) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }

        return left;
    }
}

function countPairs(a: number[], n: number, mid: number): number {
    let res = 0;

    for (let i = 0; i < n; i++) {
        // Upper bound returns the position of the next higher number
        // than a[i]+mid in a[i..n-1]. We subtract (i + 1) from this position to count.
        res += BinarySearch.bisectRight(a, a[i] + mid, i) - (i + 1);
    }

    return res;
}

// Returns k-th absolute difference
function kthDiff(a: number[], n: number, k: number): number {
    a.sort(); // Sort array

    // Minimum absolute difference can be done in O(n)
    let low = a[1] - a[0];
    for (let i = 1; i < n - 1; i++) {
        low = Math.min(low, a[i + 1] - a[i]);
    }

    // Maximum absolute difference
    let high = a[n - 1] - a[0];

    // Do binary search for k-th absolute difference
    while (low < high) {
        const mid = Math.floor((low + high) / 2);

        // Number of pairs with difference <= mid efficiently
        if (countPairs(a, n, mid) < k) {
            low = mid + 1;
        } else {
            high = mid;
        }
    }

    return low;
}

if (require.main === module) {
    const k = 3;
    const a = [1, 2, 3, 4];
    const n = a.length;
    console.log(kthDiff(a, n, k));
}

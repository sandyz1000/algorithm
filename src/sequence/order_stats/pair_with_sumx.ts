/* """
Given an array A[] and a number x, check for pair in A[] with sum as x

Write a C program that, given an array A[] of n numbers and another number x, determines whether
or not there exist two elements in S whose sum is exactly x.

Example:
Let Array be {1, 4, 45, 6, 10, -8} and sum to find be 16

## METHOD 1 (Use Sorting)

Algorithm:

hasArrayTwoCandidates (A[], ar_size, sum)
1) Sort the array in non-decreasing order.
2) Initialize two index variables to find the candidate elements in the sorted array.
    (a) Initialize first to the leftmost index: l = 0
    (b) Initialize second the rightmost index:  r = ar_size-1
3) Loop while l < r.
    (a) If (A[l] + A[r] == sum)  then return 1
    (b) Else if( A[l] + A[r] <  sum )  then l++
    (c) Else r--
4) No candidates in whole array - return 0

Time Complexity: Depends on what sorting algorithm we use. If we use Merge Sort or Heap Sort
then (-)(nlogn) in worst case. If we use Quick Sort then O(n^2) in worst case.

Auxiliary Space : Again, depends on sorting algorithm. For example auxiliary space is O(n) for
merge sort and O(1) for Heap Sort.

Example:
Let Array be {1, 4, 45, 6, 10, -8} and sum to find be 16

Sort the array
A = {-8, 1, 4, 6, 10, 45}

Initialize l = 0, r = 5
A[l] + A[r] ( -8 + 45) > 16 => decrement r. Now r = 10
A[l] + A[r] ( -8 + 10) < 2 => increment l. Now l = 1
A[l] + A[r] ( 1 + 10) < 16 => increment l. Now l = 2
A[l] + A[r] ( 4 + 10) < 14 => increment l. Now l = 3
A[l] + A[r] ( 6 + 10) == 16 => Found candidates (return 1)

Note: If there are more than one pair having the given sum then this algorithm reports only
one. Can be easily extended for this though.

*/


export class Pair {
    constructor(public minimum: number = 0, public maximum: number = 0) { }
}

function hasArrayTwoCandidates(arr: number[], arrSize: number, summation: number): number {
    // Sort the array
    quickSort(arr, 0, arrSize - 1);
    let l = 0;
    let r = arrSize - 1;

    // Traverse the array for the two elements
    while (l < r) {
        if (arr[l] + arr[r] === summation) {
            return 1;
        } else if (arr[l] + arr[r] < summation) {
            l++;
        } else {
            r--;
        }
    }
    return 0;
}

function quickSort(arr: number[], si: number, ei: number): void {
    if (si < ei) {
        const pi = partition(arr, si, ei);
        quickSort(arr, si, pi - 1);
        quickSort(arr, pi + 1, ei);
    }
}

function partition(A: number[], si: number, ei: number): number {
    const x = A[ei];
    let i = si - 1;
    for (let j = si; j < ei; j++) {
        if (A[j] <= x) {
            i++;
            // Swap two variables in TypeScript
            [A[i], A[j]] = [A[j], A[i]];
        }
    }

    [A[i + 1], A[ei]] = [A[ei], A[i + 1]];
    return i + 1;
}

if (require.main === module) {
    // Test
    const A: number[] = [1, 4, 45, 6, 10, -8];
    const n: number = 16;

    if (hasArrayTwoCandidates(A, A.length, n)) {
        console.log("Array has two elements with the given sum");
    } else {
        console.log("Array doesn't have two elements with the given sum");
    }
}
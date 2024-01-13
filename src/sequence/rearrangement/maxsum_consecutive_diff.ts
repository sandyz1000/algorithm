/* 
Maximize sum of consecutive differences in a circular array
Given an array of n elements. Consider array as circular array i.e element after an is a1. The
task is to find maximum sum of the difference between consecutive elements with rearrangement of
array element allowed i.e after rearrangement of element
find |a1 - a2| + |a2 - a3| + .... + |(an - 1) - an| + |an - a1|.

---------------------------------------
Examples:
---------------------------------------
Input : arr[] = { 4, 2, 1, 8 }
Output : 18
Rearrange given array as : { 1, 8, 2, 4 }
Sum of difference between consecutive element
= |1 - 8| + |8 - 2| + |2 - 4| + |4 - 1|
= 7 + 6 + 2 + 3
= 18.

Input : arr[] = { 10, 12, 15 }
Output : 10

---------------------------------------
Explanation:
---------------------------------------
The idea is to use Greedy Approach and try to bring elements having greater difference closer.
Consider the sorted permutation of the given array a1, a1, a2,..., an - 1, an such that
a(1) < a(2) < a(3).... < a(n - 1) < a(n).
Now, to obtain the answer having maximum sum of difference between consecutive element, arrange
element in following manner:
a(1), a(n), a(2), a(n-1), ... , a(n/2), a(n/2) + 1
We can observe that the arrangement produces the optimal answer, as all a1, a2, a3,...., a(n/2)-1,
a(n/2) are subtracted twice while a(n/2)+1, a(n/2)+2, a(n/2)+3,...., a(n) - 1, an are added twice.

 */



function maxSum(arr: number[]): number {
    const n: number = arr.length;

    // Sorting the array.
    arr.sort((a, b) => a - b);

    let summation: number = 0;

    // Subtracting a1, a2, a3, ..., a(n/2)-1, a(n/2) twice
    // and adding a(n/2)+1, a(n/2)+2, a(n/2)+3, ..., a(n) - 1, an twice.
    for (let i = 0; i < n / 2; i++) {
        summation -= 2 * arr[i];
        summation += 2 * arr[n - i - 1];
    }

    return summation;
}

if (require.main === module) {
    // Example usage
    const arr: number[] = [4, 2, 1, 8];
    console.log(maxSum(arr));
}

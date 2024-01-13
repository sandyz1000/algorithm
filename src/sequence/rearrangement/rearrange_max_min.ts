/* """
Rearrange an array in maximum minimum form | Set 2 (O(1) extra space)
Given a sorted array of positive integers, rearrange the array alternately i.e first element should
be the maximum value, second minimum value, third-second max, fourth-second min and so on.

------------------------------------------------
Examples:
------------------------------------------------
Input  : arr[] = {1, 2, 3, 4, 5, 6, 7}
Output : arr[] = {7, 1, 6, 2, 5, 3, 4}

Input  : arr[] = {1, 2, 3, 4, 5, 6}
Output : arr[] = {6, 1, 5, 2, 4, 3}

------------------------------------------------
Explanation:
------------------------------------------------
In this post a solution that requires O(n) time and O(1) extra space is discussed. The idea is to
use multiplication and modular trick to store two elements at an index.

even index : remaining maximum element.
odd index  : remaining minimum element.

max_index : Index of remaining maximum element (Moves from right to left)
min_index : Index of remaining minimum element (Moves from left to right)

Initialize: max_index = 'n-1'
            min_index = 0
            max_element = arr[max_index] + 1

For i = 0 to n-1
    IF 'i' is even
       arr[i] += arr[max_index] % max_element * max_element
       max_index--
    ELSE # if 'i' is odd
       arr[i] +=  arr[min_index] % max_element * max_element
       min_index++

How does expression "arr[i] += arr[max_index] % max_element * max_element" work ?

The purpose of this expression is to store two elements at index arr[i]. arr[max_index] is stored
as multiplier and "arr[i]" is stored as remainder. For example in {1 2 3 4 5 6 7 8 9}, max_element
is 10 and we store 91 at index 0. With 91, we can get original element as 91%10 and new element as
91/10.

 */

function rearrange(arr: number[]): void {
    const n: number = arr.length;
    // Initialize index of the first minimum and first maximum element
    let maxIdx: number = n - 1;
    let minIdx: number = 0;
    // Store the maximum element of the array
    const maxElem: number = arr[n - 1] + 1;

    // Traverse array elements
    for (let i = 0; i < n; i++) {
        // At even index: put the maximum element
        if (i % 2 === 0) {
            arr[i] += (arr[maxIdx] % maxElem) * maxElem;
            maxIdx -= 1;
        } else {  // At odd index: put the minimum element
            arr[i] += (arr[minIdx] % maxElem) * maxElem;
            minIdx += 1;
        }
    }

    // Restore array elements to their original form
    for (let i = 0; i < n; i++) {
        arr[i] = Math.floor(arr[i] / maxElem);
    }
}

if (require.main === module) {
    // Example usage
    const arr: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    console.log("\nOriginal Array\n", arr);
    rearrange(arr);
    console.log("\nModified Array\n", arr);
}

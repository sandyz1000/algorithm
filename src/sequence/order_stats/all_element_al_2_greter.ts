/* 
Find all elements in array which have at-least two greater elements
Given an array of n distinct elements, the task is to find all elements in array which
have at-least two greater elements than themselves.

Examples:

Input : arr = [2, 8, 7, 1, 5]
Output : 2  1  5
The output three elements have two or more greater elements

Input  : arr = [7, -2, 3, 4, 9, -1]
Output : -2  3  4 -1


# Time Complexity : O(n)
# TS program to find all elements in array which have at-least two greater elements
# itself. 

*/

const INT_MIN: number = Number.MIN_SAFE_INTEGER;

function findElements(arr: number[]): void {
    let first: number = INT_MIN;
    let second: number = INT_MIN;

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] > first) {
            second = first;
            first = arr[i];
        } else if (arr[i] > second) {
            second = arr[i];
        }
    }

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] < second) {
            console.log(arr[i]);
        }
    }
}

if (require.main === module) {
// Example usage
const arr: number[] = [2, -6, 3, 5, 1];
findElements(arr);
}
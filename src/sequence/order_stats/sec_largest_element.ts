/* """
Find Second largest element in an array
Given an array of integers, our task is to write a program that efficiently finds the second largest
element present in the array.

Example:

Input : arr[] = {12, 35, 1, 10, 34, 1}
Output : The second largest element is 34.

Input : arr[] = {10, 5, 10}
Output : The second largest element is 5.

Input : arr[] = {10, 10, 10}
Output : The second largest does not exist.

# Time complexity: O(n)
# Space Complexity: O(n)

 */

export const INT_MIN: number = -9999999;

// Function to print the second largest element
function print2Largest(arr: number[], arrSize: number): void {
    // There should be at least two elements
    if (arrSize < 2) {
        console.log("Invalid Input");
        return;
    }

    let first: number = INT_MIN;
    let second: number = INT_MIN;

    for (let i = 0; i < arrSize; i++) {
        // If the current element is smaller than the first, then update both first and second
        if (arr[i] > first) {
            second = first;
            first = arr[i];
        }
        // If arr[i] is between first and second, then update second
        else if (arr[i] > second && arr[i] !== first) {
            second = arr[i];
        }
    }

    if (second === INT_MIN) {
        console.log("There is no second largest element");
    } else {
        console.log(`The second largest element is ${second}`);
    }
}

if (require.main === module) {
    // Test
    const arr: number[] = [12, 35, 1, 10, 34, 1];
    const n: number = arr.length;
    print2Largest(arr, n);
}

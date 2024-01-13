/* """
Find the largest three elements in an array
Given an array with all distinct elements, find the largest three elements.
Expected time complexity is O(n) and extra space is O(1).

Examples:

Input: arr = [10, 4, 3, 50, 23, 90]
Output: 90, 50, 23

 */

export const INT_MIN = -9999999;

function print2largest(arr: number[], arr_size: number): void {
    // There should be at-least two elements
    if (arr_size < 3) {
        console.log("Invalid Input");
        return;
    }

    let third = INT_MIN;
    let first = INT_MIN;
    let second = INT_MIN;

    for (let i = 0; i < arr_size; i++) {
        // If current element is larger than first
        if (arr[i] > first) {
            third = second;
            second = first;
            first = arr[i];
        }
        // If arr[i] is in between first and second then update second
        else if (arr[i] > second) {
            third = second;
            second = arr[i];
        }
        // If arr[i] is in between second and third then update third
        else if (arr[i] > third) {
            third = arr[i];
        }
    }

    console.log(`Three largest elements are ${first} ${second} ${third}`);
}

if (require.main === module) {
    // Test
    const arr = [12, 13, 1, 10, 34, 1];
    const n = arr.length;
    print2largest(arr, n);
}

/* """
Move all negative elements to end in order with extra space allowed
Given an unsorted array of both negative and positive integer. The task is place all negative
element at the end of array without changing the order of positive element and negative element.

Examples:

Input : arr = [1, -1, 3, 2, -7, -5, 11, 6]
Output : 1  3  2  11  6  -1  -7  -5

Input : arr = [-5, 7, -3, -4, 9, 10, -1, 11]
Output : 7  9  10  11  -5  -3  -4  -1

The problem becomes easier if we are allowed to use extra space. Idea is create an empty array (
temp[]). First we store all positive element of given array and then we store all negative
element of array in Temp[]. Finally we copy temp[] to original array.

 */

function segregateElements(arr: number[]): void {
    const n: number = arr.length;

    // Create an empty array to store the result
    const temp: number[] = Array(n).fill(0);

    // Traverse the array and store positive elements in the temp array
    let j: number = 0;  // index of temp
    for (let i = 0; i < n; i++) {
        if (arr[i] >= 0) {
            temp[j] = arr[i];
            j += 1;
        }
    }

    // If the array contains all positive or all negative elements
    if (j === n || j === 0) {
        return;
    }

    // Store negative elements in the temp array
    for (let i = 0; i < n; i++) {
        if (arr[i] < 0) {
            temp[j] = arr[i];
            j += 1;
        }
    }

    // Copy the contents of temp[] to arr[]
    for (let k = 0; k < n; k++) {
        arr[k] = temp[k];
    }
}
if (require.main === module) {
    // Example usage
    const arr: number[] = [1, -1, -3, -2, 7, 5, 11, 6];
    segregateElements(arr);
    console.log(arr);
}

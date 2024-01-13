
/* Given an array, cyclically rotate the array clockwise by one.

Examples:

Input:  arr[] = {1, 2, 3, 4, 5}
Output: arr[] = {5, 1, 2, 3, 4}

Time Complexity: O(n)
Auxiliary Space: O(1)

 */

function rotate(arr: number[]): void {
    const n: number = arr.length;
    const x: number = arr[n - 1];

    for (let i = n - 1; i > 0; i--) {
        arr[i] = arr[i - 1];
    }

    arr[0] = x;
}


if (require.main === module) {
    // Example usage
    const arr: number[] = [1, 2, 3, 4, 5];
    console.log("Given array is");
    console.log(arr);
    rotate(arr);
    console.log("\nRotated array is");
    console.log(arr);
}
/* Print left rotation of array in O(n) time and O(1) space

Given an array of size n and multiple values around which we need to left rotate the array.
How to quickly find multiple left rotations?

Input : arr = [1, 3, 5, 7, 9], k1 = 4
Output : 9 1 3 5 7

Note that the task to find starting address of rotation takes O(1) time.
It is printing the elements that takes O(n) time.
 */

function preprocess(arr: number[], n: number, temp: number[]): void {
    // Store arr[] elements at i and i + n
    for (let i = 0; i < n; i++) {
        temp[i] = temp[i + n] = arr[i];
    }
}

function leftRotate(n: number, k: number, temp: number[]): void {
    // Starting position of array after k rotations in temp[] will be k % n
    const start = k % n;
    // Print array after k rotations
    console.log(temp.slice(start, start + n));
}

if (require.main === module) {
    // Example usage
    const arr = [1, 3, 5, 7, 9];
    const n = arr.length;
    
    const temp = new Array(2 * n).fill(0);
    preprocess(arr, n, temp);
    
    // [5, 7, 9, 1, 3]
    let k = 2;
    leftRotate(n, k, temp);
    
    // [7, 9, 1, 3, 5]
    k = 3;
    leftRotate(n, k, temp);
    
    // [9, 1, 3, 5, 7]
    k = 4;
    leftRotate(n, k, temp);
}

/*
Program to find largest element in an array
Given an array, find the largest element in it.

Input : arr = [10, 20, 4]
Output : 20

Input : arr = [20, 10, 20, 4, 100]
Output : 100

Time Complexity: O(n)

 */



function largest(arr: number[], n: number): number {
    let maximum = arr[0];  // Initialize maximum element

    // Traverse array elements from second and compare every element with current max
    for (let i = 1; i < n; i++) {
        if (arr[i] > maximum) {
            maximum = arr[i];
        }
    }

    return maximum;
}

if (require.main === module) {
    // Test
    const arr = [10, 324, 45, 90, 9808];
    const n = arr.length;
    console.log(`Largest in given array is ${largest(arr, n)}`);
}

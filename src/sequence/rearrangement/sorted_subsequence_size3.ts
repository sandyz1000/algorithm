/* 
Find a sorted sub-sequence of size 3 in linear time
Given an array of n integers, find the 3 elements such that a[i] < a[j] < a[k] and
i < j < k in 0(n) time. If there are multiple such triplets, then print any one of them.

Examples:
------------
Input:  arr[] = {12, 11, 10, 5, 6, 2, 30}
Output: 5, 6, 30

Input:  arr[] = {1, 2, 3, 4}
Output: 1, 2, 3 OR 1, 2, 4 OR 2, 3, 4

Input:  arr[] = {4, 3, 2, 1}
Output: No such triplet

Solution:
------------
1) Create an auxiliary array smaller[0..n-1]. smaller[i] should store the index of a number which
is smaller than arr[i] and is on left side of arr[i]. smaller[i] should contain -1 if there is no
such element.

2) Create another auxiliary array greater[0..n-1]. greater[i] should store the index of a number
which is greater than arr[i] and is on right side of arr[i]. greater[i] should contain -1 if there
is no such element.

3) Finally traverse both smaller[] and greater[] and find the index i for which both smaller[i]
and greater[i] are not -1.

Time Complexity: O(n)
Auxliary Space: O(n)

 */

export class Find3Numbers {
    find3Numbers(arr: number[]): void {
        const n: number = arr.length;
        let maximum: number = n - 1;  // Index of the maximum element from the right side
        let minimum: number = 0;     // Index of the minimum element from the left side

        // Create an array that will store the index of a smaller element on the left side.
        // If there is no smaller element on the left side, then smaller[i] will be -1.
        const smaller: number[] = new Array<number>(10000);
        smaller[0] = -1;
        for (let i = 1; i < n; i++) {
            if (arr[i] <= arr[minimum]) {
                minimum = i;
                smaller[i] = -1;
            } else {
                smaller[i] = minimum;
            }
        }

        // Create another array that will store the index of a greater element on the right side.
        // If there is no greater element on the right side, then greater[i] will be -1.
        const greater: number[] = new Array<number>(10000);
        greater[n - 1] = -1;

        for (let i = n - 2; i >= 0; i--) {
            if (arr[i] >= arr[maximum]) {
                maximum = i;
                greater[i] = -1;
            } else {
                greater[i] = maximum;
            }
        }

        // Now find a number which has both a greater number on the right side and a smaller number on the left side
        for (let i = 0; i < n; i++) {
            if (smaller[i] !== -1 && greater[i] !== -1) {
                console.log(arr[smaller[i]], arr[i], arr[greater[i]]);
                return;
            }
        }

        // If we reach here, then there are no such 3 numbers
        console.log("No triplet found");
        return;
    }
}




if (require.main === module) {
    // Example usage:
    const find3Numbers = new Find3Numbers();
    const arr: number[] = [12, 11, 10, 5, 6, 2, 30];
    find3Numbers.find3Numbers(arr);    
}
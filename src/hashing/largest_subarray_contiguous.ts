/* Length of the largest subarray with contiguous elements | Set 1
Given an array of distinct integers, find length of the longest subarray which contains numbers
that can be arranged in a continuous sequence.

==Examples:==
- - - - - - - - - - - - - - - - - - - - - - - - - - - - +
Input:  arr[] = {10, 12, 11};
Output: Length of the longest contiguous subarray is 3

Input:  arr[] = {14, 12, 11, 20};
Output: Length of the longest contiguous subarray is 2

Input:  arr[] = {1, 56, 58, 57, 90, 92, 94, 93, 91, 45};
Output: Length of the longest contiguous subarray is 5
- - - - - - - - - - - - - - - - - - - - - - - - - - - - +

==Method-1==

The important thing to note in question is, it is given that all elements are distinct. If all
elements are distinct, then a subarray has contiguous elements if and only if the difference
between maximum and minimum elements in subarray is equal to the difference between last and
first indexes of subarray. So the idea is to keep track of minimum and maximum element in every
subarray.

Time Complexity of the above solution is O(n^2).

==Method-2==

The idea is similar to previous post. In the previous post, we checked whether maximum value
minus minimum value is equal to ending index minus starting index or not. Since duplicate
elements are allowed, we also need to check if the subarray contains duplicate elements or not.
For example, the array {12, 14, 12} follows the first property, but numbers in it are not
contiguous elements.

To check duplicate elements in a subarray, we create a hash set for every subarray and if we
find an element already in hash, we don't consider the current subarray.

Time complexity of the above solution is O(n^2) under the assumption that hash set
operations like add() and contains() work in O(1) time
 */

export class LargestLengthSubArray {
    static findLength(arr: number[], n: number): number {
        let maxLen = 1; // Initialize result
        for (let i = 0; i < n - 1; i++) {
            // Initialize min and max for all subarrays starting with i
            let mn = arr[i];
            let mx = arr[i];

            // Consider all sub-arrays starting with i and ending with j
            for (let j = i + 1; j < n; j++) {
                // Update min and max in this subarray if needed
                mn = Math.min(mn, arr[j]);
                mx = Math.max(mx, arr[j]);

                // If current sub-array has all contiguous elements
                if (mx - mn === j - i) {
                    maxLen = Math.max(maxLen, mx - mn + 1);
                }
            }
        }
        return maxLen; // Return result
    }
}

export class LargestLengthSubArrayDuplicate {
    static findLength(arr: number[], n: number): number {
        let maxLen = 1; // Initialize result
        // One by one fix the starting points
        for (let i = 0; i < n - 1; i++) {
            // Create an empty hash set and add i'th element to it.
            const setter: Set<number> = new Set();
            setter.add(arr[i]);

            // Initialize max and min in the current sub-array
            let mn = arr[i];
            let mx = arr[i];

            // One by one fix ending points
            for (let j = i + 1; j < n; j++) {
                // If the current element is already in the hash set, then this subarray cannot
                // contain contiguous elements
                if (setter.has(arr[j])) {
                    break;
                }

                // Else add the current element to the hash set and update min, max if required.
                setter.add(arr[j]);
                mn = Math.min(mn, arr[j]);
                mx = Math.max(mx, arr[j]);

                // We have already checked for duplicates, now check for other property and
                // update maxLen if needed
                if (mx - mn === j - i) {
                    maxLen = Math.max(maxLen, mx - mn + 1);
                }
            }
        }
        return maxLen; // Return result
    }
}

if (require.main === module) {
    // Output: Length of the longest contiguous subarray is 5
    console.log("\nMethod-1:  ");
    // const arr1 = [1, 56, 58, 57, 90, 92, 94, 93, 91, 45];
    // const arr1 = [14, 12, 11, 20];
    const arr1 = [1, 2, 3, 4, 5, 2, 6, 7, 5, 8];
    const n1 = arr1.length;
    console.log("Length of the longest contiguous subarray is ", LargestLengthSubArray.findLength(arr1, n1));
    
    // console.log("\nMethod-2:  ");
    // const test2 = new LargestLengthSubArrayDuplicate();
    // // Output: Length of the longest contiguous subarray is 2
    // const arr2 = [10, 12, 12, 10, 10, 11, 10];
    // const n2 = arr2.length;
    // console.log("Length of the longest contiguous subarray is", test2.findLength(arr2, n2));
}

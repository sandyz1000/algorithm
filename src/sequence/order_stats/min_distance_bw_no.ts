/* 
Find the minimum distance between two numbers

Given an unsorted array arr[] and two numbers x and y, find the minimum distance between x and y
in arr[]. The array might also contain duplicates. You may assume that both x and y are different
and present in arr[].

---------------------------------------------
Examples:
---------------------------------------------

Input: arr = [1, 2], x = 1, y = 2
Output: Minimum distance between 1 and 2 is 1.

Input: arr = [3, 4, 5], x = 3, y = 5
Output: Minimum distance between 3 and 5 is 2.

Input: arr = [3, 5, 4, 2, 6, 5, 6, 6, 5, 4, 8, 3], x = 3, y = 6
Output: Minimum distance between 3 and 6 is 4.

Input: arr = [2, 5, 3, 5, 4, 4, 2, 3], x = 3, y = 2
Output: Minimum distance between 3 and 2 is 1.

# ---------------------------------------------
# Method 2 (Tricky)
# ---------------------------------------------
# 1) Traverse array from left side and stop if either x or y is found. Store index of this first
# occurrence in a variable say prev
# 2) Now traverse arr[] after the index prev. If the element at current index i matches with either
# x or y then check if it is different from arr[prev]. If it is different then update the minimum
# distance if needed. If it is same then update prev i.e., make prev = i.

# Time Complexity: O(n)

 */

function minDist(arr: number[], x: number, y: number): number {
    let i = 0;
    let minDist = Number.MAX_SAFE_INTEGER;
    let prev = 0;

    // Find the first occurrence of any of the two numbers (x or y) and store the index of this
    // occurrence in prev
    for (i = 0; i < arr.length; i++) {
        if (arr[i] === x || arr[i] === y) {
            prev = i;
            break;
        }
    }

    // Traverse after the first occurrence
    for (i = prev; i < arr.length; i++) {
        if (arr[i] === x || arr[i] === y) {
            // If the current element matches with any of the two then check if the current element and
            // prev element are different. Also, check if this value is smaller than the minimum distance
            // so far.
            if (arr[prev] !== arr[i] && (i - prev) < minDist) {
                minDist = i - prev;
            }
            prev = i;
        }
    }

    return minDist;
}

if (require.main === module) {
    // Test
    const arr = [3, 5, 4, 2, 6, 3, 0, 0, 5, 4, 8, 3];
    const x = 3, y = 6;
    console.log(`Minimum distance between ${x} and ${y} is ${minDist(arr, x, y)}`);
}

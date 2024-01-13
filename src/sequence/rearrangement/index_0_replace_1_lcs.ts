/* """
Find Index of 0 to be replaced with 1 to get longest continuous sequence of 1s in a binary array

Given an array of 0s and 1s, find the position of 0 to be replaced with 1 to get longest continuous
sequence of 1s. Expected time complexity is O(n) and auxiliary space is O(1).

---------------------------------------------------
Example:
---------------------------------------------------
Input:
   arr[] =  {1, 1, 0, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1}
Output:
  Index 9
Assuming array index starts from 0, replacing 0 with 1 at index 9 causes
the maximum continuous sequence of 1s.

Input:
   arr[] =  {1, 1, 1, 1, 0}
Output:
  Index 4

-----------------------------------------------
Explanation:
-----------------------------------------------
A Simple Solution is to traverse the array, for every 0, count the number of 1s on both sides of
it. Keep track of maximum count for any 0. Finally return index of the 0 with maximum number of 1s
around it. The time complexity of this solution is O(n2).

Using an Efficient Solution, the problem can solved in O(n) time. The idea is to keep track of
three indexes, current index (curr), previous zero index (prev_zero) and previous to previous zero
index (prev_prev_zero). Traverse the array, if current element is 0, calculate the difference
between curr and prev_prev_zero (This difference minus one is the number of 1s around the
prev_zero). If the difference between curr and prev_prev_zero is more than maximum so far, then
update the maximum. Finally return index of the prev_zero with maximum difference.

Time Complexity: O(n)
Auxiliary Space: O(1)

 */


function maxOnesIndex(arr: number[]): number {
    let maxCount = 0;  // for maximum number of 1 around a zero
    let maxIndex = 0;  // for storing result
    let prevZero = -1;  // index of previous zero
    let prevPrevZero = -1;  // index of previous to previous zero

    // Traverse the input array
    for (let curr = 0; curr < arr.length; curr++) {
        // If current element is 0, then calculate the difference between curr and prevPrevZero
        if (arr[curr] === 0) {
            // Update result if count of 1s around prevZero is more
            if (curr - prevPrevZero > maxCount) {
                maxCount = curr - prevPrevZero;
                maxIndex = prevZero;
            }

            // Update for next iteration
            prevPrevZero = prevZero;
            prevZero = curr;
        }
    }

    // Check for the last encountered zero
    if (arr.length - prevPrevZero > maxCount) {
        maxIndex = prevZero;
    }

    return maxIndex;
}

if (require.main === module) {
    // Example usage
    const arr: number[] = [1, 1, 1, 1, 0];
    // Index of 0 to be replaced is 3
    console.log("Index of 0 to be replaced is", maxOnesIndex(arr));
}

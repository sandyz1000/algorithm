/* """
Maximum Product Subarray
Given an array that contains both positive and negative integers, find the product of the maximum
product subarray. Expected Time complexity is O(n) and only O(1) extra space can be used.

------------------------------------
Examples:
------------------------------------
Input: arr[] = {6, -3, -10, 0, 2}
Output:   180   The subarray is {6, -3, -10}

Input: arr[] = {-1, -3, -10, 0, 60}
Output:   60   The subarray is {60}

Input: arr[] = {-2, -3, 0, -2, -40}
Output:   80  The subarray is {-2, -40}


Explanation:
------------
The following solution assumes that the given input array always has a positive output. The
solution works for all cases mentioned above. It doesn't work for arrays like {0, 0, -20, 0},
{0, 0, 0}.. etc. The solution can be easily modified to handle this case.

It is similar to Largest Sum Contiguous Subarray problem. The only thing to note here is,
maximum product can also be obtained by minimum (negative) product ending with the previous
element multiplied by current element.
For example, in array {12, 2, -3, -5, -6, -2}, when we are at element -2, the maximum product
is multiplication of, minimum product ending with -6 and -2.

Time Complexity: O(n)
Auxiliary Space: O(1)

Returns the product of max product subarray.
Assumes that the given array always has a subarray with product more than 1

 */


function maxSubarrayProduct(arr: number[]): number {
    let n: number = arr.length;

    // max positive product ending at the current position
    let maxEndingHere: number = 1;

    // min positive product ending at the current position
    let minEndingHere: number = 1;

    // Initialize maximum so far
    let maxSoFar: number = 1;

    // Traverse throughout the array. Following values are maintained after the ith iteration:
    // maxEndingHere is always 1 or some positive product ending with arr[i]
    // minEndingHere is always 1 or some negative product ending with arr[i]
    for (let i = 0; i < n; i++) {
        // If this element is positive, update maxEndingHere.
        // Update minEndingHere only if minEndingHere is negative
        if (arr[i] > 0) {
            maxEndingHere = maxEndingHere * arr[i];
            minEndingHere = Math.min(minEndingHere * arr[i], 1);
        }
        // If this element is 0, then the maximum product cannot end here, make both
        // maxEndingHere and minEndingHere 0
        // Assumption: Output is always greater than or equal to 1.
        else if (arr[i] === 0) {
            maxEndingHere = 1;
            minEndingHere = 1;
        }
        // If element is negative. This is tricky maxEndingHere can either be 1 or positive.
        // minEndingHere can either be 1 or negative. next minEndingHere will always be prev.
        // maxEndingHere * arr[i] next maxEndingHere will be 1 if prev minEndingHere is 1,
        // otherwise next maxEndingHere will be prev minEndingHere * arr[i]
        else {
            let temp: number = maxEndingHere;
            maxEndingHere = Math.max(minEndingHere * arr[i], 1);
            minEndingHere = temp * arr[i];
        }

        if (maxSoFar < maxEndingHere) {
            maxSoFar = maxEndingHere;
        }
    }

    return maxSoFar;
}

if (require.main === module) {
    // Example usage
    const arr: number[] = [1, -2, -3, 0, 7, -8, -2];
    console.log("Maximum product subarray is", maxSubarrayProduct(arr));

}    

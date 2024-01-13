/* """
Largest Sum Contiguous Subarray
Write an efficient program to find the sum of contiguous subarray within a one-dimensional
array of numbers which has the largest sum.

Kadane's Algorithm Explanation:
Simple idea of the Kadane's algorithm is to look for all positive contiguous
segments of the array (max_ending_here is used for this). And keep track of maximum sum
contiguous segment among all positive segments (max_so_far is used for this). Each time we get a
positive sum compare it with max_so_far and update max_so_far if it is greater than max_so_far

Lets take the example:

         -------------------
{-2, -3, | 4, -1, -2, 1, 5 | , -3}
         -------------------

max_so_far = max_ending_here = 0

for i=0,  a[0] =  -2
max_ending_here = max_ending_here + (-2)
Set max_ending_here = 0 because max_ending_here < 0

for i=1,  a[1] =  -3
max_ending_here = max_ending_here + (-3)
Set max_ending_here = 0 because max_ending_here < 0

for i=2,  a[2] =  4
max_ending_here = max_ending_here + (4)
max_ending_here = 4
max_so_far = 4 because max_ending_here greater
than max_so_far which was 0 till now

for i=3,  a[3] =  -1
max_ending_here = max_ending_here + (-1)
max_ending_here = 3

for i=4,  a[4] =  -2
max_ending_here = max_ending_here + (-2)
max_ending_here = 1

for i=5,  a[5] =  1
max_ending_here = max_ending_here + (1)
max_ending_here = 2

for i=6,  a[6] =  5
max_ending_here = max_ending_here + (5)
max_ending_here = 7
max_so_far = 7 because max_ending_here is
greater than max_so_far

for i=7,  a[7] =  -3
max_ending_here = max_ending_here + (-3)
max_ending_here = 4
 */

function maxSubArraySumV1(a: number[]): number {
    let maxSoFar: number = -Number.MAX_SAFE_INTEGER - 1;
    let maxEndingHere: number = 0;

    for (let i = 0; i < a.length; i++) {
        maxEndingHere += a[i];
        maxSoFar = Math.max(maxEndingHere, maxSoFar);
        maxEndingHere = Math.max(0, maxEndingHere);
    }

    return maxSoFar;
}

function maxSubArraySumDP(a: number[]): number {
    let maxSoFar: number = a[0];
    let currMax: number = a[0];

    for (let i = 1; i < a.length; i++) {
        currMax = Math.max(a[i], currMax + a[i]);
        maxSoFar = Math.max(maxSoFar, currMax);
    }

    return maxSoFar;
}

function maxSubArraySum(a: number[]): void {
    let maxSoFar: number = -Number.MAX_SAFE_INTEGER - 1;
    let maxEndingHere: number = 0;
    let start: number = 0;
    let end: number = 0;
    let s: number = 0;

    for (let i = 0; i < a.length; i++) {
        maxEndingHere += a[i];
        if (maxSoFar < maxEndingHere) {
            maxSoFar = maxEndingHere;
            start = s;
            end = i;
        }
        if (maxEndingHere < 0) {
            maxEndingHere = 0;
            s = i + 1;
        }
    }

    console.log("Maximum contiguous sum is", maxSoFar);
    console.log("Starting Index", start);
    console.log("Ending Index", end);
}

if (require.main === module) {
    // Example usage
    const arr: number[] = [-2, -3, 4, -1, -2, 1, 5, -3];
    console.log("Maximum contiguous sum is", maxSubArraySumV1(arr));
    console.log("Maximum contiguous sum is", maxSubArraySumDP(arr));
    maxSubArraySum(arr);
}

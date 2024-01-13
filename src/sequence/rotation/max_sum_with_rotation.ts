
/* Problem 1:
Find maximum value of Sum( i*arr[i]) with only rotations on given array allowed

Given an array, only rotation operation is allowed on array. We can rotate the array as many times
as we want. Return the maximum possible of summation of i*arr[i].

Examples:

Input: arr[] = {1, 20, 2, 10}
Output: 72
We can get 72 by rotating array twice.
{2, 10, 1, 20}
20*3 + 1*2 + 10*1 + 2*0 = 72

Input: arr[] = {10, 1, 2, 3, 4, 5, 6, 7, 8, 9};
Output: 330
We can 330 by rotating array 9 times.
{1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
0*1 + 1*2 + 2*3 ... 9*10 = 330

Problem 2:

Given an array arr[] of n integers, find the maximum that maximizes sum of value of i*arr[i]
where i varies from 0 to n-1.

Algorithm:
The idea is to compute value of a rotation using value of previous rotation. When we rotate an
array by one, following changes happen in sum of i*arr[i].
1)  Multiplier of arr[i-1] changes from 0 to n-1, i.e., arr[i-1] * (n-1) is added to current
    value.

2)  Multipliers of other terms is decremented by 1. i.e., (cum_sum - arr[i-1]) is subtracted from
    current value where cum_sum is sum of all numbers.

Examples:

Input : arr[] = {8, 3, 1, 2}
Output : 29
Explanation : Let us see all rotations
{8, 3, 1, 2} = 8*0 + 3*1 + 1*2 + 2*3 = 11
{3, 1, 2, 8} = 3*0 + 1*1 + 2*2 + 8*3 = 29
{1, 2, 8, 3} = 1*0 + 2*1 + 8*2 + 3*3 = 27
{2, 8, 3, 1} = 2*0 + 8*1 + 3*2 + 1*1 = 17

Input : arr[] = {3, 2, 1}
Output : 8
 
## Method-1:
    A Simple Solution is to find all rotations one by one, check sum of every rotation and return
    the maximum sum. Time complexity of this solution is O(n^2).

    We can solve this problem in O(n) time using an Efficient Solution.

    Let Rj be value of i*arr[i] with j rotations. The idea is to calculate next rotation value
    from previous rotation, i.e., calculate Rj from Rj-1. We can calculate initial value of
    result as R0, then keep calculating next rotation values.

    How to efficiently calculate Rj from Rj-1?
    This can be done in O(1) time. Below are details.

    Let us calculate initial value of i*arr[i] with no rotation
    R0 = 0*arr[0] + 1*arr[1] +...+ (n-1)*arr[n-1]

    After 1 rotation arr[n-1], becomes first element of array, arr[0] becomes second element,
    arr[1] becomes third element and so on.

    R1 = 0*arr[n-1] + 1*arr[0] +...+ (n-1)*arr[n-2]
    R1 - R0 = arr[0] + arr[1] + ... + arr[n-2] - (n-1)*arr[n-1]

    After 2 rotations arr[n-2], becomes first element of previous array, arr[n-1] becomes
    second element, arr[0] becomes third element and so on.

    R2 = 0*arr[n-2] + 1*arr[n-1] +...+ (n-1)*arr[n-3]
    R2 - R1 = arr[0] + arr[1] + ... + arr[n-3] - (n-1)*arr[n-2] + arr[n-1]

    If we take a closer look at above values, we can observe below pattern

    Rj - Rj-1 = arrSum - n * arr[n-j]

    Where arrSum is sum of all array elements, i.e.,

    arrSum = sum( arr[i] )
            i<=0<=n-1

    Python program to find maximum value of Sum(i*arr[i])
    Time Complexity: O(n)
    Auxiliary Space: O(1)


*/


function maxSumP1(arr: number[]): number {
    let arrSum = 0;
    let currVal = 0;
    const n = arr.length;

    for (let i = 0; i < n; i++) {
        arrSum += arr[i];
        currVal += i * arr[i];
    }

    let maxVal = currVal;

    for (let j = 1; j < n; j++) {
        currVal = currVal + arrSum - n * arr[n - j];

        if (currVal > maxVal) {
            maxVal = currVal;
        }
    }

    return maxVal;
}

function maxSumP2(arr: number[]): number {
    const n = arr.length;
    const cumSum = arr.reduce((sum, val) => sum + val, 0);
    let currVal = 0;

    for (let i = 0; i < n; i++) {
        currVal += i * arr[i];
    }

    let res = currVal;

    for (let i = 1; i < n; i++) {
        const nextVal = currVal - (cumSum - arr[i - 1]) + arr[i - 1] * (n - 1);
        currVal = nextVal;
        res = Math.max(res, nextVal);
    }

    return res;
}

if (require.main === module) {
    // Example usage
    // Problem: 1  Max sum is:  330
    const arr1 = [10, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    console.log("Max sum is: ", maxSumP1(arr1));
    
    // Problem: 2  Max sum is:  29
    const arr2 = [8, 3, 1, 2];
    console.log("Max sum is: ", maxSumP2(arr2));
}

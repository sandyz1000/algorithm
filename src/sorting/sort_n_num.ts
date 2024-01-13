/* """
Sort n numbers in range from 0 to n^2 - 1 in linear time

Given an array of numbers of size n. It is also given that the array elements are in range from 0
to n^2 - 1. Sort the given array in linear time.

---------------------------------------------
Examples:
---------------------------------------------
Since there are 5 elements, the elements can be from 0 to 24.
Input: arr = [0, 23, 14, 12, 9]
Output: arr = [0, 9, 12, 14, 23]

Since there are 3 elements, the elements can be from 0 to 8.
Input: arr = [7, 0, 2]
Output: arr = [0, 2, 7]

---------------------------------------------
Solution:
---------------------------------------------

If we use Counting Sort, it would take O(n^2) time as the given range is of size n^2. Using any
comparison based sorting like Merge Sort, Heap Sort, .. etc would take O(nLogn) time.

Now question arises how to do this in 0(n)? Firstly, is it possible? Can we use data given in
question? n numbers in range from 0 to n^2 - 1?
The idea is to use Radix Sort. Following is standard Radix Sort algorithm.

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
1)  Do following for each digit i where i varies from least significant digit to the most
    significant digit.
    a) Sort input array using counting sort (or any stable sort) according to the i'th digit
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

Let there be d digits in input integers. Radix Sort takes O(d*(n+b)) time where b is the base for
representing numbers, for example, for decimal system, b is 10. Since n^2-1 is the maximum
possible value, the value of d would be O(logb(n)). So overall time complexity is O((n+b)*O(logb(
n)). Which looks more than the time complexity of comparison based sorting algorithms for a large
k. The idea is to change base b. If we set b as n, the value of O(logb(n)) becomes O(1) and
overall time complexity becomes O(n).

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
arr[] = {0, 10, 13, 12, 7}

Let us consider the elements in base 5. For example 13 in base 5 is 23, and 7 in base 5 is 12.
arr[] = {00(0), 20(10), 23(13), 22(12), 12(7)}

After first iteration (Sorting according to the last digit in base 5),  we get.
arr[] = {00(0), 20(10), 12(7), 22(12), 23(13)}

After second iteration, we get
arr[] = {00(0), 12(7), 20(10), 22(12), 23(13)}
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

 */

function countSort(arr: number[], n: number, exp: number): void {
    const output: number[] = new Array(n).fill(0);
    const count: number[] = new Array(n).fill(0);

    // Store count of occurrences in count[]
    for (let i = 0; i < n; i++) {
        count[Math.floor(arr[i] / exp) % n]++;
    }

    // Change count[i] so that count[i] now contains actual position of this digit in output[]
    for (let i = 1; i < n; i++) {
        count[i] += count[i - 1];
    }

    // Build the output array
    for (let i = n - 1; i >= 0; i--) {
        output[count[Math.floor(arr[i] / exp) % n] - 1] = arr[i];
        count[Math.floor(arr[i] / exp) % n]--;
    }

    // Copy the output array to arr[], so that arr[] now contains sorted numbers according to current digit
    for (let i = 0; i < n; i++) {
        arr[i] = output[i];
    }
}

function radixSort(arr: number[], n: number): void {
    // Do counting sort for first digit in base n. Note that
    // instead of passing digit number, exp (n^0 = 0) is passed.
    countSort(arr, n, 1);

    // Do counting sort for second digit in base n. Note that
    // instead of passing digit number, exp (n^1 = n) is passed.
    countSort(arr, n, n);
}

if (require.main === module) {
    // Since array size is 7, elements should be from 0 to 48
    const arr = [40, 12, 45, 32, 33, 1, 22];
    const n = arr.length;

    console.log("Given array is");
    console.log(arr);

    radixSort(arr, n);

    console.log("Sorted array is");
    console.log(arr);
}

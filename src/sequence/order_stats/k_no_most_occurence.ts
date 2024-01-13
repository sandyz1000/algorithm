/* 
Find k numbers with most occurrences in the given array
Given an array of n numbers and a positive integer k. The problem is to find k numbers with most
occurrences, i.e., the top k numbers having the maximum frequency. If two numbers have same
frequency then the larger number should be given preference. The numbers should be displayed in
decreasing order of their frequencies. It is assumed that the array consists of k numbers with most
occurrences.

Examples:
--------
Input : arr = [3, 1, 4, 4, 5, 2, 6, 1], k = 2
Output : 4 1
Frequency of 4 = 2
Frequency of 1 = 2
These two have the maximum frequency and 4 is larger than 1.
--------------------------------------------------------
Input : arr = [7, 10, 11, 5, 2, 5, 5, 7, 11, 8, 9], k = 4
Output : 5 11 7 10


## Method 1:

Using hash table, we create a frequency table which stores the frequency of occurrence of
each number in the given array. In the hash table we define (x, y) tuple, where x is the key(
number) and y is its frequency in the array. Now we traverse this hash table and create an
array freq_arr[] which stores these (number, frequency) tuples. Sort this freq_arr[] on the
basis of the conditions defined in the problem statement. Now, print the first k numbers of
this freq_arr[].

function to print the k numbers with most occurrences

Time Complexity: O(klogd) for sorting, where d is the count of distinct elements in the array.
Auxiliary Space: O(d), where d is the count of distinct elements in the array.

 */

export class Pair {
    constructor(public first: number, public second: number) { }
}

function nMostFrequentNumber(arr: number[], n: number, k: number): void {
    // Map 'um' implemented as a frequency hash table
    const um = new Map<number, number>();

    for (let i = 0; i < n; i++) {
        um.set(arr[i], (um.get(arr[i]) || 0) + 1);
    }

    // Store the elements of 'um' in the array 'freqArr'
    const freqArr: Pair[] = Array.from(um.entries()).map(([key, value]) => new Pair(key, value));

    // Sort the array 'freqArr' based on the 'compare' function
    // If frequencies of two elements are the same, then the larger number should come first
    // Sort on the basis of decreasing order of frequencies
    freqArr.sort((p1, p2) =>
        p1.second === p2.second ? p2.first - p1.first : p2.second - p1.second
    );

    // Display the top k numbers
    console.log(`${k} numbers with most occurrences are:`);

    for (let i = 0; i < k; i++) {
        console.log(freqArr[i].first);
    }
}

if (require.main === module) {
    const arr: number[] = [3, 1, 4, 4, 5, 2, 6, 1];
    const n: number = arr.length;
    const k: number = 2;

    nMostFrequentNumber(arr, n, k);
}

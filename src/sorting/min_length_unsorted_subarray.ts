/* 
Find the Minimum length Unsorted Subarray, sorting which makes the complete array sorted
Given an unsorted array arr[0..n-1] of size n, find the minimum length subarray arr[s..e] such that 
sorting this subarray makes the whole array sorted.

---------------------------------
Examples:
---------------------------------
1) If the input array is [10, 12, 20, 30, 25, 40, 32, 31, 35, 50, 60], your program should be able 
to find that the subarray lies between the indexes 3 and 8.
2) If the input array is [0, 1, 15, 25, 6, 7, 30, 40, 50], your program should be able to find that 
the subarray lies between the indexes 2 and 5.

## Time Complexity: O(n)
*/



function printUnsorted(arr: number[], n: number): void {
    let s: number = 0;
    let e: number = n - 1;
    let i: number = 0;

    // Step 1(a) of the above algorithm
    for (s = 0; s < n - 1; s++) {
        if (arr[s] > arr[s + 1]) {
            break;
        }
    }

    if (s === n - 1) {
        console.log("The complete array is sorted");
        return;
    }

    // Step 1(b) of the above algorithm
    for (e = n - 1; e > 0; e--) {
        if (arr[e] < arr[e - 1]) {
            break;
        }
    }

    // Step 2(a) of the above algorithm
    let maximum: number = arr[s];
    let minimum: number = arr[s];
    for (i = s + 1; i <= e; i++) {
        if (arr[i] > maximum) {
            maximum = arr[i];
        }

        if (arr[i] < minimum) {
            minimum = arr[i];
        }
    }

    // Step 2(b) of the above algorithm
    for (i = s; i > 0; i--) {
        if (arr[i] > minimum) {
            s = i;
            break;
        }
    }

    // Step 2(c) of the above algorithm
    for (i = n - 1; i >= e + 2; i--) {
        if (arr[i] < maximum) {
            e = i;
            break;
        }
    }

    // Step 3 of the above algorithm
    console.log(`The unsorted subarray which makes the given array sorted lies between the indexes ${s} and ${e}`);
}

if (require.main === module) {
    const arr: number[] = [10, 12, 20, 30, 25, 40, 32, 31, 35, 50, 60];
    const arrSize: number = arr.length;
    printUnsorted(arr, arrSize);
}

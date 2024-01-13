/* 
Find the smallest missing number
Given a sorted array of n distinct integers where each integer is in the range from 0
to m-1 and m > n. Find the smallest number that is missing from the array.

Examples
Input: [0, 1, 2, 6, 9], n = 5, m = 10
Output: 3

Input: [4, 5, 10, 11], n = 4, m = 12
Output: 0

Input: [0, 1, 2, 3], n = 4, m = 5
Output: 4

Input: [0, 1, 2, 3, 4, 5, 6, 7, 10], n = 9, m = 11
Output: 8

## Method 1 (Use Binary Search)
For i = 0 to m-1, do binary search for i in the array. If i is not present in the array then
return i.

Time Complexity: O(m log n)

==Method 2 (Linear Search)==
If arr[0] is not 0, return 0. Otherwise traverse the input array starting from index 0,
and for each pair of elements a[i] and a[i+1], find the difference between them. if the
difference is greater than 1 then a[i]+1 is the missing number.

Time Complexity: O(n)

==Method 3 (Use Modified Binary Search)==
In the standard Binary Search process, the element to be searched is compared with the middle
element and on the basis of comparison result, we decide whether to search is over or to go
to left half or right half.

In this method, we modify the standard Binary Search algorithm to compare the middle element
with its index and make decision on the basis of this comparison.

1) If the first element is not same as its index then return first index
2) Else get the middle index say mid
    a) If arr[mid] greater than mid then the required element lies in left half.
    b) Else the required element lies in right half.


### Time Complexity: O(Logn)
 */


function findFirstMissing(arr: number[], start: number, end: number): number {
    if (start > end) {
        return end + 1;
    }
    if (start !== arr[start]) {
        return start;
    }
    const mid = Math.floor((start + end) / 2);

    if (arr[mid] === mid) {
        return findFirstMissing(arr, mid + 1, end);
    } else {
        return findFirstMissing(arr, start, mid);
    }
}

if (require.main === module) {
    const arr1: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 10];
    const arr2: number[] = [0, 1, 2, 6, 9];

    const n1: number = arr1.length;
    console.log("Smallest missing element in arr1 is", findFirstMissing(arr1, 0, n1 - 1));

    const n2: number = arr2.length;
    console.log("Smallest missing element in arr2 is", findFirstMissing(arr2, 0, n2 - 1));
}

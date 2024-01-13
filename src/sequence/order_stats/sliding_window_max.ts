/* """
Sliding Window Maximum (Maximum of all subarrays of size k)
Given an array and an integer k, find the maximum for each and every contiguous subarray of size k.

------------------------------------------
Examples:
------------------------------------------

Input :
arr = [1, 2, 3, 1, 4, 5, 2, 3, 6], k = 3
Output : 3 3 4 5 5 5 6

Input :
arr = [8, 5, 10, 7, 9, 4, 15, 12, 90, 13], k = 4
Output : 10 10 10 15 15 90 90

## Method 3 (A O(n) method: use Dequeue)

We create a Dequeue, Qi of capacity k, that stores only useful elements of current window of
k elements. An element is useful if it is in current window and is greater than all other
elements on left side of it in current window. We process all array elements one by one and
maintain Qi to contain useful elements of current window and these useful elements are
maintained in sorted order. The element at front of the Qi is the largest and element at rear
of Qi is the smallest of current window.

Time Complexity: O(n).
It seems more than O(n) at first look. If we take a closer look, we can observe that every
element of array is added and removed at most once. So there are total 2n operations.

Auxiliary Space: O(k)

A Dequeue (Double ended queue) based method for printing maixmum element of
all subarrays of size k


 */

import { Deque } from 'datastructures-js';

function printKMax(arr: number[], n: number, k: number): void {
    const Qi = new Deque<number>();

    let i = 0;
    while (i < k) {
        while (Qi.size() > 0 && arr[i] >= arr[Qi.front() as number]) {
            Qi.popFront();
        }

        Qi.pushFront(i);
        i++;
    }

    while (i < n) {
        console.log(arr[Qi.front() as number]);

        while (Qi.size() > 0 && Qi.front() as number <= i - k) {
            Qi.popFront();
        }

        while (Qi.size() > 0 && arr[i] >= arr[Qi.back() as number]) {
            Qi.popBack();
        }

        Qi.pushFront(i);
        i++;
    }

    console.log(arr[Qi.front() as number]);
}

if (require.main === module) {
    // Test
    const arr: number[] = [12, 1, 78, 90, 57, 89, 56];
    const n: number = arr.length;
    const k: number = 3;
    printKMax(arr, n, k);
}

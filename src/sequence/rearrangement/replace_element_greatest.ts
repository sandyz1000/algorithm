/* """
Replace every element with the greatest element on right side

Given an array of integers, replace every element with the next greatest element
(greatest element on the right side) in the array. Since there is no element next to the last
element, replace it with -1.

Example:
----------------
If the array is [16, 17, 4, 3, 5, 2], then it should be modified to [17, 5, 5, 5, 2, -1].

Explanation:
----------------

A naive method is to run two loops. The outer loop will one by one pick array elements from left
to right. The inner loop will find the greatest element present after the picked element. Finally
the outer loop will replace the picked element with the greatest element found by inner loop. The
time complexity of this method will be O(n*n).
A tricky method is to replace all elements using one traversal of the array. The idea is to start
from the rightmost element, move to the left side one by one, and keep track of the maximum
element. Replace every element with the maximum element.
 */

export class NextGreatest {
    nextGreatest(arr: number[]): void {
        const size: number = arr.length;
        let maxFromRight: number = arr[size - 1];
        arr[size - 1] = -1;

        for (let i: number = size - 2; i >= 0; i--) {
            const temp: number = arr[i];
            arr[i] = maxFromRight;
            maxFromRight = Math.max(temp, maxFromRight);
        }
    }

    printArray(arr: number[]): void {
        for (const num of arr) {
            console.log(num);
        }
    }
}

if (require.main === module) {
    // Example usage:
    const nextGreatest = new NextGreatest();
    const arr: number[] = [16, 17, 4, 3, 5, 2];
    nextGreatest.nextGreatest(arr);
    nextGreatest.printArray(arr);
}

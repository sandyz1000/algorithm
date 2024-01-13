
/* Write a program to reverse an array or string
We are given an array (or string), the task is to reverse the array.

Examples:
---------------
Input  : arr[] = {1, 2, 3}
Output : arr[] = {3, 2, 1}

Input :  arr[] = {4, 5, 1, 2}
Output : arr[] = {2, 1, 5, 4}


 */

export class ReverseArray {
    reverseList(arr: number[], start: number, end: number): void {
        while (start < end) {
            [arr[start], arr[end]] = [arr[end], arr[start]];
            start++;
            end--;
        }
    }

    reverseListRec(arr: number[], start: number, end: number): void {
        if (start >= end) {
            return;
        }
        [arr[start], arr[end]] = [arr[end], arr[start]];
        this.reverseListRec(arr, start + 1, end - 1);
    }

    printArray(arr: number[]): void {
        for (const num of arr) {
            console.log(num);
        }
    }
}

if (require.main === module) {
    const reverseArray = new ReverseArray();
    const arr: number[] = [1, 2, 3, 4, 5, 6];
    console.log(arr);
    reverseArray.reverseListRec(arr, 0, 5);
    console.log("Reversed list is");
    reverseArray.printArray(arr);
}

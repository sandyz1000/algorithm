/* """
Method-1
Rearrange positive and negative numbers in O(n) time and O(1) extra space

An array contains both positive and negative numbers in random order. Rearrange the array elements
so that positive and negative numbers are placed alternatively. Number of positive and negative
numbers need not be equal. If there are more positive numbers they appear at the end of the array.
If there are more negative numbers, they too appear in the end of the array.

For example, if the input array is [-1, 2, -3, 4, 5, 6, -7, 8, 9], 
then the output should be [9, -7, 8, -3, 5, -1, 2, 4, 6]

------------------------------------------------------
Explanation:
------------------------------------------------------

The solution is to first separate positive and negative numbers using partition process of
QuickSort. In the partition process, consider 0 as value of pivot element so that all negative
numbers are placed before positive numbers. Once negative and positive numbers are separated,
we start from the first negative number and first positive number, and swap every alternate
negative number with next positive number.

------------------------------------------------------
Method-2
Rearrange positive and negative numbers with constant extra space

Given an array of positive and negative numbers, arrange them such that all negative integers
appear before all the positive integers in the array without using any additional data structure
like hash table, arrays, etc. The order of appearance should be maintained.

Examples:

Input:  [12 11 -13 -5 6 -7 5 -3 -6]
Output: [-13 -5 -7 -3 -6 12 11 6 5]

Approach 2: Optimized Merge Sort
--------------------------------

Merge method of standard merge sort algorithm can be modified to solve this problem. While
merging two sorted halves say left and right, we need to merge in such a way that negative part
of left and right sub-array is copied first followed by positive part of left and right sub-array.

Time complexity of above solution is O(n log n). The problem with this approach is we are using
auxiliary array for merging but we're not allowed to use any data structure to solve this
problem. We can do merging in-place without using any data-structure.

 */

// ## Method-1
export class RearrangementWithSpace {
    merge(arr: number[], l: number, m: number, r: number): void {
        const n1: number = m - l + 1;
        const n2: number = r - m;

        const L: number[] = arr.slice(l, l + n1);
        const R: number[] = arr.slice(m + 1, m + 1 + n2);

        let i: number = 0;
        let j: number = 0;
        let k: number = l;

        while (i < n1 && L[i] < 0) {
            arr[k] = L[i];
            k++;
            i++;
        }

        while (j < n2 && R[j] < 0) {
            arr[k] = R[j];
            k++;
            j++;
        }

        while (i < n1) {
            arr[k] = L[i];
            k++;
            i++;
        }

        while (j < n2) {
            arr[k] = R[j];
            k++;
            j++;
        }
    }

    rearrange_pos_neg_method(arr: number[], l: number, r: number): void {
        if (l < r) {
            const m: number = l + Math.floor((r - l) / 2);
            this.rearrange_pos_neg_method(arr, l, m);
            this.rearrange_pos_neg_method(arr, m + 1, r);
            this.merge(arr, l, m, r);
        }
    }

    print_array(arr: number[], n: number): void {
        for (let i: number = 0; i < n; i++) {
            console.log(arr[i]);
        }
    }
}

// ## Method-2
export class RearrangementOptimized {
    reverse(arr: number[], l: number, r: number): void {
        while (l < r) {
            [arr[l], arr[r]] = [arr[r], arr[l]];
            l++;
            r--;
        }
    }

    merge(arr: number[], l: number, m: number, r: number): void {
        let i: number = l;
        let j: number = m + 1;

        while (i <= m && arr[i] < 0) {
            i++;
        }

        while (j <= r && arr[j] < 0) {
            j++;
        }

        this.reverse(arr, i, m);
        this.reverse(arr, m + 1, j - 1);
        this.reverse(arr, i, j - 1);
    }

    rearrange_pos_neg_method(arr: number[], l: number, r: number): void {
        if (l < r) {
            const m: number = l + Math.floor((r - l) / 2);
            this.rearrange_pos_neg_method(arr, l, m);
            this.rearrange_pos_neg_method(arr, m + 1, r);
            this.merge(arr, l, m, r);
        }
    }

    print_array(arr: number[], n: number): void {
        for (let i: number = 0; i < n; i++) {
            console.log(arr[i]);
        }
    }
}

if (require.main === module) {
    // Example usage:
    const rearOptimized = new RearrangementOptimized();
    const arrOptimized: number[] = [-1, 2, -3, 4, 5, 6, -7, 8, 9];
    const arrSizeOptimized: number = arrOptimized.length;
    rearOptimized.rearrange_pos_neg_method(arrOptimized, 0, arrSizeOptimized - 1);
    rearOptimized.print_array(arrOptimized, arrSizeOptimized);
}


// ## Method-3
export class Rearrangement {
    rearrange(arr: number[], n: number): void {
        let i: number = -1;
        for (let j: number = 0; j < n; j++) {
            if (arr[j] < 0) {
                i++;
                [arr[i], arr[j]] = [arr[j], arr[i]];
            }
        }

        let pos: number = i + 1;
        let neg: number = 0;

        while (n > pos && pos > neg && arr[neg] < 0) {
            [arr[neg], arr[pos]] = [arr[pos], arr[neg]];
            pos++;
            neg += 2;
        }
    }

    printArray(arr: number[], n: number): void {
        for (let i: number = 0; i < n; i++) {
            console.log(arr[i]);
        }
    }
}

if (require.main === module) {
    // Example usage:
const rear = new Rearrangement();
const arr: number[] = [-1, 2, -3, 4, 5, 6, -7, 8, 9];
const n: number = arr.length;
rear.rearrange(arr, n);
rear.printArray(arr, n);
}

if (require.main === module) {
    // Example usage:
    const rearWithSpace = new RearrangementWithSpace();
    const arrWithSpace: number[] = [-1, 2, -3, 4, 5, 6, -7, 8, 9];
    const arrSizeWithSpace: number = arrWithSpace.length;
    rearWithSpace.rearrange_pos_neg_method(arrWithSpace, 0, arrSizeWithSpace - 1);
    rearWithSpace.print_array(arrWithSpace, arrSizeWithSpace);
}

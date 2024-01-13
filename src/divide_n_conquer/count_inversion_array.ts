/* 
-- METHOD 1
Inversion Count for an array indicates - how far (or close) the array is from being sorted. If
array is already sorted then inversion count is 0. If array is sorted in reverse order that
inversion count is the maximum. Formally speaking, two elements a[i] and a[j] form an inversion
if a[i] > a[j] and i < j

-- METHOD 2
Suppose we know the number of inversions in the left half and right half of the array (let be
inv1 and inv2) what kinds of inversions are not accounted for in Inv1 + Inv2 ?

The answer is - the inversions we have to count during the merge step. Therefore, to get number of
inversions, we need to add number of inversions in left sub array, right sub array and merge()

How to get number of inversions in merge()?
In merge process, let i is used for indexing left sub-array and j for right sub-array.
At any step in merge(), if a[i] is greater than a[j], then there are (mid - i) inversions.
because left and right subarrays are sorted, so all the remaining elements in left-subarray
(a[i+1], a[i+2] - a[mid]) will be greater than a[j]
 */

function get_inv_count(arr: number[], n: number): number {
    let inv_count = 0;
    for (let i = 0; i < n - 1; i++) {
        for (let j = i + 1; j < n; j++) {
            if (arr[i] > arr[j]) {
                inv_count += 1;
            }
        }
    }
    return inv_count;
}

class MergeSort {
    static merge_sort(arr: number[], array_size: number): number {
        const temp: number[] = new Array(array_size).fill(0);
        return MergeSort._merge_sort(arr, temp, 0, array_size - 1);
    }

    private static _merge_sort(arr: number[], temp: number[], left: number, right: number): number {
        let mid: number, inv_count: number = 0;
        if (right > left) {
            mid = Math.floor((right + left) / 2);
            inv_count = MergeSort._merge_sort(arr, temp, left, mid);
            inv_count += MergeSort._merge_sort(arr, temp, mid + 1, right);
            inv_count += MergeSort.merge(arr, temp, left, mid + 1, right);
        }
        return inv_count;
    }

    private static merge(arr: number[], temp: number[], left: number, mid: number, right: number): number {
        let inv_count: number = 0;
        let i: number = left;
        let j: number = mid;
        let k: number = left;
        while (i <= mid - 1 && j <= right) {
            if (arr[i] <= arr[j]) {
                temp[k] = arr[i];
                k += 1;
                i += 1;
            } else {
                temp[k] = arr[j];
                k += 1;
                j += 1;
                inv_count = inv_count + (mid - i);
            }
        }
        while (i <= mid - 1) {
            temp[k] = arr[i];
            k += 1;
            i += 1;
        }
        while (j <= right) {
            temp[k] = arr[j];
            k += 1;
            j += 1;
        }
        for (let i = left; i <= right; i++) {
            arr[i] = temp[i];
        }
        return inv_count;
    }
}

(() => {
    console.log("METHOD-1\n");
    const arr: number[] = [1, 20, 6, 4, 5];
    console.log(` Number of inversions are ${get_inv_count(arr, arr.length)} \n`);    
})

console.log("-----------------------");

(() => {
    console.log("METHOD-2\n");
    const arr: number[] = [1, 20, 6, 4, 5];
    console.log(` Number of inversions are ${MergeSort.merge_sort(arr, 5)} \n`);
})
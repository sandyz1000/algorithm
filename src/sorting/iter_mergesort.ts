/* Iterative Merge Sort:

The above function is recursive, so uses function call stack to store intermediate values of l and
h. The function call stack stores other bookkeeping information together with parameters. Also,
function calls involve overheads like storing activation record of the caller function and then
resuming execution. Unlike Iterative QuickSort, the iterative MergeSort doesn't require explicit
auxiliary stack 

# Iterative Python program for merge sort

# Function to merge the two haves arr[l..m] and arr[m+1..r] of array arr[]
# void merge(int arr[], int l, int m, int r);

# Utility function to find minimum of two integers
# int min(int x, int y) { return (x<y)? x :y; }

# For current size of subarrays to be merged curr_size varies from 1 to n/2
curr_size = 1

# Merge subarrays in bottom up manner. First merge subarrays of size 1 to create sorted
# subarrays of size 2, then merge subarrays of size 2 to create sorted subarrays of size 4,
# and so on.
*/

function mergeSort(arr: number[]): void {
    const n: number = arr.length;
    let curr_size: number = 1;

    while (curr_size <= n - 1) {
        let left_start: number = 0;

        while (left_start < n - 1) {
            const mid: number = left_start + curr_size - 1;
            const right_end: number = Math.min(left_start + 2 * curr_size - 1, n - 1);

            _merge(arr, left_start, mid, right_end);
            left_start += 2 * curr_size;
        }

        curr_size = 2 * curr_size;
    }
}

function _merge(arr: number[], l: number, m: number, r: number): void {
    const n1: number = m - l + 1;
    const n2: number = r - m;

    const L: number[] = Array.from({ length: n1 }, (_, i) => arr[l + i]);
    const R: number[] = Array.from({ length: n2 }, (_, j) => arr[m + 1 + j]);

    let i: number = 0;
    let j: number = 0;
    let k: number = l;

    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
            arr[k] = L[i];
            i++;
        } else {
            arr[k] = R[j];
            j++;
        }
        k++;
    }

    while (i < n1) {
        arr[k] = L[i];
        i++;
        k++;
    }

    while (j < n2) {
        arr[k] = R[j];
        j++;
        k++;
    }
}

if (require.main === module) {
    const arr: number[] = [12, 11, 13, 5, 6, 7];
    console.log("Given array is \n", arr);
    mergeSort(arr);
    console.log("\nSorted array is \n", arr);
}

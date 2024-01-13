/* 
## Selection Sort

The selection sort algorithm sorts an array by repeatedly finding the minimum element (
considering ascending order) from unsorted part and putting it at the beginning. The algorithm
maintains two sub-arrays in a given array.

1) The subarray which is already sorted.
2) Remaining subarray which is unsorted.

In every iteration of selection sort, the minimum element (considering ascending order) from the
unsorted subarray is picked and moved to the sorted subarray.

Following example explains the above steps:
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
arr[] = 64 25 12 22 11

// Find the minimum element in arr[0...4] and place it at beginning
11 25 12 22 64

// Find the minimum element in arr[1...4] and place it at beginning of arr[1...4]
11 12 25 22 64

// Find the minimum element in arr[2...4] and place it at beginning of arr[2...4]
11 12 22 25 64

// Find the minimum element in arr[3...4] and place it at beginning of arr[3...4]
11 12 22 25 64

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
# Time Complexity: O(n2) as there are two nested loops.
# Auxiliary Space: O(1)
 */



export class SelectionSort {
    private arr: number[];
    private size: number;

    constructor(arr: number[]) {
        this.arr = [...arr];
        this.size = this.arr.length;
    }

    sort(): void {
        for (let i = 0; i < this.size; i++) {
            let minIndex = i;
            for (let j = i; j < this.size; j++) {
                if (this.arr[j] < this.arr[minIndex]) {
                    minIndex = j;
                }
            }

            [this.arr[i], this.arr[minIndex]] = [this.arr[minIndex], this.arr[i]];
        }
    }

    getArr(): number[] {
        return this.arr;
    }
}

if (require.main === module) {
    const ss = new SelectionSort([64, 25, 12, 22, 11]);
    ss.sort(); // Sort operation
    console.log(ss.getArr());
}

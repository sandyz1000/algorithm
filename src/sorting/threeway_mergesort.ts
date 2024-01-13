/* 
3-way Merge Sort
================

Prerequisite - Merge Sort

Merge sort involves recursively splitting the array into 2 parts, sorting and finally merging them.
A variant of merge sort is called 3-way merge sort where instead of splitting the array into 2
parts we split it into 3 parts.

Merge sort recursively breaks down the arrays to sub-arrays of size half. Similarly, 3-way Merge
sort breaks down the arrays to sub-arrays of size one third.

------------------------------------------
Examples:
------------------------------------------
Input  : 45, -2, -45, 78, 30, -42, 10, 19, 73, 93
Output : -45 -42 -2 10 19 30 45 73 78 93

Input  : 23, -19
Output : -19  23

Here, we first copy the contents of data array to another array called fArray. Then, sort the
array by finding midpoints that divide the array into 3 parts and called sort function on each
array respectively. The base case of recursion is when size of array is 1 and it returns from the
function. Then merging of arrays starts and finally the sorted array will be in fArray which is
copied back to gArray.

Time Complexity: In case of 2-way Merge sort we get the equation: T(n) = 2T(n/2) + O(n)
Similarly, in case of 3-way Merge sort we get the equation: T(n) = 3T(n/3) + O(n)

By solving it using Master method, we get its complexity as O(n log 3n).. Although time
complexity looks less compared to 2 way merge sort, the time taken actually may become higher
because number of comparisons in merge function go higher. Please refer Why is Binary Search
preferred over Ternary Search? for details.
 */


export class MergeSort3Way {
    mergeSort3Way(gArray: number[]): void {
        if (gArray === null) {
            return;
        }

        const fArray = gArray.slice();
        this.mergeSort3WayRec(fArray, 0, gArray.length, gArray);

        for (let index = 0; index < fArray.length; index++) {
            gArray[index] = fArray[index];
        }
    }

    mergeSort3WayRec(gArray: number[], low: number, high: number, destArray: number[]): void {
        if (high - low < 2) {
            return;
        }

        const mid1 = low + Math.floor((high - low) / 3);
        const mid2 = low + 2 * Math.floor((high - low) / 3) + 1;

        this.mergeSort3WayRec(destArray, low, mid1, gArray);
        this.mergeSort3WayRec(destArray, mid1, mid2, gArray);
        this.mergeSort3WayRec(destArray, mid2, high, gArray);

        this.merge(destArray, low, mid1, mid2, high, gArray);
    }

    merge(gArray: number[], low: number, mid1: number, mid2: number, high: number, destArray: number[]): void {
        let i = low;
        let j = mid1;
        let k = mid2;
        let index = low;

        while (i < mid1 && j < mid2 && k < high) {
            if (gArray[i] < gArray[j]) {
                if (gArray[i] < gArray[k]) {
                    destArray[index] = gArray[i];
                    i++;
                    index++;
                } else {
                    destArray[index] = gArray[k];
                    index++;
                    k++;
                }
            } else {
                if (gArray[j] < gArray[k]) {
                    destArray[index] = gArray[j];
                    index++;
                    j++;
                } else {
                    destArray[index] = gArray[k];
                    index++;
                    k++;
                }
            }
        }

        while (i < mid1 && j < mid2) {
            if (gArray[i] < gArray[j]) {
                destArray[index] = gArray[i];
                index++;
                i++;
            } else {
                destArray[index] = gArray[j];
                index++;
                j++;
            }
        }

        while (j < mid2 && k < high) {
            if (gArray[j] < gArray[k]) {
                index++;
                j++;
                destArray[index] = gArray[j];
            } else {
                destArray[index] = gArray[k];
                index++;
                k++;
            }
        }

        while (i < mid1 && k < high) {
            if (gArray[i] < gArray[k]) {
                destArray[index] = gArray[i];
                index++;
                i++;
            } else {
                destArray[index] = gArray[k];
                index++;
                k++;
            }
        }

        while (i < mid1) {
            destArray[index] = gArray[i];
            index++;
            i++;
        }

        while (j < mid2) {
            destArray[index] = gArray[j];
            index++;
            j++;
        }

        while (k < high) {
            destArray[index] = gArray[k];
            index++;
            k++;
        }
    }
}

if (require.main === module) {
    const test = new MergeSort3Way();
    const data = [45, -2, -45, 78, 30, -42, 10, 19, 73, 93];
    test.mergeSort3Way(data);
    console.log("After 3 way merge sort: ", data);
}

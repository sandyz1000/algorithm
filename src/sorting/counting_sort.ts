/* Counting Sort

Counting sort is a sorting technique based on keys between a specific range. It works by counting
the number of objects having distinct key values (kind of hashing). Then doing some arithmetic to
calculate the position of each object in the output sequence.

-----------------------------------
Example:
-----------------------------------
For simplicity, consider the data in the range 0 to 9.
Input data: 1, 4, 1, 2, 7, 5, 2
    1) Take a count array to store the count of each unique object.
    Index:     0  1  2  3  4  5  6  7  8  9
    Count:     0  2  2  0   1  1  0  1  0  0

    2) Modify the count array such that each element at each index stores the sum of
    previous counts.
    Index:     0  1  2  3  4  5  6  7  8  9
    Count:     0  2  4  4  5  6  6  7  7  7

The modified count array indicates the position of each object in the output sequence.
    3) Output each object from the input sequence followed by decreasing its count by 1.
    Process the input data: 1, 4, 1, 2, 7, 5, 2. Position of 1 is 2.
    Put data 1 at index 2 in output.
    Decrease count by 1 to place next data 1 at an index 1 smaller than this index.
 */
export class CountSort {
  static countSort(arr: string): string {
    const n: number = arr.length;
    const output: string[] = new Array(n);
    const count: number[] = new Array(256).fill(0);
    const ans: string[] = new Array(n);

    for (let i = 0; i < n; i++) {
      count[arr.charCodeAt(i)]++;
    }

    for (let i = 1; i < 256; i++) {
      count[i] += count[i - 1];
    }

    for (let i = n - 1; i >= 0; i--) {
      output[count[arr.charCodeAt(i)] - 1] = arr[i];
      count[arr.charCodeAt(i)]--;
    }

    for (let i = 0; i < n; i++) {
      ans[i] = output[i];
    }

    return ans.join("");
  }
}


if (require.main === module) {
  // Example usage:
  const arr: string = "geeksforgeeks";
  const sortedArr: string = CountSort.countSort(arr);
  console.log("Sorted character array is", sortedArr);

}
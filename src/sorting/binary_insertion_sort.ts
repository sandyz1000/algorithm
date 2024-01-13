/* 
## Binary Insertion Sort

We can use binary search to reduce the number of comparisons in normal insertion sort.
Binary Insertion Sort find use binary search to find the proper location to insert the selected
item at each iteration.

--------------------------------------------------
Explanation:
--------------------------------------------------
In normal insertion, sort it takes O(i) (at ith iteration) in worst case. we can reduce it to
O(logi) by using binary search.

--------------------------------------------------
Time Complexity:
--------------------------------------------------
The algorithm as a whole still has a running worst case running time of O(n^2) because of the
series of swaps required for each insertion.
 */

function binarySearch(a: number[], item: number, low: number, high: number): number {
  if (high <= low) {
    return item > a[low] ? low + 1 : low;
  }

  const mid: number = Math.floor((low + high) / 2);

  if (item === a[mid]) {
    return mid + 1;
  }

  if (item > a[mid]) {
    return binarySearch(a, item, mid + 1, high);
  } else {
    return binarySearch(a, item, low, mid - 1);
  }
}

function insertionSort(a: number[]): void {
  const n: number = a.length;

  for (let i = 1; i < n; i++) {
    let j: number = i - 1;
    const selected: number = a[i];
    const loc: number = binarySearch(a, selected, 0, j);

    while (j >= loc) {
      a[j + 1] = a[j];
      j--;
    }

    a[j + 1] = selected;
  }
}

if (require.main === module) {

  // Example usage:
  const arr: number[] = [37, 23, 0, 17, 12, 72, 31, 46, 100, 88, 54];
  insertionSort(arr);
  console.log("Sorted array: \n", arr);

}
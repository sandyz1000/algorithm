
/* Find whether an array is subset of another array | Added Method 3

Given two arrays: arr1[0..m-1] and arr2[0..n-1]. Find whether arr2 is a subset of arr1 or not.
Both the arrays are not in sorted order. It may be assumed that elements in both array are distinct.

----------------------------------------
Examples:
----------------------------------------
Input: arr1 = [11, 1, 13, 21, 3, 7], arr2 = [11, 3, 7, 1]
Output: arr2 is a subset of arr1

Input: arr1 = [1, 2, 3, 4, 5, 6], arr2 = [1, 2, 4]
Output: arr2 is a subset of arr1

Input: arr1 = [10, 5, 2, 23, 19], arr2 = [19, 5, 3]
Output: arr2 is not a subset of arr1 

Method 1 (Simple)
    Use two loops: The outer loop picks all the elements of arr2[] one by one. The inner loop
    linearly searches for the element picked by outer loop. If all elements are found then return
    1, else return 0.

    Time Complexity: O(m*n)
    
Method 2 (Use Sorting and Binary Search)
    1) Sort arr1[] O(mLogm)
    2) For each element of arr2[], do binary search for it in sorted arr1[].
    a) If the element is not found then return 0.
    3) If all elements are present then return 1.

    Time Complexity: O(mLogm + nLogm). Please note that this will be the complexity if an mLogm
    algorithm is used for sorting which is not the case in above code. In above code Quick Sort is
    sued and worst case time complexity of Quick Sort is O(m^2)

Method 3 (Use Sorting and Merging )
    1) Sort both arrays: arr1[] and arr2[] O(mLogm + nLogn)
    2) Use Merge type of process to see if all elements of sorted arr2[] are present in sorted
    arr1[].

    Time Complexity: O(mLogm + nLogn) which is better than method 2. Please note that this will be
    the complexity if an nLogn algorithm is used for sorting both arrays which is not the case in
    above code. In above code Quick Sort is sued and worst case time complexity of Quick Sort is O(
    n^2)

Method 4 (Use Hashing)
    1) Create a Hash Table for all the elements of arr1[].
    2) Traverse arr2[] and search for each element of arr2[] in the Hash Table.
    If element is not found then return 0.
    3) If all elements are found then return 1.
*/



export class ArraySubset {
  /**
   * Check if one array is a subset of another using a simple method.
   */
  isSubset(arr1: number[], arr2: number[], m: number, n: number): boolean {
    for (let i = 0; i < n; i++) {
      let j = 0;
      while (j < m) {
        if (arr2[i] === arr1[j]) {
          break;
        }
        j++;
      }

      // If the above inner loop was not broken at all then arr2[i] is not present in arr1[]
      if (j === m) {
        return false;
      }
    }

    // If we reach here then all elements of arr2[] are present in arr1[]
    return true;
  }
}

export class ArraySubset2 {
  /**
   * Check if one array is a subset of another using sorting and binary search.
   */
  isSubset(arr1: number[], arr2: number[], m: number, n: number): boolean {
    this.quickSort(arr1, 0, m - 1);
    for (let i = 0; i < n; i++) {
      if (this.binarySearch(arr1, 0, m - 1, arr2[i]) === -1) {
        return false;
      }
    }

    // If we reach here then all elements of arr2[] are present in arr1[]
    return true;
  }

  private binarySearch(arr: number[], low: number, high: number, x: number): number {
    if (high >= low) {
      const mid = Math.floor((low + high) / 2);
      // Check if arr[mid] is the first occurrence of x.
      // arr[mid] is the first occurrence if x is greater than arr[mid - 1] and arr[mid] is equal to x.
      if ((mid === 0 || arr[mid - 1] < x) && arr[mid] === x) {
        return mid;
      } else if (x > arr[mid]) {
        return this.binarySearch(arr, mid + 1, high, x);
      } else {
        return this.binarySearch(arr, low, mid - 1, x);
      }
    }
    return -1;
  }

  private partition(arr: number[], low: number, high: number): number {
    const pivot = arr[high];
    let i = low - 1;
    for (let j = low; j < high; j++) {
      // If current element is smaller than or equal to pivot
      if (arr[j] <= pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
    }

    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    return i + 1;
  }

  private quickSort(arr: number[], low: number, high: number): void {
    if (low < high) {
      const pi = this.partition(arr, low, high);
      this.quickSort(arr, low, pi - 1);
      this.quickSort(arr, pi + 1, high);
    }
  }
}

export class ArraySubset3 {
  /**
   * Check if one array is a subset of another using sorting and merging.
   */
  isSubset(arr1: number[], arr2: number[], m: number, n: number): boolean {
    let i = 0;
    let j = 0;
    if (m < n) {
      return false;
    }
    arr1.sort((a, b) => a - b);
    arr2.sort((a, b) => a - b);

    while (i < n && j < m) {
      if (arr1[j] < arr2[i]) {
        j++;
      } else if (arr1[j] === arr2[i]) {
        j++;
        i++;
      } else if (arr1[j] > arr2[i]) {
        return false;
      }
    }
    return i === n;
  }
}

export class ArraySubset4 {
  /**
   * Check if one array is a subset of another using hashing.
   */
  isSubset(arr1: number[], arr2: number[], m: number, n: number): boolean {
    const hset = new Set<number>();

    // hset stores all the values of arr1
    for (let i = 0; i < m; i++) {
      hset.add(arr1[i]);
    }

    // Loop to check if all elements of arr2 also lie in arr1
    for (let i = 0; i < n; i++) {
      if (!hset.has(arr2[i])) {
        return false;
      }
    }
    return true;
  }
}

if (require.main === module) {
  // Output: arr2 is subset of arr1
  console.log("\nMethod 1 (Simple)");
  const arrSubset1 = new ArraySubset();
  const arr1 = [11, 1, 13, 21, 3, 7];
  const arr2 = [11, 3, 7, 1];

  const m = arr1.length;
  const n = arr2.length;
  if (arrSubset1.isSubset(arr1, arr2, m, n)) {
    console.log("arr2[] is subset of arr1");
  } else {
    console.log("arr2[] is not a subset of arr1");
  }

  console.log("\nMethod 2 (Use Sorting and Binary Search)");
  const arrSubset2 = new ArraySubset2();
  const arr1Method2 = [11, 1, 13, 21, 3, 7];
  const arr2Method2 = [11, 3, 7, 1];
  const mMethod2 = arr1Method2.length;
  const nMethod2 = arr2Method2.length;

  if (arrSubset2.isSubset(arr1Method2, arr2Method2, mMethod2, nMethod2)) {
    console.log("arr2[] is subset of arr1");
  } else {
    console.log("arr2[] is not a subset of arr1");
  }

  console.log("\nMethod 3 (Use Sorting and Merging )");
  const arrSubset3 = new ArraySubset3();
  // Output: arr2 is a subset of arr1
  const arr1Method3 = [11, 1, 13, 21, 3, 7];
  const arr2Method3 = [11, 3, 7, 1];
  const mMethod3 = arr1Method3.length;
  const nMethod3 = arr2Method3.length;
  if (arrSubset3.isSubset(arr1Method3, arr2Method3, mMethod3, nMethod3)) {
    console.log("arr2[] is subset of arr1");
  } else {
    console.log("arr2[] is not a subset of arr1");
  }

  console.log("\nMethod 4 (Use Hashing)");
  const arrSubset4 = new ArraySubset4();
  const arr1Method4 = [11, 1, 13, 21, 3, 7];
  const arr2Method4 = [11, 3, 7, 1];
  const mMethod4 = arr1Method4.length;
  const nMethod4 = arr2Method4.length;
  if (arrSubset4.isSubset(arr1Method4, arr2Method4, mMethod4, nMethod4)) {
    console.log("arr2 is a subset of arr1");
  } else {
    console.log("arr2 is not a subset of arr1");
  }
}

/* 
Bucket Sort
Bucket sort is mainly useful when input is uniformly distributed over a range.

------------------------------------------------
Example:
------------------------------------------------
Consider the following problem.
Sort a large set of floating point numbers which are in range from 0.0 to 1.0 and are uniformly
distributed across the range. How do we sort the numbers efficiently?

A simple way is to apply a comparison based sorting algorithm. The lower bound for Comparison
based sorting algorithm (Merge Sort, Heap Sort, Quick-Sort .. etc) is Omega(n Log n), i.e., they
cannot do better than nLogn.
Can we sort the array in linear time? Counting sort can not be applied here as we use keys as
index in counting sort. Here keys are floating point numbers.

------------------------------------------------
Algorithm:
------------------------------------------------

The idea is to use bucket sort. Following is bucket algorithm.

bucketSort(arr[], n)
1) Create n empty buckets (Or lists).
2) Do following for every array element arr[i].
    a) Insert arr[i] into bucket[n*array[i]]
3) Sort individual buckets using insertion sort.
4) Concatenate all sorted buckets.

------------------------------------------------
Time Complexity:
------------------------------------------------
If we assume that insertion in a bucket takes O(1) time then steps 1 and 2 of the above algorithm
clearly take O(n) time. The O(1) is easily possible if we use a linked list to represent a bucket
(In the following code, Python vector is used for simplicity). Step 4 also takes O(n) time as there
will be n items in all buckets.
The main step to analyze is step 3. This step also takes O(n) time on average if all numbers are
uniformly distributed (please refer CLRS book for more details)

 */
export class BucketSort {
    static bucketSort(arr: number[]): void {
      const n: number = arr.length;
  
      // 1) Create n empty buckets
      const b: { [key: number]: number[] } = {};
  
      // 2) Put array elements in different buckets
      for (let i = 0; i < n; i++) {
        const bi: number = Math.floor(n * arr[i]); // Index in bucket
        if (!b[bi]) {
          b[bi] = [];
        }
        b[bi].push(arr[i]);
      }
  
      // 3) Sort individual buckets
      for (let i = 0; i < n; i++) {
        if (b[i]) {
          b[i].sort((a, b) => a - b);
        }
      }
  
      // 4) Concatenate all buckets into arr[]
      let index = 0;
      for (let i = 0; i < n; i++) {
        if (b[i]) {
          for (let j = 0; j < b[i].length; j++) {
            arr[index++] = b[i][j];
          }
        }
      }
    }
  }
  
  if (require.main === module) {
      // Example usage:
    const arr: number[] = [0.897, 0.565, 0.656, 0.1234, 0.665, 0.3434];
    BucketSort.bucketSort(arr);
    console.log("Sorted array is \n", arr);
  }
  
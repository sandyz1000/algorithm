/* Question: There are 2 sorted arrays A and B of size n each. Write an algorithm to
find the median of the array obtained after merging the above 2 arrays(i.e. array of
length 2n). The complexity should be O(log(n))

Median: In probability theory and statistics, a median is described as the number
separating the higher half of a sample, a population, or a probability distribution,
from the lower half. The median of a finite list of numbers can be found by arranging
all the numbers from lowest value to highest value and picking the middle one.

For getting the median of input array [ 12, 11, 15, 10, 20 ], first sort the array. We
get [10, 11, 12, 15, 20] after sorting. Median is the middle element of the sorted
array which is 12.

There are different conventions to take median of an array with even number of
elements, one can take the mean of the two middle values, or first middle value,
or second middle value.

Let us see different methods to get the median of two sorted arrays of size n each.
Since size of the set for which we are looking for median is even (2n), we take average
of middle two numbers in all below solutions and return floor of the average.

Method 1 (Simply count while Merging) Use merge procedure of merge sort. Keep track of
count while comparing elements of two arrays. If count becomes n(For 2n elements),
we have reached the median. Take the average of the elements at indexes n-1 and n in
the merged array. See the below implementation.

------------------------------------------------------------
Method 2 (By comparing the medians of two arrays)
This method works by first getting medians of the two sorted arrays and then comparing
them.

Let ar1 and ar2 be the input arrays.

Algorithm:

1) Calculate the medians m1 and m2 of the input arrays ar1[] and ar2[] respectively.
2) If m1 and m2 both are equal then we are done. (return m1 (or m2))
3) If m1 is greater than m2, then median is present in one of the below two sub arrays.
    a)  From first element of ar1 to m1 (ar1[0...|_n/2_|])
    b)  From m2 to last element of ar2  (ar2[|_n/2_|...n-1])
4) If m2 is greater than m1, then median is present in one of the below two sub arrays.
    a)  From m1 to last element of ar1  (ar1[|_n/2_|...n-1])
    b)  From first element of ar2 to m2 (ar2[0...|_n/2_|])
5) Repeat the above process until size of both the sub arrays becomes 2.
6) If size of the two arrays is 2 then use below formula to get the median.
    Median = (max(ar1[0], ar2[0]) + min(ar1[1], ar2[1]))/2

Example:
   ar1[] = [1, 12, 15, 26, 38]
   ar2[] = [2, 13, 17, 30, 45]

For above two arrays m1 = 15 and m2 = 17

For the above ar1[] and ar2[], m1 is smaller than m2. So median is present in one of the
following two sub arrays.
[15, 26, 38] and [2, 13, 17]

Let us repeat the process for above two sub arrays:
m1 = 26 m2 = 13.
m1 is greater than m2. So the sub arrays become [15, 26] and [13, 17]

Now size is 2, so median = (max(ar1[0], ar2[0]) + min(ar1[1], ar2[1]))/2
                         = (max(15, 13) + min(26, 17))/2
                         = (15 + 17)/2
                         = 16
""" 

*/

function getMedian1(ar1: number[], ar2: number[], n: number): number {
  let i = 0; // Current index of input array ar1[]
  let j = 0; // Current index of input array ar2[]
  let m1 = -1;
  let m2 = -1;

  // Since there are 2n elements, median will be average of elements at index n-1 and n
  // in the array obtained after merging ar1 and ar2
  for (let _ = 0; _ < n + 1; _++) {
    if (i === n) {
      m1 = m2;
      m2 = ar2[0];
      break;
    } else if (j === n) {
      m1 = m2;
      m2 = ar1[0];
      break;
    }

    // Below is to handle case where all elements of ar1[] are smaller than
    // smallest (or first) element of ar2[]
    if (ar1[i] < ar2[j]) {
      m1 = m2; // Store the prev median
      m2 = ar1[i];
      i++;
    } else {
      m1 = m2; // Store the prev median
      m2 = ar2[j];
      j++;
    }
  }

  return (m1 + m2) / 2;
}

function median(arr: number[], n: number): number {
  // Function to get median of a sorted arr
  return n % 2 === 0
    ? (arr[Math.floor(n / 2)] + arr[Math.floor(n / 2) - 1]) / 2
    : arr[Math.floor(n / 2)];
}

function getMedian2(ar1: number[], ar2: number[], n: number): number {
  if (n <= 0) {
    return -1; // return -1 for invalid input
  }

  if (n === 1) {
    return (ar1[0] + ar2[0]) / 2;
  }

  if (n === 2) {
    return (Math.max(ar1[0], ar2[0]) + Math.min(ar1[1], ar2[1])) / 2;
  }

  const m1 = median(ar1, n); // get the median of the first array
  const m2 = median(ar2, n); // get the median of the second array

  // If medians are equal then return either m1 or m2
  if (m1 === m2) {
    return m1;
  }

  // if m1 < m2 then median must exist in ar1[m1....] and ar2[....m2]
  if (m1 < m2) {
    if (n % 2 === 0) {
      return getMedian2(ar1.slice(Math.floor(n / 2) - 1), ar2, n - Math.floor(n / 2) + 1);
    } else {
      return getMedian2(ar1.slice(Math.floor(n / 2)), ar2, n - Math.floor(n / 2));
    }
  }

  // if m1 > m2 then median must exist in ar1[....m1] and ar2[m2...]
  if (n % 2 === 0) {
    return getMedian2(ar2.slice(Math.floor(n / 2) - 1), ar1, n - Math.floor(n / 2) + 1);
  } else {
    return getMedian2(ar2.slice(Math.floor(n / 2)), ar1, n - Math.floor(n / 2));
  }
}

const ar1: number[] = [1, 12, 15, 26, 38];
const ar2: number[] = [2, 13, 17, 30, 45];
const n1: number = ar1.length;
const n2: number = ar2.length;

if (n1 === n2) {
  console.log(
    `Method-1: Median is ${getMedian1(ar1, ar2, n1)} for list ${ar1} and ${ar2}`
  );
  console.log(
    `Method-2: Median is ${getMedian2(ar1, ar2, n1)} for list ${ar1} and ${ar2}`
  );
} else {
  console.log("Doesn't work for arrays of unequal size");
}

const ar3: number[] = [1, 2, 3, 6];
const ar4: number[] = [4, 6, 8, 10];
const n3: number = ar3.length;
const n4: number = ar4.length;

if (n3 === n4) {
  console.log(
    `Method-1: Median is ${getMedian1(ar3, ar4, n3)} for list ${ar3} and ${ar4}`
  );
  console.log(
    `Method-2: Median is ${getMedian2(ar3, ar4, n3)} for list ${ar3} and ${ar4}`
  );
} else {
  console.log("Doesn't work for arrays of unequal size");
}
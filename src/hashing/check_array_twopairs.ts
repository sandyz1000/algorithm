/* """
Check if an array can be divided into pairs whose sum is divisible by k
Given an array of integers and a number k, write a function that returns true if given array can be
divided into pairs such that sum of every pair is divisible by k.

------------------------------------------------
Examples:
------------------------------------------------
# [3, 1, 5, 3]
Input: arr = [9, 7, 5, 3], k = 6
Output: True
We can divide array into (9, 3) and (7, 5). Sum of both of these pairs is a multiple of 6.
[2, 5, 5, 8, 5, 5]
Input: arr = [92, 75, 65, 48, 45, 35], k = 10
Output: True
We can divide array into (92, 48), (75, 65) and (45, 35).
Sum of all these pairs is a multiple of 10.
# [1, 4, 6, 8]
Input: arr = [91, 74, 66, 48], k = 10
Output: False

Time complexity of above algorithm is O(n).
# A Python program to check if arr[0..n-1] can be divided in pairs such that every
# pair is divisible by k.

==Explanation:==

A Simple Solution is to iterate through every element arr[i]. Find if there is another not
yet visited element that has remainder as (k - arr[i]%k). If there is no such element,
return false. If a pair is found, then mark both elements as visited. Time complexity of
this solution is O(n^2 and it requires O(n) extra space.

An Efficient Solution is to use Hashing.

1) If length of given array is odd, return false. An odd length array cannot be divided in
pairs.

2) Traverse input array and count occurrences of all remainders.
        freq[arr[i] % k]++

3) Traverse input array again.
    a) Find remainder of current element.
    b) If remainder divides k into two halves, then there must be even occurrences of it as it
    forms pair with itself only.
    c) If remainder is 0, then then there must be even occurrences.
    d) Else, number of occurrences of current remainder must be equal to number of occurrences
    of "k - current remainder".

Returns true if arr[0..n-1] can be divided into pairs with sum divisible by k.

*/

function canPairs(arr: number[], n: number, k: number): boolean {
    if (n % 2 !== 0) {
      // An odd length array cannot be divided into pairs
      return false;
    }
  
    // Create a frequency array to count occurrences of all remainders when divided by k.
    const freq: { [key: number]: number } = {};
  
    // Count occurrences of all remainders
    for (let i = 0; i < n; i++) {
      const rem = arr[i] % k;
      freq[rem] = (freq[rem] || 0) + 1;
    }
  
    // Traverse input array and use freq[] to decide if the given array can be divided into pairs
    for (let i = 0; i < n; i++) {
      // Remainder of the current element
      const rem = arr[i] % k;
  
      // If remainder with the current element divides k into two halves.
      if (2 * rem === k) {
        // Then there must be even occurrences of such remainder
        if (freq[rem] % 2 !== 0) {
          return false;
        }
      } else if (rem === 0) {
        // If remainder is 0, then there must be two elements with 0 remainder
        if (freq[rem] && freq[rem] % 2 !== 0) {
          return false;
        }
      } else if (freq[rem] !== freq[k - rem]) {
        // Else the number of occurrences of remainder must be equal to the number of occurrences of k - remainder
        return false;
      }
    }
    return true;
  }
  
  if (require.main === module) {
    const arr: number[] = [92, 75, 65, 48, 45, 35];
    const k: number = 10;
    const n: number = arr.length;
    console.log(canPairs(arr, n, k) ? "True" : "False");
  }

  
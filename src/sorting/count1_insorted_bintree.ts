/* Count 1's in a sorted binary array

Given a binary array sorted in non-increasing order, count the number of 1's in it.

------------------------------------------
Examples:
------------------------------------------
Input: arr = [1, 1, 0, 0, 0, 0, 0]
Output: 2

Input: arr = [1, 1, 1, 1, 1, 1, 1]
Output: 7

Input: arr = [0, 0, 0, 0, 0, 0, 0]
Output: 0

------------------------------------------
Explanation:
------------------------------------------
A simple solution is to linearly traverse the array. The time complexity of the simple solution
is O(n). We can use Binary Search to find count in O(Logn) time. The idea is to look for last
occurrence of 1 using Binary Search. Once we find the index last occurrence, we return index + 1
as count.
 */


export class CountOnes {
    static countOnes(arr: number[], low: number, high: number): number {
      if (high >= low) {
        // Get the middle index
        const mid: number = low + Math.floor((high - low) / 2);
  
        // Check if the element at the middle index is the last 1
        if ((mid === high || arr[mid + 1] === 0) && arr[mid] === 1) {
          return mid + 1;
        }
  
        // If the element is not the last 1, recur for the right side
        if (arr[mid] === 1) {
          return CountOnes.countOnes(arr, mid + 1, high);
        }
  
        // Else recur for the left side
        return CountOnes.countOnes(arr, low, mid - 1);
      }
  
      return 0;
    }
  }

  if (require.main === module) {

      // Example usage:
      const arr: number[] = [1, 1, 1, 1, 0, 0, 0];
      console.log("Count of 1's in the given array is", CountOnes.countOnes(arr, 0, arr.length - 1));
      
  }
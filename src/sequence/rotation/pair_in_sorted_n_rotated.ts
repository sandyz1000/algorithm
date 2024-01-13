/* """
Given a sorted and rotated array, find if there is a pair with a given sum

Given an array that is sorted and then rotated around an unknown point. Find if array has a pair
with given sum 'x'. It may be assumed that all elements in array are distinct.

Time complexity of the above solution is O(n)

------------------------------------------------
Explanation:
------------------------------------------------

Method 1: Sorting and Two-Pointers technique.

Approach: A tricky approach to solve this problem can be to use the two-pointer technique. But for using
two pointer technique, the array must be sorted. Once the array is sorted the two pointers can be taken
which mark the beginning and end of the array respectively. If the sum is greater than the sum of those
two elements, shift the left pointer to increase the value of required sum and if the sum is lesser than
the required value, shift the right pointer to decrease the value. Let’s understand this using an example.

Let an array be {1, 4, 45, 6, 10, -8} and sum to find be 16

After sorting the array
A = {-8, 1, 4, 6, 10, 45}


Now, increment ‘l’ when the sum of the pair is less than the required sum and decrement ‘r’ when the sum of
the pair is more than the required sum.
This is because when the sum is less than the required sum then to get the number which could increase the
sum of pair, start moving from left to right(also sort the array) thus “l++” and vice versa.

Initialize l = 0, r = 5
A[l] + A[r] ( -8 + 45) > 16 => decrement r. Now r = 4
A[l] + A[r] ( -8 + 10) increment l. Now l = 1
A[l] + A[r] ( 1 + 10) increment l. Now l = 2
A[l] + A[r] ( 4 + 10) increment l. Now l = 3
A[l] + A[r] ( 6 + 10) == 16 => Found candidates (return 1)

Note: If there is more than one pair having the given sum then this algorithm reports only one. Can be easily
extended for this though.

Algorithm:
----------
hasArrayTwoCandidates (A[], ar_size, sum)
Sort the array in non-decreasing order.
Initialize two index variables to find the candidate
elements in the sorted array.
Initialize first to the leftmost index: l = 0
Initialize second the rightmost index: r = ar_size-1
Loop while l < r.
If (A[l] + A[r] == sum) then return 1
Else if( A[l] + A[r] < sum ) then l++
Else r–
No candidates in whole array – return 0


READ HERE:
---------
We have discussed a O(n) solution for a sorted array (See steps 2, 3 and 4 of Method 1). We can
extend this solution for rotated array as well. The idea is to first find the maximum element in
array which is the pivot point also and the element just after maximum is the minimum element.
Once we have indexes maximum and minimum elements, we use similar meet in middle algorithm (as
discussed here in method 1) to find if there is a pair. The only thing new here is indexes are
incremented and decremented in rotational manner using modular arithmetic.
 */


function pairInSortedRotated(arr: number[], n: number, x: number): boolean {
    // Find the pivot element
    let i = 0;
    while (i < n - 1) {
        if (arr[i] > arr[i + 1]) {
            break;
        }
        i++;
    }

    let left = (i + 1) % n;  // left is now index of the minimum element
    let right = i;  // right is now index of the maximum element

    // Keep moving either left or right till they meet
    while (left !== right) {
        // If we find a pair with sum x, return true
        if (arr[left] + arr[right] === x) {
            return true;
        }

        // If current pair sum is less, move to the higher sum
        if (arr[left] + arr[right] < x) {
            left = (left + 1) % n;
        } else {  // Move to the lower sum side
            right = (n + right - 1) % n;
        }
    }
    return false;
}

if (require.main === module) {
    // Example usage
    const arr = [11, 15, 6, 8, 9, 10];
    const total = 16;
    const n = arr.length;
    
    if (pairInSortedRotated(arr, n, total)) {
        console.log(`Array has two elements with sum ${total}`);
    } else {
        console.log(`Array doesn't have two elements with sum ${total}`);
    }
}
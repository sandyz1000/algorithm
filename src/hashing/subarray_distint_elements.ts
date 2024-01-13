/* 
Subarrays with distinct elements
Given an array, the task is to calculate the sum of lengths of contiguous sub-arrays having all
elements distinct.

----------------------------------------------------
Examples:
----------------------------------------------------

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - +
Input :  arr[] = {1, 2, 3}
Output : 10

{1, 2, 3} is a subarray of length 3 with distinct elements. Total length of length three = 3.
{1, 2}, {2, 3} are 2 subarray of length 2 with distinct elements.
Total length of lengths two = 2 + 2 = 4
{1}, {2}, {3} are 3 subarrays of length 1 with distinct element.
Total lengths of length one = 1 + 1 + 1 = 3

Sum of lengths = 3 + 4 + 3 = 10

Input :  arr[] = {1, 2, 1}
Output : 7

Input :  arr[] = {1, 2, 3, 4}
Output : 20
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - +

----------------------------------------------------
Explanations:
----------------------------------------------------

==Method-1:==

A simple solution is to consider all sub-arrays and for every subarray check if it has
distinct elements or not using hashing. And add lengths of all sub-arrays having distinct
elements. If we use hashing to find distinct elements, then this approach takes O(n^2) time
under the assumption that hashing search and insert operations take O(1) time.

==Method-2:==

An efficient solution is based on the fact that if we know all elements in a subarray arr[i..j]
are distinct, sum of all lengths of distinct element subarrays in this sub array is
((j-i+1)*( j-i+2))/2. How? the possible lengths of subarrays are 1, 2, 3,..., (j + 1) - i. So,
the sum will be ( (j - i +1)*(j - i +2))/2, where size_of_list = j + 1

We first find largest subarray (with distinct elements) starting from first element. We count
sum of lengths in this subarray using above formula. For finding next subarray of the
distinct element, we increment starting point, i and ending point, j unless (i+1,
j) are distinct. If not possible, then we increment i again and move forward the same way.

Time Complexity of this solution is O(n). Note that the inner loop runs n times in total as
j goes from 0 to n across all outer loops. So we do O(2n) operations which is same as O(n).

Returns sum of lengths of all subarrays with distinct elements.
 */

function sumOfLength(arr: number[]): number {
    const set = new Set<number>();
    let j = 0;
    let ans = 0;

    for (let i = 0; i < arr.length; i++) {
        while (j < arr.length && !set.has(arr[j])) {
            set.add(arr[j]);
            j++;
        }

        ans += ((j - i) * (j - i + 1)) / 2;

        set.delete(arr[i]);
    }

    return ans;
}

// Output: 20
const arr: number[] = [1, 2, 3, 4];
console.log(sumOfLength(arr));

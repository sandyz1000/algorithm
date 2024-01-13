/** 456
 *
 * ======
 *
 * Task.
 
Given an array of n integers nums, a 132 pattern is a subsequence of three integers nums[i], nums[j] 
and nums[k] such that i < j < k and nums[i] < nums[k] < nums[j].

Return true if there is a 132 pattern in nums, otherwise return false.


Example 1:
---------
Input: nums = [1,2,3,4]
Output: false
Explanation: There is no 132 pattern in the sequence.

Example 2:
---------
Input: nums = [3,1,4,2]
Output: true
Explanation: There is a 132 pattern in the sequence: [1, 4, 2].

Example 3:
---------
Input: nums = [-1,3,2,0]
Output: true
Explanation: There are three 132 patterns in the sequence: [-1, 3, 2], [-1, 3, 0] and [-1, 2, 0].
 

One of the ways to go about applying MQ here is to use MQ for '13' out of '132' pattern, which means
having a decreasing MQ, going from right to left. Now, let’s look at the first slide - in this case
our '1' is 1, '3' is 5 and '2' is 4. We know that the '2' should be between '1' and ‘3’, and the definite
‘2’ (most likely to be the answer) will be the biggest ‘2’ we can find, and the biggest ‘2’ is the
last ‘2’ we can remove with ‘3’ from the queue. Then our task is just to find if we have the ‘1’ which
is smaller then the ‘2’ we already got.


Constraints:
------------
n == nums.length
1 <= n <= 3 * 104
-109 <= nums[i] <= 109

 * ======
 *
 * Source: Leetcode

 */

import { Deque } from 'datastructures-js';

function find132pattern(nums: number[]): boolean {
    class MQ {
        private queue: Deque<number> = new Deque();
        private prev: number = Number.MIN_SAFE_INTEGER;

        push(cur: number): boolean {
            if (this.prev > cur) {
                return true;
            }

            while (this.queue.size() > 0 && this.queue.back() < cur) {
                this.prev = this.queue.back();
                this.queue.popBack();
            }

            this.queue.pushBack(cur);
            return false;
        }
    }

    const queue = new MQ();
    for (let i = nums.length - 1; i >= 0; i--) {
        if (queue.push(nums[i])) {
            return true;
        }
    }
    return false;
}

if (require.main === module) {
// Example usage
// const nums1: number[] = [1, 2, 3, 4]; // False
const nums2: number[] = [-1, 3, 2, 0]; // True
// console.log("Found pattern: ", find132pattern(nums1));
console.log("Found pattern: ", find132pattern(nums2));
}
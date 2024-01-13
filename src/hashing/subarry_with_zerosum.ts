/* 
Print all subarrays with 0 sum
Given an array, print all subarrays in the array which has sum 0.

------------------------------------------------------------
Examples:
------------------------------------------------------------

Input:  arr = [6, 3, -1, -3, 4, -2, 2, 4, 6, -12, -7]

Output:
Subarray found from Index 2 to 4
Subarray found from Index 2 to 6
Subarray found from Index 5 to 6
Subarray found from Index 6 to 9
Subarray found from Index 0 to 10

-------------------------------------------------------------

Find subarray with given sum | Set 1 (Nonnegative Numbers)
Given an unsorted array of nonnegative integers, find a continous subarray which adds to a given
number.

Examples:

Input: arr[] = {1, 4, 20, 3, 10, 5}, sum = 33
Ouptut: Sum found between indexes 2 and 4

Input: arr[] = {1, 4, 0, 0, 3, 10, 5}, sum = 7
Ouptut: Sum found between indexes 1 and 4

Input: arr[] = {1, 4}, sum = 0
Output: No subarray found
-------------------------------------------------------------

Find subarray with given sum | Set 2 (Handles Negative Numbers)

Given an unsorted array of integers, find a subarray which adds to a given number. If there are
more than one subarrays with sum as the given number, print any of them.

Examples:

Input: arr[] = {1, 4, 20, 3, 10, 5}, sum = 33
Ouptut: Sum found between indexes 2 and 4

Input: arr[] = {10, 2, -2, -20, 10}, sum = -10
Ouptut: Sum found between indexes 0 to 3

Input: arr[] = {-10, 0, 2, -2, -20, 10}, sum = 20
Ouptut: No subarray with given sum exists


Explanation:-

A simple solution is to consider all subarrays one by one and check if sum of every
subarray is equal to 0 or not. The complexity of this solution would be O(n^2).

A better approach is to use Hashing.

Do following for each element in the array:
1.  Maintain sum of elements encountered so far in a variable (say summation).
2.  If current sum is 0, we found a subarray starting from index 0 and ending at index
    current_index
3.  Check if current sum exists in the hash table or not.
4.  If current sum exists in the hash table, that means we have subarray(s) present with
    0 sum that ends at current_index.
5.  Insert current sum into the hash table

Function to print all subarrays in the array which has sum 0

### Method 1 (Simple)
    A simple solution is to consider all subarrays one by one and check the sum of every subarray.
    Following program implements the simple solution. We run two loops: the outer loop picks a
    starting point i and the inner loop tries all subarrays starting from i.

    # Time Complexity: O(n^2) in worst case.


### Method 2 (Efficient) 
Find subarray with given sum | Set 1 (Non-negative Numbers)
Initialize a variable curr_sum as first element. curr_sum indicates the
sum of current subarray. Start from the second element and add all elements one by one to the
curr_sum. If curr_sum becomes equal to sum, then print the solution. If curr_sum exceeds the
sum, then remove trailing elements while curr_sum is greater than sum.

Time complexity of method 2 looks more than O(n), but if we take a closer look at the
program, then we can figure out the time complexity is O(n). We can prove it by counting
the number of operations performed on every element of arr[] in worst case. There are at
most 2 operations performed on every element: (a) the element is added to the curr_sum (b)
the element is subtracted from curr_sum. So the upper bound on number of operations is 2n
which is O(n).

### Method-3
Find subarray with given sum | Set 2 (Handles Negative Numbers)

A simple solution is to consider all subarrays one by one and check if sum of every subarray is
equal to given sum or not. The complexity of this solution would be O(n^2).

An efficient way is to use a map. The idea is to maintain sum of elements encountered so far in
a variable (say curr_sum). Let the given number is sum. Now for each element, we check if
curr_sum - sum exists in the map or not. If we found it in the map that means, we have a
subarray present with given sum, else we insert curr_sum into the map and proceed to next
element. If all elements of the array are processed and we didn't find any subarray with given
sum, then subarray doesn't exists.

Time complexity of above solution is O(n) as we are doing only one traversal of the array.
Auxiliary space used by the program is O(n).
 */


export type Pair = { first: number; second: number };

export class SubArrayZeroSum {
    findSubArrays(arr: number[]): Pair[] {
        const hmap: { [key: number]: number[] } = {};
        const out: Pair[] = [];
        let summation = 0;

        for (let i = 0; i < arr.length; i++) {
            summation += arr[i];

            if (summation === 0) {
                out.push({ first: 0, second: i });
            }

            if (summation in hmap) {
                const vc = hmap[summation];
                for (const it of vc) {
                    out.push({ first: it + 1, second: i });
                }
            }

            hmap[summation] = hmap[summation] || [];
            hmap[summation].push(i);
        }

        return out;
    }

    printer(out: Pair[]): void {
        for (const it of out) {
            console.log(`Subarray found from Index ${it.first} to ${it.second}`);
        }
    }
}

export class SubArrayGivenSumm {
    subArraySumMethod(arr: number[], summation: number): void {
        for (let i = 0; i < arr.length; i++) {
            let currSum = arr[i];
            for (let j = i + 1; j <= arr.length; j++) {
                if (currSum === summation) {
                    const p = j - 1;
                    console.log(`Sum found between indexes ${i} and ${p}`);
                    return;
                }

                if (currSum > summation || j === arr.length) {
                    break;
                }

                currSum += arr[j];
            }
        }

        console.log("No subarray found");
    }
}

export class SubArrayGivenSummEffi {
    subArraySumMethod(arr: number[], summation: number): void {
        let currSum = arr[0];
        let start = 0;

        for (let i = 1; i <= arr.length; i++) {
            while (currSum > summation && start < i - 1) {
                currSum -= arr[start];
                start++;
            }

            if (currSum === summation) {
                const p = i - 1;
                console.log(`Sum found between indexes ${start} and ${p}`);
                return;
            }

            if (i < arr.length) {
                currSum += arr[i];
            }
        }

        console.log("No subarray found");
    }
}

export class SubArrayGivenSumNegative {
    subArraySumMethod(arr: number[], summation: number): void {
        const hmap: { [key: number]: number } = {};
        let currSum = 0;

        for (let i = 0; i < arr.length; i++) {
            currSum += arr[i];

            if (currSum === summation) {
                console.log(`Sum found between indexes 0 to ${i}`);
                return;
            }

            if ((currSum - summation) in hmap) {
                console.log(`Sum found between indexes ${hmap[currSum - summation] + 1} to ${i}`);
                return;
            }

            hmap[currSum] = i;
        }

        console.log("No subarray with given sum exists");
    }
}

if (require.main === module) {
    console.log("\n ----- Method-0 ------ ");
    const summZero = new SubArrayZeroSum();
    const arrZero = [6, 3, -1, -3, 4, -2, 2, 4, 6, -12, -7];
    const outZero = summZero.findSubArrays(arrZero);
    if (outZero.length === 0) {
        console.log("No sub-array exists");
    } else {
        summZero.printer(outZero);
    }

    console.log("\n ----- Method-1 ------ ");
    const summOne = new SubArrayGivenSumm();
    const arrOne = [15, 2, 4, 8, 9, 5, 10, 23];
    const summationOne = 23;
    summOne.subArraySumMethod(arrOne, summationOne);

    console.log("\n ------ Method-2 ------");
    const summTwo = new SubArrayGivenSummEffi();
    const arrTwo = [15, 2, 4, 8, 9, 5, 10, 23];
    const summationTwo = 23;
    summTwo.subArraySumMethod(arrTwo, summationTwo);

    console.log("\n ------- Method-3 ------");
    const summThree = new SubArrayGivenSumNegative();
    const arrThree = [10, 2, -2, -20, 10];
    const summationThree = -10;
    summThree.subArraySumMethod(arrThree, summationThree);
}

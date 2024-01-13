/* """
Given an array of of size n and a number k, find all elements that appear more than n/k times
Given an array of size n, find all elements in array that appear more than n/k times.

For example, if the input arrays is {3, 1, 2, 2, 1, 2, 3, 3} and k is 4, then the output should
be [2, 3]. Note that size of array is 8 (or n = 8), so we need to find all elements that appear
more than 2 (or 8/4) times. There are two elements that appear more than two times, 2 and 3.

==Method:==

We can solve the above problem in O(nk) time using O(k-1) extra space.
Note that there can never be more than k-1 elements in output (Why?).

There are mainly three steps in this algorithm.

1) Create a temporary array of size (k-1) to store elements and their counts (The output elements
are going to be among these k-1 elements). 
Following is structure of temporary array elements.
- - - - - - - - - - - - - - - -
    class EleCount:
        element = 0
        count = 0

- - - - - - - - - - - - - - - -
This step takes O(k) time.

2) Traverse through the input array and update temp[] (add/remove an element or increase/decrease
count) for every traversed element. The array temp[] stores potential (k-1) candidates at every
step. This step takes O(nk) time.

3) Iterate through final (k-1) potential candidates (stored in temp[]). or every element,
check if it actually has count more than n/k. This step takes O(nk) time.

---------------------------------------------

The main step is step 2, how to maintain (k-1) potential candidates at every point? The steps used
in step 2 are like famous game: Tetris. We treat each number as a piece in Tetris, which falls
down in our temporary array temp[]. Our task is to try to keep the same number stacked on the
same column (count in temporary array is incremented).

------------------------------------------------------
Example:
------------------------------------------------------

Consider k = 4, n = 9
Given array: 3 1 2 2 2 1 4 3 3

i = 0
         3 _ _
temp[] has one element, 3 with count 1

i = 1
         3 1 _
temp[] has two elements, 3 and 1 with counts 1 and 1 respectively

i = 2
         3 1 2
temp[] has three elements, 3, 1 and 2 with counts as 1, 1 and 1 respectively.

i = 3
         - - 2
         3 1 2
temp[] has three elements, 3, 1 and 2 with counts as 1, 1 and 2 respectively.

i = 4
         - - 2
         - - 2
         3 1 2
temp[] has three elements, 3, 1 and 2 with counts as 1, 1 and 3 respectively.

i = 5
         - - 2
         - 1 2
         3 1 2
temp[] has three elements, 3, 1 and 2 with counts as 1, 2 and 3 respectively.

---------------------------------------------
Now the question arises, what to do when temp[] is full and we see a new element - we remove the
bottom row from stacks of elements, i.e., we decrease count of every element by 1 in temp[].
We ignore the current element.

i = 6
         - - 2
         - 1 2
temp[] has two elements, 1 and 2 with counts as 1 and 2 respectively.

i = 7
           - 2
         3 1 2
temp[] has three elements, 3, 1 and 2 with counts as 1, 1 and 2 respectively.

i = 8
         3 - 2
         3 1 2
temp[] has three elements, 3, 1 and 2 with counts as 2, 1 and 2 respectively.
---------------------------------------------
Finally, we have at most k-1 numbers in temp[]. The elements in temp are {3, 1, 2}. Note that the
counts in temp[] are useless now, the counts were needed only in step 2. Now we need to check
whether the actual counts of elements in temp[] are more than n/k (9/4) or not. The elements 3
and 2 have counts more than 9/4. So we print 3 and 2.

Note that the algorithm doesn't miss any output element. There can be two possibilities,
many occurrences are together or spread across the array. If occurrences are together, then count
will be high and won't become 0. If occurrences are spread, then the element would come again in
temp[].

Program to print elements with count more than n/k


Prints elements with more than n/k occurrences in arr[] of size n. If there are no such
elements, then it prints nothing.
Time Complexity: O(nk)
Auxiliary Space: O(k)


*/

export class ElementCount {
    constructor(public e: number = 0, public c: number = 0) {}
}

function moreThanNDK(arr: number[], n: number, k: number): void {
    let j = 0;

    // k must be greater than 1 to get some output
    if (k < 2) {
        return;
    }

    // Step 1: Create a temporary array (contains element and count) of size k-1. Initialize count
    // of all elements as 0
    const temp: ElementCount[] = new Array(k - 1).fill(new ElementCount());

    // Step 2: Process all elements of the input array
    for (let i = 0; i < n; i++) {
        // If arr[i] is already present in the element count array, then increment its count
        j = 0;
        while (j < k - 1) {
            if (temp[j].e === arr[i]) {
                temp[j].c += 1;
                break;
            }
            j += 1;
        }

        // If arr[i] is not present in temp[]
        if (j === k - 1) {
            // If there is a position available in temp[], then place arr[i] in the first available
            // position and set count as
            let location = 0;
            while (location < k - 1) {
                if (temp[location].c === 0) {
                    temp[location].e = arr[i];
                    temp[location].c = 1;
                    break;
                }
                location += 1;
            }

            // If all the positions in temp[] are filled, then decrease the count of every element
            // by 1
            if (location === k - 1) {
                for (let i = 0; i < k - 1; i++) {
                    temp[i].c -= 1;
                }
            }
        }
    }

    // Step 3: Check actual counts of potential candidates in temp[]
    for (let i = 0; i < k - 1; i++) {
        // Calculate the actual count of elements
        let ac = 0; // actual count
        for (let j = 0; j < n; j++) {
            if (arr[j] === temp[i].e) {
                ac += 1;
            }
        }

        // If the actual count is more than n/k, then print it
        if (ac > n / k) {
            console.log(`Number: ${temp[i].e} Count: ${ac}`);
        }
    }
}

if (require.main === module) {
    // Example usage
    console.log("First Test");
    const arr1 = [4, 5, 6, 4, 4, 7, 8];
    const size1 = arr1.length;
    const k1 = 3;
    moreThanNDK(arr1, size1, k1);
    
    console.log("\nSecond Test");
    const arr2 = [4, 2, 2, 7];
    const size2 = arr2.length;
    const k2 = 3;
    moreThanNDK(arr2, size2, k2);
    
    console.log("\nThird Test");
    const arr3 = [2, 7, 2];
    const size3 = arr3.length;
    const k3 = 2;
    moreThanNDK(arr3, size3, k3);
    
    console.log("\nFourth Test");
    const arr4 = [2, 3, 3, 2];
    const size4 = arr4.length;
    const k4 = 3;
    moreThanNDK(arr4, size4, k4);
}

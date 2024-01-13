/* 
## Recursive Bubble Sort

Background :

Bubble Sort is the simplest sorting algorithm that works by repeatedly swapping the adjacent
elements if they are in wrong order.

--------------------------------
Example:
--------------------------------
First Pass:
( 5 1 4 2 8 ) –> ( 1 5 4 2 8 ), Here, algorithm compares the first two elements, and swaps since
                                5 > 1.
( 1 5 4 2 8 ) –> ( 1 4 5 2 8 ), Swap since 5 > 4
( 1 4 5 2 8 ) –> ( 1 4 2 5 8 ), Swap since 5 > 2
( 1 4 2 5 8 ) –> ( 1 4 2 5 8 ), Now, since these elements are already in order (8 > 5), algorithm
                                does not swap them.

Second Pass:
( 1 4 2 5 8 ) –> ( 1 4 2 5 8 )
( 1 4 2 5 8 ) –> ( 1 2 4 5 8 ), Swap since 4 > 2
( 1 2 4 5 8 ) –> ( 1 2 4 5 8 )
( 1 2 4 5 8 ) –> ( 1 2 4 5 8 )

Now, the array is already sorted, but our algorithm does not know if it is completed. The algorithm
needs one whole pass without any swap to know it is sorted.

Third Pass:
( 1 2 4 5 8 ) –> ( 1 2 4 5 8 )
( 1 2 4 5 8 ) –> ( 1 2 4 5 8 )
( 1 2 4 5 8 ) –> ( 1 2 4 5 8 )
( 1 2 4 5 8 ) –> ( 1 2 4 5 8 )

How to implement it recursively?

Recursive Bubble Sort has no performance/implementation advantages, but can be a good question to
check one's understanding of Bubble Sort and recursion.
If we take a closer look at Bubble Sort algorithm, we can notice that in first pass, we move
largest element to end (Assuming sorting in increasing order). In second pass, we move second
largest element to second last position and so on.

Recursion Idea.

Base Case: If array size is 1, return.
Do One Pass of normal Bubble Sort. This pass fixes last element of current subarray.
Recur for all elements except last of current subarray.

 */

export class GFG {
    // A function to implement bubble sort
    bubbleSort(arr: number[], n: number): void {
        if (n === 1) {
            return; // Base case
        }

        // One pass of bubble sort. After this pass, the largest element is moved
        // (or bubbled) to the end.
        for (let i = 0; i < n - 1; i++) {
            if (arr[i] > arr[i + 1]) {
                // swap arr[i], arr[i+1]
                [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
            }
        }

        // Largest element is fixed, recur for the remaining array
        this.bubbleSort(arr, n - 1);
    }
}

if (require.main === module) {
    // Output: Sorted array: 11 12 22 25 34 64 90
    const arr = [64, 34, 25, 12, 22, 11, 90];
    const test = new GFG();
    test.bubbleSort(arr, arr.length);
    console.log("Sorted array:", arr);
}

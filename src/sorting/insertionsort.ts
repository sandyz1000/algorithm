/* Insertion Sort
Insertion sort is a simple sorting algorithm that works the way we sort playing cards in our hands.

Algorithm:
1. Loop from i = 1 to n-1.
2.  a) Pick element arr[i] and insert it into sorted sequence arr[0...i-1]

Another Example:
12, 11, 13, 5, 6

Let us loop for i = 1 (second element of the array) to 5 (Size of input array)

i = 1. Since 11 is smaller than 12, move 12 and insert 11 before 12
11, 12, 13, 5, 6

i = 2. 13 will remain at its position as all elements in A[0..I-1] are smaller than 13
11, 12, 13, 5, 6

i = 3. 5 will move to the beginning and all other elements from 11 to 13 will move one
position ahead of their current position.
5, 11, 12, 13, 6

i = 4. 6 will move to position after 5, and elements from 11 to 13 will move one position
ahead of their current position.
5, 6, 11, 12, 13



---------------------------------------------
Analysis:
---------------------------------------------
Time Complexity: O(n*n)
Auxiliary Space: O(1)

Boundary Cases: Insertion sort takes maximum time to sort if elements are sorted in reverse
order. And it takes minimum time (Order of n) when elements are already sorted.
Algorithmic Paradigm: Incremental Approach
Sorting In Place: Yes
Stable: Yes
Online: Yes  */

function insertionSort(arr: number[]): void {
    const size: number = arr.length;

    for (let i: number = 1; i < size; i++) {
        const key: number = arr[i];
        let j: number = i - 1;

        while (j >= 0 && key < arr[j]) {
            arr[j + 1] = arr[j];
            j--;
        }

        arr[j + 1] = key;
    }
}

if (require.main === module) {
    const arr: number[] = [12, 11, 13, 5, 6];
    insertionSort(arr);
    console.log(arr);
}

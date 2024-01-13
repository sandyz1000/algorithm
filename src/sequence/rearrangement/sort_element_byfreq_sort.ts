/* """
Sort elements by frequency | Set 1
Print the elements of an array in the decreasing frequency if 2 numbers have same frequency then
print the one which came first.

Examples:

Input:  arr[] = {2, 5, 2, 8, 5, 6, 8, 8}
Output: arr[] = {8, 8, 8, 2, 2, 5, 5, 6}

Input: arr[] = {2, 5, 2, 6, -1, 9999999, 5, 8, 8, 8}
Output: arr[] = {8, 8, 8, 2, 2, 5, 5, 6, -1, 9999999}

-------------------------------------------------------
Explanations:
-------------------------------------------------------

METHOD 1 (Use Sorting)

1) Use a sorting algorithm to sort the elements O(nlogn)
2) Scan the sorted array and construct a 2D array of element and count O(n).
3) Sort the 2D array according to count O(nlogn).

Example:

Input 2 5 2 8 5 6 8 8

After sorting we get 2 2 5 5 6 8 8 8

Now construct the 2D array as
2, 2
5, 2
6, 1
8, 3

Sort by count
8, 3
2, 2
5, 2
6, 1

How to maintain order of elements if frequency is same?
The above approach doesn't make sure order of elements if frequency is same. To handle this, we
should use indexes in step 3, if two counts are same then we should first process(or print) the
element with lower index. In step 1, we should store the indexes instead of elements.

Input 5  2  2  8  5  6  8  8

After sorting we get
Element 2 2 5 5 6 8 8 8
Index   1 2 0 4 5 3 6 7

Now construct the 2D array as
Index, Count
1,      2
0,      2
5,      1
3,      3

Sort by count (consider indexes in case of tie)
3, 3
0, 2
1, 2
5, 1

Print the elements using indexes in the above 2D array.
 */


export class Element {
    count: number;
    index: number;
    val: number;

    constructor(count = 0, index = 0, val = 0) {
        this.count = count;
        this.index = index;
        this.val = val;
    }
}

function mycomp(a: Element, b: Element): number {
    return a.val - b.val;
}

function mycomp2(a: Element, b: Element): number {
    return a.count - b.count !== 0 ? a.count - b.count : a.index - b.index;
}

function sortByFrequency(arr: number[]): void {
    const n = arr.length;
    const element: Element[] = arr.map((value, i) => new Element(0, i, value));

    // Sort the structure elements according to value, we used stable sort so relative order
    // is maintained.
    element.sort(mycomp);

    // Initialize count of the first element as 1
    element[0].count = 1;

    // Count occurrences of remaining elements
    for (let i = 1; i < n; i++) {
        if (element[i].val === element[i - 1].val) {
            element[i].count += element[i - 1].count + 1;

            // Set count of the previous element as -1, we are doing this because we'll again sort on
            // the basis of counts (if counts are equal then on the basis of index)
            element[i - 1].count = -1;

            // Retain the first index (Remember the first index is always present in the first duplicate
            // we used a stable sort.
            element[i].index = element[i - 1].index;
        } else {
            // Else If the previous element is not equal to the current, so set the count to 1
            element[i].count = 1;
        }
    }

    // Now we have counts and the first index for each element so now sort on the basis of count and
    // in case of a tie, use index to sort.
    element.sort(mycomp2);

    let index = 0;
    for (let i = n - 1; i >= 0; i--) {
        if (element[i].count !== -1) {
            for (let j = 0; j < element[i].count; j++) {
                arr[index] = element[i].val;
                index++;
            }
        }
    }
}

if (require.main === module) {
    // Example usage:
    const arr: number[] = [2, 5, 2, 6, -1, 9999999, 5, 8, 8, 8];
    sortByFrequency(arr);
    console.log(arr); // Output: [8, 8, 8, 2, 2, 5, 5, 6, -1, 9999999]
}

/* """
Sort an array according to absolute difference with given value
Given an array of n distinct elements and a number x, arrange array elements according to the
absolute difference with x, i. e., element having minimum difference comes first and so on.
Note : If two or more elements are at equal distance arrange them in same sequence as in the
given array.

------------------------------------
Examples :
------------------------------------
Input : arr[] : x = 7, arr[] = {10, 5, 3, 9, 2}
Output : arr[] = {5, 9, 10, 3, 2}
Explanation:
7 - 10 = 3(abs)
7 - 5 = 2
7 - 3 = 4
7 - 9 = 2(abs)
7 - 2 = 5

So according to the difference with X, elements are arranged as 5, 9, 10, 3, 2.

Input : x = 6, arr[] = {1, 2, 3, 4, 5}
Output :  arr[] = {5, 4, 3, 2, 1}

Input : x = 5, arr[] = {2, 6, 8, 3}
Output :  arr[] = {6, 3, 2, 8}

------------------------------------
Explanation:
------------------------------------
The idea is to use a self balancing binary search tree. We traverse input array and for every
element, we find its difference with x and store the difference as key and element as value in
self balancing binary search tree. Finally we traverse the tree and print its inorder traversal
which is required output.

Time Complexity : O(n Log n)
Auxiliary Space : O(n)

It can also be done with compare and swap method
"""
 */

export class Pair {
    first: number | null = null;
    second: number | null = null;
}

function rearrange(arr: number[], n: number, x: number): void {
    // Store values in a map with the difference with X as key
    const m: Pair[] = arr.map((value) => {
        const pair = new Pair();
        pair.first = Math.abs(x - value);
        pair.second = value;
        return pair;
    });

    m.sort((a, b) => a.first! - b.first!);

    let i = 0;

    // Update the values of array
    m.forEach((item) => {
        if (item.second !== null) {
            arr[i] = item.second;
            i++;
        }
    });
}

if (require.main === module) {

    // Example usage:
    const arr: number[] = [10, 5, 3, 9, 2];
    const n: number = arr.length;
    const x: number = 7;
    
    rearrange(arr, n, x);
    console.log(arr); // Output: [5, 9, 10, 3, 2]
} 

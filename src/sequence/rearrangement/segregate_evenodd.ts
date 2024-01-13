/* """
Segregate Even and Odd numbers
Given an array A[], write a function that segregates even and odd numbers. The functions should put
all even numbers first, and then odd numbers.

------------------------------------
Example
------------------------------------
Input  = {12, 34, 45, 9, 8, 90, 3}
Output = {12, 34, 8, 90, 45, 9, 3}
In the output, order of numbers can be changed, i.e., in the above example 34 can come before 12
and 3 can come before 9.

Time Complexity: O(n)
 */

function segregateEvenOdd(arr: number[]): void {
    let left: number = 0;
    let right: number = arr.length - 1;

    while (left < right) {
        while (arr[left] % 2 === 0 && left < right) {
            left++;
        }

        while (arr[right] % 2 === 1 && left < right) {
            right--;
        }

        if (left < right) {
            [arr[left], arr[right]] = [arr[right], arr[left]];
            left++;
            right--;
        }
    }
}

if (require.main === module) {
    // Example usage:
    const arr: number[] = [12, 34, 45, 9, 8, 90, 3];
    segregateEvenOdd(arr);
    console.log("Array after segregation:");
    console.log(arr);
}

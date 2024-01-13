/* 
Arrange given numbers to form the biggest number | Set 1
Given an array of numbers, arrange them in a way that yields the largest value.
------------------------------------
Example:
------------------------------------
If the given numbers are {54, 546, 548, 60}, the arrangement 6054854654 gives the largest value.
And if the given numbers are {1, 34, 3, 98, 9, 76, 45, 4}, then the arrangement 998764543431 gives
the largest value

Explanation:

A simple solution that comes to our mind is to sort all numbers in descending order, but simply
sorting doesn't work. For example, 548 is greater than 60, but in output 60 comes before 548.
As a second example, 98 is greater than 9, but 9 comes before 98 in output.

So how do we go about it? The idea is to use any comparison based sorting algorithm. In the
used sorting algorithm, instead of using the default comparison, write a comparison function
myCompare() and use it to sort numbers. Given two numbers X and Y, how should myCompare()
decide which number to put first - we compare two numbers XY (Y appended at the end of X) and
YX (X appended at the end of Y). If XY is larger, then X should come before Y in output,
else Y should come before. For example, let X and Y be 542 and 60. To compare X and Y,
we compare 54260 and 60542. Since 60542 is greater than 54260, we put Y first.

The main function that prints the arrangement with the largest value. The
function accepts a vector of strings

 */


function myCompare(X: string, Y: string): number {
    // First, append Y at the end of X
    const XY = X + Y;
    // Then, append X at the end of Y
    const YX = Y + X;
    // Now see which of the two formed numbers is greater
    return XY.localeCompare(YX);
}

function printLargest(arr: string[]): void {
    // Sort the numbers using the comparison function myCompare
    arr.sort(myCompare);
    console.log(arr.join(''));
}

if (require.main === module) {
    // Example usage
    const arr1: string[] = ["54", "546", "548", "60"];
    // Output should be 6054854654
    printLargest(arr1);
    
    const arr2: string[] = ["7", "776", "7", "7"];
    // Output should be 777776
    printLargest(arr2);
    
    const arr3: string[] = ["1", "34", "3", "98", "9", "76", "45", "4"];
    // Output should be 998764543431
    printLargest(arr3);
}

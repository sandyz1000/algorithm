/* """
Segregate 0s and 1s in an array
You are given an array of 0s and 1s in random order. Segregate 0s on left side and 1s on right side
of the array. Traverse array only once.

------------------------------------
Example:
------------------------------------
Input array = [0, 1, 0, 1, 0, 0, 1, 1, 1, 0]
Output array = [0, 0, 0, 0, 0, 1, 1, 1, 1, 1]

------------------------------------
Explanation:
------------------------------------
Method 2 (Use two indexes to traverse)
Maintain two indexes. Initialize first index left as 0 and second index right as n-1.

Do following while left < right
a) Keep incrementing index left while there are 0s at it
b) Keep decrementing index right while there are 1s at it
c) If left < right then exchange arr[left] and arr[right]

Time Complexity: O(n)
 */


function segregate0and1(arr: number[]): number[] {
    let left: number = 0;
    let right: number = arr.length - 1;

    while (left < right) {
        while (arr[left] === 0 && left < right) {
            left++;
        }

        while (arr[right] === 1 && left < right) {
            right--;
        }

        if (left < right) {
            [arr[left], arr[right]] = [arr[right], arr[left]];
            left++;
            right--;
        }
    }

    return arr;
}

if (require.main === module) {
    // Example usage:
    let arr: number[] = [0, 1, 0, 1, 1, 1];
    arr = [0, 1, 0, 1, 0, 0, 1, 1, 1, 0];
    console.log("Array after segregation");
    console.log(segregate0and1(arr));
}

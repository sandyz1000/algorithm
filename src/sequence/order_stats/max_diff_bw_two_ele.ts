/* 
Maximum difference between two elements such that larger element appears after the smaller number
Given an array arr[] of integers, find out the difference between any two elements such that larger
element appears after the smaller number in arr[].

Examples:
If array is [2, 3, 10, 6, 4, 8, 1] then returned value should be 8 (Diff between 10 and 2).
If array is [ 7, 9, 5, 6, 3, 2 ] then returned value should be 2 (Diff between 7 and 9)

----------------------------------------------------------------
Method 2 (Tricky and Efficient)
----------------------------------------------------------------
In this method, instead of taking difference of the picked element with every other element,
we take the difference with the minimum element found so far. So we need to keep track of 2 things:

1)  Maximum difference found so far (max_diff).
2)  Minimum number visited so far (min_element)


 */

// The function assumes that there are at least two elements in array. The function returns a
// negative value if the array is sorted in decreasing order. Returns 0 if elements are equal

function maxDiff(arr: number[], arrSize: number): number {
    let maxDiffVar = arr[1] - arr[0];
    let minElement = arr[0];
    
    for (let i = 1; i < arrSize; i++) {
        if (arr[i] - minElement > maxDiffVar) {
            maxDiffVar = arr[i] - minElement;
        }
        
        if (arr[i] < minElement) {
            minElement = arr[i];
        }
    }
    
    return maxDiffVar;
}

if (require.main === module) {
    // Test
    const arr = [1, 2, 6, 80, 100];
    // const arr = [7, 9, 5, 6, 3, 2];
    const size = arr.length;
    console.log("Maximum difference is " + maxDiff(arr, size));
}

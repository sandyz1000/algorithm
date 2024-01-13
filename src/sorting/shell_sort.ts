/* 

## ShellSort

ShellSort is mainly a variation of Insertion Sort. In insertion sort, we move elements only one
position ahead. When an element has to be moved far ahead, many movements are involved. The idea
of shellSort is to allow exchange of far items. In shellSort, we make the array h-sorted for a
large value of h. We keep reducing the value of h until it becomes 1. An array is said to be
h-sorted if all sublists of every h’th element is sorted. 

# Time Complexity: Time complexity of above implementation of shell-sort is O(n2). In the above
# implementation gap is reduce by half in every iteration. There are many other ways to reduce
# gap which lead to better time complexity.


 */

function shellSort(arr: number[]): void {
    // Start with a big gap, then reduce the gap
    const n: number = arr.length;
    let gap: number = Math.floor(n / 2);

    // Do a gaped insertion sort for this gap size.
    // The first gap elements a[0..gap-1] are already in gaped
    // order keep adding one more element until the entire array is gap sorted
    while (gap > 0) {
        for (let i = gap; i < n; i++) {
            // add a[i] to the elements that have been gap sorted save a[i] in
            // temp and make a hole at position i
            const temp: number = arr[i];

            // shift earlier gap-sorted elements up until the correct location for a[i] is found
            let j: number = i;
            while (j >= gap && arr[j - gap] > temp) {
                arr[j] = arr[j - gap];
                j -= gap;
            }

            // put temp (the original a[i]) in its correct location
            arr[j] = temp;
        }
        gap = Math.floor(gap / 2);
    }
}

if (require.main === module) {
    const arr: number[] = [12, 34, 54, 2, 3];
    console.log("Array before sorting:", arr);
    shellSort(arr);
    console.log("\nArray after sorting:", arr);
}

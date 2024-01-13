/* Block swap algorithm for array rotation

Write a function rotate(ar[], d, n) that rotates arr[] of size n by d elements.
[1, 2, 3, 4, 5, 6, 7 ]

Rotation of the above array by 2 will make array
[3, 4, 5, 6, 7, 1, 2]  

### Recursion method
Initialize A = arr[0..d-1] and B = arr[d..n-1]

1) Do following until size of A is equal to size of B
    a) If A is shorter, divide B into Bl and Br such that Br is of same length as A.
    Swap A and Br to change ABlBr into BrBlA. Now A is at its final place, so recur on
    pieces of B.
    b) If A is longer, divide A into Al and Ar such that Al is of same length as B Swap Al
    and B to
    change AlArB into BArAl. Now B is at its final place, so recur on pieces of A.
2)  Finally when A and B are of equal size, block swap them

Time Complexity: O(n)

### Iterator method
Initialize A = arr[0..d-1] and B = arr[d..n-1]

1) Do following until size of A is equal to size of B
    a) If A is shorter, divide B into Bl and Br such that Br is of same length as A.
        Swap A and Br to change ABlBr into BrBlA. Now A is at its final place, so recur on
        pieces of B.
    b) If A is longer, divide A into Al and Ar such that Al is of same length as B Swap Al
        and B to change AlArB into BArAl. Now B is at its final place, so recur on pieces
        of A.
2)  Finally when A and B are of equal size, block swap them

Time Complexity: O(n)
*/



export class BlockSwap {
    leftRotateRec(arr: number[], d: number, n: number, start: number = 0): void {
        if (d === 0 || d === n) {
            return;
        }

        if (n - d === d) {
            this.swap(arr, start, n - d, d);
            return;
        }

        if (d < n - d) {
            this.swap(arr, start, n - d, d);
            this.leftRotateRec(arr, d, n - d, start);
        } else {
            this.swap(arr, start, d, n - d);
            this.leftRotateRec(arr, 2 * d - n, d, start + n - d);
        }
    }

    leftRotateIter(arr: number[], d: number, n: number): void {
        if (d === 0 || d === n) {
            return;
        }

        let i = d;
        let j = n - d;

        while (i !== j) {
            if (i < j) {
                this.swap(arr, d - i, d + j - i, i);
                j -= i;
            } else {
                this.swap(arr, d - i, d, j);
                i -= j;
            }
        }

        this.swap(arr, d - i, d, i);
    }

    private swap(arr: number[], fi: number, si: number, d: number): void {
        for (let i = 0; i < d; i++) {
            const temp = arr[fi + i];
            arr[fi + i] = arr[si + i];
            arr[si + i] = temp;
        }
    }
}

if (require.main === module) {
    // Example usage
    const blockSwap = new BlockSwap();
    const arr: number[] = [1, 2, 3, 4, 5, 6, 7];
    const arr1: number[] = [...arr];
    const arr2: number[] = [...arr];
    
    blockSwap.leftRotateIter(arr2, 2, 7);
    console.log("\nIterative method to swap block", arr2);
    
    blockSwap.leftRotateRec(arr1, 2, 7);
    console.log("\nRecursive method to swap block", arr1);
}

/* """
Sort elements by frequency | Set 2
Given an array of integers, sort the array according to frequency of elements.

------------------------------------
Example:
------------------------------------
if the input array is {2, 3, 2, 4, 5, 12, 2, 3, 3, 3, 12}, then modify the array
to {3, 3, 3, 3, 2, 2, 2, 12, 12, 4, 5}.

------------------------------------
Algorithm:
------------------------------------
Following is detailed algorithm.
1) Create a BST and while creating BST maintain the count i,e frequency of each coming element in
same BST. This step may take O(nLogn) time if a self balancing BST is used.

2) Do Inorder traversal of BST and store every element and count of each element in an auxiliary
array. Let us call the auxiliary array as 'count[]'. Note that every element of this array is
element and frequency pair. This step takes O(n) time.

3) Sort 'count[]' according to frequency of the elements. This step takes O(nLohn) time if a
O(nLogn) sorting algorithm is used.

4) Traverse through the sorted array 'count[]'. For each element x, print it 'freq' times where
'freq' is frequency of x. This step takes O(n) time.

------------------------------------
Complexity:
------------------------------------
Overall time complexity of the algorithm can be minimum O(nLogn) if we use a O(nLogn) sorting
algorithm and use a self balancing BST with O(Logn) insert operation.

 */

export class DataFreq {
    data: number;
    freq: number;

    constructor(data: number, freq: number) {
        this.data = data;
        this.freq = freq;
    }
}

export class BSTNode {
    data: number;
    freq: number;
    left: BSTNode | null;
    right: BSTNode | null;

    constructor(data: number, freq = 1, left: BSTNode | null = null, right: BSTNode | null = null) {
        this.data = data;
        this.freq = freq;
        this.left = left;
        this.right = right;
    }
}

export class BST {
    index: number = 0;

    compare(a: DataFreq, b: DataFreq): number {
        return b.freq - a.freq;
    }

    insert(root: BSTNode | null, data: number): BSTNode {
        if (root === null) {
            return new BSTNode(data);
        }

        if (data === root.data) {
            root.freq += 1;
        } else if (data < root.data) {
            root.left = this.insert(root.left, data);
        } else {
            root.right = this.insert(root.right, data);
        }
        return root;
    }

    store(root: BSTNode | null, count: DataFreq[]): void {
        if (root === null) {
            return;
        }

        this.store(root.left, count);

        count[this.index] = new DataFreq(root.data, root.freq);
        this.index += 1;

        this.store(root.right, count);
    }

    sort_by_frequency(arr: number[]): void {
        let root: BSTNode | null = null;

        for (let i = 0; i < arr.length; i++) {
            root = this.insert(root, arr[i]);
        }

        const count: DataFreq[] = Array.from({ length: this.index }, () => new DataFreq(0, 0));
        this.store(root, count);

        count.sort((a, b) => this.compare(a, b));

        let j = 0;
        for (let i = 0; i < this.index; i++) {
            for (let freq = count[i].freq; freq > 0; freq--) {
                arr[j] = count[i].data;
                j += 1;
            }
        }
    }
}


if (require.main === module) {
    // Example usage:
    const bst = new BST();
    const arr = [2, 3, 2, 4, 5, 12, 2, 3, 3, 3, 12];
    bst.sort_by_frequency(arr);
    console.log(arr); // Output: [3, 3, 3, 3, 2, 2, 2, 12, 12, 5, 4]
}

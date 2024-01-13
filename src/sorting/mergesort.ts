/* 
## Merge Sort

Like QuickSort, Merge Sort is a Divide and Conquer algorithm. It divides input array in two
halves, calls itself for the two halves and then merges the two sorted halves. The merge()
function is used for merging two halves. The merge(arr, l, m, r) is key process that assumes that
arr[l..m] and arr[m+1..r] are sorted and merges the two sorted sub-arrays into one

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
MergeSort(arr[], l,  r)
If r > l
     1. Find the middle point to divide the array into two halves:
             middle m = (l+r)/2
     2. Call mergeSort for first half:
             Call mergeSort(arr, l, m)
     3. Call mergeSort for second half:
             Call mergeSort(arr, m+1, r)
     4. Merge the two halves sorted in step 2 and 3:
             Call merge(arr, l, m, r)

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Python program for implementation of MergeSort
Time Complexity:
Sorting arrays on different machines. Merge Sort is a recursive algorithm and
time complexity can be expressed as following recurrence relation.
T(n) = 2T(n/2) + \Theta(n)

The above recurrence can be solved either using Recurrence Tree method or Master method. It
falls in case II of Master Method and solution of the recurrence is \Theta(nLogn).
Time complexity of Merge Sort is \Theta(nLogn) in all 3 cases (worst, average and best) as
merge sort always divides the array in two halves and take linear time to merge two halves.

Auxiliary Space: O(n)

# Merges two subarrays of arr[].
# First subarray is arr[l..m]
# Second subarray is arr[m+1..r]

----------------------------


## Merge Sort for Linked Lists

Merge sort is often preferred for sorting a linked list. The slow random-access performance of a 
linked list makes some other algorithms (such as quicksort) perform poorly, and others (such as 
heapsort) completely impossible. 

Let head be the first node of the linked list to be sorted and headRef be the pointer to head. Note
that we need a reference to head in MergeSort() as the below implementation changes next links to 
sort the linked lists (not data at the nodes), so head node has to be changed if the data at 
original head is not the smallest value in linked list.

MergeSort(headRef)
1) If head is NULL or there is only one element in the Linked List  then return.
2) Else divide the linked list into two halves.
    FrontBackSplit(head, &a, &b); // a and b are two halves 

3) Sort the two halves a and b.
    MergeSort(a)
    MergeSort(b)

4) Merge the sorted a and b (using SortedMerge() discussed here) and update the head pointer

    
*/


export class Node {
    data: number;
    nextNode: Node | null;

    constructor(data: number, nextNode: Node | null = null) {
        this.data = data;
        this.nextNode = nextNode;
    }
}

export class LinkedList {
    headRef: Node | null;

    constructor(headRef: Node | null = null) {
        this.headRef = headRef;
    }

    printList(): void {
        let node: Node | null = this.headRef;
        while (node !== null) {
            console.log(`${node.data} `);
            node = node.nextNode;
        }
    }

    push(newData: number): void {
        const newNode: Node = new Node(newData, this.headRef);
        this.headRef = newNode;
    }

    getMiddle(h: Node | null): Node | null {
        if (h === null) {
            return h;
        }

        let fastPtr: Node | null = h.nextNode;
        let slowPtr: Node | null = h;

        while (fastPtr !== null) {
            fastPtr = fastPtr.nextNode;
            if (fastPtr !== null) {
                slowPtr = (slowPtr != null) ? slowPtr.nextNode : null;
                fastPtr = fastPtr.nextNode;
            }
        }

        return slowPtr;
    }

    mergeSort(node: Node | null): Node | null {
        if (node === null || node.nextNode === null) {
            return node;
        }

        const middle: Node | null = this.getMiddle(node);
        const nextOfMiddle: Node | null = middle!.nextNode;
        middle!.nextNode = null;

        const left: Node | null = this.mergeSort(node);
        const right: Node | null = this.mergeSort(nextOfMiddle);

        const headRef: Node | null = this.sortedMerge(left, right);
        return headRef;
    }

    sortedMerge(a: Node | null, b: Node | null): Node | null {
        if (a === null) {
            return b;
        } else if (b === null) {
            return a;
        }

        let result: Node | null;

        if (a.data <= b.data) {
            result = a;
            result.nextNode = this.sortedMerge(a.nextNode, b);
        } else {
            result = b;
            result.nextNode = this.sortedMerge(a, b.nextNode);
        }

        return result;
    }
}

if (require.main === module) {
    const a: LinkedList = new LinkedList();

    a.push(15);
    a.push(10);
    a.push(5);
    a.push(20);
    a.push(3);
    a.push(2);

    a.headRef = a.mergeSort(a.headRef);

    console.log("\nSorted Linked List is: \n");
    a.printList();
}

// Simple merge sort
function merge(arr: number[], left: number, mid: number, right: number): void {
    const n1: number = mid - left + 1;
    const n2: number = right - mid;

    // Create temporary arrays L[] and R[]
    const L: number[] = new Array(n1);
    const R: number[] = new Array(n2);

    // Copy data to temporary arrays L[] and R[]
    for (let i = 0; i < n1; i++) {
        L[i] = arr[left + i];
    }
    for (let j = 0; j < n2; j++) {
        R[j] = arr[mid + 1 + j];
    }

    // Merge the temporary arrays back into arr[l..r]
    let i: number = 0; // Initial index of first subarray
    let j: number = 0; // Initial index of second subarray
    let k: number = left; // Initial index of merged subarray

    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
            arr[k] = L[i];
            i++;
        } else {
            arr[k] = R[j];
            j++;
        }
        k++;
    }

    // Copy the remaining elements of L[], if there are any
    while (i < n1) {
        arr[k] = L[i];
        i++;
        k++;
    }

    // Copy the remaining elements of R[], if there are any
    while (j < n2) {
        arr[k] = R[j];
        j++;
        k++;
    }
}

function mergeSort(arr: number[], left: number, right: number): void {
    if (left < right) {
        // Same as (left+right)/2, but avoids overflow for
        // large left and right
        const mid: number = Math.floor(left + (right - left) / 2);

        // Sort first and second halves
        mergeSort(arr, left, mid);
        mergeSort(arr, mid + 1, right);
        merge(arr, left, mid, right);
    }
}

if (require.main === module) {
    const arr: number[] = [12, 11, 13, 5, 6, 7];
    const n: number = arr.length;

    console.log("Given array is");
    for (let i = 0; i < n; i++) {
        console.log(`${arr[i]} `);
    }

    mergeSort(arr, 0, n - 1);

    console.log("\n\nSorted array is");
    for (let i = 0; i < n; i++) {
        console.log(`${arr[i]} `);
    }
}

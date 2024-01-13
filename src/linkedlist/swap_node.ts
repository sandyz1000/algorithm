/* 
Swap nodes in a linked list without swapping data

Given a linked list and two keys in it, swap nodes for two given keys. Nodes should be swapped by
changing links. Swapping data of nodes may be expensive in many situations when data contains many
fields.

It may be assumed that all keys in linked list are distinct.

---------------------------------------------
Examples:
---------------------------------------------
Input:  10->15->12->13->20->14,  x = 12, y = 20
Output: 10->15->20->13->12->14

Input:  10->15->12->13->20->14,  x = 10, y = 20
Output: 20->15->12->13->10->14

Input:  10->15->12->13->20->14,  x = 12, y = 13
Output: 10->15->13->12->20->14

---------------------------------------------
Explanation:
---------------------------------------------
This may look a simple problem, but is interesting question as it has following cases to be handled.
1) x and y may or may not be adjacent.
2) Either x or y may be a head node.
3) Either x or y may be last node.
4) x and/or y may not be present in linked list.

How to write a clean working code that handles all of the above possibilities.


The idea it to first search x and y in given linked list. If any of them is not present, then
return. While searching for x and y, keep track of current and previous pointers. First change next
of previous pointers, then change next of current pointers.

 */

export class Node {
    data: number;
    next: Node | null;

    constructor(d: number) {
        this.data = d;
        this.next = null;
    }
}

export class LinkedList {
    head: Node | null;

    constructor() {
        this.head = null;
    }

    swapNodes(x: number, y: number): void {
        // Nothing to do if x and y are the same
        if (x === y) {
            return;
        }

        // Search for x (keep track of prevX and currX)
        let prevX: Node | null = null;
        let currX: Node | null = this.head;
        while (currX !== null && currX.data !== x) {
            prevX = currX;
            currX = currX.next;
        }

        // Search for y (keep track of prevY and currY)
        let prevY: Node | null = null;
        let currY: Node | null = this.head;
        while (currY !== null && currY.data !== y) {
            prevY = currY;
            currY = currY.next;
        }

        // If either x or y is not present, nothing to do
        if (currX === null || currY === null) {
            return;
        }

        // If x is not the head of the linked list
        if (prevX !== null) {
            prevX.next = currY;
        } else {
            this.head = currY;
        }

        // If y is not the head of the linked list
        if (prevY !== null) {
            prevY.next = currX;
        } else {
            this.head = currX;
        }

        // Swap next pointers
        const temp: Node | null = currX.next;
        currX.next = currY.next;
        currY.next = temp;
    }

    push(newData: number): void {
        const newNode: Node = new Node(newData);
        newNode.next = this.head;
        this.head = newNode;
    }

    printList(): void {
        let tNode: Node | null = this.head;
        while (tNode !== null) {
            console.log(tNode.data);
            tNode = tNode.next;
        }
    }
}

// Code execution starts here
if (require.main === module) {
    const llist: LinkedList = new LinkedList();
    llist.push(7);
    llist.push(6);
    llist.push(5);
    llist.push(4);
    llist.push(3);
    llist.push(2);
    llist.push(1);

    console.log("Linked list before calling swapNodes() ");
    llist.printList();

    llist.swapNodes(4, 3);

    console.log("\nLinked list after calling swapNodes() ");
    llist.printList();
}

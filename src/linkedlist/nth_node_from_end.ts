/* 
Program for n'th node from the end of a Linked List

Given a Linked List and a number n, write a function that returns the value at the n'th node
from end of the Linked List.

-------------------------------------------
Example:
-------------------------------------------

If input is below list and 3 = 2, then output is "B"
HEAD-> A -> B -> C -> D -> NULL

### Method 1 (Use length of linked list)
1) Calculate the length of Linked List. Let the length be len.
2) Print the (len - n + 1)th node from the beginning of the Linked List.

Time Complexity: O(n) where n is the length of linked list.

### Method 2 (Use two pointers)

Maintain two pointers - reference pointer and main pointer. Initialize both reference and main
pointers to head. First move reference pointer to n nodes from head. Now move both pointers one
by one until reference pointer reaches end. Now main pointer will point to nth node from the
end. Return main pointer.
 */


export class Node<T> {
    data: T;
    nextNode: Node<T> | null;

    constructor(data: T, nextNode: Node<T> | null = null) {
        this.data = data;
        this.nextNode = nextNode;
    }
}

function staticVars<T extends Function>(func: T, values: Record<string, any>): T {
    for (const key in values) {
        func[key] = values[key];
    }
    return func;
}

export class LinkedList1<T> {
    head: Node<T> | null;
    i: number;

    constructor(head: Node<T> | null = null) {
        this.head = head;
        this.i = 0;
    }

    push(newData: T): void {
        const newNode = new Node(newData);
        newNode.nextNode = this.head;  // link the old list off the new node
        this.head = newNode;  // move the head to point to the new node
    }

    nthFromLast(head: Node<T> | null, n: number): T | undefined {
        let length = 0;
        let temp = head;

        // 1) count the number of nodes in Linked List
        while (temp !== null) {
            temp = temp.nextNode;
            length += 1;
        }

        // check if the value of n is not more than the length of the linked list
        if (length < n) {
            return undefined;
        }

        temp = head;

        // 2) get the (n-len+1)th node from the beginning
        for (let i = 1; i < length - n + 1; i++) {
            if (temp !== null) {
                temp = temp.nextNode;
            }
        }

        return temp ? temp.data : undefined;
    }

    nthFromLastRec(head: Node<T> | null, n: number): void {
        if (head === null) {
            return;
        }
        this.nthFromLastRec(head.nextNode, n);

        this.i += 1;
        if (this.i === n) {
            console.log(head.data);
        }
    }
}

export class LinkedList2<T> {
    head: Node<T> | null;

    constructor() {
        this.head = null;
    }

    push(newData: T): void {
        const newNode = new Node(newData);
        newNode.nextNode = this.head;
        this.head = newNode;
    }

    nthFromLast(n: number): T | undefined {
        let mainPtr = this.head;
        let refPtr = this.head;

        let count = 0;
        if (this.head !== null) {
            while (count < n) {
                if (refPtr === null) {
                    console.log(`${n} is greater than the number of nodes in the list`);
                    return undefined;
                }

                refPtr = refPtr.nextNode;
                count += 1;
            }
        }

        while (refPtr !== null) {
            mainPtr = mainPtr!.nextNode;
            refPtr = refPtr.nextNode;
        }

        return mainPtr ? mainPtr.data : undefined;
    }
}

// Code execution starts here
if (require.main === module) {
    const llist2 = new LinkedList2<number>();
    llist2.push(20);
    llist2.push(4);
    llist2.push(15);
    llist2.push(35);

    // llist2.nthFromLast(4)
    console.log(`Method-2 Node no. 4 from last is ${llist2.nthFromLast(4)}`);

    // Start with the empty list
    const llist1 = new LinkedList1<number>();

    // create linked 35->15->4->20
    llist1.push(20);
    llist1.push(4);
    llist1.push(15);
    llist1.push(35);
    console.log(`Method-1 Node no. 4 from last is ${llist1.nthFromLast(llist1.head, 4)}`);
}

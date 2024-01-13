/* 
Merge two sorted linked lists

Write a SortedMerge() function that takes two lists, each of which is sorted in increasing order,
and merges the two together into one list which is in increasing order. SortedMerge() should return
the new list. The new list should be made by splicing together the nodes of the first and the
second lists.

For example if the first linked list a is 5->10->15 and the other linked list b is 2->3->20, then
SortedMerge() should return a pointer to the head node of the merged list 2->3->5->10->15->20.

There are many cases to deal with: either 'a' or 'b' may be empty, during processing either 'a' or
'b' may run out first, and finally there's the problem of starting the result list empty, and
building it up while going through 'a' and 'b'.


Method 1 (Using Dummy Nodes)

The strategy here uses a temporary dummy node as the start of the result list. The
pointer Tail always points to the last node in the result list, so appending new nodes is
easy.

The dummy node gives tail something to point to initially when the result list is empty.
This dummy node is efficient, since it is only temporary, and it is allocated in the
stack. The loop proceeds, removing one node from either 'a' or 'b', and adding it to
tail. When we are done, the result is in dummy.next.

Takes two lists sorted in increasing order, and splices their nodes together to make one
big sorted list which is returned.

Method 2 (Using Local References)

This solution is structurally very similar to the above, but it avoids using a dummy
node. Instead, it maintains a struct node** pointer, lastPtrRef, that always points to
the last pointer of the result list. This solves the same case that the dummy node did -
dealing with the result list when it is empty. If you are trying to build up a list at
its tail, either the dummy node or the struct node** "reference" strategy can be used (
see Section 1 for details).


Method 3 (Using Recursion)
Merge is one of those nice recursive problems where the recursive solution code is much cleaner
than the iterative code. You probably wouldn't want to use the recursive version for
production code however, because it will use stack space which is proportional to the length of
the lists.
 */

export class Pointer<T> {
    constructor(public value: T | null) {}
}

export class Node<T> {
    constructor(public data: T | null = null, public nextNode: Node<T> | null = null) {}
}

export class LinkedList<T> {
    head: Node<T> | null;

    constructor(head: Node<T> | null = null) {
        this.head = head;
    }

    push(newData: T): void {
        const newNode = new Node(newData);
        newNode.nextNode = this.head;
        this.head = newNode;
    }
}

export class MergeLinkedList<T> {
    dummy: Node<T>;
    tail: Node<T>;

    constructor() {
        this.dummy = new Node<T>();
        this.tail = this.dummy;
    }

    sortedMerge(a: Node<T> | null, b: Node<T> | null): Node<T> | null {
        while (true) {
            if (a === null) {
                this.tail.nextNode = b;
                break;
            } else if (b === null) {
                this.tail.nextNode = a;
                break;
            }

            if (a.data! <= b.data!) {
                const aPtr = new Pointer(a);
                this.moveNode(aPtr);
                a = aPtr.value;
            } else {
                const bPtr = new Pointer(b);
                this.moveNode(bPtr);
                b = bPtr.value;
            }
            this.tail = this.tail.nextNode!;
        }
        return this.dummy.nextNode;
    }

    moveNode(sourceRef: Pointer<Node<T>>): void {
        const newNode = sourceRef.value!;
        sourceRef.value = newNode.nextNode;
        newNode.nextNode = this.tail.nextNode;
        this.tail.nextNode = newNode;
    }
}

class MergeLinkedList2<T> {
    result: Node<T>;
    tail: Node<T>;

    constructor() {
        this.result = new Node<T>(null);
        this.tail = this.result;
    }

    sortedMerge(a: Node<T> | null, b: Node<T> | null): Node<T> | null {
        while (true) {
            if (a === null) {
                this.result = b;
                break;
            } else if (b === null) {
                this.result = a;
                break;
            }

            if (a.data! <= b.data!) {
                const aPtr = new Pointer(a);
                this.moveNode(aPtr);
                a = aPtr.value;
            } else {
                const bPtr = new Pointer(b);
                this.moveNode(bPtr);
                b = bPtr.value;
            }

            this.tail = this.tail.nextNode!;
        }
        return this.result;
    }

    moveNode(sourceRef: Pointer<Node<T>>): void {
        const newNode = sourceRef.value!;
        sourceRef.value = newNode.nextNode;
        newNode.nextNode = this.tail.nextNode;
        this.tail.nextNode = newNode;
    }
}

function sortedMergeM3<T>(a: Node<T> | null, b: Node<T> | null): Node<T> | null {
    if (a === null) {
        return b;
    } else if (b === null) {
        return a;
    }

    let result: Node<T>;
    if (a.data! <= b.data!) {
        result = a;
        result.nextNode = sortedMergeM3(a.nextNode, b);
    } else {
        result = b;
        result.nextNode = sortedMergeM3(a, b.nextNode);
    }

    return result;
}

function printList<T>(node: Node<T> | null): void {
    while (node !== null) {
        console.log(`${node.data}`, end="->");
        node = node.nextNode;
    }
    console.log("\n");
}

// Code execution starts here
if (require.main === module) {
    const a = new LinkedList<number>();
    a.push(15);
    a.push(10);
    a.push(5);

    const b = new LinkedList<number>();
    b.push(20);
    b.push(3);
    b.push(2);

    console.log("Method-2 --- Merged Linked List is: \n");
    const test = new MergeLinkedList<number>();
    const res = test.sortedMerge(a.head, b.head);
    printList(res);

    const a2 = new LinkedList<number>();
    a2.push(15);
    a2.push(10);
    a2.push(5);

    const b2 = new LinkedList<number>();
    b2.push(20);
    b2.push(3);
    b2.push(2);

    console.log("Method-3 (recursion) --- Merged Linked List is: \n");
    const res2 = sortedMergeM3(a2.head, b2.head);
    printList(res2);
}

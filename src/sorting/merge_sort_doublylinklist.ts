// Merge Sort for Doubly Linked List
// Given a doubly linked list, write a function to sort the doubly linked list in increasing
// order using merge sort.

// Example:
// -------------------
// The following doubly linked list should be changed to 2<->4<->8<->10

// TS for merge sort on doubly linked list
// Time Complexity: Time complexity of the above implementation is same as time complexity of
// MergeSort for arrays. It takes Theta(nLogn) time.

export class Node {
    data: number;
    next: Node | null;
    prev: Node | null;

    constructor(data: number) {
        this.data = data;
        this.next = null;
        this.prev = null;
    }
}

export class DoublyLinkedList {
    head: Node | null;

    constructor() {
        this.head = null;
    }

    // Function to merge two linked lists
    merge(first: Node | null, second: Node | null): Node | null {
        if (first === null) {
            return second;
        }

        if (second === null) {
            return first;
        }

        if (first.data < second.data) {
            first.next = this.merge(first.next, second);
            if (first.next !== null) {
                first.next.prev = first;
            }
            first.prev = null;
            return first;
        } else {
            second.next = this.merge(first, second.next);
            if (second.next !== null) {
                second.next.prev = second;
            }
            second.prev = null;
            return second;
        }
    }

    mergeSort(tempHead: Node | null): Node | null {
        if (tempHead === null || tempHead.next === null) {
            return tempHead;
        }

        const second: Node | null = this.split(tempHead);

        tempHead = this.mergeSort(tempHead);
        if (second !== null) {
            second.prev = null;
        }
        const secondList: Node | null = this.mergeSort(second);

        return this.merge(tempHead, secondList);
    }

    split(tempHead: Node | null): Node | null {
        let fast: Node | null = tempHead;
        let slow: Node | null = tempHead;

        while (true) {
            if (fast === null || fast.next === null) {
                break;
            }
            fast = fast.next.next;
            slow = slow!.next!;
        }

        const temp: Node | null = slow!.next;
        if (slow !== null) {
            slow.next = null;
        }
        return temp;
    }

    // Given a reference to the head of a list and an
    // integer, inserts a new node at the front of the list
    push(newData: number): void {
        const newNode: Node = new Node(newData);
        newNode.next = this.head;

        if (this.head !== null) {
            this.head.prev = newNode;
        }

        this.head = newNode;
    }

    printList(node: Node | null): void {
        let temp: Node | null = node;
        console.log("Forward Traversal using next pointer");
        while (node !== null) {
            console.log(node.data);
            temp = node;
            node = node.next;
        }
        console.log("\nBackward Traversal using prev pointer");
        while (temp !== null) {
            console.log(temp.data);
            temp = temp.prev;
        }
    }
}

if (require.main === module) {
    const dll: DoublyLinkedList = new DoublyLinkedList();
    dll.push(5);
    dll.push(20);
    dll.push(4);
    dll.push(3);
    dll.push(30);
    dll.push(10);
    dll.head = dll.mergeSort(dll.head);
    console.log("Linked List after sorting");
    dll.printList(dll.head);
}

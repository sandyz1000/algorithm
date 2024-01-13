/* """Reverse a linked list

Given pointer to the head node of a linked list, the task is to reverse the linked list. We need to
reverse the list by changing links between nodes.

Examples:
-------------------------
Input:  Head of following linked list
        1->2->3->4->NULL
Output: Linked list should be changed to,
        4->3->2->1->NULL

Input : Head of following linked list
        1->2->3->4->5->NULL
Output: Linked list should be changed to,
        5->4->3->2->1->NULL

Input : NULL
Output : NULL

Input  : 1->NULL
Output : 1->NULL  """ 
# Time Complexity : O(n)
# Space Complexity : O(1)
*/

export class Node<T> {
    data: T;
    next: Node<T> | null;

    constructor(data: T) {
        this.data = data;
        this.next = null;
    }
}

export class LinkedList<T> {
    head: Node<T> | null;

    constructor() {
        this.head = null;
    }

    reverse(): void {
        let prev: Node<T> | null = null;
        let current: Node<T> | null = this.head;

        while (current !== null) {
            const nextNode: Node<T> | null = current.next;
            current.next = prev;
            prev = current;
            current = nextNode;
        }

        this.head = prev;
    }

    reverseUtil(curr: Node<T> | null, prev: Node<T> | null): void {
        if (curr === null || curr.next === null) {
            this.head = curr;
            if (curr !== null) {
                curr.next = prev;
            }
            return;
        }

        const nextNode: Node<T> | null = curr.next;
        curr.next = prev;

        this.reverseUtil(nextNode, curr);
    }

    reverseRec(): void {
        if (this.head !== null) {
            this.reverseUtil(this.head, null);
        }
    }

    push(newData: T): void {
        const newNode = new Node(newData);
        newNode.next = this.head;
        this.head = newNode;
    }

    printList(): void {
        let temp: Node<T> | null = this.head;
        while (temp !== null) {
            console.log(temp.data);
            temp = temp.next;
        }
    }
}

// Driver program to test above functions
if (require.main === module) {
    const llist1 = new LinkedList<number>();
    llist1.push(20);
    llist1.push(4);
    llist1.push(15);
    llist1.push(85);

    console.log("Given Linked List");
    llist1.printList();
    llist1.reverse();
    console.log("\nReversed Linked List");
    llist1.printList();

    const llist2 = new LinkedList<number>();
    llist2.push(8);
    llist2.push(7);
    llist2.push(6);
    llist2.push(5);
    llist2.push(4);
    llist2.push(3);
    llist2.push(2);
    llist2.push(1);

    console.log("Given linked list");
    llist2.printList();

    llist2.reverseRec();

    console.log("\nReverse linked list");
    llist2.printList();
}

/* 
Remove duplicates from a sorted linked list

Write a removeDuplicates() function which takes a list sorted in non-decreasing order and deletes
any duplicate nodes from the list. The list should only be traversed once.

For example if the linked list is 11->11->11->21->43->43->60 then removeDuplicates() should convert
the list to 11->21->43->60.

--------------------------------------------------
Remove duplicates from an unsorted linked list
Write a removeDuplicates() function which takes a list and deletes any duplicate nodes from the
list. The list is not sorted.

For example if the linked list is 12->11->12->21->41->43->21 then removeDuplicates() should convert
the list to 12->11->21->41->43.

## METHOD 1 Algorithm:
Traverse the list from the head (or start) node. While traversing, compare each node with
its next node. If data of next node is same as current node then delete the next node.
Before we delete a node, we need to store next pointer of the node

Time Complexity: O(n) where n is number of nodes in the given linked list.
The function removes duplicates from a sorted list

## METHOD 2 (Using two loops)
This is the simple way where two loops are used. Outer loop is used to pick the elements
one by one and inner loop compares the picked element with rest of the elements.

Time Complexity: O(n^2)

## METHOD 3 (Use Hashing)
We traverse the link list from head to end. For every newly encountered element, we check
whether it is in the hash table: if yes, we remove it otherwise we put it in the hash table.

Time Complexity: O(n) on average (assuming that hash table access time is O(1) on average)


## METHOD 4 (Use Sorting)
In general, Merge Sort is the best suited sorting algorithm for sorting linked lists
efficiently.

1) Sort the elements using Merge Sort. We will soon be writing a post about sorting a linked
list. O(nLogn)

2) Remove duplicates in linear time using the algorithm for removing duplicates in sorted
Linked List. O(n)

Please note that this method doesn't preserve the original order of elements.
Time Complexity: O(nLogn)
*/

export class Node<T> {
    data: T;
    next_node: Node<T> | null;

    constructor(data: T, next_node: Node<T> | null = null) {
        this.data = data;
        this.next_node = next_node;
    }
}

export class LinkedList<T> {
    head: Node<T> | null;

    constructor(head: Node<T> | null = null) {
        this.head = head;
    }

    push(newData: T): void {
        const newNode = new Node(newData);
        newNode.next_node = this.head;
        this.head = newNode;
    }

    printList(): void {
        let node: Node<T> | null = this.head;
        while (node !== null) {
            console.log(`${node.data} `);
            node = node.next_node;
        }
    }

    removeDuplicatesMethod1(): void {
        let current: Node<T> | null = this.head;

        if (current === null) {
            return;
        }

        while (current !== null && current.next_node !== null) {
            if (current.data === current.next_node.data) {
                const nextNext: Node<T> | null = current.next_node.next_node;
                if (nextNext !== null) {
                    current.next_node = nextNext;
                } else {
                    current.next_node = null;
                }
            } else {
                current = current.next_node;
            }
        }
    }

    removeDuplicatesMethod2(): void {
        let ptr1: Node<T> | null = this.head;

        while (ptr1 !== null && ptr1.next_node !== null) {
            let ptr2: Node<T> | null = ptr1;
            while (ptr2.next_node !== null) {
                if (ptr1.data === ptr2.next_node.data) {
                    const dup: Node<T> | null = ptr2.next_node;
                    if (dup !== null) {
                        ptr2.next_node = dup.next_node;
                        dup.next_node = null;
                    }
                } else {
                    ptr2 = ptr2.next_node;
                }
            }
            ptr1 = ptr1.next_node;
        }
    }

    removeDuplicatesMethod3(): void {
        const seen: Set<T> = new Set();
        let curr: Node<T> | null = this.head;
        let prev: Node<T> | null = null;

        while (curr !== null) {
            if (seen.has(curr.data)) {
                if (prev !== null) {
                    if (curr.next_node !== null) {
                        prev.next_node = curr.next_node;
                    } else {
                        prev.next_node = null;
                    }
                }
            } else {
                seen.add(curr.data);
                prev = curr;
            }
            curr = prev?.next_node ?? null;
        }
    }
}

// Code execution starts here
if (require.main === module) {
    console.log("\n\n----METHOD-1-----\n\n");

    // Let us create a sorted linked list to test the functions Created linked list will be
    // 11->11->11->13->13->20
    const llist1 = new LinkedList<number>();

    llist1.push(20);
    llist1.push(13);
    llist1.push(13);
    llist1.push(11);
    llist1.push(11);
    llist1.push(11);

    console.log("\n Linked list before duplicate removal  ");
    llist1.printList();
    // Remove duplicates from linked list
    llist1.removeDuplicatesMethod1();
    console.log("\n Linked list after duplicate removal ");
    llist1.printList();

    // The constructed linked list is: 10->12->11->11->12->11->10
    const llist2 = new LinkedList<number>();
    llist2.push(10);
    llist2.push(12);
    llist2.push(11);
    llist2.push(11);
    llist2.push(12);
    llist2.push(11);
    llist2.push(10);

    console.log("Linked list before removing duplicates\n");
    llist2.printList();
    llist2.removeDuplicatesMethod2();
    console.log("\nLinked list after removing duplicates ");
    llist2.printList();

    // The constructed linked list is: 10->12->11->11->12->11->10
    const llist3 = new LinkedList<number>();
    llist3.push(10);
    llist3.push(12);
    llist3.push(11);
    llist3.push(11);
    llist3.push(12);
    llist3.push(11);
    llist3.push(10);

    console.log("Linked list before removing duplicates : \n");
    llist3.printList();
    llist3.removeDuplicatesMethod3();

    console.log("\nLinked list after removing duplicates : \n");
    llist3.printList();
}

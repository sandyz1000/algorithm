/* 
Insertion Sort for Singly Linked List
We have discussed Insertion Sort for arrays. In this article same for linked list is discussed.

Explanation:
------------------------------------
Below is simple insertion sort algorithm for linked list.

1) Create an empty sorted (or result) list
2) Traverse the given list, do following for every node.
    a) Insert current node in sorted way in sorted or result list.
3) Change head of given linked list to head of sorted (or result) list.

 */


export class Node {
    data: number;
    next_node: Node | null;

    constructor(data: number, next_node: Node | null = null) {
        this.data = data;
        this.next_node = next_node;
    }
}

export class LinkedList {
    head: Node | null;
    m_sorted: Node | null;

    constructor(head: Node | null = null) {
        this.head = head;
        this.m_sorted = null;
    }

    // Function to print linked list
    printList(): void {
        let temp: Node | null = this.head;
        while (temp !== null) {
            console.log(`${temp.data} `);
            temp = temp.next_node;
        }
    }

    // A utility function to insert a node at the beginning of linked list
    push(newData: number): void {
        // allocate node
        const newNode: Node = new Node(newData, this.head);
        // move the head to point to the new node
        this.head = newNode;
    }

    insertionSort(head: Node | null): void {
        // Initialize sorted linked list
        this.m_sorted = null;
        // Traverse the given linked list and insert every node to sorted
        let current: Node | null = head;

        while (current !== null) {
            // Store next for the next iteration
            const nextNode: Node | null = current.next_node;
            // Insert current in sorted linked list
            this.sortedInsert(current);
            // Update current
            current = nextNode;
        }
        // Update head_ref to point to the sorted linked list
        this.head = this.m_sorted;
    }

    sortedInsert(newNode: Node): void {
        // Function to insert a new node in a list. Note that this function expects a pointer
        // to head_ref as this can modify the head of the input linked list (similar to push())
        // Special case for the head end
        if (this.m_sorted === null || this.m_sorted.data >= newNode.data) {
            newNode.next_node = this.m_sorted;
            this.m_sorted = newNode;
        } else {
            // Locate the node before the point of insertion
            let current: Node | null = this.m_sorted;
            while (current.next_node !== null && current.next_node.data < newNode.data) {
                current = current.next_node;
            }

            newNode.next_node = current.next_node;
            current.next_node = newNode;
        }
    }
}

if (require.main === module) {
    const llist: LinkedList = new LinkedList();
    llist.push(5);
    llist.push(20);
    llist.push(4);
    llist.push(3);
    llist.push(30);

    console.log("Linked List before sorting \n");
    llist.printList();
    llist.insertionSort(llist.head);
    console.log("\nLinked List after sorting \n");
    llist.printList();
}

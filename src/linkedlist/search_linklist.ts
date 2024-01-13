// """Search an element in a Linked List (Iterative and Recursive)"""


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

    push(newData: T): void {
        const newNode = new Node(newData);
        newNode.next = this.head;
        this.head = newNode;
    }

    searchIter(x: T): boolean {
        let current: Node<T> | null = this.head;

        while (current !== null) {
            if (current.data === x) {
                return true;  // data found
            }

            current = current.next;
        }

        return false;  // Data Not found
    }

    searchRec(current: Node<T> | null, x: T): boolean {
        if (current === null) {  // Base case
            return false;
        }

        // If data is present in the current node, return true
        if (current.data === x) {
            return true;
        }

        // Recur for the remaining list
        return this.searchRec(current.next, x);
    }

    search(x: T): boolean {
        const head: Node<T> | null = this.head;
        return this.searchRec(head, x);
    }
}

// Code execution starts here
if (require.main === module) {
    // Start with the empty list
    const llist = new LinkedList<number>();
    // Use push() to construct the below list 14->21->11->30->10
    llist.push(10);
    llist.push(30);
    llist.push(11);
    llist.push(21);
    llist.push(14);

    console.log("Iterative call to search");
    console.log(llist.searchIter(21) ? "Yes" : "No");

    console.log("\nRecursive call to search\n");
    console.log(llist.search(21) ? "Yes" : "No");
}

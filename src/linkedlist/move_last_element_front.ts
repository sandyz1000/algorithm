
/* Move last element to front of a given Linked List
Write a C function that moves last element to front in a given Singly Linked List.

Example:
-----------------------
If the given Linked List is 1->2->3->4->5, then the function should change the list
to 5->1->2->3->4.

Algorithm:
-----------------------
Traverse the list till last node. Use two pointers: one to store the address of last node and other
for address of second last node. After the end of loop do following operations.
1)  Make second last as last (secLast->next = NULL).
2)  Set next of last as head (last->next = *head_ref).
3)  Make last as head ( *head_ref = last)

# Time Complexity: O(n) where n is the number of nodes in the given Linked List.


We are using a double pointer head_ref here because we change head of the
linked list inside this function.


*/

export class Node<T> {
  data: T;
  nextNode: Node<T> | null;

  constructor(data: T, nextNode: Node<T> | null = null) {
    this.data = data;
    this.nextNode = nextNode;
  }
}

export class LinkedList<T> {
  head: Node<T> | null;

  constructor(head: Node<T> | null = null) {
    this.head = head;
  }

  moveToFront(): void {
    // If linked list is empty, or it contains only one node, then nothing needs to be done,
    // simply return
    if (this.head === null || this.head.nextNode === null) {
      return;
    }

    // Initialize second last and last pointers
    let secLast: Node<T> | null = null;
    let last: Node<T> | null = this.head;

    // After this loop secLast contains the address of the second last node and
    // last contains the address of the last node in Linked List
    while (last.nextNode !== null) {
      secLast = last;
      last = last.nextNode;
    }

    // Set the next of the second last as NULL
    secLast!.nextNode = null;
    // Set the next of last as head node
    last!.nextNode = this.head;

    // Change the head pointer to point to the last node now
    this.head = last;
  }

  push(newData: T): void {
    // allocate node
    const newNode = new Node(newData);

    // link the old list off the new node
    newNode.nextNode = this.head;

    // move the head to point to the new node
    this.head = newNode;
  }

  printList(): void {
    // Function to print nodes in a given linked list
    let node: Node<T> | null = this.head;
    while (node !== null) {
      console.log(`${node.data} `);
      node = node.nextNode;
    }
  }
}

// Code execution starts here
if (require.main === module) {
  const start = new LinkedList<number>();
  // The constructed linked list is: 1->2->3->4->5
  start.push(5);
  start.push(4);
  start.push(3);
  start.push(2);
  start.push(1);

  console.log("\n Linked list before moving last to front\n");
  start.printList();
  start.moveToFront();

  console.log("\n Linked list after removing last to front\n");
  start.printList();
}

/* """
Insertion Sort for Singly Linked List
We have discussed Insertion Sort for arrays. In this article same for linked list is discussed.

Below is simple insertion sort algorithm for linked list.

1) Create an empty sorted (or result) list
2) Traverse the given list, do following for every node.
    a) Insert current node in sorted way in sorted or result list.
3) Change head of given linked list to head of sorted (or result) list.

"""
 */

export class Link {
  data: number;
  next: Link | null;

  constructor(data: number, nextNode: Link | null = null) {
    this.data = data;
    this.next = nextNode;
  }
}

export class ListInsertionSort {
  head: Link | null;
  sorted: Link | null;

  constructor(first: Link | null = null) {
    this.head = first;
    this.sorted = null;
  }

  push(data: number): void {
    // allocate node
    const newNode = new Link(data);
    // link the old list off the new node
    newNode.next = this.head;
    // move the head to point to the new node
    this.head = newNode;
  }

  printList(): void {
    let current: Link | null = this.head;
    while (current !== null) {
      console.log(current.data + " ");
      current = current.next;
    }
    console.log("\n");
  }

  insertionSort(): void {
    this.sorted = null;
    let current: Link | null = this.head;

    // Traverse the given linked list and insert every node to sorted
    while (current !== null) {
      // Store next for the next iteration
      const nextNode: Link | null = current.next;
      // insert current in sorted linked list
      this.sortedInsert(current);
      // Update current
      current = nextNode;
    }

    this.head = this.sorted;
  }

  sortedInsert(newNode: Link): void {
    // Special case for the head end
    if (this.sorted === null || this.sorted.data >= newNode.data) {
      newNode.next = this.sorted;
      this.sorted = newNode;
    } else {
      let current: Link | null = this.sorted;
      // Locate the node before the point of insertion
      while (current.next !== null && current.next.data < newNode.data) {
        current = current.next;
      }
      newNode.next = current.next;
      current.next = newNode;
    }
  }
}

// Code execution starts here
if (require.main === module) {
  const llist = new ListInsertionSort();
  llist.push(5);
  llist.push(20);
  llist.push(4);
  llist.push(3);
  llist.push(30);

  console.log("Linked List before Sorting..");
  llist.printList();

  llist.insertionSort();
  console.log("Insertion sort of linked list\n");
  llist.printList();
}

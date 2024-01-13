/* """
Write a function to get Nth node in a Linked List

Write a GetNth() function that takes a linked list and an integer index and returns the data value
stored in the node at that index position.

Example:
-----------------------------------
Input:  1->10->30->14,  index = 2
Output: 30
The node at index 2 is 30

# Time Complexity: O(n)
# A complete working program to find n'th node in a linked list
""" */

export class Node {
  data: number;
  next: Node | null;

  // Function to initialise the node object
  constructor(data: number, next: Node | null = null) {
    this.data = data; // Assign data
    this.next = next; // Initialize next as null
  }
}

export class LinkedList {
  head: Node | null;

  // Linked List class contains a Node object
  constructor() {
    this.head = null;
  }

  /**
   * This function is in LinkedList class. It inserts a new node at the
   * beginning of Linked List.
   * @param new_data The data for the new node.
   */
  push(new_data: number): void {
    // 1 & 2: Allocate the Node & Put in the data
    const new_node: Node = new Node(new_data);
    // 3. Make next of new Node as head
    new_node.next = this.head;
    // 4. Move the head to point to new Node
    this.head = new_node;
  }

  /**
   * Returns data at the given index in the linked list.
   * @param index The index of the element to retrieve.
   * @returns The data at the given index.
   */
  getNth(index: number): number | undefined {
    let current: Node | null = this.head; // Initialise temp
    let count: number = 0; // Index of the current node

    // Loop while end of linked list is not reached
    while (current !== null) {
      if (count === index) {
        return current.data;
      }
      count += 1;
      current = current.next;
    }
  }
}

if (require.main === module) {
  const llist: LinkedList = new LinkedList();
  // Use push() to construct the list 1->12->1->4->1
  llist.push(1);
  llist.push(4);
  llist.push(1);
  llist.push(12);
  llist.push(1);

  const n: number = 3;
  console.log(`Element at index ${n} is:`, llist.getNth(n));
}

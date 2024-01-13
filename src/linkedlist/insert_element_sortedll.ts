/* 
Given a linked list which is sorted, how will you insert in sorted way

Given a sorted linked list and a value to insert, write a function to insert the value in sorted
way.

---------------------------------------------
Example:
---------------------------------------------

HEAD -> 2 -> 5 -> 7 -> 10 -> 15 -> NULL

Linked List after insertion of 9

HEAD -> 2 -> 5 -> 7 -> 9 -> 10 -> 15 -> NULL

---------------------------------------------
Discussion:
---------------------------------------------

Shorter Implementation using double pointers
The code uses double pointer to keep track of the next pointer of the previous node (after which
new node is being inserted).

Note that below line in code changes current to have address of next pointer in a node.
current = current.next_node

Also, note below comments.
    # Copies the value-at-address current to new_node's next pointer
    new_node.next_node = current
    # Fix next pointer of the node (using it's address) after which new_node is being inserted
    current = new_node

# Python program to insert in sorted list
# Time Complexity: O(n)

 */


export class Node {
  data: number;
  next_node: Node | null;

  // Constructor to initialize the node object
  constructor(data: number, next_node: Node | null = null) {
    this.data = data;
    this.next_node = next_node;
  }
}

class LinkedList {
  head: Node | null;

  // Function to initialize head
  constructor() {
    this.head = null;
  }

  sorted_insert(new_node: Node): void {
    // Special case for the empty linked list
    if (this.head === null) {
      new_node.next_node = this.head;
      this.head = new_node;
    } else if (this.head.data >= new_node.data) {
      new_node.next_node = this.head;
      this.head = new_node;
    } else {
      // Locate the node before the point of insertion
      let current: Node | null = this.head;
      while (
        current?.next_node !== null &&
        current.next_node.data < new_node.data
      ) {
        current = current.next_node;
      }

      new_node.next_node = current?.next_node || null;
      if (current) {
        current.next_node = new_node;
      }
    }
  }

  // Function to insert a new node at the beginning
  push(new_data: number): void {
    const new_node: Node = new Node(new_data);
    new_node.next_node = this.head;
    this.head = new_node;
  }

  // Utility function to print the linked LinkedList
  print_list(): void {
    let temp: Node | null = this.head;
    while (temp !== null) {
      console.log(temp.data);
      temp = temp.next_node;
    }
  }
}

if (require.main === module) {
  const llist: LinkedList = new LinkedList();
  let new_node: Node = new Node(5);
  llist.sorted_insert(new_node);
  new_node = new Node(10);
  llist.sorted_insert(new_node);
  new_node = new Node(7);
  llist.sorted_insert(new_node);
  new_node = new Node(3);
  llist.sorted_insert(new_node);
  new_node = new Node(1);
  llist.sorted_insert(new_node);
  new_node = new Node(9);
  llist.sorted_insert(new_node);
  console.log("Create Linked List");
  llist.print_list();
}

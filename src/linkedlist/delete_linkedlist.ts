// """Write a function to delete a Linked List"""
// # Time Complexity: O(n)
// # Auxiliary Space: O(1)


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

  constructor(head: Node | null = null) {
    this.head = head;
  }

  deleteList(): void {
    /** Function to delete the entire linked list */
    // deref head to get the real head
    let current: Node | null = this.head;
    while (current !== null) {
      const next_node: Node | null = current.next_node;
      // @ts-ignore
      delete current;
      current = next_node;
    }
    this.head = null; // deref head to affect the real head back in the caller.
  }

  push(new_data: number): void {
    /** Given a reference (pointer to pointer) to the head of a list and an int,
     * push a new node on the front of the list.
     */
    const new_node: Node = new Node(new_data);
    new_node.next_node = this.head;
    this.head = new_node;
  }
}

if (require.main === module) {
  const llist: LinkedList = new LinkedList();

  // Use push() to construct below list 1->12->1->4->1
  llist.push(1);
  llist.push(4);
  llist.push(1);
  llist.push(12);
  llist.push(1);

  console.log("\n Deleting linked list");
  llist.deleteList();
  console.log("\n Linked list deleted");
}

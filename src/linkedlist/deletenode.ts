/* 
Delete a Linked List node at a given position
Given a singly linked list and a position, delete a linked list node at the given position.

Example:
-------------------------
Input: position = 1, Linked List = 8->2->3->1->7
Output: Linked List =  8->3->1->7

Input: position = 0, Linked List = 8->2->3->1->7
Output: Linked List = 2->3->1->7

Explanation:
-------------------------
If node to be deleted is root, simply delete it. To delete a middle node, we must have pointer
to the node previous to the node to be deleted. So if positions is not zero, we run a loop
position-1 times and get pointer to the previous node.

 */

export class ListNode {
  data: number;
  next: ListNode | null;

  constructor(data: number) {
    this.data = data;
    this.next = null;
  }
}

class LinkedList {
  head: ListNode | null;

  constructor() {
    this.head = null;
  }

  push(newData: number): void {
    const newNode: ListNode = new ListNode(newData);
    newNode.next = this.head;
    this.head = newNode;
  }

  deleteNode(position: number): void {
    if (this.head === null) {
      return;
    }

    let temp: ListNode | null = this.head;

    if (position === 0) {
      this.head = temp.next;
      temp = null;
      return;
    }

    for (let i = 0; i < position - 1; i++) {
      temp = temp!.next;
      if (temp === null) {
        break;
      }
    }

    if (temp === null || temp.next === null) {
      return;
    }

    const nextNode: ListNode | null = temp.next.next;

    temp.next = null;
    temp.next = nextNode;
  }

  printList(): void {
    let temp: ListNode | null = this.head;
    while (temp !== null) {
      console.log(` ${temp.data} `);
      temp = temp.next;
    }
  }
}

if (require.main === module) {
  const llist: LinkedList = new LinkedList();
  llist.push(7);
  llist.push(1);
  llist.push(3);
  llist.push(2);
  llist.push(8);

  console.log("Created Linked List: ");
  llist.printList();
  llist.deleteNode(2);
  console.log("\nLinked List after Deletion at position 4: ");
  llist.printList();
}

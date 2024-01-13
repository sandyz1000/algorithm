
/* 
Pairwise swap elements of a given linked list
Given a singly linked list, write a function to swap elements pairwise.

-----------------------------------------
Example:
-----------------------------------------

If the linked list is 1->2->3->4->5 then the function should change it to 2->1->4->3->5, and if the
linked list is 1->2->3->4->5->6 then the function should change it to 2->1->4->3->6->5.

# Time Complexity: O(n)
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

  pairwiseSwap(): void {
    let temp: Node<T> | null = this.head;

    // There are no nodes in the linked list
    if (temp === null) {
      return;
    }

    // Traverse further only if there are at least two left
    while (temp !== null && temp.next !== null) {
      // Swap data of node with its next node's data
      if (temp.next !== null) {
        [temp.data, temp.next.data] = [temp.next.data, temp.data];
      }

      // Move temp by 2 for the next pair
      if (temp.next !== null && temp.next.next !== null) {
        temp = temp.next.next;
      } else {
        break;
      }
    }
  }

  push(newData: T): void {
    // Function to insert a new node at the beginning
    const newNode = new Node(newData);
    newNode.next = this.head;
    this.head = newNode;
  }

  printList(): void {
    // Utility function to print the linked list
    let temp: Node<T> | null = this.head;
    while (temp !== null) {
      console.log(temp.data);
      temp = temp.next;
    }
  }
}

// Code execution starts here
if (require.main === module) {
  const llist = new LinkedList<number>();
  llist.push(5);
  llist.push(4);
  llist.push(3);
  llist.push(2);
  llist.push(1);

  console.log("Linked list before calling pairwiseSwap()");
  llist.printList();
  llist.pairwiseSwap();
  console.log("\nLinked list after calling pairwiseSwap()");
  llist.printList();
}

/* """
Given only a pointer/reference to a node to be deleted in a singly linked list, how do you
delete it?

Given a pointer to a node to be deleted, delete the node. Note that we don't have pointer to
head node.

Algorithm:
----------------------------

A simple solution is to traverse the linked list until you find the node you want to delete. But
this solution requires pointer to the head node which contradicts the problem statement.

Fast solution is to copy the data from the next node to the node to be deleted and delete the next
node. Something like following.

Find next node using next pointer
struct Node *temp  = node_ptr->next;

Copy data of next node to this node
node_ptr->data  = temp->data;

Unlink next node
node_ptr->next  = temp->next;

Delete next node
free(temp);

"""
 */

export class Node {
    data: number;
    next: Node | null;
  
    constructor(data: number) {
      this.data = data;
      this.next = null;
    }
  }
  
  class LinkedList {
    head: Node | null;
  
    constructor(head: Node | null = null) {
      this.head = head;
    }
  
    push(newData: number): void {
      const newNode: Node = new Node(newData);
      newNode.next = this.head;
      this.head = newNode;
    }
  
    printList(): void {
      let temp: Node | null = this.head;
      while (temp !== null) {
        console.log(temp.data);
        temp = temp.next;
      }
    }
  
    deleteNode(): void {
      if (this.head === null) {
        console.log("List is empty. Cannot delete a node.");
        return;
      }
  
      if (this.head.next === null) {
        console.log("List has only one node. Deleting it.");
        this.head = null;
        return;
      }
  
      const temp: Node | null = this.head.next;
      this.head.data = temp!.data;
      this.head.next = temp!.next;
      temp!.next = null;
    }
  }
  
  if (require.main === module) {
    // Start with the empty list
    const llist: LinkedList = new LinkedList();
    // Use push() to construct below list 1->12->1->4->1
    llist.push(1);
    llist.push(4);
    llist.push(1);
    llist.push(12);
    llist.push(1);
  
    console.log("Before deleting \n");
    llist.printList();
    // I'm deleting the head itself. You can check for more cases
    llist.deleteNode();
    console.log("\nAfter deleting \n");
    llist.printList();
  }
  
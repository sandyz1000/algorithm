
/* Linked List | Set 1 (Introduction)

Like arrays, Linked List is a linear data structure. Unlike arrays, linked list elements are not
stored at contiguous location the elements are linked using pointers.

HEAD-> A -> B -> C -> D -> NULL

Why Linked List?
Arrays can be used to store linear data of similar types, but arrays have following limitations.
1)  The size of the arrays is fixed: So we must know the upper limit on the number of elements in
    advance. Also, generally, the allocated memory is equal to the upper limit irrespective of the
    usage.
2)  Inserting a new element in an array of elements is expensive, because room has to be created
    for the new elements and to create room existing elements have to shifted.

For example, in a system if we maintain a sorted list of IDs in an array id[].

id = [1000, 1010, 1050, 2000, 2040].

And if we want to insert a new ID 1005, then to maintain the sorted order, we have to move all the
elements after 1000 (excluding 1000).
Deletion is also expensive with arrays until unless some special techniques are used. For example,
to delete 1010 in id[], everything after 1010 has to be moved.

Advantages over arrays
1) Dynamic size
2) Ease of insertion/deletion

Drawbacks:
1) Random access is not allowed. We have to access elements sequentially starting from the first
node. So we cannot do binary search with linked lists.
2) Extra memory space for a pointer is required with each element of the list.

Representation in C:
A linked list is represented by a pointer to the first node of the linked list. The first node is
called head. If the linked list is empty, then value of head is NULL.
Each node in a list consists of at least two parts:
1) data
2) pointer to the next node

In C, we can represent a node using structures. Below is an example of a linked list node with an
integer data.

In Java, LinkedList can be represented as a class and a Node as a separate class. The LinkedList
class contains a reference of Node class type.

 */


export class Node {
  data: number;
  next: Node | null;

  constructor(data: number) {
    this.data = data;
    this.next = null;
  }
}

export class LinkedList {
  head: Node | null;

  constructor() {
    this.head = null;
  }

  push(newData: number): void {
    const newNode = new Node(newData);
    newNode.next = this.head;
    this.head = newNode;
  }

  deleteNode(key: number): void {
    let temp: Node | null = this.head;

    if (temp !== null && temp.data === key) {
      this.head = temp.next;
      temp = null;
      return;
    }

    let prev: Node | null = null;

    while (temp !== null && temp.data !== key) {
      prev = temp;
      temp = temp.next;
    }

    if (temp === null) {
      return;
    }

    if (prev !== null) {
      prev.next = temp.next;
    }

    temp = null;
  }

  insertAfter(prevNode: Node | null, newData: number): void {
    if (prevNode === null) {
      console.log("The given previous node must be in the LinkedList.");
      return;
    }

    const newNode = new Node(newData);
    newNode.next = prevNode.next;
    prevNode.next = newNode;
  }

  append(newData: number): void {
    const newNode = new Node(newData);

    if (this.head === null) {
      this.head = newNode;
      return;
    }

    let last: Node = this.head;
    while (last.next !== null) {
      last = last.next;
    }

    last.next = newNode;
  }

  printList(): void {
    let temp: Node | null = this.head;
    while (temp !== null) {
      console.log(temp.data);
      temp = temp.next;
    }
  }
}

// Code execution starts here
if (require.main === module) {
  // Start with the empty list
  const llist = new LinkedList();

  llist.head = new Node(1);
  const second = new Node(2);
  const third = new Node(3);

  llist.head.next = second;
  second.next = third;

  // Inserting a node to a linked list
  llist.append(6);
  llist.push(7);
  llist.push(1);
  llist.append(4);
  llist.insertAfter(llist.head!.next, 8);

  console.log('Created linked list is:');
  llist.printList();

  llist.deleteNode(1);
  console.log("\nLinked List after Deletion of 1:");
}

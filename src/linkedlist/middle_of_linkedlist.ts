
/* Find the middle of a given linked list in Python

Given a singly linked list, find middle of the linked list. For example, if given linked list is
1->2->3->4->5 then output should be 3.

If there are even nodes, then there would be two middle nodes, we need to print second middle
element. For example, if given linked list is 1->2->3->4->5->6 then output should be 4.

Method -2
Traverse linked list using two pointers. Move one pointer by one and other pointer by two.
When the fast pointer reaches end slow pointer will reach middle of the linked list.

Method 3:

Initialize mid element as head and initialize a counter as 0. Traverse the list from head,
while traversing increment the counter and change mid to mid->next whenever the counter is
odd. So the mid will move only half of the total length of the list.
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
  headRef: Node<T> | null;

  constructor(headRef: Node<T> | null = null) {
    this.headRef = headRef;
  }

  push(newData: T): void {
    const newNode = new Node(newData);
    // link the old list off the new node
    newNode.nextNode = this.headRef;

    // move the head to point to the new node
    this.headRef = newNode;
  }

  printList(): void {
    let ptr: Node<T> | null = this.headRef;
    const output: string[] = [];
    while (ptr !== null) {
      output.push(`${ptr.data}->`);
      ptr = ptr.nextNode;
    }
    output.push("NULL");
    console.log(output.join(""));
  }
}

function findMiddle1<T>(head: Node<T> | null): T | undefined {
  let slowPtr: Node<T> | null = head;
  let fastPtr: Node<T> | null = head;

  if (head !== null) {
    while (fastPtr !== null && fastPtr.nextNode !== null) {
      fastPtr = fastPtr.nextNode.nextNode;
      slowPtr = slowPtr?.nextNode!;
    }
    return slowPtr!.data;
  }
}

function findMiddle2<T>(head: Node<T> | null): T | undefined {
  let count = 0;
  let mid: Node<T> | null = head;

  while (head !== null) {
    // update mid, when 'count' is an odd number
    if (count & 1) {
      mid = mid!.nextNode!;
    }
    count += 1;
    head = head.nextNode!;
  }

  // if an empty list is provided
  if (mid !== null) {
    return mid.data;
  }
}

// Code execution starts here
if (require.main === module) {
  // Start with the empty list
  const linked = new LinkedList<number>();
  for (let i = 5; i >= 0; i--) {
    linked.push(i);
    linked.printList();
    console.log(`Method-1: The middle element is [${findMiddle1(linked.headRef)}]`);
    console.log(`Method-2: The middle element is [${findMiddle2(linked.headRef)}]`);
  }
}

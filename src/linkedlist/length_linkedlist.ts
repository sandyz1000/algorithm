/* Find Length of a Linked List (Iterative and Recursive)
Write a Python function to count number of nodes in a given singly linked list.

Head -> 1 -> 3 -> 1 -> 2 -> 1 -> NULL

# A complete working TypeScript program to find length of a Linked List recursively
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

  getCountIter(): number {
    let temp: Node | null = this.head;
    let count: number = 0;

    while (temp !== null) {
      count += 1;
      temp = temp.next;
    }

    return count;
  }

  getCountRec(node: Node | null): number {
    if (node === null) {
      return 0;
    } else {
      return 1 + this.getCountRec(node.next);
    }
  }

  getCount(): number {
    return this.getCountRec(this.head);
  }
}

// Code execution starts here
if (require.main === module) {
  const llist = new LinkedList();
  llist.push(1);
  llist.push(3);
  llist.push(1);
  llist.push(2);
  llist.push(1);

  console.log('Count of nodes is :', llist.getCount());
  console.log('Count of nodes is :', llist.getCountIter());
}

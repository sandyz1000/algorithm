/* 
QuickSort on Singly Linked List

QuickSort on Doubly Linked List is discussed here. QuickSort
on Singly linked list was given as an exercise.

The important things about implementation are, it changes pointers rather swapping data and time
complexity is same as the implementation for Doubly Linked List.
 */

export class Node {
  data: number;
  nextNode: Node | null;

  constructor(data: number, nextNode: Node | null = null) {
    this.data = data;
    this.nextNode = nextNode;
  }
}

export class Pointer {
  data: Node | null;

  constructor(data: Node | null = null) {
    this.data = data;
  }
}

export class LinkedList {
  head: Node | null;

  constructor(head: Node | null = null) {
    this.head = head;
  }

  push(newData: number): void {
    const newNode = new Node(newData, this.head);
    this.head = newNode;
  }

  printList(): void {
    const output: string[] = [];
    let node: Node | null = this.head;
    while (node !== null) {
      output.push(`${node.data}`);
      node = node.nextNode;
    }
    console.log(output.join("->"));
  }

  getTail(head: Node | null): Node | null {
    let cur: Node | null = head;
    while (cur !== null && cur.nextNode !== null) {
      cur = cur.nextNode;
    }
    return cur;
  }

  partition(
    head: Node | null,
    end: Node | null,
    newHead: Pointer,
    newEnd: Pointer
  ): Node | null {
    if (!head || head === end) {
      return head;
    }

    const pivot: Node | null = end;
    let prev: Node | null = null;
    let cur: Node | null = head;
    let tail: Node | null = pivot;

    while (cur !== pivot) {
      if (cur!.data < pivot!.data) {
        if (!newHead.data) {
          newHead.data = cur;
        }

        prev = cur;
        cur = cur!.nextNode;
      } else {
        if (prev !== null) {
          prev.nextNode = cur!.nextNode;
        }

        const tmp: Node | null = cur!.nextNode;
        cur!.nextNode = null;
        tail!.nextNode = cur;
        tail = cur;
        cur = tmp;
      }
    }

    if (!newHead.data) {
      newHead.data = pivot;
    }

    newEnd.data = this.getTail(newHead.data)!;

    return pivot;
  }

  quickSortRecur(head: Node | null, end: Node | null): Node | null {
    if (!head || head === end) {
      return head;
    }

    const newHead: Pointer = new Pointer();
    const newEnd: Pointer = new Pointer();
    const pivot: Node | null = this.partition(head, end, newHead, newEnd);

    if (newHead.data !== pivot) {
      let tmp: Node | null = newHead.data;
      while (tmp!.nextNode && tmp!.nextNode !== pivot) {
        tmp = tmp!.nextNode;
      }
      tmp!.nextNode = null;

      newHead.data = this.quickSortRecur(newHead.data, tmp);
      tmp = this.getTail(newHead.data)!;
      tmp.nextNode = pivot;
    }

    pivot!.nextNode = this.quickSortRecur(pivot!.nextNode, newEnd.data);

    return newHead.data;
  }

  quickSort(): void {
    this.head = this.quickSortRecur(this.head, this.getTail(this.head));
  }
}

// Test
if (require.main === module) {
  const llist: LinkedList = new LinkedList();
  llist.push(5);
  llist.push(20);
  llist.push(4);
  llist.push(3);
  llist.push(30);

  console.log("Linked List before sorting");
  llist.printList();
  llist.quickSort();

  console.log("Linked List after sorting");
  llist.printList();
}

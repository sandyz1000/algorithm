/* """
Detect loop in a linked list

Given a linked list, check if the the linked list has loop or not. Below diagram shows a
linked list with a loop.

    1 -> 2 -> 3
         A    |
         |    V
         5 <- 4

Floyd's Cycle-Finding Algorithm:

This is the fastest method. Traverse linked list using two pointers.  Move one
pointer by one and other pointer by two.  If these pointers meet at some node then
there is a loop. If pointers do not meet then linked list doesn't have loop.

Time Complexity: O(n)
Auxiliary Space: O(1)

### Notes:
Use Hashing:

Traverse the list one by one and keep putting the node addresses in a Hash Table.
At any point, if NULL is reached then return false and if next of current node
points to any of the previously stored nodes in Hash then return true.

Mark Visited Nodes:

This solution requires modifications to basic linked list data structure. Have a
visited flag with each node. Traverse the linked list and keep marking visited
nodes. If you see a visited node again then there is a loop. This solution works in
O(n) but requires additional information with each node.

A variation of this solution that doesn't require modification to basic data
structure can be implemented using hash. Just store the addresses of visited nodes
in a hash and if you see an address that already exists in hash then there is a loop.


""" */
export class Node {
  data: number;
  next: Node | null;

  constructor(data: number) {
    this.data = data;
    this.next = null;
  }
}

export class DetectLoopHashing {
  head: Node | null;

  constructor() {
    this.head = null;
  }

  push(newData: number): void {
    const newNode: Node = new Node(newData);
    newNode.next = this.head;
    this.head = newNode;
  }

  detectLoop(): boolean {
    const stack: Set<Node> = new Set();
    let h: Node | null = this.head;
    while (h !== null) {
      // If we have already encountered this node in the hash map, there is a cycle.
      if (stack.has(h)) {
        return true;
      }

      // If we are seeing the node for the first time, insert it into the hash map.
      stack.add(h);
      h = h.next;
    }
    return false;
  }
}

class LinkedList {
  head: Node | null;

  constructor() {
    this.head = null;
  }

  push(newData: number): void {
    const newNode: Node = new Node(newData);
    newNode.next = this.head;
    this.head = newNode;
  }

  detectLoop(): boolean {
    let slowP: Node | null = this.head;
    let fastP: Node | null = this.head;
    while (slowP && fastP && fastP.next) {
      slowP = slowP.next;
      fastP = fastP.next.next;
      if (slowP === fastP) {
        return true;
      }
    }
    return false;
  }
}

if (require.main === module) {
  // Time Complexity: O(n)
  // Auxiliary Space: O(1)
  console.log("\n------Method-1 -------");
  const llist1: LinkedList = new LinkedList();
  llist1.push(20);
  llist1.push(4);
  llist1.push(15);
  llist1.push(10);

  // Create a loop for testing
  llist1.head!.next!.next!.next!.next = llist1.head;
  console.log("Loop found" + (llist1.detectLoop() ? "" : "No Loop"));

  console.log("\n------Method-2 -------");
  const llist2: DetectLoopHashing = new DetectLoopHashing();
  llist2.push(20);
  llist2.push(4);
  llist2.push(15);
  llist2.push(10);

  // Create a loop for testing
  llist2.head!.next!.next!.next!.next = llist2.head;
  console.log("Loop found" + (llist2.detectLoop() ? "" : "No Loop"));
}

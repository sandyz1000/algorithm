/* """
Doubly Linked List | Set 1 (Introduction and Insertion)

Linked List Introduction
Inserting a node in Singly Linked List

A Doubly Linked List (DLL) contains an extra pointer, typically called previous pointer, together
with next pointer and data which are there in singly linked list.

Advantages over singly linked list

1) A DLL can be traversed in both forward and backward direction.

2) The delete operation in DLL is more efficient if pointer to the node to be deleted is given.
In singly linked list, to delete a node, pointer to the previous node is needed. To get this
previous node, sometimes the list is traversed. In DLL, we can get the previous node using previous
pointer.

Disadvantages over singly linked list
1) Every node of DLL Require extra space for an previous pointer. It is possible to implement DLL
with single pointer though.

2) All operations require an extra pointer previous to be maintained. For example, in insertion,
we need to modify previous pointers together with next pointers. For example in following
functions for insertions at different positions, we need 1 or 2 extra steps to set previous
pointer.

            +-----+     +-----+     +-----+     +-----+
 NULL <-    |  A  | <-> |  B  | <-> |  C  | <-> |  D  | -> NULL
 HEAD ->    +-----+     +-----+     +-----+     +-----+


1) Add a node at the front: (A 5 steps process)
    The new node is always added before the head of the given Linked List. And newly added
    node becomes the new head of DLL. For example if the given Linked List is
    1->0->1->5->2->0->2->5 and we add an item 5 at the front, then the Linked List becomes
    5->1->0->1->5->2->0->2->5. Let us call the function that adds at the front of the list is
    push(). The push() must receive a pointer to the head pointer, because push must change
    the head pointer to point to the new node

Given a reference to the head of a list and an integer,inserts a new node on the
front of list

""" */

export class Node {
  data: number;
  next: Node | null;
  prev: Node | null;

  constructor(data: number) {
    this.data = data;
    this.next = null;
    this.prev = null;
  }
}

export class DoublyLinkedList {
  head: Node | null;

  constructor() {
    this.head = null;
  }

  /**
   * Insert a new node at the beginning.
   * @param new_data The data for the new node.
   */
  push(new_data: number): void {
    // 1. Allocates node
    // 2. Put the data in it
    const new_node: Node = new Node(new_data);

    // 3. Make next of new node as head and
    // previous as None (already None)
    new_node.next = this.head;

    // 4. Change prev of head node to new_node
    if (this.head !== null) {
      this.head.prev = new_node;
    }

    // 5. Move the head to point to the new node
    this.head = new_node;
  }

  /**
   * Insert a new node after a given node.
   * @param prev_node The node after which the new node is inserted.
   * @param new_data The data for the new node.
   */
  insert_after(prev_node: Node | null, new_data: number): void {
    // 1. Check if the given prev_node is None
    if (prev_node === null) {
      console.log("the given previous node cannot be NULL");
      return;
    }

    // 2. Allocate new node
    // 3. Put in the data
    const new_node: Node = new Node(new_data);

    // 4. Make next of new node as next of prev node
    new_node.next = prev_node.next;

    // 5. Make prev_node as previous of new_node
    prev_node.next = new_node;

    // 6. Make prev_node ass previous of new_node
    new_node.prev = prev_node;

    // 7. Change previous of new_nodes's next node
    if (new_node.next !== null) {
      new_node.next.prev = new_node;
    }
  }

  /**
   * Append a new node at the end.
   * @param new_data The data for the new node.
   */
  append(new_data: number): void {
    // 1. Allocates node
    // 2. Put in the data
    const new_node: Node = new Node(new_data);

    // 3. This new node is going to be the last node, so make next of it as None
    new_node.next = null;

    // 4. If the Linked List is empty, then make the new node as head
    if (this.head === null) {
      new_node.prev = null;
      this.head = new_node;
      return;
    }

    // 5. Else traverse until the last node
    let last: Node | null = this.head;
    while (last.next !== null) {
      last = last.next;
    }

    // 6. Change the next of last node
    last.next = new_node;

    // 7. Make the last node as previous of new node
    new_node.prev = last;
  }

  /**
   * Print the linked list in both forward and reverse directions.
   * @param node The starting node for traversal.
   */
  static print_list(node: Node | null): void {
    const outForward: string[] = [];
    while (node !== null) {
      outForward.push(`${node.data}`);
      node = node.next;
    }
    console.log("\nTraversal in forward direction", outForward.join(" -> "));

    const outReverse: string[] = [];
    while (node !== null) {
      outReverse.push(`${node.data}`);
      node = node.prev;
    }
    console.log("\nTraversal in reverse direction", outReverse.join(" <- "));
  }
}

// Class to create a Doubly Linked List
export class Link {
  id: number;
  data: number;
  next_node: Link | null;
  prev_node: Link | null;

  constructor(id: number, data: number, next_node: Link | null = null, prev_node: Link | null = null) {
    this.id = id;
    this.data = data;
    this.next_node = next_node;
    this.prev_node = prev_node;
  }
}

export class DoubleEndedList {

  p_first: Link | null;
  p_last: Link | null;

  constructor() {
    this.p_first = null;
    this.p_last = null;
  }

  __del__(): void {
    let p_current: Link | null = this.p_first;
    while (p_current !== null) {
      p_current = p_current.prev_node;
    }
  }

  /**
   * Insert a new node at the beginning.
   * @param id The identifier for the new node.
   * @param data The data for the new node.
   */
  insertFirst(id: number, data: number): void {
    const p_new_link: Link = new Link(id, data);
    p_new_link.prev_node = this.p_first;  // Link the next link
    this.p_first = p_new_link;
  }

  /**
   * Insert a new node at the end.
   * @param id The identifier for the new node.
   * @param data The data for the new node.
   */
  insertLast(id: number, data: number): void {
    const p_new_link: Link = new Link(id, data);
    this.p_last.prev_node = p_new_link;
    this.p_last = p_new_link;  // Change the pLast pointer to new link
  }

  /**
   * Display the linked list.
   */
  displayList(): void {
    let p_current: Link | null = this.p_first;
    while (p_current !== null) {
      console.log(p_current);
      p_current = p_current.prev_node;
    }
  }

  /**
   * Remove the first node.
   */
  removeFirst(): void {
    const p_current: Link | null = this.p_first;
    if (this.p_first && this.p_first.prev_node === null) {
      this.p_last = null;
    }
    this.p_first = p_current?.prev_node;
    delete p_current;
  }
}

if (require.main === module) {
  // Start with an empty list
  const llist: DoublyLinkedList = new DoublyLinkedList();

  // Insert 6. So the list becomes 6->None
  llist.append(6);

  // Insert 7 at the beginning.
  // So linked list becomes 7->6->None
  llist.push(7);

  // Insert 1 at the beginning.
  // So linked list becomes 1->7->6->None
  llist.push(1);

  // Insert 4 at the end.
  // So linked list becomes 1->7->6->4->None
  llist.append(4);

  // Insert 8, after 7.
  // So linked list becomes 1->7->8->6->4->None
  llist.insert_after(llist.head!.next, 8);

  console.log("Created DLL is: ");
  DoublyLinkedList.print_list(llist.head);
}

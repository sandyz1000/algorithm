/* Write a function to get the intersection point of two Linked Lists.

http://www.geeksforgeeks.org/write-a-function-to-get-the-intersection-point-of-two-linked-lists/

There are two singly linked lists in a system. By some programming error the end node of one of
the linked list got linked into the second list, forming a inverted Y shaped list. Write a
program to get the point where two linked list merge


    HEAD -> 3 -> 6 -> 9
                      \
                       -> 15 -> 30 -> NULL
                      /
            HEAD -> 10

-----------------------------------------------
Method 1(Simply use two loops)
-----------------------------------------------
Use 2 nested for loops. Outer loop will be for each node of the 1st list and inner loop will be
for 2nd list. In the inner loop, check if any of nodes of 2nd list is same as the current node of
first linked list. Time complexity of this method will be O(mn) where m and n are the number of
nodes in two lists.

-----------------------------------------------
Method 2 (Mark Visited Nodes)
-----------------------------------------------
This solution requires modifications to basic linked list data structure. Have a visited flag
with each node. Traverse the first linked list and keep marking visited nodes. Now traverse
second linked list, If you see a visited node again then there is an intersection point,
return the intersecting node. This solution works in O(m+n) but requires additional information
with each node. A variation of this solution that doesn't require modification to basic data
structure can be implemented using hash. Traverse the first linked list and store the addresses
of visited nodes in a hash. Now traverse the second linked list and if you see an address that
already exists in hash then return the intersecting node.

-----------------------------------------------
Method 3(Using difference of node counts)
-----------------------------------------------
1) Get count of the nodes in first list, let count be c1.
2) Get count of the nodes in second list, let count be c2.
3) Get the difference of counts d = abs(c1 - c2)
4) Now traverse the bigger list from the first node till d nodes so that from here
onwards both the lists have equal no of nodes.
5) Then we can traverse both the lists in parallel till we come across a common node.
(Note that getting a common node is done by comparing the address of the nodes)

-----------------------------------------------
Method 4(Make circle in first list)
-----------------------------------------------
1. Traverse the first linked list(count the elements) and make a circular linked list. (Remember
last node so that we can break the circle later on).

2. Now view the problem as find the loop in the second linked list. So the problem is solved.

3. Since we already know the length of the loop(size of first linked list) we can traverse those
many number of nodes in second list, and then start another pointer from the beginning of second
list. we have to traverse until they are equal, and that is the required intersection point.

4. remove the circle from the linked list.

Time Complexity: O(m+n)
Auxiliary Space: O(1)

Method 5 (Reverse the first list and make equations)
------------------------------------------------------------

1) Let X be the length of the first linked list until intersection point.
   Let Y be the length of the second linked list until the intersection point.
   Let Z be the length of the linked list from intersection point to End of
   the linked list including the intersection node.
   We Have
           X + Z = C1;
           Y + Z = C2;
2) Reverse first linked list.
3) Traverse Second linked list. Let C3 be the length of second list - 1.
     Now we have
        X + Y = C3
     We have 3 linear equations. By solving them, we get
       X = (C1 + C3 - C2)/2;
       Y = (C2 + C3 - C1)/2;
       Z = (C1 + C2 - C3)/2;
      WE GOT THE INTERSECTION POINT.
4)  Reverse first linked list.

Advantage: No Comparison of pointers.
Disadvantage : Modifying linked list(Reversing list).

Time complexity: O(m+n)
Auxiliary Space: O(1)

Method 6 (Traverse both lists and compare addresses of last nodes) This method is only to detect if
there is an intersection point or not. (Thanks to NeoTheSaviour for suggesting this)
---------------------------------------------------------------------------------------------------

1)  Traverse the list 1, store the last node address
2)  Traverse the list 2, store the last node address.
3)  If nodes stored in 1 and 2 are same then they are intersecting.

Time complexity:
Time complexity of this method is O(m+n) and used Auxiliary space is O(1)

----------------------------------------------------------------------
Intersection of two Sorted Linked Lists

Given two lists sorted in increasing order, create and return a new list representing the
intersection of the two lists. The new list should be made with its own memory — the original
lists should not be changed.

Example:
------------------------

Let the first linked list be 1->2->3->4->6 and second linked list be 2->4->6->8, then your
function should create and return a third list as 2->4->6.

# Time Complexity: O(m+n)
# Auxiliary Space: O(1)
 */


export class Node {
  data: number | null;
  next_node: Node | null;

  constructor(data: number | null = null, next_node: Node | null = null) {
    this.data = data;
    this.next_node = next_node;
  }
}

export class Pointer {
  value: Node | null;

  constructor(value: Node | null) {
    this.value = value;
  }
}

export class IntersectionNodeUtility {
  head1: Node | null;
  head2: Node | null;

  constructor(head1: Node | null = null, head2: Node | null = null) {
    this.head1 = head1;
    this.head2 = head2;
  }

  get_intesection_node(): number | null {
    const { head1, head2 } = this;
    const c1 = this.get_count(head1);
    const c2 = this.get_count(head2);
    const d = Math.abs(c1 - c2);

    if (c1 > c2) {
      return this._get_intesection_node(d, head1, head2);
    } else {
      return this._get_intesection_node(d, head2, head1);
    }
  }

  _get_intesection_node(d: number, head1: Node | null, head2: Node | null): number | null {
    let current1: Node | null = head1;
    let current2: Node | null = head2;

    for (let i = 0; i < d; i++) {
      if (current1 === null) {
        return null;
      }
      current1 = current1.next_node;
    }

    while (current1 !== null && current2 !== null) {
      if (current1.data === current2.data) {
        return current1.data || null;
      }
      current1 = current1.next_node;
      current2 = current2.next_node;
    }

    return null;
  }

  get_count(head: Node | null): number {
    let current: Node | null = head;
    let count = 0;

    while (current !== null) {
      count += 1;
      current = current.next_node;
    }

    return count;
  }
}

export class IntersectionNodeUtility2 {
  sorted_intersect_method1(a: Node, b: Node): Node | null {
    const dummy: Node = new Node();

    while (a !== null && a.data !== null && b !== null && b.data !== null) {
      if (a.data === b.data) {
        const ptr: Pointer = new Pointer(dummy.next_node);
        this.push(ptr, a.data);
        dummy.next_node = ptr.value;
        a = a.next_node!;
        b = b.next_node!;
      } else if (a.data! < b.data!) {
        a = a.next_node!;
      } else {
        b = b.next_node!;
      }
    }

    return dummy.next_node;
  }

  sorted_intersect_method2(a: Node, b: Node): Node | null {
    const result: Node = new Node();
    const last_ptr: Pointer = new Pointer(result);

    while (a !== null && a.data !== null && b !== null && b.data !== null) {
      if (a.data === b.data) {
        this.push(last_ptr, a.data);
        last_ptr.value = last_ptr.value!.next_node;
        a = a.next_node!;
        b = b.next_node!;
      } else if (a.data! < b.data!) {
        a = a.next_node!;
      } else {
        b = b.next_node!;
      }
    }

    return result.next_node;
  }

  push(node_ref: Pointer, new_data: number): void {
    const new_node: Node = new Node(new_data);
    new_node.next_node = node_ref.value;
    node_ref.value = new_node;
  }

  print_list(node: Node): void {
    while (node !== null) {
      console.log(`${node.data}`);
      node = node.next_node!;
    }
  }
}

if (require.main === module) {
  // Method-3
  console.log("------Method-3-------\n");

  const head1: Node = new Node(10);
  head1.next_node = new Node(15);
  head1.next_node.next_node = new Node(30);

  const head2: Node = new Node(3);
  head2.next_node = new Node(6);
  head2.next_node.next_node = new Node(9);
  head2.next_node.next_node.next_node = new Node(15);
  head2.next_node.next_node.next_node.next_node = new Node(30);

  const utility: IntersectionNodeUtility = new IntersectionNodeUtility(head1, head2);
  const inter_node: number | null = utility.get_intesection_node();

  if (inter_node) {
    console.log(`\nThe node of intersection is ${inter_node}\n`);
  } else {
    console.log("\nNo intersection node found");
  }

  // Method-1 and Method-2
  // TODO: Fix this method
  const a: Pointer = new Pointer(new Node(null, null));
  const b: Pointer = new Pointer(new Node(null, null));
  const intersect: Node = new Node(null, null);

  const utility2: IntersectionNodeUtility2 = new IntersectionNodeUtility2();

  utility2.push(a, 6);
  utility2.push(a, 5);
  utility2.push(a, 4);
  utility2.push(a, 3);
  utility2.push(a, 2);
  utility2.push(a, 1);

  utility2.push(b, 8);
  utility2.push(b, 6);
  utility2.push(b, 4);
  utility2.push(b, 2);

  const intersect1: Node | null = utility2.sorted_intersect_method1(a.value, b.value);
  const intersect2: Node | null = utility2.sorted_intersect_method2(a.value, b.value);

  console.log("\n Linked list containing common items of a & b \n ");
  utility2.print_list(intersect2);
}

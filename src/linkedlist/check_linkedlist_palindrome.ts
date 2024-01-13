/* 
Function to check if a singly linked list is palindrome

Given a singly linked list of characters, write a function that returns true if the
given list is palindrome, else false.

HEAD-> R -> A -> D -> A -> R -> NULL

# METHOD 1 (Use a Stack)
# A simple solution is to use a stack of list nodes. This mainly involves three steps.
# 1) Traverse the given list from head to tail and push every visited node to stack.

# 2) Traverse the list again. For every visited node, pop a node from stack and compare
# data of popped node with currently visited node.

# 3) If all nodes matched, then return true, else false.
#
# Time Complexity: O(n)
# Auxiliary Space: O(n) if Function Call Stack size is considered, otherwise O(1).
# Program to check if a linked list is palindrome
# Following methods solve this with constant extra space.

METHOD 2 (By reversing the list)
    This method takes O(n) time and O(1) extra space.
    1) Get the middle of the linked list.
    2) Reverse the second half of the linked list.
    3) Check if the first half and second half are identical.

    4) Construct the original linked list by reversing the second half again and
    attaching it back to the first half

    To divide the list in two halves, method 2 of this post is used. When number of
    nodes are even, the first and second half contain exactly half nodes. The
    challenging thing in this method is to handle the case when number of nodes are
    odd. We don't want the middle node as part of any of the lists as we are going to
    compare them for equality. For odd case, we use a separate variable 'midnode'.

    Function to check if given linked list is palindrome or not


METHOD 3 (Using Recursion)
    Use two pointers left and right. Move right and left using recursion and check for
    following in each recursive call.
    1) Sub-list is palindrome.
    2) Value at current left and right are matching.

    If both above conditions are true then return true.

    The idea is to use function call stack as container. Recursively traverse till the
    end of list. When we return from last NULL, we will be at last node. The last node
    to be compared with first node of list.

    In order to access first node of list, we need list head to be available in the
    last call of recursion. Hence we pass head also to the recursive function. If they
    both match we need to compare (2, n-2) nodes. Again when recursion falls back to (
    n-2)nd node, we need reference to 2nd node from head. We advance the head pointer
    in previous call, to refer to next node in the list.

    However, the trick in identifying double pointer. Passing single pointer is as good as
    pass-by-value, and we will pass the same pointer again and again. We need to pass the
    address of head pointer for reflecting the changes in parent recursive calls.
 */

export class Node {
  data: number;
  next_node: Node | null;

  constructor(data: number, next_node: Node | null = null) {
    this.data = data;
    this.next_node = next_node;
  }
}

// This is method-2
export class LinkedListPalindrome {
  head: Node | null;
  slow_ptr: Node | null;
  fast_ptr: Node | null;

  constructor(head: Node | null = null) {
    this.head = head;
    this.slow_ptr = null;
    this.fast_ptr = null;
  }

  push(new_data: number): void {
    const new_node: Node = new Node(new_data);
    new_node.next_node = this.head;
    this.head = new_node;
  }

  printList(): void {
    let ptr: Node | null = this.head;
    const output: string[] = [];
    while (ptr !== null) {
      output.push(`${ptr.data}->`);
      ptr = ptr.next_node;
    }
    output.push("NULL");
    console.log(output.join(""));
  }

  isPalindrome(head: Node | null): boolean {
    this.slow_ptr = head;
    this.fast_ptr = head;
    let prev_of_slow_ptr: Node | null = head;
    let mid_node: Node | null = null;
    let res: boolean = true;

    if (head !== null && head.next_node !== null) {
      while (this.fast_ptr !== null && this.fast_ptr.next_node !== null) {
        this.fast_ptr = this.fast_ptr.next_node.next_node;
        prev_of_slow_ptr = this.slow_ptr;
        this.slow_ptr = this.slow_ptr ? this.slow_ptr.next_node : null;
      }

      if (this.fast_ptr !== null) {
        mid_node = this.slow_ptr;
        this.slow_ptr = this.slow_ptr ? this.slow_ptr.next_node : null;
      }

      const second_half: Node | null = this.slow_ptr;

      if (prev_of_slow_ptr !== null) {
        prev_of_slow_ptr.next_node = null;
      }
      const reversedSecondHalf: Node | null = this.reverse(second_half);
      res = this.compareLists(head, reversedSecondHalf);

      const second_half_restored: Node | null = this.reverse(reversedSecondHalf);
      if (prev_of_slow_ptr !== null) {
        if (mid_node !== null) {
          prev_of_slow_ptr.next_node = mid_node;
          mid_node.next_node = second_half_restored;
        } else {
          prev_of_slow_ptr.next_node = second_half_restored;
        }
      }
    }

    return res;
  }

  reverse(second_half: Node | null): Node | null {
    let prev: Node | null = null;
    let current: Node | null = second_half;
    while (current !== null) {
      const next_node: Node | null = current.next_node;
      current.next_node = prev;
      prev = current;
      current = next_node;
    }
    return prev;
  }

  compareLists(head1: Node | null, head2: Node | null): boolean {
    let temp1: Node | null = head1;
    let temp2: Node | null = head2;

    while (temp1 !== null && temp2 !== null) {
      if (temp1.data !== temp2.data) {
        return false;
      }
      temp1 = temp1.next_node;
      temp2 = temp2.next_node;
    }

    return temp1 === null && temp2 === null;
  }
}

// This is method-3
export class IsPalindromeRecursive {
  head: Node | null;
  left: Node | null;

  constructor(head: Node | null = null) {
    this.head = head;
    this.left = null;
  }

  push(new_data: number): void {
    const new_node: Node = new Node(new_data);
    new_node.next_node = this.head;
    this.head = new_node;
  }

  printList(): void {
    let ptr: Node | null = this.head;
    const output: string[] = [];
    while (ptr !== null) {
      output.push(`${ptr.data}->`);
      ptr = ptr.next_node;
    }
    output.push("NULL");
    console.log(output.join(""));
  }

  isPalindromeRecUtil(right: Node | null): boolean {
    this.left = this.head;
    if (right === null) {
      return true;
    }

    const isp: boolean = this.isPalindromeRecUtil(right.next_node);
    if (!isp) {
      return false;
    }

    const isp1: boolean = this.left && (right.data === this.left.data) || false;
    this.left = this.left ? this.left.next_node : null;
    return isp1;
  }

  isPalindrome(head: Node | null): boolean {
    return this.isPalindromeRecUtil(head);
  }
}

if (require.main === module) {
  const llist: LinkedListPalindrome = new LinkedListPalindrome();
  let string: string = "abacaba";
  let i: number = 0;

  console.log("-----------Iterative Method-----------");
  while (i < string.length) {
    llist.push(parseInt(string[i]));
    llist.printList();
    console.log(llist.isPalindrome(llist.head) ? "Is Palindrome" : "Not Palindrome", "\n");
    i += 1;
  }

  console.log("\n-----------Recursive Method-----------\n");
  const llistRecursive: IsPalindromeRecursive = new IsPalindromeRecursive();
  i = 0;
  while (i < string.length) {
    llistRecursive.push(parseInt(string[i]));
    llistRecursive.printList();
    console.log(llistRecursive.isPalindrome(llistRecursive.head) ? "Is Palindrome" : "Not Palindrome", "\n");
    i += 1;
  }
}

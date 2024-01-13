"""
In-place conversion of Sorted DLL to Balanced BST
http://www.geeksforgeeks.org/?p=17629

Given a Doubly Linked List which has data members sorted in ascending order.
Construct a Balanced Binary Search Tree which has same data members as the given Doubly Linked List.
The tree must be constructed in-place (No new node should be allocated for tree conversion)

Examples:

Input:  Doubly Linked List 1  2  3
Output: A Balanced BST
     2
   /  \
  1    3


Input: Doubly Linked List 1  2  3  4  5  6  7
Output: A Balanced BST
        4
      /   \
     2     6
   /  \   / \
  1   3  4   7

Input: Doubly Linked List 1  2  3  4
Output: A Balanced BST
      3
    /  \
   2    4
 /
1

Input:  Doubly Linked List 1  2  3  4  5  6
Output: A Balanced BST
      4
    /   \
   2     6
 /  \   /
1   3  5

"""


# A Doubly Linked List node that will also be used as a tree node
class Node(object):
    def __init__(self, data, next_node=None, prev_node=None):
        self.data = data
        # For tree, next pointer can be used as right subtree pointer
        self.next_node = next_node
        # For tree, prev pointer can be used as left subtree pointer
        self.prev_node = prev_node


class LinkedList(object):
    """
    --------------------------------------------------
    Explanation:
    --------------------------------------------------

    The Doubly Linked List conversion is very much similar to this Singly Linked List problem and
    the method 1 is exactly same as the method 1 of previous post. Method 2 is also almost same.
    The only difference in method 2 is, instead of allocating new nodes for BST, we reuse same
    DLL nodes. We use prev pointer as left and next pointer as right.

    Method 1 (Simple)
    Following is a simple algorithm where we first find the middle node of list and make it root
    of the tree to be constructed.

    - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    1) Get the Middle of the linked list and make it root.
    2) Recursively do same for left half and right half.
        a) Get the middle of left half and make it left child of the root created in step 1.
        b) Get the middle of right half and make it right child of the root created in step 1.

    Time complexity: O(nLogn) where n is the number of nodes in Linked List.
    - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    Method 2 (Tricky)
    The method 1 constructs the tree from root to leaves. In this method, we construct from
    leaves to root. The idea is to insert nodes in BST in the same order as the appear in Doubly
    Linked List, so that the tree can be constructed in O(n) time complexity. We first count the
    number of nodes in the given Linked List. Let the count be n. After counting nodes,
    we take left n/2 nodes and recursively construct the left subtree. After left subtree is
    constructed, we assign middle node to root and link the left subtree with root. Finally,
    we recursively construct the right subtree and link it with root. While constructing the BST,
    we also keep moving the list head pointer to next so that we have the appropriate pointer in
    each recursive call.

    """
    def __init__(self):
        self.head = None

    def sorted_list_to_bst(self):
        """
        This function counts the number of nodes in Linked List and then calls
        sortedListToBSTRecur() to construct BST
        Time Complexity: O(n)
        :param head: Node
        :return:
        """
        n = self.count_nodes(self.head)  # Count the number of nodes in Linked List
        return self.sorted_list_to_bst_recur(n)  # Construct BST

    def sorted_list_to_bst_recur(self, n):
        """
        # The main function that constructs balanced BST and returns root of it.
        # head_ref -->  Pointer to pointer to head node of Doubly linked list
        # n  --> No. of nodes in the Doubly Linked List
        """
        if n <= 0:  # Base Case
            return None

        # Recursively construct the left subtree
        left = self.sorted_list_to_bst_recur(n // 2)

        # head_ref now refers to middle node, make middle node as root of BST
        root = self.head

        # Set pointer to left subtree
        root.prev_node = left

        # Change head pointer of Linked List for parent recursive calls
        self.head = self.head.next_node

        # Recursively construct the right subtree and link it with root
        # The number of nodes in right subtree  is total nodes - nodes in
        # left subtree - 1 (for root)
        root.next_node = self.sorted_list_to_bst_recur(n - n // 2 - 1)
        return root

    def count_nodes(self, head):
        """A utility function that returns count of nodes in a given Linked List"""
        count = 0
        temp = head
        while temp:
            temp = temp.next_node
            count += 1
        return count

    def push(self, data):
        """
        Function to insert a node at the beginging of the Doubly Linked List
        :param head_ref:
        :param data:
        :return:
        """
        new_node = Node(data)

        # since we are adding at the beginning, prev is always NULL
        new_node.prev_node = None
        # link the old list off the new node
        new_node.next_node = self.head
        # change prev of head node to new node
        if self.head is not None:
            self.head.prev_node = new_node

        # move the head to point to the new node
        self.head = new_node

    def print_list(self):
        """Function to print nodes in a given linked list"""
        node = self.head
        while node is not None:
            print("%d " % node.data)
            node = node.next_node

    def pre_order(self, node):
        """A utility function to print preorder traversal of BST"""
        if node is None:
            return
        print("%d " % node.data)
        self.pre_order(node.prev_node)
        self.pre_order(node.next_node)


if __name__ == '__main__':
    llist = LinkedList()

    # Let us create a sorted linked list to test the functions
    # Created linked list will be 7->6->5->4->3->2->1
    llist.push(7)
    llist.push(6)
    llist.push(5)
    llist.push(4)
    llist.push(3)
    llist.push(2)
    llist.push(1)

    print("Given Linked List\n")
    llist.print_list()

    # Convert List to BST
    root = llist.sorted_list_to_bst()
    print("\n PreOrder Traversal of constructed BST \n ")
    llist.pre_order(root)
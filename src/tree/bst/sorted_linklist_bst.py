"""
Sorted Linked List to Balanced BST

Given a Singly Linked List which has data members sorted in ascending order.
Construct a Balanced Binary Search Tree which has same data members as the given Linked List.

Examples:
Input:  Linked List 1->2->3
Output: A Balanced BST
     2
   /  \
  1    3


Input: Linked List 1->2->3->4->5->6->7
Output: A Balanced BST
        4
      /   \
     2     6
   /  \   / \
  1   3  4   7

Input: Linked List 1->2->3->4
Output: A Balanced BST
      3
    /  \
   2    4
 /
1

Input:  Linked List 1->2->3->4->5->6
Output: A Balanced BST
      4
    /   \
   2     6
 /  \   /
1   3  5

"""
from __future__ import print_function


class LNode:
    def __init__(self, data, next_node=None, prev_node=None):
        self.data = data
        self.next_node = next_node
        self.prev_node = prev_node


class TNode:
    """A Binary Tree node"""
    def __init__(self, data, left=None, right=None):
        self.data = data
        self.left = left
        self.right = right


class LinkedList(object):
    """
    Method 1 (Simple)
    Following is a simple algorithm where we first find the middle node of list and make it
    root of the tree to be constructed.

    - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    1) Get the Middle of the linked list and make it root.
    2) Recursively do same for left half and right half.
        a) Get the middle of left half and make it left child of the root created in step 1.
        b) Get the middle of right half and make it right child of the root created in step 1.

    Time complexity: O(nLogn) where n is the number of nodes in Linked List.
    - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    Method 2 (Tricky)
    The method 1 constructs the tree from root to leaves. In this method, we construct from
    leaves to root. The idea is to insert nodes in BST in the same order as the appear in Linked
    List, so that the tree can be constructed in O(n) time complexity. We first count the number
    of nodes in the given Linked List. Let the count be n. After counting nodes, we take left n/2
    nodes and recursively construct the left subtree. After left subtree is constructed,
    we allocate memory for root and link the left subtree with root. Finally, we recursively
    construct the right subtree and link it with root. While constructing the BST, we also keep
    moving the list head pointer to next so that we have the appropriate pointer in each
    recursive call.

    Time Complexity: O(n)
    """
    head = None

    # This function counts the number of nodes in Linked List and then calls sortedListToBSTRecur()
    # to construct BST
    def sorted_list_to_bst(self):
        # Count the number of nodes in Linked List
        n = self.count_nodes(self.head)
        # Construct BST
        return self.sorted_list_to_bst_recur(n)

    def sorted_list_to_bst_recur(self, n):
        """
        The main function that constructs balanced BST and returns root of it.
        head_ref -->  Pointer to pointer to head node of linked list
        n  --> No. of nodes in Linked List

        :param n:
        :return:
        """
        if n <= 0:  # Base Case
            return None

        # Recursively construct the left subtree
        left = self.sorted_list_to_bst_recur(n // 2)

        # Allocate memory for root, and link the above constructed left subtree with root
        root = TNode(self.head.data)

        # Set pointer to left subtree
        root.left = left

        # Change head pointer of Linked List for parent recursive calls
        self.head = self.head.next_node

        # Recursively construct the right subtree and link it with root
        # The number of nodes in right subtree  is total nodes - nodes in
        # left subtree - 1 (for root) which is n-n/2-1
        root.right = self.sorted_list_to_bst_recur(n - n // 2 - 1)
        return root

    def count_nodes(self, head):
        """A utility function that returns count of nodes in a given Linked List"""
        count = 0
        temp = head
        while temp:
            temp = temp.next_node
            count += 1
        return count

    def push(self, new_data):
        """
        Function to insert a node at the beginging of the linked list
        :param new_data:
        :return:
        """
        # allocate node
        new_node = LNode(new_data)
        new_node.prev_node = None
        new_node.next_node = self.head
        # change prev of head node to new node
        if self.head is not None:
            self.head.prev_node = new_node

        # move the head to point to the new node
        self.head = new_node

    def print_list(self, node):
        """
        Function to print nodes in a given linked list
        :param node: LNode
        :return:
        """
        while node is not None:
            print("%d " % node.data)
            node = node.next_node

    def pre_order(self, node):
        """
        A utility function to print preorder traversal of BST
        :param node: TNode
        :return:
        """
        if node is None:
            return

        print("%d " % node.data)
        self.pre_order(node.left)
        self.pre_order(node.right)


if __name__ == '__main__':
    # Given Linked List 1 2 3 4 5 6 7
    # PreOrder Traversal of constructed BST 4 2 1 3 6 5 7
    llist = LinkedList()
    # Let us create a sorted linked list to test the functions
    # Created linked list will be 1->2->3->4->5->6->7
    llist.push(7)
    llist.push(6)
    llist.push(5)
    llist.push(4)
    llist.push(3)
    llist.push(2)
    # llist.push(1)

    print("\n Given Linked List ")
    llist.print_list(llist.head)

    # /* Convert List to BST */
    root = llist.sorted_list_to_bst()
    print("\n PreOrder Traversal of constructed BST ")
    llist.pre_order(root)

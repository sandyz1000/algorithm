"""
Create a Doubly Linked List from a Ternary Tree
Given a ternary tree, create a doubly linked list out of it. A ternary tree is just like binary
tree but instead of having two nodes, it has three nodes i.e. left, middle, right.

The doubly linked list should holds following properties –

1.  Left pointer of ternary tree should act as prev pointer of doubly linked list.
2.  Middle pointer of ternary tree should not point to anything.
3.  Right pointer of ternary tree should act as next pointer of doubly linked list.
4.  Each node of ternary tree is inserted into doubly linked list before its subtrees and for
    any node, its left child will be inserted first, followed by mid and right child (if any).

------------------------------------------------------
Example:
------------------------------------------------------

                30
          /     |     \
        /       |       \
       5        11      63
    /  |  \   / |  \   / |  \
   1   4  8  6  7  15 31 55 65


For the above example, the linked list formed for below tree should be NULL
NULL <- 30 <-> 5 <-> 1 <-> 4 <-> 8 <-> 11 <-> 6 <-> 7 <-> 15 <-> 63 <-> 31 <-> 55 <-> 65 -> NULL

"""
from __future__ import print_function
# Python program to create a doubly linked list out of given a ternary tree.


class Node:
    def __init__(self, data, left=None, middle=None, right=None):
        self.data = data
        self.left = left
        self.middle = middle
        self.right = right


class DoubleLinkedList(object):
    """
    Utility function that constructs doubly linked list by inserting current node at the
    end of the doubly linked list by using a tail pointer
    """

    def __init__(self, head_ref=None, tail=None):
        self.head_ref = head_ref
        self.tail_ref = tail

    def push(self, node):
        if self.tail_ref is None:
            self.tail_ref = node  # initialize tail pointer
            # set left, middle and right child to point to NULL
            node.left = node.middle = node.right = None
        else:
            self.tail_ref.right = node  # insert node in the end using tail pointer
            node.left = self.tail_ref  # set prev of node
            node.right = node.middle = None  # set middle and right child to point to NULL
            self.tail_ref = node  # now tail pointer will point to inserted node

    def print_list(self):
        """Utility function for printing double linked list."""
        print("Created Double Linked list is:\n")
        head = self.head_ref
        while head:
            print("%d " % head.data)
            head = head.right


def ternary_tree_to_list(root, dll):
    """
    Create a doubly linked list out of given a ternary tree. by traversing the tree
    in preoder fashion.
    :param root:
    :param dll:
    :return:
    """
    if root is None:  # Base case
        return None

    # store left, middle and right nodes for future calls.
    left = root.left
    middle = root.middle
    right = root.right

    # set head of the doubly linked list
    # head will be root of the ternary tree
    if dll.head_ref is None:
        dll.head_ref = root

    # push current node in the end of DLL
    dll.push(root)

    # recurse for left, middle and right child
    ternary_tree_to_list(left, dll)
    ternary_tree_to_list(middle, dll)
    ternary_tree_to_list(right, dll)


if __name__ == '__main__':
    # Constructing ternary tree as shown in above figure
    root = Node(30)
    root.left = Node(5)
    root.middle = Node(11)
    root.right = Node(63)
    root.left.left = Node(1)
    root.left.middle = Node(4)
    root.left.right = Node(8)

    root.middle.left = Node(6)
    root.middle.middle = Node(7)
    root.middle.right = Node(15)

    root.right.left = Node(31)
    root.right.middle = Node(55)
    root.right.right = Node(65)

    dll = DoubleLinkedList()
    ternary_tree_to_list(root, dll)
    dll.print_list()

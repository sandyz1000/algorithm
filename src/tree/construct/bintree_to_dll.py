""" Convert a given Binary Tree to Doubly Linked List | Set 1

Given a Binary Tree (Bt), convert it to a Doubly Linked List(DLL). The left and right pointers in
nodes are to be used as previous and next pointers respectively in converted DLL. The order of
nodes in DLL must be same as Inorder of the given Binary Tree. The first node of Inorder
traversal (left most node in BT) must be head node of the DLL.

    Binary Tree:
            10
          /   \
        12    15
      /  \   /
     25  30 36

    DLL:
    25 <--> 12 <--> 30 <--> 10 <--> 36 <--> 15

"""
from __future__ import print_function, unicode_literals

# Python program for in-place conversion of Binary Tree to DLL


class NewNode:
    def __init__(self, data, left=None, right=None):
        self.data = data
        self.left = left
        self.right = right


class Head:
    def __init__(self, head):
        self.head = head


def static_vars(**kwargs):
    def decorate(func):
        for k in kwargs:
            setattr(func, k, kwargs[k])
        return func
    return decorate


def bintree_2list_util(root):
    """This is the core function to convert Tree to list.
        This function follows steps 1 and 2 of the above algorithm"""

    if root is None:  # Base case
        return root

    # Convert the left subtree and link to root
    if root.left is not None:
        # Convert the left subtree
        left = bintree_2list_util(root.left)

        # Find inorder predecessor. After this loop, left will point
        # to the inorder predecessor
        while left.right is not None:
            left = left.right

        # Make root as next of the predecessor
        left.right = root

        # Make predecessor as previous of root
        root.left = left

    # Convert the right subtree and link to root
    if root.right is not None:
        # Convert the right subtree
        right = bintree_2list_util(root.right)

        # Find inorder successor. After this loop, right will point to the inorder successor
        while right.left is not None:
            right = right.left

        # Make root as previous of successor
        right.left = root

        # Make successor as next of root
        root.right = right

    return root


def bintree2list(root):
    """
    Method-1:
    --------------------------------------------
    Explanation:
    --------------------------------------------
    A similar problem is discussed in this post. The problem here is simpler as we don't need to
    create circular DLL, but a simple DLL. The idea behind its solution is quite simple and
    straight.

    1. If left subtree exists, process the left subtree
        1.a) Recursively convert the left subtree to DLL.
        1.b) Then find inorder predecessor of root in left subtree (inorder predecessor is
        rightmost node in left subtree).
        1.c) Make inorder predecessor as previous of root and root as next of inorder predecessor.

    2. If right subtree exists, process the right subtree (Below 3 steps are similar to left
    subtree).
        2.a) Recursively convert the right subtree to DLL.
        2.b) Then find inorder successor of root in right subtree (inorder successor is leftmost
        node in right subtree).
        2.c) Make inorder successor as next of root and root as previous of inorder successor.

    3. Find the leftmost node and return it (the leftmost node is always head of converted DLL).

    The main function that first calls bintree2listUtil(), then follows step 3
    of the above algorithm
    :param root:
    :return:
    """
    if root is None:  # Base case
        return root
    # Convert to DLL using bintree2listUtil()
    root = bintree_2list_util(root)
    # bintree2listUtil() returns root node of the converted DLL.
    # We need pointer to the leftmost node which is head of the constructed DLL,
    # so move to the leftmost node
    while root.left is not None:
        root = root.left

    return root


def print_list(node):
    """Function to print nodes in a given doubly linked list"""
    while node is not None:
        print("%d " % node.data)
        node = node.right


# Method-2
# A simple inorder traversal based program to convert a Binary Tree to DLL
# A Binary Tree node

def inorder(root):
    """Standard Inorder traversal of tree"""
    if root is not None:
        inorder(root.left)
        print("\t%d" % (root.data))
        inorder(root.right)


def fix_prev_ptr(root):
    """
    Changes left pointers to work as previous pointers in converted DLL
    The function simply does inorder traversal of Binary Tree and updates
    left pointer using previously visited node
    """
    if root is not None:
        fix_prev_ptr(root.left)
        root.left = fix_prev_ptr.pre
        fix_prev_ptr.pre = root
        fix_prev_ptr(root.right)


def fix_next_ptr(root):
    """Changes right pointers to work as nexr pointers in converted DLL"""
    # Find the right most node in BT or last node in DLL
    while root and root.right is not None:
        root = root.right

        # Start from the rightmost node, traverse back using
    # left pointers
    # While traversing, change right pointer of nodes
    while root and root.left is not None:
        prev = root
        root = root.left
        root.right = prev

    # The leftmost node is head of linked list, return it
    return root


def bt_to_dll(root):
    """
    Method-2:
    --------------------------------------------
    Explanation:
    --------------------------------------------
    1) Fix Left Pointers: In this step, we change left pointers to point to previous nodes in DLL.
    The idea is simple, we do inorder traversal of tree. In inorder traversal, we keep track of
    previous visited node and change left pointer to the previous node. See fixPrevPtr() in below
    implementation.

    2) Fix Right Pointers: The above is intuitive and simple. How to change right pointers to
    point to next node in DLL? The idea is to use left pointers fixed in step 1. We start from
    the rightmost node in Binary Tree (BT). The rightmost node is the last node in DLL. Since
    left pointers are changed to point to previous node in DLL, we can linearly traverse the
    complete DLL using these pointers. The traversal would be from last to first node. While
    traversing the DLL, we keep track of the previously visited node and change the right pointer
    to the previous node. See fixNextPtr() in below implementation.

    The main function that converts BST to DLL and returns head of DLL
    """
    # Set the previous pointer
    fix_prev_ptr(root)

    # Set the next pointer and return head of DLL
    return fix_next_ptr(root)


# Method-3
# Python program for in-place conversion of Binary Tree to DLL
@static_vars(prev=None)
def binary_tree2_double_linked_list(root, headref):
    """
    Method-3
    --------------------------------------------
    Explanation:
    --------------------------------------------
    In this post, a third solution is discussed which seems to be the simplest of all. The idea
    is to do inorder traversal of the binary tree. While doing inorder traversal, keep track of
    the previously visited node in a variable say prev. For every visited node, make it next of
    prev and previous of this node as prev.

    A simple recursive function to convert a given Binary tree to Doubly
    Linked List
    Initialize previously visited node as NULL. This is static so that the same value is
    accessible in all recursive calls
    root --> Root of Binary Tree
    head --> Pointer to head node of created doubly linked list
    :param root:
    :param headref:
    :return:
    """
    if root is None:  # Base case
        return

    # Recursively convert left subtree
    binary_tree2_double_linked_list(root.left, headref)
    # Now convert this node
    if binary_tree2_double_linked_list.prev is None:
        headref.head = root
    else:
        root.left = binary_tree2_double_linked_list.prev
        binary_tree2_double_linked_list.prev.right = root

    binary_tree2_double_linked_list.prev = root
    # Finally convert right subtree
    binary_tree2_double_linked_list(root.right, headref)


# Method-4
# Python program to convert a given Binary Tree to Doubly Linked List
def binary_to_dll(root, head_ref):
    """
    Method-4
    --------------------------------------------
    Explanation:
    --------------------------------------------
    In the following implementation, we traverse the tree in inorder fashion. We add nodes at the
    beginning of current linked list and update head of the list using pointer to head pointer.
    Since we insert at the beginning, we need to process leaves in reverse order. For reverse
    order, we first traverse the right subtree before the left subtree. i.e. do a reverse inorder
    traversal.

    A simple recursive function to convert a given Binary tree to Doubly Linked List
    root     --> Root of Binary Tree
    head_ref --> Pointer to head node of created doubly linked list
    :param root:
    :param head_ref:
    :return:
    """
    if root is None:  # Base cases
        return
    # Recursively convert right subtree
    binary_to_dll(root.right, head_ref)
    # insert root into DLL
    root.right = head_ref.head

    # Change left pointer of previous head
    if head_ref.head is not None:
        head_ref.head.left = root

    # Change head of Doubly linked list
    head_ref.head = root
    # Recursively convert left subtree
    binary_to_dll(root.left, head_ref)


if __name__ == '__main__':
    try:
        # Let us create the tree shown in above diagram
        print("\n-----Method-1------")
        root = NewNode(10)
        root.left = NewNode(12)
        root.right = NewNode(15)
        root.left.left = NewNode(25)
        root.left.right = NewNode(30)
        root.right.left = NewNode(36)

        # Convert to DLL
        head = bintree2list(root)

        print("\nDLL Traversal")
        print_list(head)

        print("\n-----Method-2------")
        # Time Complexity: O(n) where n is the number of nodes in given Binary Tree.
        # The solution simply does two traversals of all Binary Tree nodes
        root = NewNode(10)
        root.left = NewNode(12)
        root.right = NewNode(15)
        root.left.left = NewNode(25)
        root.left.right = NewNode(30)
        root.right.left = NewNode(36)

        # print("\nInorder Tree Traversal")
        # inorder(root)

        # Static variable pre for function fixPrevPtr
        fix_prev_ptr.pre = None
        head = bt_to_dll(root)

        print("\nDLL Traversal")
        print_list(head)

        print("\n-----Method-3------\n")
        # Time Complexity: The above program does a simple inorder traversal, so time
        # complexity is O(n) where n is the number of nodes in given binary tree.
        # Let us create the tree shown in above diagram
        root = NewNode(10)
        root.left = NewNode(12)
        root.right = NewNode(15)
        root.left.left = NewNode(25)
        root.left.right = NewNode(30)
        root.right.left = NewNode(36)

        # Convert to DLL
        headref = Head(None)
        binary_tree2_double_linked_list(root, headref)
        head = headref.head

        print("\nDLL Traversal")
        print_list(head)

        print("\n-----Method-4------")

        # Time Complexity: O(n), as the solution does a single traversal of given Binary Tree.
        #  Constructing below tree
        #                5
        #              /   \
        #             3     6
        #            / \     \
        #           1   4     8
        #          / \       / \
        #         0   2     7   9

        root = NewNode(5)
        root.left = NewNode(3)
        root.right = NewNode(6)
        root.left.left = NewNode(1)
        root.left.right = NewNode(4)
        root.right.right = NewNode(8)
        root.left.left.left = NewNode(0)
        root.left.left.right = NewNode(2)
        root.right.right.left = NewNode(7)
        root.right.right.right = NewNode(9)

        headref = Head(None)
        binary_to_dll(root, headref)
        head = headref.head

        print("\nDLL Traversal")
        print_list(head)
    except KeyboardInterrupt as e:
        pass
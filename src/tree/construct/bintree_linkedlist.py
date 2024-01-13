"""
Construct Complete Binary Tree from its Linked List Representation

Given Linked List Representation of Complete Binary Tree, construct the Binary tree. A complete
binary tree can be represented in an array in the following approach.

If root node is stored at index i, its left, and right children are stored at
indices 2*i+1, 2*i+2 respectively.

Suppose tree is represented by a linked list in same way, how do we convert this into normal
linked representation of binary tree where every node has data, left and right pointers? In the
linked list representation, we cannot directly access the children of the current node unless we
traverse the list.

    Linked List:
    10 --> 12 --> 15 --> 25 --> 30 --> 36

    Binary Tree:

           (10)
          /    \
       (12)    (15)
      /   \     /
     (25) (30) (36)

"""
from __future__ import print_function, absolute_import


# Python program to create a Complete Binary Tree from its linked list representation
# Time Complexity: Time complexity of the above solution is O(n) where n is the number of nodes.

# Linked List node
class ListNode:
    # Constructor to create a new node
    def __init__(self, data):
        self.data = data
        self.next_node = None


# Binary Tree Node structure
class BinaryTreeNode:
    # Constructor to create a new node
    def __init__(self, data):
        self.data = data
        self.left = None
        self.right = None


# Class to convert the linked list to Binary Tree
class Conversion:
    # Constructor for storing head of linked list
    # and root for the Binary Tree
    def __init__(self, data=None):
        self.head = None
        self.root = None

    def push(self, new_data):

        # Creating a new linked list node and storing data
        new_node = ListNode(new_data)

        # Make next of new node as head
        new_node.next_node = self.head

        # Move the head to point to new node
        self.head = new_node

    def convertList2Binary(self):
        """
        ------------------------------------------
        Explanation:
        ------------------------------------------
        We are mainly given level order traversal in sequential access form. We know head of
        linked list is always it's root of the tree. We take the first node as root and we also
        know that the next two nodes are left and right children of root. So we know partial
        Binary Tree. The idea is to do Level order traversal of the partially built Binary Tree
        using queue and traverse the linked list at the same time. At every step, we take the
        parent node from queue, make next two nodes of linked list as children of the parent
        node, and enqueue the next two nodes to queue.

        1. Create an empty queue.
        2. Make the first node of the list as root, and enqueue it to the queue.
        3. Until we reach the end of the list, do the following.
            a. Dequeue one node from the queue. This is the current parent.
            b. Traverse two nodes in the list, add them as children of the current parent.
            c. Enqueue the two nodes into the queue.
        """
        # Queue to store the parent nodes
        q = []

        # Base Case
        if self.head is None:
            self.root = None
            return

        # 1.) The first node is always the root node,
        # and add it to the queue
        self.root = BinaryTreeNode(self.head.data)
        q.append(self.root)

        # Advance the pointer to the next node
        self.head: ListNode = self.head.next_node

        # Until th end of linked list is reached, do:
        while self.head:

            # 2.a) Take the parent node from the q and
            # and remove it from q
            parent = q.pop(0)  # Front of queue

            # 2.c) Take next two nodes from the linked list.
            # We will add them as children of the current parent node in step 2.b.
            # Push them into the queue so that they will be parent to the future node
            left_child = None
            right_child = None

            if self.head:
                left_child = BinaryTreeNode(self.head.data)
                q.append(left_child)
                self.head = self.head.next_node

            if self.head:
                right_child = BinaryTreeNode(self.head.data)
                q.append(right_child)
                self.head = self.head.next_node

            # 2.b) Assign the left and right children of parent
            parent.left = left_child
            parent.right = right_child

    def inorderTraversal(self, root):
        if root:
            self.inorderTraversal(root.left)
            print(root.data, end=" ")
            self.inorderTraversal(root.right)


if __name__ == '__main__':
    # Inorder Traversal of the constructed Binary Tree is: 25 12 30 10 36 15

    conv = Conversion()
    conv.push(36)
    conv.push(30)
    conv.push(25)
    conv.push(15)
    conv.push(12)
    conv.push(10)

    conv.convertList2Binary()

    print("Inorder Traversal of the contructed Binary Tree is:")
    conv.inorderTraversal(conv.root)
    print("\n")

"""Convert a Binary Tree into Doubly Linked List in spiral fashion
http://www.geeksforgeeks.org/convert-a-binary-tree-into-doubly-linked-list-in-spiral-fashion/

Given a Binary Tree, convert it into Doubly Linked List where the nodes are represented Spirally.
The left pointer of the binary tree node should act as a previous node for created DLL and right
pointer should act as next node.

The solution should not allocate extra memory for DLL nodes. It should use binary tree nodes for
creating DLL i.e. only change of pointers is allowed

--------------------------------------
Example:
--------------------------------------
For example, for the tree on left side, Doubly Linked List can be,

             1
          /    \
        2        3
      /   \    /   \
    4      5  6    7
   / \   /  \  \   /
  8  9  10  11 13 14

1 2 3 7 6 5 4 8 9 10 11 13 14
or
1 3 2 4 5 6 7 14 13 11 10 9 8.  

Explanation
-----------
We can do this by doing a spiral order traversal in O(n) time and O(n) extra space. The idea is to
use deque (Double-ended queue) that can be expanded or contracted on both ends (either its front or
its back). We do something similar to level order traversal but to maintain spiral order, for every
odd level, we dequeue node from the front and inserts its left and right children in the back of
the deque data structure. And for each even level, we dequeue node from the back and inserts its
right and left children in the front of deque. We also maintain a stack to store Binary Tree nodes.
Whenever we pop nodes from deque, we push that node into stack. Later, we pop all nodes from stack
and push the nodes in the beginning of the list. We can avoid use of stack if we maintain a tail
pointer that always points to last node of DLL and inserts nodes in O(1) time in the end.

"""

from collections import deque


# Python program to convert Binary Tree into Doubly Linked List where the nodes
# are represented spirally.
class Node(object):
    def __init__(self, data, left=None, right=None):
        self.data = data
        self.left = left
        self.right = right


class DLL(object):
    def __init__(self, head_ref=None):
        self.head_ref = head_ref

    def push(self, node):
        """
        Given a reference to the head of a list and a node, inserts the node on the
        front of the list.
        """
        # Make right of given node as head and left as NULL
        node.right = self.head_ref
        node.left = None

        # change left of head node to given node
        if self.head_ref is not None:
            self.head_ref.left = node

        # move the head to point to the given node
        self.head_ref = node

    def printList(self):
        """Function to prints contents of DLL"""
        node = self.head_ref
        while node is not None:
            print(node.data, end=",")
            node = node.right
        print("\n")


def spiralLevelOrder(root):
    """
    Function to print corner node at each level
    """
    if root is None:  # Base Case
        return

    # Create an empty deque for doing spiral level order traversal and enqueue root
    q = deque()
    q.append(root)

    # create a stack to store Binary Tree nodes to insert into DLL later
    stk, level = [], 0
    while len(q) != 0:
        # node_count indicates number of Nodes at current level.
        node_count = len(q)
        # Dequeue all Nodes of current level and Enqueue all Nodes of next level
        if level & 1:  # odd level
            while node_count > 0:
                node = q.popleft()  # dequeue node from front & push it to stack
                stk.append(node)
                # insert its left and right children in the back of the deque
                if node.left is not None:
                    q.append(node.left)

                if node.right is not None:
                    q.append(node.right)
                node_count -= 1

        else:  # even level
            while node_count > 0:
                # dequeue node from the back & push it to stack
                node = q.pop()
                stk.append(node)
                # inserts its right and left children in the front of the deque
                if node.right is not None:
                    q.appendleft(node.right)

                if node.left is not None:
                    q.appendleft(node.left)
                node_count -= 1
        level += 1

    dll = DLL()  # head pointer for DLL
    # pop all nodes from stack and push them in the beginning of the list
    while len(stk) != 0:
        dll.push(stk.pop())

    print("Created DLL is:\n")
    dll.printList()


if __name__ == '__main__':
    # Created DLL is: 1 2 3 7 6 5 4 8 9 10 11 13 14
    # Let us create binary tree shown in above diagram
    root = Node(1)
    root.left = Node(2)
    root.right = Node(3)
    root.left.left = Node(4)
    root.left.right = Node(5)
    root.right.left = Node(6)
    root.right.right = Node(7)
    root.left.left.left = Node(8)
    root.left.left.right = Node(9)
    root.left.right.left = Node(10)
    root.left.right.right = Node(11)
    # //root.right.left.left  = Node(12)
    root.right.left.right = Node(13)
    root.right.right.left = Node(14)
    # root->right->right->right  = Node(15)
    spiralLevelOrder(root)

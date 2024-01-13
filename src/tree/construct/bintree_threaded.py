"""
http://www.geeksforgeeks.org/convert-binary-tree-threaded-binary-tree/

---------------------------------------------
Method-1
---------------------------------------------
Convert a Binary Tree to Threaded binary tree | Set 1 (Using Queue)

We have discussed Threaded Binary Tree. The idea of threaded binary trees is to make inorder
traversal faster and do it without stack and without recursion. In a simple threaded binary tree,
the NULL right pointers are used to store inorder successor. Where-ever a right pointer is NULL,
it is used to store inorder successor.

---------------------------------------------
Method-2
---------------------------------------------

Idea of Threaded Binary Tree is to make inorder traversal faster and do it without stack and
without recursion. In a simple threaded binary tree, the NULL right pointers are used to store
inorder successor. Where-ever a right pointer is NULL, it is used to store inorder successor.

---------------------------------------------
Complexities:
---------------------------------------------
This algorithm works in O(n) time complexity and O(1) space other than function call stack."""
from __future__ import print_function

# Python program to convert a Binary Tree to Threaded Tree
from collections import deque


class Node(object):
    def __init__(self, key, left=None, right=None):
        self.key = key
        self.left = left
        self.right = right
        # Used to indicate whether the right pointer is a normal
        # right pointer or a pointer to inorder successor.
        self.isThreaded = False


class BinaryTree(object):
    root = None

    def populateQueue(self, root, q):
        """Helper function to put the Nodes in inorder into queue"""
        if root is None:
            return
        if root.left:
            self.populateQueue(root.left, q)
        q.append(root)
        if root.right:
            self.populateQueue(root.right, q)

    def createThreadedUtil(self, root, q):
        """Function to traverse queue, and make tree threaded"""
        if root is None:
            return

        if root.left:
            self.createThreadedUtil(root.left, q)
        q.popleft()
        if root.right:
            self.createThreadedUtil(root.right, q)

        # If right pointer is NULL, link it to the inorder successor and set 'isThreaded' bit.
        else:
            root.right = q[0] if len(q) > 0 else None
            root.isThreaded = True

    def create_threaded1(self, root):
        """
        Method-1

        ---------------------------------------------
        Explanation:
        ---------------------------------------------
        How to convert a Given Binary Tree to Threaded Binary Tree?

        We basically need to set NULL right pointers to inorder successor. We first do an inorder
        traversal of the tree and store it in a queue (we can use a simple array also) so that
        the inorder successor becomes the next node. We again do an inorder traversal and
        whenever we find a node whose right is NULL, we take the front item from queue and make
        it the right of current node. We also set isThreaded to true to indicate that the right
        pointer is a threaded link.

        This function uses populateQueue() and createThreadedUtil() to convert a given binary
        tree to threaded tree.
        """
        # Create a queue to store inorder traversal
        q = deque()
        # Store inorder traversal in queue
        self.populateQueue(root, q)

        # Link NULL right pointers to inorder successor
        self.createThreadedUtil(root, q)

    def create_threaded2(self, root):
        """
        Method-2

        ---------------------------------------------
        Explanation:
        ---------------------------------------------
        How to convert a Given Binary Tree to Threaded Binary Tree?

        We have discussed a Queue based solution above. In this post, a space efficient solution is
        discussed that doesn't require queue.

        The idea is based on the fact that we link from inorder predecessor to a node. We link
        those inorder predecessor which lie in subtree of node. So we find inorder predecessor of
        a node if its left is not NULL. Inorder predecessor of a node (whose left is NULL) is
        rightmost node in left child. Once we find the predecessor, we link a thread from it to
        current node.

        Converts tree with given root to threaded binary tree. This function returns rightmost
        child of root.
        """
        # Base cases : Tree is empty or has single node

        if root is None:
            return None

        if root.left is None and root.right is None:
            return root

        # Find predecessor if it exists
        if root.left is not None:
            # Find predecessor of root (Rightmost child in left subtree)
            l = self.create_threaded2(root.left)
            # Link a thread from predecessor to root.
            l.right = root
            l.isThreaded = True

        # If current node is rightmost child
        if root.right is None:
            return root

        # Recur for right subtree.
        return self.create_threaded2(root.right)

    def left_most(self, root):
        """A utility function to find leftmost node in a binary tree rooted with 'root'. This
        function is used in inOrder() """
        while root is not None and root.left is not None:
            root = root.left
        return root

    def in_order(self, root):
        """Function to do inorder traversal of a threaded binary tree"""
        if root is None:
            return

        cur = self.left_most(root)  # Find the leftmost node in Binary Tree
        while cur is not None:
            print(cur.key)
            # If this Node is a thread Node, then go to inorder successor
            if cur.isThreaded:
                cur = cur.right
            else:  # Else go to the leftmost child in right subtree
                cur = self.left_most(cur.right)


if __name__ == '__main__':
    # Output: 4 2 5 1 6 3 7
    # This algorithm works in O(n) time complexity and O(1) space other than function call stack.

    #          1
    #         / \
    #        2   3
    #       / \ / \
    #      4  5 6  7

    print("\n-------Method-1--------\n")
    tree = BinaryTree()
    tree.root = Node(1)
    tree.root.left = Node(2)
    tree.root.right = Node(3)
    tree.root.left.left = Node(4)
    tree.root.left.right = Node(5)
    tree.root.right.left = Node(6)
    tree.root.right.right = Node(7)
    tree.create_threaded1(tree.root)
    # print("Inorder traversal of created threaded tree is\n")
    tree.in_order(tree.root)

    print("\n-------Method-2--------\n")
    tree = BinaryTree()
    tree.root = Node(1)
    tree.root.left = Node(2)
    tree.root.right = Node(3)
    tree.root.left.left = Node(4)
    tree.root.left.right = Node(5)
    tree.root.right.left = Node(6)
    tree.root.right.right = Node(7)

    tree.create_threaded2(tree.root)
    print("Inorder traversal of created threaded tree is\n")
    tree.in_order(tree.root)

"""
Merge Two Balanced Binary Search Trees

You are given two balanced binary search trees e.g., AVL or Red Black Tree. Write a function that
merges the two given balanced BSTs into a balanced binary search tree. Let there be m elements in
first tree and n elements in the other tree. Your merge function should take O(m+n) time.

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

Merge two BSTs with limited extra space

Given two Binary Search Trees(BST), print the elements of both BSTs in sorted form. The expected
time complexity is O(m+n) where m is the number of nodes in first tree and n is the number of nodes
in second tree. Maximum allowed auxiliary space is O(height of the first tree + height of the
second tree).

------------------------------------------------
Examples:
------------------------------------------------
First BST
      _3_
    /     \
   1       5
Second BST
    4
  /   \
2       6

Output: 1 2 3 4 5 6

------------------------
First BST
          8
         / \
        2   10
       /
      1
Second BST
          5
         /
        3
       /
      0
Output: 0 1 2 3 5 8 10

------------------------------------------------------------
Method 1 (Insert elements of first tree to second)

Take all elements of first BST one by one, and insert them into the second BST. Inserting an
element to a self balancing BST (AVL tree) takes Logn time (See this) where n is size of the
BST. So time complexity of this method is Log(n) + Log(n+1) ... Log(m+n-1). The value of this
expression will be between mLogn and mLog(m+n-1). As an optimization, we can pick the smaller
tree as first tree.

------------------------------------------------------------
Method 2 (Merge Inorder Traversals)

1) Do inorder traversal of first tree and store the traversal in one temp array arr1[]. This
step takes O(m) time.

2) Do inorder traversal of second tree and store the traversal in another temp array arr2[].
This step takes O(n) time.

3) The arrays created in step 1 and 2 are sorted arrays. Merge the two sorted arrays into one
array of size m + n. This step takes O(m+n) time.

4) Construct a balanced tree from the merged array using the technique discussed in this post.
This step takes O(m+n) time.

Time complexity of this method is O(m+n) which is better than method 1. This method takes O(
m+n) time even if the input BSTs are not balanced.

------------------------------------------------------------
Method 3 (In-Place Merge using DLL)

We can use a Doubly Linked List to merge trees in place. Following are the steps.

1) Convert the given two Binary Search Trees into doubly linked list in place
http://www.geeksforgeeks.org/convert-a-binary-tree-to-a-circular-doubly-link-list/

2) Merge the two sorted Linked Lists (Refer this post for this step).

3) Build a Balanced Binary Search Tree from the merged list created in step 2.
http://www.geeksforgeeks.org/?p=17629


Time complexity of this method is also O(m+n) and this method does conversion in place.
"""
from __future__ import print_function


class Node(object):
    def __init__(self, data, left=None, right=None):
        self.data = data
        self.left = left
        self.right = right


class StackNode(object):
    def __init__(self, t=None, snode=None):
        self.t = t
        self.next_node = snode


class Stack(object):
    def __init__(self, capacity=100):
        self.stack = [None] * capacity
        self.capacity = capacity
        self.top = -1

    def push(self, item):
        if self.top >= self.capacity:
            raise RuntimeError("Stack capacity is full")
        self.top += 1
        self.stack[self.top] = item

    def pop(self):
        if self.top < 0:
            raise RuntimeError("Stack empty")
        result = self.stack[self.top]
        self.top -= 1
        return result

    def peek(self):
        if self.top < 0:
            return None
        else:
            return self.stack[self.top]

    def size(self):
        return self.top + 1

    def is_empty(self):
        return self.size() == 0


class MergeTwoBinaryTree:
    """
    Merge Two Balanced Binary Search Tree
    """

    def __init__(self, root=None):
        self.root = root

    def inorder(self):
        """Inorder traversal of the tree"""
        self.inorder_util(self.root)

    def inorder_util(self, node):
        """Utility function for inorder traversal of the tree"""
        if node is None:
            return

        self.inorder_util(node.left)
        print(node.data, end=" ")
        self.inorder_util(node.right)

    def store_inorder_util(self, node, llist):
        """A Utility Method that stores inorder traversal of a tree"""
        if node is None:
            return llist

        # recur on the left child
        self.store_inorder_util(node.left, llist)

        # Adds data to the list
        llist.append(node.data)

        # recur on the right child
        self.store_inorder_util(node.right, llist)

    def store_inorder(self, node):
        """Method that stores inorder traversal of a tree"""
        list1 = []
        self.store_inorder_util(node, list1)
        return list1

    def merge(self, list1, list2, m, n):
        """
        Method that merges two list into one.

        :param list1: List[int]
        :param list2: List[int]
        :param m: int
        :param n: int
        :return:
        """
        # list3 will contain the merge of list1 and list2
        list3 = []
        i, j = 0, 0

        # Traversing through both list
        while i < m and j < n:
            # Smaller one goes into list3
            if list1[i] < list2[j]:
                list3.append(list1[i])
                i += 1
            else:
                list3.append(list2[j])
                j += 1

        # Adds the remaining elements of list1 into list3
        while i < m:
            list3.append(list1[i])
            i += 1

        # Adds the remaining elements of list2 into list3
        while j < n:
            list3.append(list2[j])
            j += 1
        return list3

    def list_to_bst(self, llist, start, end):
        """Method that converts an ArrayList to a BST"""
        if start > end:  # Base case
            return None

        # Get the middle element and make it root
        mid = (start + end) // 2
        node = Node(llist[mid])

        # Recursively construct the left subtree and make it left child of root
        node.left = self.list_to_bst(llist, start, mid - 1)

        # Recursively construct the right subtree and make it right child of root
        node.right = self.list_to_bst(llist, mid + 1, end)

        return node

    def merge_trees(self, node1, node2):
        """Method that merges two trees into a single one."""
        # Stores Inorder of tree1 to list1
        list1 = self.store_inorder(node1)

        # Stores Inorder of tree2 to list2
        list2 = self.store_inorder(node2)

        # Merges both list1 and list2 into list3
        list3 = self.merge(list1, list2, len(list1), len(list2))

        # Eventually converts the merged list into resultant BST
        node = self.list_to_bst(list3, 0, len(list3) - 1)
        return node


class MergeTree(object):
    """
    Merge two BSTs with limited extra space

    Let us first discuss already discussed methods of the previous post which was for Balanced
    BSTs. The method 1 can be applied here also, but the time complexity will be O(n^2) in worst
    case. The method 2 can also be applied here, but the extra space required will be O(n) which
    violates the constraint given in this question. Method 3 can be applied here but the step 3
    of method 3 can't be done in O(n) for an unbalanced BST.

    The idea is to use iterative inorder traversal. We use two auxiliary stacks for two BSTs.
    Since we need to print the elements in sorted form, whenever we get a smaller element from
    any of the trees, we print it. If the element is greater, then we push it back to stack for
    the next iteration.

    Time Complexity: O(m+n)
    Auxiliary Space: O(height of the first tree + height of the second tree)

    """
    def inorder(self, root):
        """A utility function to print Inoder traversal of a Binary Tree"""
        if root is not None:
            self.inorder(root.left)
            print(root.data, end=" ")
            self.inorder(root.right)

    def merge(self, root1, root2):
        """
        The function to print data of two BSTs in sorted order
        Time Complexity: O(m+n)
        Auxiliary Space: O(height of the first tree + height of the second tree)
        """

        # s1 is stack to hold nodes of first BST
        s1 = Stack()
        # Current node of first BST
        current1 = root1
        # s2 is stack to hold nodes of second BST
        s2 = Stack()
        # Current node of second BST
        current2 = root2

        # If first BST is empty, then output is inorder traversal of second BST
        if root1 is None:
            self.inorder(root2)
            return

        # If second BST is empty, then output is inorder traversal of first BST
        if root2 is None:
            self.inorder(root1)
            return

        # Run the loop while there are nodes not yet printed.
        # The nodes may be in stack(explored, but not printed) or may be not yet explored
        while current1 is not None or not s1.is_empty() \
                or current2 is not None or not s2.is_empty():

            # Following steps follow iterative Inorder Traversal
            if current1 is not None or current2 is not None:
                # Reach the leftmost node of both BSTs and push ancestors of
                # leftmost nodes to stack s1 and s2 respectively
                if current1 is not None:
                    s1.push(current1)
                    current1 = current1.left

                if current2 is not None:
                    s2.push(current2)
                    current2 = current2.left
            else:
                # If we reach a NULL node and either of the stacks is empty,
                # then one tree is exhausted, print the other tree
                if s1.is_empty():
                    while not s2.is_empty():
                        current2 = s2.pop()
                        current2.left = None
                        self.inorder(current2)
                    return

                if s2.is_empty():
                    while not s1.is_empty():
                        current1 = s1.pop()
                        current1.left = None
                        self.inorder(current1)
                    return

                # Pop an element from both stacks and compare the popped elements
                current1 = s1.pop()
                current2 = s2.pop()

                # If element of first tree is smaller, then print it and push the right subtree.
                # If the element is larger, then we push it back to the corresponding stack.
                if current1.data < current2.data:
                    print(current1.data, end=" ")
                    current1 = current1.right
                    s2.push(current2)
                    current2 = None
                else:
                    print(current2.data, end=" ")
                    current2 = current2.right
                    s1.push(current1)
                    current1 = None


if __name__ == '__main__':
    print("\nMerge Two Balanced Binary Search Trees")
    tree1 = MergeTwoBinaryTree()
    # Creating following tree as First balanced BST
    #              100
    #             /   \
    #            50   300
    #           /  \
    #          20  70

    tree1.root = Node(100)
    tree1.root.left = Node(50)
    tree1.root.right = Node(300)
    tree1.root.left.left = Node(20)
    tree1.root.left.right = Node(70)

    # Creating following tree as second balanced BST
    #         80
    #        /  \
    #       40  120
    #

    tree2 = MergeTwoBinaryTree()
    tree2.root = Node(80)
    tree2.root.left = Node(40)
    tree2.root.right = Node(120)

    tree3 = MergeTwoBinaryTree()
    tree3.root = tree3.merge_trees(tree1.root, tree2.root)
    print("The Inorder traversal of the merged BST is: ")
    tree3.inorder()

    print("\n\nMerge two BSTs with limited extra space")
    tree = MergeTree()
    # Let us create the following tree as first tree
    #         3
    #       /  \
    #      1    5

    root1 = Node(3)
    root1.left = Node(1)
    root1.right = Node(5)

    # Let us create the following tree as second tree
    #         4
    #       /  \
    #      2    6

    root2 = Node(4)
    root2.left = Node(2)
    root2.right = Node(6)
    # Print sorted nodes of both trees
    tree.merge(root1, root2)

"""
Find if there is a triplet in a Balanced BST that adds to zero

Given a Balanced Binary Search Tree (BST), write a function isTripletPresent() that returns true
if there is a triplet in given BST with sum equals to 0, otherwise returns false.

Example:
If triplet present should return true for following BST because there is a triplet with sum 0,
the triplet is {-13, 6, 7}.

            6
          /   \
       -13    14
         \   /  \
        -8  13  15
            /
           7

"""
from __future__ import print_function
# Python program to check if there is a triplet with sum equal to 0 in a given BST


class Node(object):
    """A BST node has key, and left and right pointers"""
    def __init__(self, key, left=None, right=None):
        self.key = key
        self.left = left
        self.right = right


class BinaryTree(object):
    """
    The Brute Force Solution is to consider each triplet in BST and check whether the sum adds
    up to zero. The time complexity of this solution will be O(n^3).

    A Better Solution is to create an auxiliary array and store Inorder traversal of BST in the
    array. The array will be sorted as Inorder traversal of BST always produces sorted data. Once
    we have the Inorder traversal, we can use method 2 of this post to find the triplet with sum
    equals to 0. This solution works in O(n^2) time, but requires O(n) auxiliary space.

    Following is the solution that works in O(n^2) time and uses O(Logn) extra space:
    1) Convert given BST to Doubly Linked List (DLL)
    2) Now iterate through every node of DLL and if the key of node is negative, then find a pair
    in DLL with sum equal to key of current node multiplied by -1. To find the pair, we can use the
    approach used in hasArrayTwoCandidates() in method 1 of this post.

    Time Complexity: Time taken to convert BST to DLL is O(n) and time taken to find triplet in DLL
    is O(n^2).

    Auxiliary Space: The auxiliary space is needed only for function call stack in recursive
    function convertBSTtoDLL(). Since given tree is balanced (height is O(Logn)), the number of
    functions in call stack will never be more than O(Logn).

    """
    head = None
    tail = None

    def __init__(self, root=None):
        self.root = root

    def convert_bst_to_dll(self, root):
        """
        A function to convert given BST to Doubly Linked List. left pointer is used
        as previous pointer and right pointer is used as next pointer. The function
        sets *head to point to first and *tail to point to last node of converted DLL
        :param root:
        :return:
        """
        if root is None:  # Base case
            return

        # First convert the left subtree
        if root.left:
            self.convert_bst_to_dll(root.left)

        # Then change left of current root as last node of left subtree
        root.left = self.tail

        # If tail is not NULL, then set right of tail as root, else current node is head
        if self.tail:
            self.tail.right = root
        else:
            self.head = root

        self.tail = root  # Update tail

        # Finally, convert right subtree
        if root.right:
            self.convert_bst_to_dll(root.right)

    def is_present_in_dll(self, head, tail, summation):
        """
        This function returns true if there is pair in DLL with sum equal to given sum.
        The algorithm is similar to hasArrayTwoCandidates() in method 1 of
        http://tinyurl.com/dy6palr

        :param head:
        :param tail:
        :param summation:
        :return:
        """
        while head != tail:
            curr = head.key + tail.key
            if curr == summation:
                return True
            elif curr > summation:
                tail = tail.left
            else:
                head = head.right

        return False

    def is_triplet_present(self):
        """
        The main function that returns true if there is a 0 sum triplet in
        BST otherwise returns false """
        if self.root is None:  # Check if the given  BST is empty
            return False

        # Convert given BST to doubly linked list.  head and tail store the
        # pointers to first and last nodes in DLLL
        self.convert_bst_to_dll(self.root)

        # Now iterate through every node and find if there is a pair with sum
        # equal to -1 * head.key where head is current node
        while (self.head.right != self.tail) and (self.head.key < 0):
            # If there is a pair with sum equal to  -1*head->key, then return
            # true else move forward
            if self.is_present_in_dll(self.head.right, self.tail, -1 * self.head.key):
                return True
            else:
                self.head = self.head.right

        # If we reach here, then there was no 0 sum triplet
        return False

    def insert(self, key):
        self.root = self.insert_util(self.root, key)

    def insert_util(self, root, key):
        """A utility function to insert a given key to BST"""
        if root is None:
            return Node(key)
        if root.key > key:
            root.left = self.insert_util(root.left, key)
        else:
            root.right = self.insert_util(root.right, key)
        return root


if __name__ == '__main__':
    tree = BinaryTree()
    tree.insert(6)
    tree.insert(-13)
    tree.insert(14)
    tree.insert(-8)
    tree.insert(15)
    tree.insert(13)
    tree.insert(7)
    print("Present" if tree.is_triplet_present() else "Not Present")

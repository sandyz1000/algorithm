"""
Check if leaf traversal of two Binary Trees is same?
Leaf traversal is sequence of leaves traversed from left to right. The problem is to check if leaf
traversals of two given Binary Trees are same or not.

Expected time complexity O(n):
Expected auxiliary space O(h1 + h2) where h1 and h2 are heights of two Binary Trees.

-------------------------------------------------------
Examples:
-------------------------------------------------------

Input: Roots of below Binary Trees

         1
        / \
       2   3
      /   / \
     4   6   7

         0
        /  \
       5    8
        \  / \
        4  6  7
Output: same
Leaf order traversal of both trees is 4 6 7

----------------------------------------
Input: Roots of below Binary Trees
         0
        / \
       1   2
      / \
     8   9

     1
    / \
   4   3
    \ / \
    8 2  9

Output: Not Same
Leaf traversals of two trees are different. For first, it is 8 9 2 and for second it is 8 2 9 """


# Python program to check if two Leaf Traversal of Two Binary Trees is same or not

class StackL(object):
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

    def empty(self):
        return self.size() == 0


class Node(object):
    def __init__(self, data, left=None, right=None):
        self.data = data
        self.left = left
        self.right = right

    def is_leaf(self):
        return self.left is None and self.right is None


class LeafOrderTraversal(object):
    """
    A Simple Solution is traverse first tree and store leaves from left and right in an array.
    Then traverse other tree and store leaves in another array. Finally compare two arrays. If
    both arrays are same, then return true.

    The above solution requires O(m+n) extra space where m and n are nodes in first and second
    tree respectively.

    How to check with O(h1 + h2) space?

    The idea is use iterative traversal. Traverse both trees simultaneously, look for a leaf node
    in both trees and compare the found leaves. All leaves must match.

    Algorithm:

    1. Create empty stacks stack1 and stack2 for iterative traversals of tree1 and tree2

    2. insert (root of tree1) in stack1
       insert (root of tree2) in stack2

    3. Stores current leaf nodes of tree1 and tree2
        temp1 = (root of tree1)
        temp2 = (root of tree2)

    4. Traverse both trees using stacks
    while (stack1 and stack2 parent empty):
        # Means excess leaves in one tree
        if (if one of the stacks are empty)
            return False

       # get next leaf node in tree1
       temp1 = stack1.pop()
       while (temp1 is not leaf node):
            push right child to stack1
        push left child to stack1

       # get next leaf node in tree2
       temp2 = stack2.pop()
       while (temp2 is not leaf node):
            push right child to stack2
        push left child to stack2

       # If leaves do not match return false
       if (temp1 != temp2):
           return False

    5. If all leaves matched, return true """

    # Returns true of leaf traversal of two trees is same, else false

    def is_same(self, root1, root2):
        # Create empty stacks.  These stacks are going to be used for iterative traversals.
        s1 = StackL()
        s2 = StackL()

        s1.push(root1)
        s2.push(root2)

        # Loop until either of two stacks is not empty
        while not s1.empty() or not s2.empty():
            # If one of the stacks is empty means other stack has extra leaves so return false
            if s1.empty() or s2.empty():
                return False

            temp1 = s1.pop()
            while temp1 is not None and not temp1.is_leaf():
                # Push right and left children of temp1.
                # Note that right child is inserted before left
                if temp1.right is not None:
                    s1.push(temp1.right)

                if temp1.left is not None:
                    s1.push(temp1.left)

                temp1 = s1.pop()

            # same for tree2
            temp2 = s2.pop()
            while temp2 is not None and not temp2.is_leaf():
                if temp2.right is not None:
                    s2.push(temp2.right)

                if temp2.left is not None:
                    s2.push(temp2.left)
                temp2 = s2.pop()

            # If one is null and other is not, then return false
            if temp1 is None and temp2 is not None:
                return False

            if temp1 is not None and temp2 is None:
                return False

            # If both are not null and data is not same return false
            if temp1 is not None and temp2 is not None:
                if temp1.data != temp2.data:
                    return False

        # If control reaches this point, all leaves are matched
        return True


if __name__ == '__main__':
    # Let us create trees in above example 1
    try:
        traversal = LeafOrderTraversal()
        root1 = Node(1)
        root1.left = Node(2)
        root1.right = Node(3)
        root1.left.left = Node(4)
        root1.right.left = Node(6)
        root1.right.right = Node(7)

        root2 = Node(0)
        root2.left = Node(1)
        root2.right = Node(5)
        root2.left.right = Node(4)
        root2.right.left = Node(6)
        root2.right.right = Node(7)
        print("Same" if traversal.is_same(root1, root2) else "Not Same")

    except KeyboardInterrupt as e:
        pass

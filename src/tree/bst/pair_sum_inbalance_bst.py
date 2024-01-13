"""
Find a pair with given sum in a Balanced BST

Given a Balanced Binary Search Tree and a target sum, write a function that returns true if there
is a pair with sum equals to target sum, otherwise return false. Expected time complexity is O(n)
and only O(Logn) extra space can be used. Any modification to Binary Search Tree is not allowed.
Note that height of a Balanced BST is always O(Logn).

        (15)
        /   \
    (10)    (20)
    /       /   \
  (8)      (16) (25)

The idea is same as finding the pair in sorted array (See method 1 of this for details). We
traverse BST in Normal Inorder and Reverse Inorder simultaneously. In reverse inorder, we start
from the rightmost node which is the maximum value node. In normal inorder, we start from the
left most node which is minimum value node. We add sum of current nodes in both traversals and
compare this sum with given target sum. If the sum is same as target sum, we return true. If the
sum is more than target sum, we move to next node in reverse inorder traversal, otherwise we move
to next node in normal inorder traversal. If any of the traversals is finished without finding a
pair, we return false

"""
#  In a balanced binary search tree isPairPresent two element which sums to a given
# value time O(n) space O(logn)

MAX_SIZE = 100


class NewNode:
    def __init__(self, val, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


class Stack(object):
    """Stack type"""
    def __init__(self, size):
        self.size = size
        self.top = -1
        self.arry = [None] * self.size

    def is_full(self):
        return self.top + 1 == self.size

    def is_empty(self):
        return self.top == -1

    def push(self, node):
        if self.is_full():
            raise IndexError("Cannot insert in full stack")
        self.top += 1
        self.arry[self.top] = node

    def pop(self):
        if self.is_empty():
            raise IndexError("Cannot pop from empty stack")
        temp = self.arry[self.top]
        self.arry[self.top] = None
        self.top -= 1
        return temp


def is_pair_present(root, target):
    """Returns true if a pair with target sum exists in BST, otherwise false"""
    # Create two stacks. s1 is used for normal inorder traversal and s2 is used for reverse
    # inorder traversal
    s1 = Stack(MAX_SIZE)
    s2 = Stack(MAX_SIZE)

    # Note the sizes of stacks is MAX_SIZE, we can find the tree size and
    # fix stack size as O(Logn) for balanced trees like AVL and Red Black
    # tree. We have used MAX_SIZE to keep the code simple
    # done1, val1 and curr1 are used for normal inorder traversal using s1
    # done2, val2 and curr2 are used for reverse inorder traversal using s2

    done1, done2 = False, False
    val1, val2 = 0, 0
    curr1, curr2 = root, root

    # The loop will break when we either find a pair or one of the two traversals is complete
    while True:
        # Find next node in normal Inorder traversal. See following post
        # http:ww.geeksforgeeks.org/inorder-tree-traversal-without-recursion/
        while not done1:
            if curr1 is not None:
                s1.push(curr1)
                curr1 = curr1.left
            else:
                if s1.is_empty():
                    done1 = 1
                else:
                    curr1 = s1.pop()
                    val1 = curr1.val
                    curr1 = curr1.right
                    done1 = 1

        # Find next node in REVERSE Inorder traversal. The only
        # difference between above and below loop is, in below loop
        # right subtree is traversed before left subtree

        while not done2:
            if curr2 is not None:
                s2.push(curr2)
                curr2 = curr2.right
            else:
                if s2.is_empty():
                    done2 = 1
                else:
                    curr2 = s2.pop()
                    val2 = curr2.val
                    curr2 = curr2.left
                    done2 = 1

        # If we find a pair, then print the pair and return. The first
        # condition makes sure that two same values are not added

        if (val1 != val2) and (val1 + val2) == target:
            print("\n Pair Found: %d + %d = %d\n" % (val1, val2, target))
            return True

        # If sum of current values is smaller, then move to next node in
        # normal inorder traversal
        elif (val1 + val2) < target:
            done1 = False

        # If sum of current values is greater, then move to next node in reverse inorder traversal
        elif (val1 + val2) > target:
            done2 = False

        # If any of the inorder traversals is over, then there is no pair so return false
        if val1 >= val2:
            return False


if __name__ == '__main__':
    #
    #                15
    #             /     \
    #           10      20
    #          / \     /  \
    #         8  12   16  25

    root = NewNode(15)
    root.left = NewNode(10)
    root.right = NewNode(20)
    root.left.left = NewNode(8)
    root.left.right = NewNode(12)
    root.right.left = NewNode(16)
    root.right.right = NewNode(25)

    target = 33
    if not is_pair_present(root, target):
        print("\n No such values are found\n")

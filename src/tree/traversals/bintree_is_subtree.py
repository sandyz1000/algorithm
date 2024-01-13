"""
https://www.geeksforgeeks.org/check-binary-tree-subtree-another-binary-tree-set-2/

Check if a binary tree is subtree of another binary tree | Set 2


Given two binary trees, check if the first tree is subtree of the second one. A subtree of a tree
T is a tree S consisting of a node in T and all of its descendants in T.

The subtree corresponding to the root node is the entire tree; the subtree corresponding to any
other node is called a proper subtree.

For example, in the following case, Tree1 is a subtree of Tree2.


        Tree1
          x
        /    \
      a       b
       \
        c


        Tree2
              z
            /   \
          x      e
        /    \     \
      a       b      k
       \
        c

We have discussed a O(n^2) solution for this problem. In this post a O(n) solution is discussed.
The idea is based on the fact that inorder and preorder/postorder uniquely identify a binary
tree. Tree S is a subtree of T if both inorder and preorder traversals of S are substrings of
inorder and preorder traversals of T respectively.

Following are detailed steps.

1) Find inorder and preorder traversals of T, store them in two auxiliary arrays inT[] and preT[].

2) Find inorder and preorder traversals of S, store them in two auxiliary arrays inS[] and preS[].

3) If inS[] is a subarray of inT[] and preS[] is a subarray preT[], then S is a subtree of T.
Else not.

We can also use postorder traversal in place of preorder in the above algorithm.

Let us consider the above example
------------------------------------------------------------------------------------
Inorder and Preorder traversals of the big tree are.
inT[]   =  {a, c, x, b, z, e, k}
preT[]  =  {z, x, a, c, b, e, k}

Inorder and Preorder traversals of small tree are
inS[]  = {a, c, x, b}
preS[] = {x, a, c, b}

We can easily figure out that inS[] is a subarray of
inT[] and preS[] is a subarray of preT[].
------------------------------------------------------------------------------------

EDIT
------------------------------------------------------------------------------------
The above algorithm doesn't work for cases where a tree is present
in another tree, but not as a subtree. Consider the following example.

        Tree1
          x
        /    \
      a       b
     /
    c


        Tree2
          x
        /    \
      a       b
     /         \
    c            d

Inorder and Preorder traversals of the big tree or Tree2 are.

Inorder and Preorder traversals of small tree or Tree1 are

The Tree2 is not a subtree of Tree1, but inS[] and preS[] are subarrays of
inT[] and preT[] respectively.
------------------------------------------------------------------------------------
The above algorithm can be extended to handle such cases by adding a special character whenever
we encounter NULL in inorder and preorder traversals.

Time Complexity: Inorder and Preorder traversals of Binary Tree take O(n) time. The function
strstr() can also be implemented in O(n) time using KMP string matching algorithm.

Auxiliary Space: O(n)
"""
from __future__ import print_function


# Python program to check if binary tree is subtree of another binary tree
class Node(object):

    def __init__(self, item):
        self.data = item
        self.left, self.right = None, None


class Passing(object):
    def __init__(self):
        self.i = 0
        self.m = 0
        self.n = 0


class BinaryTree(object):
    def __init__(self):
        self.__class__.root = None
        self.passing = Passing()

    def store_inorder(self, node, arr, passing):
        """

        :param node:
        :param arr:
        :param passing: Passing
        :return:
        """
        if node is None:
            passing.i += 1
            arr[passing.i] = '$'
            return

        self.store_inorder(node.left, arr, passing)
        passing.i += 1
        arr[passing.i] = node.data
        self.store_inorder(node.right, arr, passing)

    def store_pre_order(self, node, arr, passing):
        """
        A utility function to store preorder traversal of tree rooted with root in an array
        arr[]. Note that i is passed as reference
        :param node:
        :param arr:
        :param passing:
        :return:
        """
        if node is None:
            passing.i += 1
            arr[passing.i] = '$'
            return

        passing.i += 1
        arr[passing.i] = node.data
        self.store_pre_order(node.left, arr, passing)
        self.store_pre_order(node.right, arr, passing)

    def isSubtree(self, T, S):
        """This function returns true if S is a subtree of T, otherwise false
        """
        # base cases
        if S is None:
            return True

        if T is None:
            return False

        # Store Inorder traversals of T and S in inT[0..m-1] and inS[0..n-1] respectively
        inT = ["" for i in range(100)]
        inS = ["" for i in range(100)]
        self.store_inorder(T, inT, self.passing)
        self.store_inorder(S, inS, self.passing)
        inT[self.passing.m] = '\0'
        inS[self.passing.m] = '\0'

        # If inS[] is not a substring of preS[], return false
        if "".join(inS) in "".join(inT):
            return

        # Store Preorder traversals of T and S in inT[0..m-1] and inS[0..n-1] respectively
        self.passing.n = 0
        preT = ["" for i in range(100)]
        preS = ["" for i in range(100)]
        self.store_pre_order(T, preT, self.passing)
        self.store_pre_order(S, preS, self.passing)
        preT[self.passing.m] = '\0'
        preS[self.passing.n] = '\0'

        # If inS[] is not a substring of preS[], return false Else return true
        return "".join(preS) in "".join(preT)


def is_identical(T: Node, S: Node) -> bool:
    if T is None and S is None:
        return True
    if T is None or S is None:
        return False
    return T.data == S.data and is_identical(T.left, S.left) and is_identical(T.right, S.right)


def is_subtree(T: Node, S: Node):
    if S is None:
        return True
    if T is None:
        return False
    if is_identical(T, S):
        return True
    return is_subtree(T.left, S) or is_subtree(T.right, S)


if __name__ == '__main__':

    tree = BinaryTree()
    T = Node('a')
    T.left = Node('b')
    T.right = Node('d')
    T.left.left = Node('c')
    T.right.right = Node('e')

    S = Node('a')
    S.left = Node('b')
    S.right = Node('d')
    S.left.left = Node('c')

    if tree.isSubtree(T, S):
        print("Yes , S is a subtree of T")
    else:
        print("No, S is not a subtree of T")

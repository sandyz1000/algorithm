"""
Construct the full k-ary tree from its preorder traversal

Given an array which contains the preorder traversal of full k-ary tree, construct the full k-ary
tree and print its postorder traversal. A full k-ary tree is a tree where each node has either 0 or
k children.

Examples:
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - +
Input : preorder[] = {1, 2, 5, 6, 7, 3, 8, 9, 10, 4}            |
        k = 3                                                   |
Output : Postorder traversal of constructed                     |
         full k-ary tree is: 5 6 7 2 8 9 10 3 4 1               |
                                                                |
         Tree formed is:         1                              |
                             /   |   \                          |
                           2     3    4                         |
                          /|\   /|\                             |
                         5 6 7 8 9 10                           |
                                                                |
Input : preorder[] = {1, 2, 5, 6, 7, 3, 4}                      |
        k = 3                                                   |
Output : Postorder traversal of constructed                     |
         full k-ary tree is: 5 6 7 2 3 4 1                      |
                                                                |
         Tree formed is:        1                               |
                             /  |  \                            |
                           2    3   4                           |
                          /|\                                   |
                         5 6 7                                  |
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - +

We have discussed this problem for Binary tree in below post.
Construct a special tree from given pre-order traversal
In this post, solution for a k-ary tree is discussed.

In Preorder traversal, first root node is processed then followed by the left subtree and
right subtree. Because of this, to construct a full k-ary tree, we just need to keep on
creating the nodes without bothering about the previous constructed nodes. We can use this
to build the tree recursively.

Following are the steps to solve the problem:
1. Find the height of the tree.
2. Traverse the preorder array and recursively add each node

"""

# Python program to build full k-ary tree from its preorder traversal and to print
# the postorder traversal of the tree.

from __future__ import print_function
import math
import typing


class Node:
    """Structure of a node of an n-ary tree"""

    def __init__(self, key):
        self.key = key
        self.child = []


class Pointer:
    def __init__(self, val):
        self.value = val


class KAryTree:
    def build_kary_tree_util(self, A: typing.List[int], n: int, k: int, h: int, ind_ptr: Pointer):
        """Function to build full k-ary tree"""
        # For null tree
        if n <= 0:
            return None

        nNode = Node(A[ind_ptr.value])
        if nNode is None:
            print("Memory error")
            return None

        # For adding k children to a node
        for i in range(k):
            # Check if ind is in range of array
            # Check if height of the tree is greater than 1
            if ind_ptr.value < n - 1 and h > 1:
                ind_ptr.value += 1

                # Recursively add each child
                nNode.child.append(self.build_kary_tree_util(A, n, k, h - 1, ind_ptr))
            else:
                nNode.child.append(None)

        return nNode

    def build_kary_tree(self, A: typing.List[int], n: int, k: int, ind_ptr: Pointer):
        """Function to find the height of the tree"""
        height = int(math.ceil(math.log(n * (k - 1) + 1) / math.log(k)))
        return self.build_kary_tree_util(A, n, k, height, ind_ptr)

    def postord(self, root: Node, k: int):
        """Function to print postorder traversal of the tree"""
        if root is None:
            return
        for i in range(k):
            self.postord(root.child[i], k)
        print(root.key, end=" ")


if __name__ == '__main__':
    # Output:
    # Postorder traversal of constructed full k-ary tree is: 5 6 7 2 8 9 10 3 4 1
    tree = KAryTree()
    ind = Pointer(0)
    k, n = 3, 10
    pre_order_list = [1, 2, 5, 6, 7, 3, 8, 9, 10, 4]
    root = tree.build_kary_tree(pre_order_list, n, k, ind)
    print("Postorder traversal of constructed full k-ary tree is:")
    tree.postord(root, k)

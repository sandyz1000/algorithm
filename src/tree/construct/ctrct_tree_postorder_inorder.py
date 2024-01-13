"""
Construct a Binary Tree from Postorder and Inorder
Given Postorder and Inorder traversals, construct the tree.

Examples:
------------------------------
Input :
in = [2, 1, 3], post = [2, 3, 1]

Output : Root of below tree
      1
    /   \
   2     3


Input :
in   = [4, 8, 2, 5, 1, 6, 3, 7]
post = [8, 4, 5, 2, 6, 7, 3, 1]

Output : Root of below tree
          1
       /     \
     2        3
   /    \   /   \
  4     5  6    7
    \
     8

"""
from __future__ import print_function


# Python program to construct tree using inorder and postorder traversals
# Time Complexity : O(n^2)


# A binary tree node has data, pointer to left child and a pointer to right child
class Node:
    def __init__(self, data, left=None, right=None):
        self.data = data
        self.left = left
        self.right = right


class PIndex:
    def __init__(self, index):
        self.index = index


class BinaryTree:
    def build_util(self, ins, post, in_strt, in_end, p_index):
        """
        Recursive function to construct binary of size n  from  Inorder traversal in[] and Preorder
        traversal post[].  Initial values of inStrt and inEnd should be 0 and n -1.  The function
        doesn't do any error checking for cases where inorder and postorder do not form a tree
        :param ins: list(int)
        :param post: list(int)
        :param in_strt: int
        :param in_end: int
        :param p_index: PIndex
        :return:
        """
        if in_strt > in_end:  # Base case
            return None

        # Pick current node from Pre-order traversal using postIndex and decrement postIndex
        node = Node(post[p_index.get_index])
        p_index.get_index -= 1

        # If this node has no children then return
        if in_strt == in_end:
            return node

        # Else find the index of this node in Inorder traversal
        i_index = self.search(ins, in_strt, in_end, node.data)

        # Using index in Inorder traversal, construct left and right subtress
        node.right = self.build_util(ins, post, i_index + 1, in_end, p_index)
        node.left = self.build_util(ins, post, in_strt, i_index - 1, p_index)

        return node

    def build_tree(self, ins, post, n):
        """
        ------------------------------------------------------------
        Explanation:
        ------------------------------------------------------------

        We have already discussed construction of tree from iven Inorder and Preorder traversals.
        The idea is similar.
        Let us see the process of constructing tree from
        in = [4, 8, 2, 5, 1, 6, 3, 7] and
        post = [8, 4, 5, 2, 6, 7, 3, 1]

        1) We first find the last node in post[]. The last node is "1", we know this value is root
        as root always appear in the end of postorder traversal.

        2) We search "1" in in[] to find left and right subtrees of root. Everything on left of "1"
        in in[] is in left subtree and everything on right is in right subtree.

                 1
               /   \
        [4,8,2,5]  [6,3,7]

        3) We recur the above process for following two.
            a) Recur for in[] = {4,8,2,5} and post[] = {8,4,5,2}.
            Make the created tree as left child of root.
            b) Recur for in[] = {6,3,7} and post[] = {6,7,3}
            Make the created tree as right child of root.


        This function mainly initializes index of root and calls buildUtil()
        :param ins: list(int)
        :param post: list(int)
        :param n: int
        :return:
        """
        pIndex = PIndex(n - 1)
        return self.build_util(ins, post, 0, n - 1, pIndex)

    def search(self, arr, strt, end, value):
        """
        Function to find index of value in arr[start...end]
        The function assumes that value is postsent in in[]
        :param arr: list(int)
        :param strt: int
        :param end: int
        :param value: int
        :return:
        """
        for i in range(strt, end + 1):
            if arr[i] == value:
                break
        return i

    def preOrder(self, node):
        """This funtcion is here just to test"""
        if node is None:
            return

        print("%d " % node.data, end=" ")
        self.preOrder(node.left)
        self.preOrder(node.right)


if __name__ == '__main__':
    # Preorder of the constructed tree : 1 2 4 8 5 3 6 7
    ins = [4, 8, 2, 5, 1, 6, 3, 7]
    post = [8, 4, 5, 2, 6, 7, 3, 1]
    n = len(ins)
    tree = BinaryTree()
    root = tree.build_tree(ins, post, n)
    print("Preorder of the constructed tree : \n")
    tree.preOrder(root)

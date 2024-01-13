"""
Construct Full Binary Tree from given preorder and postorder traversals
Given two arrays that represent preorder and postorder traversals of a full binary tree, construct
the binary tree.

A Full Binary Tree is a binary tree where every node other than the leaves has either 0 or 2
children.

---------------------------------------------------
Examples:
---------------------------------------------------
Following are examples of Full Trees.

          1
        /   \
       2     3
     /  \   /  \
    4   5  6    7


       1
     /   \
   2      3
        /   \
       4     5
           /   \
          6    7


              1
            /   \
          2       3
        /  \     /  \
       4    5   6    7
     /  \
    8    9


---------------------------------------------------
Explanation:
---------------------------------------------------

It is not possible to construct a general Binary Tree from preorder and postorder
traversals (See this). But if know that the Binary Tree is Full, we can construct the
tree without ambiguity. Let us understand this with the help of following example.

Let us consider the two given arrays as
pre = [1, 2, 4, 8, 9, 5, 3, 6, 7]
post = [8, 9, 4, 5, 2, 6, 7, 3, 1]

In pre, the leftmost element is root of tree. Since the tree is full and array size is
more than 1. The value next to 1 in pre, must be left child of root. So we know 1 is root
and 2 is left child. How to find the all nodes in left subtree? We know 2 is root of all
nodes in left subtree. All nodes before 2 in post order traversal must be in left subtree.
Now we know 1 is root, elements [8, 9, 4, 5, 2] are in left subtree, and the elements
[6, 7, 3] are in right subtree.


                  1
                /    \
                /      \
      [8, 9, 4, 5, 2]  [6, 7, 3]

We recursively follow the above approach and get the following tree.

                  1
                /   \
              2       3
            /  \     /  \
            4    5   6    7
          / \
          8   9

A recursive function to construct Full from pre[] and post[].
preIndex is used to keep track of index in pre[].
l is low index and h is high index for the current subarray in post[]
"""
from typing import List


# program for construction of full binary tree


class Node:
    """A binary tree node has data, pointer to left child and a pointer to right child"""

    def __init__(self, data, left=None, right=None):
        self.data = data
        self.left = left
        self.right = right


class FullBinaryTree:
    def __init__(self) -> None:
        self.preIndex = 0

    def construct_tree_util(self, pre: List[int], post: List[int],
                            low: int, high: int, size: int):
        
        if self.preIndex >= size or low > high:  # Base case
            return None

        # The first node in preorder traversal is root. So take the node at
        # preIndex from preorder and make it root, and increment preIndex
        root = Node(pre[self.preIndex])
        self.preIndex += 1

        # If the current subarry has only one element, no need to recur
        if low == high or self.preIndex >= size:
            return root

        # Search the next element of pre[] in post[]
        i = low
        while i <= high:
            if pre[self.preIndex] == post[i]:
                break
            i += 1

        # Use the index of element found in postorder to divide postorder array in
        # two parts. Left subtree and right subtree
        if i <= high:
            root.left = self.construct_tree_util(pre, post, low, i, size)
            root.right = self.construct_tree_util(pre, post, i + 1, high, size)

        return root

    def construct_tree(self, pre: List[int], post: List[int], size: int):
        """
        The main function to construct Full Binary Tree from given preorder and
        postorder traversals. This function mainly uses constructTreeUtil()
        """
        return self.construct_tree_util(pre, post, 0, size - 1, size)

    def print_inorder(self, node):
        """A utility function to print inorder traversal of a Binary Tree"""
        if node is None:
            return
        self.print_inorder(node.left)
        print("%d " % node.data)
        self.print_inorder(node.right)


if __name__ == '__main__':
    # Inorder traversal of the constructed tree: 8 4 9 2 5 1 6 3 7
    pre = [1, 2, 4, 8, 9, 5, 3, 6, 7]
    post = [8, 9, 4, 5, 2, 6, 7, 3, 1]
    size = len(pre)
    tree = FullBinaryTree()
    root = tree.construct_tree(pre, post, size)
    print("Inorder traversal of the constructed tree: \n")
    tree.print_inorder(root)

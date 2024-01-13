"""
Construct a tree from Inorder and Level order traversals
Given inorder and level-order traversals of a Binary Tree, construct the Binary Tree.

Following is an example to illustrate the problem.
------------------------------------------------
Input: Two arrays that represent Inorder and level order traversals of a Binary Tree
in = [4, 8, 10, 12, 14, 20, 22]
level = [20, 8, 22, 4, 12, 10, 14]

Output: Construct the tree represented by the two arrays. For the above two arrays, the
constructed tree is shown in the diagram below

            20
           /  \
          8   22
        /  \
       4   12
          /  \
        10   14

"""
from __future__ import print_function


# program to construct tree using inorder and levelorder traversals

# Time complexity:
# An upper bound on time complexity of above method is O(n3). In the main recursive function,
# extractNodes() is called which takes O(n2) time.


class Node:
    def __init__(self, key, left=None, right=None):
        self.key = key
        self.left = left
        self.right = right


class Tree:
    """
    ------------------------------------------------
    Explanation:
    ------------------------------------------------
    Let us consider the above example.

    in = [4, 8, 10, 12, 14, 20, 22]
    level = [20, 8, 22, 4, 12, 10, 14]

    In a Level order sequence, the first element is the root of the tree. So we know '20' is root
    for given sequences. By searching '20' in Inorder sequence, we can find out all elements on
    left side of '20' are in left subtree and elements on right are in right subtree.

    So we know below structure now.

                 20
               /    \
              /      \
     {4,8,10,12,14}  {22}

    Let us call [4,8,10,12,14] as left subarray in Inorder traversal and [22] as right subarray in
    Inorder traversal.

    In level order traversal, keys of left and right subtrees are not consecutive. So we extract
    all nodes from level order traversal which are in left subarray of Inorder traversal. To
    construct the left subtree of root, we recur for the extracted elements from level order
    traversal and left subarray of inorder traversal. In the above example, we recur for
    following two arrays.

    Recur for following arrays to construct the left subtree
    In = [4, 8, 10, 12, 14]
    level = [8, 4, 12, 10, 14]

    Similarly, we recur for following two arrays and construct the right subtree.
    Recur for following arrays to construct the right subtree
    In = [22]
    level = [22]

    """

    def build_tree(self, ins, level):
        """
        Recursive function to construct binary tree of size n from Inorder traversal in[] and Level
        Order traversal level[]. inSrt and inEnd are start and end indexes of array in[] Initial
        values of inStrt and inEnd should be 0 and n -1. The function doesn't do any error checking
        for cases where inorder and levelorder do not form a tree
        :param ins:
        :param level:
        :return:
        """
        return self.construct_tree(None, level, ins, 0, len(ins) - 1)

    def construct_tree(self, start_node, level_order, in_order, in_strt, in_end):
        """
        :param start_node: Node
        :param level_order:list(int)
        :param in_order: list(int)
        :param in_strt: int
        :param in_end: int
        :return:
        """
        # If start index is more than the end index
        if in_strt > in_end:
            return None

        # If this node has no children then return
        if in_strt == in_end:
            return Node(in_order[in_strt])

        found = False
        index = 0
        # it represents the index in inOrder array of element that appear first in
        # levelOrder array.
        for i in range(len(level_order) - 1):
            data = level_order[i]
            for j in range(in_strt, in_end):
                if data == in_order[j]:
                    start_node = Node(data)
                    index = j
                    found = True
                    break

            if found:
                break

        # elements present before index are part of left child of startNode.
        # elements present after index are part of right child of startNode.
        start_node.left = self.construct_tree(start_node, level_order, in_order,
                                              in_strt, index - 1)
        start_node.right = self.construct_tree(start_node, level_order, in_order,
                                               index + 1, in_end)
        return start_node

    def print_inorder(self, node):
        """Utility function to print inorder traversal of binary tree"""
        if node is None:
            return
        self.print_inorder(node.left)
        print(node.key)
        self.print_inorder(node.right)


if __name__ == '__main__':
    # Inorder traversal of the constructed tree is: 4 8 10 12 14 20 22
    tree = Tree()
    ins = [4, 8, 10, 12, 14, 20, 22]
    level = [20, 8, 22, 4, 12, 10, 14]
    root = tree.build_tree(ins, level)

    # Let us test the built tree by printing Insorder traversal
    print("Inorder traversal of the constructed tree is \n")
    tree.print_inorder(root)

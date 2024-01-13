"""
Find the largest BST subtree in a given Binary Tree | Set 1

Given a Binary Tree, write a function that returns the size of the largest subtree which is also a
Binary Search Tree (BST). If the complete Binary Tree is BST, then return the size of whole tree.

Examples:

          5
        /  \
       2    4
     /  \
    1    3

Output: 3
The following subtree is the maximum size BST subtree
       2
     /  \
    1    3
------------------------------

Input:
           50
         /    \
      30       60
     /  \     /  \
    5   20   45    70
                  /  \
                65    80
Output: 5
The following subtree is the maximum size BST subtree
      60
     /  \
   45    70
        /  \
      65    80

"""
# Time Complexity: O(n) where n is the number of nodes in the given Binary Tree.

from __future__ import print_function
INT_MAX = 1000000
INT_MIN = -1000000


class Node(object):
    """A binary tree node has data, pointer to left child and a pointer to right child"""
    def __init__(self, data, left=None, right=None):
        self.data = data
        self.left = left
        self.right = right


class Value(object):
    def __init__(self, max_size=0, is_bst=0, minimum=INT_MAX, maximum=INT_MAX):
        self.max_size = max_size
        self.is_bst = is_bst
        self.minimum = minimum
        self.maximum = maximum


class BinaryTree(object):
    """
    Method 1 (Simple but inefficient)

    Start from root and do an inorder traversal of the tree. For each node N, check whether
    the subtree rooted with N is BST or not. If BST, then return size of the subtree rooted with N.
    Else, recur down the left and right subtrees and return the maximum of values returned by left
    and right subtrees.

    Time Complexity: The worst case time complexity of this method will be O(n^2).
    Consider a skewed tree for worst case analysis.

    - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - +
    def largestBST(root):
        if (isBST(root))
            return size(root)
        else:
            return max(largestBST(root->left), largestBST(root->right))

    - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - +

    Method 2 (Tricky and Efficient)
    In method 1, we traverse the tree in top down manner and do BST test for every node. If we
    traverse the tree in bottom up manner, then we can pass information about subtrees to the
    parent. The passed information can be used by the parent to do BST test (for parent node)
    only in constant time (or O(1) time). A left subtree need to tell the parent whether it is
    BST or not and also need to pass maximum value in it. So that we can compare the maximum
    value with the parent's data to check the BST property. Similarly, the right subtree need to
    pass the minimum value up the tree. The subtrees need to pass the following information up
    the tree for the finding the largest BST.

    1) Whether the subtree itself is BST or not (In the following code, is_bst_ref is used for
    this purpose)

    2) If the subtree is left subtree of its parent, then maximum value in it. And if it is right
    subtree then minimum value in it.

    3) Size of this subtree if this subtree is BST (In the following code, return value of
    largestBSTUtil() is used for this purpose)

    max_ref is used for passing the maximum value up the tree and min_ptr is used for passing
    minimum value up the tree.

    Time Complexity: O(n) where n is the number of nodes in the given Binary Tree.

    """
    root = None
    val = Value()

    def largest_bst(self, node):
        """Returns size of the largest BST subtree in a Binary Tree (efficient version)."""
        # Set the initial values for calling largestBSTUtil()
        self.largest_bst_util2(node, self.val)
        return self.val.max_size

    def largest_bst_util2(self, node, value):
        """
        # largestBSTUtil() updates *max_size_ref for the size of the largest BST subtree.
        Also, if the tree rooted with node is non-empty and a BST, then returns size of the tree.
        Otherwise returns 0.

        :param node:
        :param value: Value
        :return:
        """
        if node is None:
            value.is_bst = True  # An empty tree is BST
            return 0  # Size of the BST is 0

        # A flag variable for left subtree property i.e., max(root->left) < root->data */
        left_flag = False

        # A flag variable for right subtree property i.e., min(root->right) > root->data
        right_flag = False

        # To store sizes of left and right subtrees

        # Following tasks are done by recursive call for left subtree
        # a) Get the maximum value in left subtree (Stored in *max_ref)
        # b) Check whether Left Subtree is BST or not (Stored in is_bst)
        # c) Get the size of maximum size BST in left subtree (updates *max_size)

        value.maximum = INT_MIN
        ls = self.largest_bst_util2(node.left, value)
        if value.is_bst and node.data > value.maximum:
            left_flag = True

        # Before updating *min_ref, store the min value in left subtree.
        # So that we have the correct minimum value for this subtree
        minimum = value.minimum

        # The following recursive call does similar (similar to left subtree) task for right subtree
        value.minimum = INT_MAX
        rs = self.largest_bst_util2(node.right, value)
        if value.is_bst and node.data < value.minimum:
            right_flag = True

        # Update min and max values for the parent recursive calls
        if minimum < value.minimum:
            value.minimum = minimum

        # For leaf nodes
        if node.data < value.minimum:
            value.minimum = node.data
        if node.data > value.maximum:
            value.maximum = node.data

        # If both left and right subtrees are BST. And left and right subtree properties hold
        # for this node, then this tree is BST. So return the size of this tree
        if left_flag and right_flag:
            if ls + rs + 1 > value.max_size:
                value.max_size = ls + rs + 1
            return ls + rs + 1
        else:
            # Since this subtree is not BST, set is_bst flag for parent calls
            value.is_bst = False
            return 0


if __name__ == '__main__':
    #  Let us construct the following Tree
    #        50
    #     /      \
    #   10        60
    #  /  \       /  \
    # 5   20    55    70
    #          /     /  \
    #        45     65    80
    tree = BinaryTree()
    tree.root = Node(50, left=Node(10), right=Node(60))
    tree.root.left.left = Node(5)
    tree.root.left.right = Node(20)
    tree.root.right.left = Node(55)
    tree.root.right.left.left = Node(45)
    tree.root.right.right = Node(70)
    tree.root.right.right.left = Node(65)
    tree.root.right.right.right = Node(80)

    # The complete tree is not BST as 45 is in right subtree of 50.
    # The following subtree is the largest BST
    #        60
    #      /  \
    #    55    70
    #   /     /  \
    # 45     65    80
    print(" Size of the largest BST is %d" % tree.largest_bst(tree.root))

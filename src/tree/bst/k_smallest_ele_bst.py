"""
Find k-th smallest element in BST (Order Statistics in BST)
Given root of binary search tree and K as input, find K-th smallest element in BST.

Example:
Input: k = 3, then output should be 10
Input: k = 5, then output should be 14.

        (20)
        /   \
      (8)   (22)
      / \
    (4) (12)
        /   \
      (10)  (14)

"""
from __future__ import print_function
import sys

# Time complexity: O(n) where n is total nodes in tree just add elements to test
# NOTE: A sorted array results in skewed tree

INT_MIN = - sys.maxsize


class Node(object):
    """Binary tree node"""

    def __init__(self, data, l_count=0, left=None, right=None):
        self.data = data
        self.l_count = l_count
        self.left = left
        self.right = right


class StackT(object):
    """initial element always NULL, uses as sentinel"""

    def __init__(self, capacity):
        self.capacity = capacity
        self.base = [None] * self.capacity
        self.stack_index = -1

    # pop operation of stack
    def pop(self):
        if self.stack_index < 0:
            raise RuntimeError("Stack empty")

        result = self.base[self.stack_index]
        self.stack_index -= 1
        return result

    # push operation of stack
    def push(self, node):
        if self.stack_index >= self.capacity:
            raise RuntimeError("Stack capacity is full")

        self.stack_index += 1
        self.base[self.stack_index] = node

    def peek(self):
        return None if self.stack_index < 0 else self.base[self.stack_index]

    def size(self):
        return self.stack_index + 1

    def empty(self):
        return self.size() == 0


class BinarySearchTree(object):
    """
    Method 2: Augmented Tree Data Structure.

    The idea is to maintain rank of each node. We can keep track of elements in a subtree of any
    node while building the tree. Since we need K-th smallest element, we can maintain number of
    elements of left subtree in every node.

    Assume that the root is having N nodes in its left subtree. If K = N + 1, root is K-th node.
    If K < N, we will continue our search (recursion) for the Kth smallest element in the left
    subtree of root. If K > N + 1, we continue our search in the right subtree for the
    (K - N - 1)-th smallest element.

    Note that we need the count of elements in left subtree only.

    Time complexity: O(h) where h is height of tree.

    """

    def __init__(self, root_node=None):
        self.root = root_node

    def insert_node(self, node):
        """
        Iterative insertion Recursion is least preferred unless we gain something

        :param node: Node
        :return:
        """
        # A crawling pointer
        p_traverse = self.root
        current_parent = self.root

        while p_traverse:  # Traverse till appropriate node
            current_parent = p_traverse
            if node.data < p_traverse.data:
                p_traverse.l_count += 1
                p_traverse = p_traverse.left  # left subtree
            else:
                p_traverse = p_traverse.right  # right subtree

        if not self.root:  # If the tree is empty, make it as root node
            self.root = node
        elif node.data < current_parent.data:
            current_parent.left = node  # Insert on left side
        else:
            current_parent.right = node  # Insert on right side

        return self.root

    def binary_search_tree(self, keys, size):
        """Elements are in an array. The function builds binary tree """
        for iterator in range(size):
            new_node = Node(keys[iterator])
            self.insert_node(new_node)

        return self.root

    def k_smallest_element(self, k):
        ret = -1
        if self.root:
            p_traverse = self.root  # A crawling pointer

            # Go to k-th smallest
            while p_traverse:
                if (p_traverse.l_count + 1) == k:
                    ret = p_traverse.data
                    break
                elif k > p_traverse.l_count:
                    # There are less nodes on left subtree Go to right subtree
                    k = k - (p_traverse.l_count + 1)
                    p_traverse = p_traverse.right
                else:
                    # The node is on left subtree
                    p_traverse = p_traverse.left
        return ret


class BinarySearchTreeInorder(object):
    """
    Method 1: Using Inorder Traversal.

    Inorder traversal of BST retrieves elements of tree in the sorted order. The inorder traversal
    uses stack to store to be explored nodes of tree (threaded tree avoids stack and recursion for
    traversal, see this post). The idea is to keep track of popped elements which participate in
    the order statistics. Hypothetical algorithm is provided below,

    Time complexity: O(n) where n is total nodes in tree..

    Time complexity: O(h) where h is height of tree.
    """

    def __init__(self, root=None):
        self.root = root

    def insert_node(self, node):
        """
        Iterative insertion Recursion is least preferred unless we gain something

        :param node: Node
        :return:
        """
        # A crawling pointer
        p_traverse = self.root
        current_parent = self.root

        while p_traverse:  # Traverse till appropriate node
            current_parent = p_traverse
            if node.data < p_traverse.data:
                p_traverse.l_count += 1
                p_traverse = p_traverse.left  # left subtree
            else:
                p_traverse = p_traverse.right  # right subtree

        # If the tree is empty, make it as root node
        if not self.root:
            self.root = node
        # Insert on left side
        elif node.data < current_parent.data:
            current_parent.left = node
        # Insert on right side
        else:
            current_parent.right = node

    def binary_search_tree(self, keys, size):
        """Elements are in an array. The function builds binary tree """
        for iterator in range(size):
            new_node = Node(keys[iterator])
            self.insert_node(new_node)

        return self.root

    def k_smallest_element(self, stack, k):
        """
        :param stack: StackT
        :param k: int
        :return:
        """
        st = stack
        p_crawl = self.root

        # move to left extreme (minimum)
        while p_crawl:
            st.push(p_crawl)
            p_crawl = p_crawl.left

        # pop off stack and process each node
        p_crawl = st.pop()
        while p_crawl:
            # each pop operation emits one element in the order
            if not k - 1:
                st.stack_index = 0
                break

            if p_crawl.right:  # there is right subtree
                # push the left subtree of right subtree
                p_crawl = p_crawl.right
                while p_crawl:
                    st.push(p_crawl)
                    p_crawl = p_crawl.left
                    # pop off stack and repeat
            if st.stack_index == 0:
                break
            p_crawl = st.pop()
        return p_crawl  # node having k-th element or NULL node


class BinarySearchTreeMorris(object):
    """
    Method-3
    K'th smallest element in BST using O(1) Extra Space

    The idea is to use Morris Traversal. In this traversal, we first create links to Inorder
    successor and print the data using these links, and finally revert the changes to restore
    original tree. See this for more details.
    """

    def __init__(self, root=None):
        self.root = root

    def k_smallest_using_morris(self, k):
        # Count to iterate over elements till we get the kth smallest number
        count = 0

        ksmall = INT_MIN  # store the Kth smallest
        curr = self.root  # to store the current node

        while curr is not None:
            # Like Morris traversal if current does not have left child rather than printing as we
            # did in inorder, we will just increment the count as the number will be in an
            # increasing order
            if curr.left is None:
                count += 1
                # if count is equal to K then we found the kth smallest, so store it in ksmall
                if count == k:
                    ksmall = curr.data
                # go to current's right child
                curr = curr.right
            else:
                # we create links to Inorder Successor and count using these links
                pre = curr.left
                while pre.right is not None and pre.right != curr:
                    pre = pre.right

                if pre.right is None:  # building links
                    # link made to Inorder Successor
                    pre.right = curr
                    curr = curr.left
                # While breaking the links in so made temporary threaded tree we will check
                # for the K smallest condition
                else:
                    # Revert the changes made in if part (break link from the Inorder Successor)
                    pre.right = None
                    count += 1

                    # If count is equal to K then we found the kth smallest and so store it in
                    # ksmall
                    if count == k:
                        ksmall = curr.data

                    curr = curr.right

        return ksmall  # return the found value

    def insert(self, key):
        self.root = self.insert_util(self.root, key)

    def insert_util(self, node, key):
        """ A utility function to insert a new node with given key in BST """
        # If the tree is empty, return a new node
        if node is None:
            return Node(key)

        if key < node.data:  # Otherwise, recur down the tree
            node.left = self.insert_util(node.left, key)
        elif key > node.data:
            node.right = self.insert_util(node.right, key)

        return node  # return the (unchanged) node pointer


if __name__ == '__main__':
    # Method-1
    print("\nFind k-th smallest element in BST Method-1 (Inorder) \n")
    ele = [20, 8, 22, 4, 12, 10, 14]
    ARRAY_SIZE = len(ele)
    stack = StackT(100)
    k = 5

    # Creating the tree given in the above diagram
    bst = BinarySearchTreeInorder()
    bst.binary_search_tree(ele, len(ele))

    kNode = bst.k_smallest_element(stack, k)
    if kNode:
        print("kth smallest element for k = %d is %d" % (k, kNode.data))
    else:
        print("There is no such element")

    # Method-2
    # NOTE: A sorted array results in skewed tree
    print("\nFind k-th smallest element in BST Method-2\n")
    ele = [20, 8, 22, 4, 12, 10, 14]
    ARRAY_SIZE = len(ele)

    # Creating the tree given in the above diagram
    bst = BinarySearchTree()
    bst.binary_search_tree(ele, len(ele))

    # It should print the sorted array
    for i in range(1, ARRAY_SIZE + 1):
        print("kth smallest element for k = %d is %d" % (i, bst.k_smallest_element(i)))

    # Method-2
    # Python program to find k'th smallest element in BST using O(1) extra space
    # --------------------------
    # Let us create following BST
    #           50
    #        /     \
    #       30      70
    #      /  \    /  \
    #    20   40  60   80
    print("\nPython program to find k'th smallest element in BST\n")

    tree = BinarySearchTreeMorris()
    tree.insert(50)
    tree.insert(30)
    tree.insert(20)
    tree.insert(40)
    tree.insert(70)
    tree.insert(60)
    tree.insert(80)

    for k in range(1, 8):
        print(tree.k_smallest_using_morris(k), end=" ")

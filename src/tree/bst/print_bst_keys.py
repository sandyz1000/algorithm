"""
Print BST keys in the given range
Given two values k1 and k2 (where k1 < k2) and a root pointer to a Binary Search Tree.
Print all the keys of tree in range k1 to k2. i.e. print all x such that k1<=x<=k2 and x is a key
of given BST. Print all the keys in increasing order.

For example, if k1 = 10 and k2 = 22, then your function should print 12, 20 and 22.

        (20)
        /  \
      (8) (22)
      / \
    (4) (12)

"""
# Python program to find BST keys in given range
# Time Complexity: O(n) where n is the total number of keys in tree.


class Node:
    # Constructor to create a new node
    def __init__(self, data):
        self.data = data
        self.left = None
        self.right = None


# The function prints all the keys in the gicven range
# [k1..k2]. Assumes that k1 < k2
def print_bst(root, k1, k2):
    """
    Algorithm:
    1) If value of root’s key is greater than k1, then recursively call in left subtree.
    2) If value of root’s key is in range, then print the root’s key.
    3) If value of root’s key is smaller than k2, then recursively call in right subtree.

    """
    # Base Case
    if root is None:
        return

    # Since the desired o/p is sorted, recurse for left
    # subtree first. If root.data is greater than k1, then
    # only we can get o/p keys in left subtree
    if k1 < root.data:
        print_bst(root.left, k1, k2)

    # If root's data lies in range, then prints root's data
    if k1 <= root.data <= k2:
        print(root.data, end=" ")

    # If root.data is smaller than k2, then only we can get
    # o/p keys in right subtree
    if k2 > root.data:
        print_bst(root.right, k1, k2)


if __name__ == '__main__':
    k1 = 10
    k2 = 25
    root = Node(20)
    root.left = Node(8)
    root.right = Node(22)
    root.left.left = Node(4)
    root.left.right = Node(12)

    print_bst(root, k1, k2)

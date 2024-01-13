"""
Add all greater values to every node in a given BST
Given a Binary Search Tree (BST), modify it so that all greater values in the given BST are added
to every node.

             _50_
           /      \
         30        70
        /  \      /  \
       20  40    60  80

The above tree should be modified to following

             _260_
           /      \
         330      150
        /   \    /  \
      350  300  210 80

"""


class sum_pointer:
    def __init__(self, summ=0):
        self._summ = summ

    @property
    def summ(self): return self._summ
    @summ.setter
    def summ(self, summ): self._summ = summ


class Node:
    def __init__(self, data, left=None, right=None):
        self.data = data
        self.left = left
        self.right = right


class BinarySearchTree:
    """
    Python program to add all greater values in every node of BST

    Time Complexity: O(n) where n is number of nodes in the given BST.
    As a side note, we can also use reverse Inorder traversal to find kth largest element in a BST.
    """

    def __init__(self, root=None):
        self.root = root

    def modify_bst_util(self, root, sum_ptr):
        """Recursive function to add all greater values in every node"""
        if root is None:  # Base Case
            return

        self.modify_bst_util(root.right, sum_ptr)  # Recur for right subtree

        # Now sum_ptr has sum of nodes in right subtree, add root->data to sum and update
        # root->data
        sum_ptr.summ = sum_ptr.summ + root.data
        root.data = sum_ptr.summ

        self.modify_bst_util(root.left, sum_ptr)  # Recur for left subtree

    def modifyBST(self, root):
        sum_ptr = sum_pointer(0)
        self.modify_bst_util(root, sum_ptr)

    def inorder(self, root):
        """A utility function to do inorder traversal of BST"""
        if root is not None:
            self.inorder(root.left)
            print("%d" % root.data, end=" ")
            self.inorder(root.right)

    def insert(self, data):
        """A utility function to insert a new node with given data in BST"""
        self.root = self.insert_rec(self.root, data)

    def insert_rec(self, node, data):
        # If the tree is empty, return a new node
        if node is None:
            self.root = Node(data)
            return self.root

        # Otherwise, recur down the tree
        if data <= node.data:
            node.left = self.insert_rec(node.left, data)
        else:
            node.right = self.insert_rec(node.right, data)

        # return the (unchanged) node pointer
        return node


if __name__ == '__main__':
    # Let us create following BST
    #           50
    #        /     \
    #       30      70
    #      /  \    /  \
    #    20   40  60   80
    bst = BinarySearchTree()
    bst.insert(50)
    bst.insert(30)
    bst.insert(20)
    bst.insert(40)
    bst.insert(70)
    bst.insert(60)
    bst.insert(80)
    bst.modifyBST(bst.root)
    bst.inorder(bst.root)
    print("\n")

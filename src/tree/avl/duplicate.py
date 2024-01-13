""" AVL with duplicate keys

Please refer below post before reading about AVL tree handling of duplicates.

How to handle duplicates in Binary Search Tree?

The is to augment AVL tree node to store count together with regular fields like key, left and
right pointers.

Insertion of keys 12, 10, 20, 9, 11, 10, 12, 12 in an empty Binary Search Tree would create
following.

        12(3)
       /    \
     10(2)  20(1)
    /    \
 9(1)   11(1)

Count of a key is shown in bracket """

from __future__ import print_function


# AVL tree that handles duplicates

class Node:
    def __init__(self, key, left=None, right=None):
        self.key = key
        self.left = left
        self.right = right
        self.height = 1
        self.count = 1


class AVLTree:
    def __init__(self, root=None):
        self.root = root

    def height(self, N):
        """A utility function to get height of the tree"""
        if N is None:
            return 0
        return N.height

    def right_rotate(self, y):
        """A utility function to right rotate subtree rooted with y"""
        x = y.left
        T2 = x.right

        # Perform rotation
        x.right = y
        y.left = T2

        # Update heights
        y.height = max(self.height(y.left), self.height(y.right)) + 1
        x.height = max(self.height(x.left), self.height(x.right)) + 1
        return x  # Return new root

    def left_rotate(self, x):
        """A utility function to left rotate subtree rooted with x"""
        y = x.right
        T2 = y.left

        # Perform rotation
        y.left = x
        x.right = T2

        # Update heights
        x.height = max(self.height(x.left), self.height(x.right)) + 1
        y.height = max(self.height(y.left), self.height(y.right)) + 1

        return y  # Return new root

    def get_balance(self, N):
        """Get Balance factor of node N"""
        if N is None:
            return 0

        return self.height(N.left) - self.height(N.right)

    def insert(self, node, key):
        # 1.  Perform the normal BST insertion
        if node is None:
            return Node(key)

        if key < node.key:
            node.left = self.insert(node.left, key)
        elif key > node.key:
            node.right = self.insert(node.right, key)
        else:  # Duplicate keys not allowed
            return node

        # 2. Update height of this ancestor node
        node.height = 1 + max(self.height(node.left), self.height(node.right))

        # 3. Get the balance factor of this ancestor node to check whether
        # this node became unbalanced
        balance = self.get_balance(node)

        # If this node becomes unbalanced, then there are 4 cases Left Left Case
        if balance > 1 and key < node.left.key:
            return self.right_rotate(node)

        # Right Right Case
        if balance < -1 and key > node.right.key:
            return self.left_rotate(node)

        # Left Right Case
        if balance > 1 and key > node.left.key:
            node.left = self.left_rotate(node.left)
            return self.right_rotate(node)

        # Right Left Case
        if balance < -1 and key < node.right.key:
            node.right = self.right_rotate(node.right)
            return self.left_rotate(node)

        # return the (unchanged) node pointer
        return node

    def pre_order(self, node):
        """
        A utility function to print preorder traversal of the tree.
        The function also prints height of every node
        """
        if node is not None:
            print(node.key)
            self.pre_order(node.left)
            self.pre_order(node.right)

    def minValueNode(self, node):
        """
        Given a non-empty binary search tree, return the node with minimum key value found
        in that tree.
        Note that the entire tree does not need to be searched.
        :param node:
        :return:
        """
        current = node

        # /* loop down to find the leftmost leaf */
        while current.left is not None:
            current = current.left
        return current

    def deleteNode(self, root, key):
        # STEP 1: PERFORM STANDARD BST DELETE
        if root is None:
            return root

        # If the key to be deleted is smaller than the root's key, then it lies in left subtree
        if key < root.key:
            root.left = self.deleteNode(root.left, key)

        # If the key to be deleted is greater than the root's key, then it lies in right subtree
        elif key > root.key:
            root.right = self.deleteNode(root.right, key)

        # if key is same as root's key, then This is the node to be deleted
        else:
            # If key is present more than once, simply decrement count and return
            if root.count > 1:
                root.count -= 1
                return

            # ElSE, delete the node
            # node with only one child or no child
            if (root.left is None) or (root.right is None):
                temp = None
                temp = root.right if temp == root.left else root.left
                if temp is None:  # No child case
                    temp = root
                    root = None
                else:  # One child case
                    root = temp  # Copy the contents of the non-empty child

            else:
                # node with two children: Get the inorder successor (smallest in the right subtree)
                temp = self.minValueNode(root.right)

                # Copy the inorder successor's data to this node
                self.root.key = temp.key

                # Delete the inorder successor
                root.right = self.deleteNode(root.right, temp.key)

        # If the tree had only one node then return
        if root is None:
            return root

        # STEP 2: UPDATE HEIGHT OF THE CURRENT NODE
        root.height = max(self.height(root.left), self.height(root.right)) + 1

        # STEP 3: GET THE BALANCE FACTOR OF THIS NODE (to check whether this node became
        # unbalanced)
        balance = self.get_balance(root)

        # If this node becomes unbalanced, then there are 4 cases
        # Left Left Case
        if balance > 1 and self.get_balance(root.left) >= 0:
            return self.right_rotate(root)

        # Left Right Case
        if balance > 1 and self.get_balance(root.left) < 0:
            root.left = self.left_rotate(root.left)
            return self.right_rotate(root)

        # Right Right Case
        if balance < -1 and self.get_balance(root.right) <= 0:
            return self.left_rotate(root)

        # Right Left Case
        if balance < -1 and self.get_balance(root.right) > 0:
            root.right = self.right_rotate(root.right)
            return self.left_rotate(root)

        return root


if __name__ == '__main__':
    # Output:
    # Pre order traversal of the constructed AVL tree is
    # 9(2) 5(2) 7(1) 10(1) 17(1)
    # Pre order traversal after deletion of 10
    # 10(1) 5(2) 7(1) 17(1)

    tree = AVLTree()

    # Constructing tree given in the above figure
    tree.root = tree.insert(tree.root, 9)
    tree.root = tree.insert(tree.root, 5)
    tree.root = tree.insert(tree.root, 10)
    tree.root = tree.insert(tree.root, 5)
    tree.root = tree.insert(tree.root, 9)
    tree.root = tree.insert(tree.root, 7)
    tree.root = tree.insert(tree.root, 17)

    print("Pre order traversal of the constructed AVL tree is \n")
    tree.pre_order(tree.root)

    tree.root = tree.deleteNode(tree.root, 9)

    print("\nPre order traversal after deletion of 10 \n")
    tree.pre_order(tree.root)

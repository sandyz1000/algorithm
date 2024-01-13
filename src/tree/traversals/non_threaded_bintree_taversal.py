"""
Inorder Non-threaded Binary Tree Traversal without Recursion or Stack
We have discussed Thread based Morris Traversal. Can we do inorder traversal without threads if we
have parent pointers available to us?

Example:
----------------------------------------
Input: Root of Below Tree [Every node of tree has parent pointer also]
        10
      /    \
     5     100
           /  \
          80  120

Output: 5 10 80 100 120
The code should not extra space (No Recursion and stack)
"""


# Python program to print inorder traversal of a Binary Search
# Tree (BST) without recursion and stack


class Node(object):
    def __init__(self, key, left=None, right=None, parent=None):
        self.key = key
        self.left = left
        self.right = right
        self.parent = parent


def insert(node, key):
    """A utility function to insert a new node with given key in BST"""
    # If the tree is empty, return a new node
    if node is None:
        return Node(key)

    # Otherwise, recur down the tree
    if key < node.key:
        node.left = insert(node.left, key)
        node.left.parent = node

    elif key > node.key:
        node.right = insert(node.right, key)
        node.right.parent = node

    # return the (unchanged) node pointer
    return node


# Function to print inorder traversal using parent pointer
def inorder(root):
    left_done = False

    # Start traversal from root
    while root:
        # If left child is not traversed, find the leftmost child
        if not left_done:
            while root.left:
                root = root.left

        print("%d" % root.key, end=" ")
        left_done = True  # Mark left as done

        if root.right:  # If right child exists
            left_done = False
            root = root.right
        # If right child doesn't exist, move to parent
        elif root.parent:
            # If this node is right child of its parent, visit parent's parent first
            while root.parent and root == root.parent.right:
                root = root.parent

            # If this is the root node
            if not root.parent:
                break
            else:
                root = root.parent
        else:
            break


if __name__ == '__main__':
    root = None
    root = insert(root, 24)
    root = insert(root, 27)
    root = insert(root, 29)
    root = insert(root, 34)
    root = insert(root, 14)
    root = insert(root, 4)
    root = insert(root, 10)
    root = insert(root, 22)
    root = insert(root, 13)
    root = insert(root, 3)
    root = insert(root, 2)
    root = insert(root, 6)

    print("Inorder traversal is \n")
    inorder(root)

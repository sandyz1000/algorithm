"""
Binary Search Tree | Set 2 (Delete)
We have discussed BST search and insert operations. In this post, delete operation is discussed.
When we delete a node, there possibilities arise.

1) Node to be deleted is leaf: Simply remove from the tree.

              50                            50
           /     \         delete(20)      /   \
          30      70       --------->    30     70
         /  \    /  \                     \    /  \
       20   40  60   80                   40  60   80

2) Node to be deleted has only one child: Copy the child to the node and delete the child

              50                            50
           /     \         delete(30)      /   \
          30      70       --------->    40     70
            \    /  \                          /  \
            40  60   80                       60   80

3) Node to be deleted has two children: Find inorder successor of the node. Copy contents of the
inorder successor to the node and delete the inorder successor.
Note that inorder predecessor can also be used.

              50                            60
            /    \         delete(50)      /   \
          40     70       --------->     40    70
                /  \                            \
              60   80                           80

# Note: Inorder successor is needed only when right child is not empty. In this particular case,
inorder successor can be obtained by finding the minimum value in right child of the node.

"""
from __future__ import print_function


# Python program to demonstrate delete operation in binary search tree

# A Binary Tree Node
class Node(object):
    # Constructor to create a new node
    def __init__(self, key):
        self.key = key
        self.left = None
        self.right = None


# A utility function to do inorder traversal of BST
def inorder(root):
    if root is not None:
        inorder(root.left)
        print(root.key, end=" ")
        inorder(root.right)


# A utility function to insert a new node with given key in BST
def insert(node, key):
    # If the tree is empty, return a new node
    if node is None:
        return Node(key)

    # Otherwise recur down the tree
    if key < node.key:
        node.left = insert(node.left, key)
    else:
        node.right = insert(node.right, key)

    # return the (unchanged) node pointer
    return node


def min_value_node(node):
    """
    Given a non-empty binary search tree, return the node with minimum key value found in
    that tree. Note that the entire tree does not need to be searched

    :param node: Node
    :return:
    """
    current = node

    # loop down to find the leftmost leaf
    while current.left is not None:
        current = current.left

    return current


def delete_node(root, key):
    """
    Given a binary search tree and a key, this function delete the key and returns the new root
    """
    # Base Case
    if root is None:
        return root

    # If the key to be deleted is smaller than the root's key then it lies in left subtree
    if key < root.key:
        root.left = delete_node(root.left, key)

    # If the kye to be delete is greater than the root's key then it lies in right subtree
    elif key > root.key:
        root.right = delete_node(root.right, key)

    # If key is same as root's key, then this is the node to be deleted
    else:
        # Node with only one child or no child
        if root.left is None:
            temp = root.right
            return temp

        elif root.right is None:
            temp = root.left
            return temp

        else:
            # Node with two children:
            # Get the inorder successor (smallest in the right subtree)
            temp = min_value_node(root.right)

            # Copy the inorder successor's content to this node
            root.key = temp.key

            # Delete the inorder successor
            root.right = delete_node(root.right, temp.key)

    return root


if __name__ == '__main__':

    # Let us create following BST
    #               50
    #            /     \
    #           30      70
    #          /  \    /  \
    #        20   40  60   80

    root = None
    root = insert(root, 50)
    root = insert(root, 30)
    root = insert(root, 20)
    root = insert(root, 40)
    root = insert(root, 70)
    root = insert(root, 60)
    root = insert(root, 80)

    print("Inorder traversal of the given tree")
    inorder(root)

    print("\nDelete 20")
    root = delete_node(root, 20)
    print("\nInorder traversal of the modified tree")
    inorder(root)

    print("\nDelete 30")
    root = delete_node(root, 30)
    print("\nInorder traversal of the modified tree")
    inorder(root)

    print("\nDelete 50")
    root = delete_node(root, 50)
    print("\nInorder traversal of the modified tree")
    inorder(root)
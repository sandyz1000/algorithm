"""
Iterative Preorder Traversal
Given a Binary Tree, write an iterative function to print Preorder traversal of the given binary
tree.  """


# Python program to perform iterative preorder traversal

class Node:
    """A binary tree node"""
    # Constructor to create a new node
    def __init__(self, data):
        self.data = data
        self.left = None
        self.right = None


def iterative_preorder(root):
    """
    An iterative process to print preorder traversal of BT

    Refer this for recursive preorder traversal of Binary Tree. To convert an inherently recursive
    procedures to iterative, we need an explicit stack. Following is a simple stack based iterative
    process to print Preorder traversal.
    1) Create an empty stack nodeStack and push root node to stack.
    2) Do following while nodeStack is not empty.
        a) Pop an item from stack and print it.
        b) Push right child of popped item to stack
        c) Push left child of popped item to stack

    :param root:
    :return:
    """
    # Base CAse
    if root is None:
        return

    # create an empty stack and push root to it
    node_stack = [root]

    # Pop all items one by one. Do following for every popped item
    #   a) print it
    #   b) push its right child
    #   c) push its left child
    # Note that right child is pushed first so that left is processed first

    while len(node_stack) > 0:
        # Pop the top item from stack and print it
        node = node_stack.pop()
        print(node.data)

        # Push right and left children of the popped node
        # to stack
        if node.right is not None:
            node_stack.append(node.right)
        if node.left is not None:
            node_stack.append(node.left)


if __name__ == '__main__':
    root = Node(10)
    root.left = Node(8)
    root.right = Node(2)
    root.left.left = Node(3)
    root.left.right = Node(5)
    root.right.left = Node(2)
    iterative_preorder(root)

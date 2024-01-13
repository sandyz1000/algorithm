"""
Inorder Tree Traversal without Recursion
Using Stack is the obvious way to traverse tree without recursion.


---------------------------------------------------
Algorithm:
---------------------------------------------------
1) Create an empty stack S.
2) Initialize current node as root
3) Push the current node to S and set current = current->left until current is NULL
4) If current is NULL and stack is not empty then
        a) Pop the top item from stack.
        b) Print the popped item, set current = popped_item->right
        c) Go to step 3.
5) If current is NULL and stack is empty then we are done

"""


class Node:
    # Constructor to create a new node
    def __init__(self, data):
        self.data = data
        self.left = None
        self.right = None


# Iterative function for inorder tree traversal
def inOrder(root: Node):
    # Set current to root of binary tree
    current = root
    s = []  # initialize stack
    done = 0

    while not done:
        # Reach the left most Node of the current Node
        if current is not None:
            # Place pointer to a tree node on the stack before traversing the node's left subtree
            s.append(current)
            current = current.left
        # BackTrack from the empty subtree and visit the Node at the top of the stack; however,
        # if the stack is empty you are done
        else:
            if len(s) > 0:
                current = s.pop()
                print(current.data, end=" ")
                # We have visited the node and its left subtree. Now, it's right subtree's turn
                current = current.right
            else:
                done = 1
    print(">>>>>>>>")


if __name__ == '__main__':
    # Constructed binary tree is
    #             1
    #           /   \
    #          2     3
    #        /  \
    #       4    5

    root = Node(1)
    root.left = Node(2)
    root.right = Node(3)
    root.left.left = Node(4)
    root.left.right = Node(5)

    inOrder(root)

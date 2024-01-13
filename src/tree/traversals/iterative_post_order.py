"""
Iterative Postorder Traversal | Set 1 (Using Two Stacks)  """


# Python porgram for iterative postorder traversal using two stacks

class Node:
    # Constructor to create a new node
    def __init__(self, data):
        self.data = data
        self.left = None
        self.right = None


class IterPostOrder:
    """
    Iterative Postorder Traversal | Set 1 (Using Two Stacks)

    We have discussed iterative inorder and iterative preorder traversals. In this post,
    iterative postorder traversal is discussed which is more complex than the other two
    traversals (due to its nature of non-tail recursion, there is an extra statement after the
    final recursive call to itself). The postorder traversal can easily be done using two stacks
    though. The idea is to push reverse postorder traversal to a stack. Once we have reverse
    postorder traversal in a stack, we can just pop all items one by one from the stack and print
    them, this order of printing will be in postorder because of LIFO property of stacks. Now the
    question is, how to get reverse post order elements in a stack - the other stack is used for
    this purpose. For example, in the following tree, we need to get 1, 3, 7, 6, 2, 5,
    4 in a stack. If take a closer look at this sequence, we can observe that this sequence is
    very similar to preorder traversal. The only difference is right child is visited before left
    child and therefore sequence is "root right left" instead of "root left right". So we can do
    something like iterative preorder traversal with following differences.

    a) Instead of printing an item, we push it to a stack.
    b) We push left subtree before right subtree.

    """
    def traversal(self, root):
        """An iterative function to do postorder traversal of a given binary tree"""
        if root is None:
            return

            # Create two stacks
        s1 = []
        s2 = []

        # Push root to first stack
        s1.append(root)

        # Run while first stack is not empty
        while len(s1) > 0:
            # Pop an item from s1 and append it to s2
            node = s1.pop()
            s2.append(node)

            # Push left and right children of removed item to s1
            if node.left is not None:
                s1.append(node.left)
            if node.right is not None:
                s1.append(node.right)

                # Print all eleements of second stack
        while len(s2) > 0:
            node = s2.pop()
            print(node.data, end=" ")


class IterPostOrder2:
    """
    Iterative Postorder Traversal | Set 2 (Using One Stack)

    We have discussed a simple iterative postorder traversal using two stacks in the previous post.
    In this post, an approach with only one stack is discussed.

    The idea is to move down to leftmost node using left pointer. While moving down, push root
    and root's right child to stack. Once we reach leftmost node, print it if it doesn't have a
    right child. If it has a right child, then change root so that the right child is processed
    before.

    Following is detailed algorithm.
    1.1 Create an empty stack
    2.1 Do following while root is not NULL
        a) Push root's right child and then root to stack.
        b) Set root as root's left child.
    2.2 Pop an item from stack and set it as root.
        a) If the popped item has a right child and the right child is at top of stack, then
        remove the right child from stack, push the root back and set root as root's right child.
        b) Else print root's data and set root as NULL.
    2.3 Repeat steps 2.1 and 2.2 while stack is not empty.

    Python program for iterative postorder traversal using one stack
    """
    ans = []  # Stores the answer

    def peek(self, stack):
        if len(stack) > 0:
            return stack[-1]
        return None

    def traversal(self, root):
        """A iterative function to do postorder traversal of a given binary tree"""
        # Check for empty tree
        if root is None:
            return

        stack = []
        while True:
            while root:
                # Push root's right child and then root to stack
                if root.right is not None:
                    stack.append(root.right)
                stack.append(root)

                # Set root as root's left child
                root = root.left

            # Pop an item from stack and set it as root
            root = stack.pop()
            # If the popped item has a right child and the
            # right child is not processed yet, then make sure
            # right child is processed before root
            if root.right is not None and self.peek(stack) == root.right:
                stack.pop()  # Remove right child from stack
                stack.append(root)  # Push root back to stack
                root = root.right  # change root so that the
                # righ child is processed next

            # Else print root's data and set root as None
            else:
                self.ans.append(root.data)
                root = None

            if len(stack) <= 0:
                break


if __name__ == '__main__':
    root = Node(1)
    root.left = Node(2)
    root.right = Node(3)
    root.left.left = Node(4)
    root.left.right = Node(5)
    root.right.left = Node(6)
    root.right.right = Node(7)

    print("\nMethod-1: \n")
    tree = IterPostOrder()
    tree.traversal(root)

    print("\n\nMethod-2: \n")
    tree = IterPostOrder2()
    tree.traversal(root)
    print(tree.ans)

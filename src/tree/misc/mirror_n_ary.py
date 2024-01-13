"""
Mirror of n-ary Tree
Given a Tree where every node contains variable number of children, convert the tree to its mirror.

            10                            10
         / /  \ \                      / / \ \
        2 34  56 100                100 56 34 2
           |     / | \             / | \   |
           1    7  8  9           9  8 7   1

Node of tree is represented as a key and a variable sized array of children pointers. The idea is
similar to mirror of Binary Tree. For every node, we first recur for all of its children and then
reverse array of children pointers. We can also do these steps in other way, i.e., reverse array
of children pointers first and then recur for children. """

from __future__ import print_function

# Python program to mirror an n-ary tree


# Represents a node of an n-ary tree
class Node:
    # Utility function to create a new tree node
    def __init__(self, key):
        self.key = key
        self.child = []


# Function to convert a tree to its mirror
def mirror_tree(root):
    # Base Case : nothing to do if root is None
    if root is None:
        return

    # Number of children of root
    n = len(root.child)

    # If number of child is less than 2 i.e.
    # 0 or 1 we don't need to do anything
    if n < 2:
        return

    # Calling mirror function for each child
    for i in range(n):
        mirror_tree(root.child[i])

    # Reverse variable sized array of child pointers
    root.child.reverse()


# Prints the n-ary tree level wise

def print_node_level_wise(root):
    if root is None:
        return

    # create a queue and enqueue root to it
    queue = [root]

    # Do level order traversal. Two loops are used
    # to make sure that different levels are printed
    # in different lines
    while len(queue) > 0:
        n = len(queue)
        while n > 0:

            # Dequeue an item from queue and print it
            p = queue[0]
            queue.pop(0)
            print(p.key, end=" ")

            # Enqueue all children of the deque item
            for index, value in enumerate(p.child):
                queue.append(value)

            n -= 1
        print("")  # Separator between levels


if __name__ == '__main__':
    # Level order traversal Before Mirroring
    # 10
    # 2 34 56 100
    # 1 7 8 9
    #
    # Level order traversal After Mirroring
    # 10
    # 100 56 34 2
    # 9 8 7 1

    # Let us create below tree
    # *              10
    # *        /   /    \   \
    # *        2  34    56   100
    # *            |        /  | \
    # *            1        7  8  9

    root = Node(10)
    root.child.append(Node(2))
    root.child.append(Node(34))
    root.child.append(Node(56))
    root.child.append(Node(100))
    root.child[2].child.append(Node(1))
    root.child[3].child.append(Node(7))
    root.child[3].child.append(Node(8))
    root.child[3].child.append(Node(9))

    print("Level order traversal Before Mirroring")
    print_node_level_wise(root)

    mirror_tree(root)

    print("\nLevel Order traversal After Mirroring")
    print_node_level_wise(root)

"""
Depth of an N-Ary tree

Given an N-Ary tree, find depth of the tree. An N-Ary tree is a tree in which nodes can
have at most N children.

- - - - - - - - - - - - - - - - - - - - - - - - - - - -
                      1
                /  /    \  \
               2  3     4   5
             / / /\ \     /  |   \
            6 7 8 9 10   11  12  13
              \     / \        / |  \
              14   15 16      17 18 19

Depth of n-ary is 4
- - - - - - - - - - - - - - - - - - - - - - - - - - - -

N-Ary tree can be traversed just like a normal tree. We just have to consider all childs of
a given node and recursively call that function on every node.
"""

N = 3


# Python program to find the height of an N-ary tree
class Node(object):
    """Structure of a node of an n-ary tree"""
    def __init__(self, key):
        self.key = key
        self.child = []


def depthOfTree(ptr: Node):
    """Function that will return the depth of the tree"""
    if not ptr:  # Base case
        return 0
    # Check for all children and find the maximum depth
    maxdepth = 0
    for it in ptr.child:
        maxdepth = max(maxdepth, depthOfTree(it))

    return maxdepth + 1


if __name__ == '__main__':
    # Output: 4

    # Let us create below tree
    # *             A
    # *         / /  \  \
    # *       B  F   D  E
    # *      / \    |  /|\
    # *     K  J    G  C H I
    # *      /\            \
    # *    N   M            L

    root = Node('A')
    root.child.append(Node('B'))
    root.child.append(Node('F'))
    root.child.append(Node('D'))
    root.child.append(Node('E'))
    root.child[0].child.append(Node('K'))
    root.child[0].child.append(Node('J'))
    root.child[2].child.append(Node('G'))
    root.child[3].child.append(Node('C'))
    root.child[3].child.append(Node('H'))
    root.child[3].child.append(Node('I'))
    root.child[0].child[0].child.append(Node('N'))
    root.child[0].child[0].child.append(Node('M'))
    root.child[3].child[2].child.append(Node('L'))

    print(depthOfTree(root))

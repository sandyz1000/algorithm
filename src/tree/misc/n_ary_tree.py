"""
Number of ways to traverse an N-ary tree

Given an n-ary tree, count number of ways to traverse an n-ary (or a Directed Acyclic Graph)
tree starting from the root vertex.

Suppose we have a given N-ary tree as shown below

                    A
                /  / \   \
              B   F  D   E
            /  \     |  / \ \
           K   J     G C  H I
          / \               |
         N  M               L

Now we have to find the number of ways of traversing the whole tree starting from the root vertex.
There can be many such ways. Some of them are listed below.

1) N->M->K->J->B->F->D->E->C->H->I->L->A (kind-of depth first traversal).
2) A->B->F->D->E->K->J->G->C->H->I->N->M->L (level order traversal)
3) ..........
4) ..........
.
.
.
and so on ...

k-ary tree
In graph theory, a k-ary tree is a rooted tree in which each node has no more than k children.
It is also sometimes known as a k-way tree, an N-ary tree, or an M-ary tree. A binary tree is the
special case where k=2.

Types of k-ary trees:
1.  A full k-ary tree is a k-ary tree where within each level every node has either 0 or k
    children.
2.  A perfect k-ary tree is a full[1] k-ary tree in which all leaf nodes are at the same depth.[2]
3.  A complete k-ary tree is a k-ary tree which is maximally space efficient. It must be completely
    filled on every level except for the last level. However, if the last level is not complete,
    then all nodes of the tree must be "as far left as possible".
"""
from __future__ import print_function
from collections import deque


# Python program to find the number of ways to traverse a n-ary tree
# starting from the root node

class Node(object):
    def __init__(self, key):
        self.key = key
        self.child = []


class NAryTree(object):
    """
    The count of all ways to traverse is the product of factorials of the number of children of
    each node. Refer to the below figure for clear understanding -

                    A
                /  / \   \      --> Permutation of A's children
              B   F  D   E      --> BFDE, BFED, BDFE, BDEF, BEDF ... 24 (4!) permutation
            /  \     |  / \ \
           K   J     G C  H I   --> Permutation of E's children CHI, CIH, HCI, HIC ...
          / \               |   --> Permutation of B's children JK, KJ
         N  M               L   --> Permutation of B's children MN, NM

    Here,

    'A' has four children, so 4! permutations possible
    'B' has two children, so 2! permutations possible
    'F' has no children, so 0! permutations possible
    ...

    And so on

    Hence all such ways are-
    4 ! * 2 ! * 0 ! * 1 ! * 3 ! * 2 ! * 0 ! * 0 ! * 0 ! * 0 ! * 1 ! * 0 ! * 0 ! = 576 way

    That's a huge number of ways and among them only few proves to be useful, like- inorder,
    level-order, preorder, postorder (arranged according to the popularity of these traversals)

    Time Complexity: We visit each node once during the level order traversal and take O(n) time
    to compute factorial for every node. Total time taken is O(Nn) where N = number of nodes in
    the n-ary tree. We can optimize the solution to work in O(N) time by per-computing factorials
    of all numbers from 1 to n.

    Auxiliary Space : Since we are only using a queue and a structure for every node, so overall
    space complexity is also O(N).

    Common Pitfalls: Since, products of factorials can tend to grow very huge, so it may
    overflow. It is preferable to use data types like- unsigned long long int in C/C++,
    as the number of ways can never be a negative number. In Java and Python there are Big
    Integer to take care of overflows.
    """

    def __init__(self, root=None):
        self.root = root

    def factorial(self, n):
        """Utility Function to find factorial of given number"""
        if n == 0:
            return 1
        return n * self.factorial(n - 1)

    def calculate_ways(self, root):
        """
        Function to calculate the number of ways of traversing the n-ary starting from root.
        This function is just a modified breadth-first search.
        We can use a depth-first search too.

        :param root:
        :return:
        """
        ways = 1  # Initialize result

        # If the tree is empty there is no way of traversing the tree.
        if root is None:
            return 0

        # Create a queue and enqueue root to it.
        q = deque()
        q.append(root)

        # Level order traversal.
        while len(q) != 0:
            # Deque an item from queue and print it
            p = q.popleft()

            # The number of ways is the product of factorials of number of children of each node.
            ways *= self.factorial(len(p.child))

            # Enqueue all children of the deque item
            for i in range(len(p.child)):
                q.append(p.child[i])

        return ways


if __name__ == '__main__':
    # Output : 576

    # Let us create below tree
    # *              A
    # *         /  /  \  \
    # *       B   F   D   E
    # *      / \      |  /|\
    # *     K   J     G C H I
    # *    /\                \
    # *   N  M                L

    tree = NAryTree()

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

    tree.root = root

    print(tree.calculate_ways(tree.root))

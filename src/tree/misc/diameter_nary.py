"""
Diameter of an N-ary tree
The diameter of an N-ary tree is the longest path present between any two nodes of the tree.
These two nodes must be two leaf nodes. The following examples have the longest path[diameter]
shaded.

Example:

            P
          / |  \
         P  N  P
      / / \   / \
     N N  P  P  N
         / \  \
        P  N  P
       /
      P

The path can either start from one of the node and goes up to one of the LCAs of these nodes
and again come down to the deepest node of some other subtree or can exist as a diameter of one
of the child of the current node.

The solution will exist in any one of these:
I] Diameter of one of the children of the current node
II] Sum of Height of highest two subtree + 1

"""

from __future__ import print_function


# Python program to find the height of an N-ary tree

class Node:
    """Structure of a node of an n-ary tree"""

    def __init__(self, key):
        self.key = key
        self.child = []


class DiameterNAry:
    # Utility function that will return the depth of the tree
    def depthOfTree(self, ptr: Node):
        if not ptr:  # Base case
            return 0
        maxdepth = 0

        # Check for all children and find the maximum depth
        for it in ptr.child:
            maxdepth = max(maxdepth, self.depthOfTree(it))
        return maxdepth + 1

    def diameter(self, ptr: Node):
        """Function to calculate the diameter of the tree"""
        if not ptr:  # Base case
            return 0

        # Find top two highest children
        max1, max2 = 0, 0
        for it in ptr.child:
            h = self.depthOfTree(it)
            if h > max1:
                max2 = max1
                max1 = h
            elif h > max2:
                max2 = h

        # Iterate over each child for diameter
        max_child_dia = 0
        for it in ptr.child:
            max_child_dia = max(max_child_dia, self.diameter(it))

        return max(max_child_dia, max1 + max2 + 1)


if __name__ == '__main__':
    # Output: 7
    # Optimizations to above solution :
    # We can make a hash table to store heights of all nodes. If we pre-compute these heights,
    # we don’t need to call depthOfTree() for every node.

    # Let us create below tree
    # *             A
    # *         / /  \  \
    # *       B  F   D  E
    # *      / \     |  /|\
    # *     K  J    G  C H I
    # *      /\            \
    # *    N   M            L
    test = DiameterNAry()

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

    print(test.diameter(root))

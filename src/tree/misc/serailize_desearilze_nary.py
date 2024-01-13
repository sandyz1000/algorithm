"""
Serialize and Deserialize an N-ary Tree

Given an N-ary tree where every node has at-most N children. How to serialize and deserialize it?
Serialization is to store tree in a file so that it can be later restored. The structure of tree
must be maintained. Deserialization is reading tree back from file.

------------------------------------------------
Explanation:
------------------------------------------------

In an N-ary tree, there are no designated left and right children. An N-ary tree is represented
by storing an array or list of child pointers with every node.

The idea is to store an 'end of children' marker with every node. The following diagram shows
serialization where ')' is used as end of children marker. The diagram is taken from here.

            _A_
          /  |  \
        B    C   D
       / |    / / \ \
      E  F   G H  I J
         |
         K

    ABE)FK)))C)DG)H)I)J)))
"""
from __future__ import print_function

# Python Program serialize and deserialize an N-ary tree
MARKER = ')'
N = 5


# A node of N-ary tree
class Node(object):
    def __init__(self, key):
        self.key = key
        self.child = [None] * N  # An array of pointers for N children


class Pointer:
    def __init__(self, value=None):
        self.value = value


class NAryTree:
    def __init__(self, root=None):
        self.root = root

    def serialize(self, root, fp):
        """This function stores the given N-ary tree in a file pointed by fp"""
        # Base case
        if root is None:
            return

        # Else, store current node and recur for its children
        fp.write(root.key)
        i = 0
        while i < N and root.child[i]:
            self.serialize(root.child[i], fp)
            i += 1

        # Store marker at the end of children
        fp.write(MARKER)

    def de_serialize(self, root_ptr, fp):
        """
        This function constructs N-ary tree from a file pointed by 'fp'.
        This function returns 0 to indicate that the next item is a valid tree key. Else returns 0
        :param root_ptr:
        :param fp:
        :return:
        """
        # Read next item from file. If there are no more items or next item is marker,
        # then return 1 to indicate same
        val = fp.read(1)
        if not val or val == MARKER:
            return 1

        # Else create node with this item and recur for children
        root = Node(val)
        root_ptr.value = root

        for i in range(N):
            child_ptr = Pointer(root.child[i])
            if self.de_serialize(child_ptr, fp):
                break
            root.child[i] = child_ptr.value
        # Finally return 0 for successful finish
        return 0

    def create_dummy_tree(self):
        """A utility function to create a dummy tree shown in above diagram"""
        root = Node('A')
        root.child[0] = Node('B')
        root.child[1] = Node('C')
        root.child[2] = Node('D')
        root.child[0].child[0] = Node('E')
        root.child[0].child[1] = Node('F')
        root.child[2].child[0] = Node('G')
        root.child[2].child[1] = Node('H')
        root.child[2].child[2] = Node('I')
        root.child[2].child[3] = Node('J')
        root.child[0].child[1].child[0] = Node('K')
        return root

    def traverse(self, root):
        """ A utlity function to traverse the constructed N-ary tree """
        if root:
            print("%s" % root.key, end=" ")
            for i in range(N):
                self.traverse(root.child[i])


if __name__ == '__main__':
    # Output:
    # Constructed N-Ary Tree from file is A B E F K C D G H I J
    tree = NAryTree()
    # Let us create an N-ary tree shown in above diagram
    tree.root = tree.create_dummy_tree()

    # Let us open a file and serialize the tree into the file
    with open("tree.txt", "w") as fp:
        tree.serialize(tree.root, fp)

    # Let us deserialize the storeed tree into root1
    root1 = Pointer(None)
    with open("tree.txt", "r") as fr:
        tree.de_serialize(root1, fr)

    print("Constructed N-Ary Tree from file is \n")
    tree.traverse(root1.value)

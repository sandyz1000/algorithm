"""
Suffix Tree Application 4 - Build Linear Time Suffix Array
Given a string, build it's Suffix Array
We have already discussed following two ways of building suffix array:

1. Naive O(n^2Logn) algorithm
2. Enhanced O(nLogn) algorithm

Please go through these to have the basic understanding.
Here we will see how to build suffix array in linear time using suffix tree.

Lets consider string abcabxabcd.
It's suffix array would be:

0 6 3 1 7 4 2 8 9 5
Lets look at following figure:

==Suffix Tree Application==

This is suffix tree for String "abcabxabcd$"

If we do a DFS traversal, visiting edges in lexicographic order (we have been doing the same
traversal in other Suffix Tree Application articles as well) and print suffix indices on leaves,
we will get following:

10 0 6 3 1 7 4 2 8 9 5
"$" is lexicographically lesser than [a-zA-Z].
The suffix index 10 corresponds to edge with "$" label.
Except this 1st suffix index, the sequence of all other numbers gives the suffix array of the string.

So if we have a suffix tree of the string, then to get it's suffix array, we just need to do a
lexicographic order DFS traversal and store all the suffix indices in resultant suffix array,
except the very 1st suffix index.

"""
from __future__ import print_function

MAX_CHAR = 256


class SuffixTreeNode:
    def __init__(self, start, end, root=None):
        self.children = [None] * MAX_CHAR

        # pointer to other node via suffix link
        self.suffixLink = root

        # (start, end) interval specifies the edge, by which the node is connected to its parent
        # node. Each edge will connect two nodes,  one parent and one child, and (start,
        # end) interval of a given edge  will be stored in the child node. Lets say there are two
        #  nods A and B connected by an edge with indices (5, 8) then this indices (5, 8) will be
        #  stored in node B. */
        self.start = start
        self.end = end

        # for leaf nodes, it stores the index of suffix for the path  from root to leaf

        # suffixIndex will be set to -1 by default and actual suffix index will be set later
        # for leaves at the end of all phases
        self.suffixIndex = -1


class Pointer:
    def __init__(self, value):
        self.value = value


class SuffixTree:
    def __init__(self, text, root=None):

        self.text = text  # Input string
        self.root = root  # Pointer to root node

        # lastNewNode will point to newly created internal node, waiting for it's suffix link to
        # be set, which might get a new suffix link (other than root) in next extension of same
        # phase. lastNewNode will be set to NULL when last newly created internal node (if there
        # is any) got it's suffix link reset to new internal node created in next extension of
        # same phase.

        self.activeNode = None

        # activeEdge is represented as input string character index (not the character itself)
        self.activeEdge = -1
        self.activeLength = 0
        self.leaf_end = Pointer(-1)
        # remainingSuffixCount tells how many suffixes yet to be added in tree
        self.remainingSuffixCount = 0
        self.size = -1  # Length of input string

    def edge_length(self, n):
        if n == self.root:
            return 0
        return n.end.value - n.start + 1

    def walk_down(self, currNode):
        """
        activePoint change for walk down (APCFWD) using Skip/Count Trick (Trick 1). If active
        Length is greater than current edge length, set next  internal node as activeNode and
        adjust activeEdge and activeLength accordingly to represent same activePoint
        """

        if self.activeLength >= self.edge_length(currNode):
            self.activeEdge += self.edge_length(currNode)
            self.activeLength -= self.edge_length(currNode)
            self.activeNode = currNode
            return 1
        return 0

    def extend_suffix_tree(self, pos):
        # Extension Rule 1, this takes care of extending all leaves created so far in tree
        self.leaf_end.value = pos

        # Increment remainingSuffixCount indicating that a new suffix added to the list of
        # suffixes yet to be added in tree
        self.remainingSuffixCount += 1

        # set last_new_node to NULL while starting a new phase, indicating there is no internal
        # node waiting for it's suffix link reset in current phase
        last_new_node = None

        # Add all suffixes (yet to be added) one by one in tree
        while self.remainingSuffixCount > 0:

            if self.activeLength == 0:
                self.activeEdge = pos  # APCFALZ

            # There is no outgoing edge starting with activeEdge from activeNode
            if self.activeNode.children[ord(self.text[self.activeEdge])] is None:
                # Extension Rule 2 (A new leaf edge gets created)
                self.activeNode.children[ord(self.text[self.activeEdge])] = \
                    SuffixTreeNode(pos, self.leaf_end, self.root)

                # A new leaf edge is created in above line starting from  an existng node
                # (the current activeNode), and if there is any internal node waiting for it's
                # suffix link get reset, point the suffix link from that last internal node to
                # current activeNode. Then set last_new_node to NULL indicating no more node waiting
                # for suffix link reset.

                if last_new_node is not None:
                    last_new_node.suffixLink = self.activeNode
                    last_new_node = None

            # There is an outgoing edge starting with activeEdge from activeNode
            else:
                # Get the nextt node at the end of edge starting with activeEdge
                nextt = self.activeNode.children[ord(self.text[self.activeEdge])]
                if self.walk_down(nextt):
                    # Start from nextt node (the new activeNode)
                    continue

                # Extension Rule 3 (current character being processed is already on the edge)
                if self.text[nextt.start + self.activeLength] == self.text[pos]:
                    # If a newly created node waiting for it's suffix link to be set, then set
                    # suffix link of that waiting node to curent active node

                    if last_new_node is not None and self.activeNode != self.root:
                        last_new_node.suffixLink = self.activeNode
                        last_new_node = None

                    # APCFER3
                    self.activeLength += 1
                    # STOP all further processing in this phase and move on to nextt phase*/
                    break

                # We will be here when activePoint is in middle of the edge being traversed and
                # current character being processed is not on the edge (we fall off the tree).
                # In this case, we add a new internal node and a new leaf edge going out of that
                # new node. This is Extension Rule 2, where a new leaf edge and a new internal
                # node get created
                split_end = Pointer(0)
                split_end.value = nextt.start + self.activeLength - 1

                # New internal node
                split = SuffixTreeNode(nextt.start, split_end, self.root)
                self.activeNode.children[ord(self.text[self.activeEdge])] = split

                # New leaf coming out of new internal node)
                split.children[ord(self.text[pos])] = SuffixTreeNode(pos, self.leaf_end)
                nextt.start += self.activeLength
                split.children[ord(self.text[nextt.start])] = nextt

                # We got a new internal node here. If there is any internal node created in last
                # extensions of same phase which is still waiting for it's suffix link reset,
                # do it now.
                if last_new_node is not None:
                    # suffixLink of last_new_node points to current newly created internal node
                    last_new_node.suffixLink = split

                # Make the current newly created internal node waiting for it's suffix link reset
                # (which is pointing to root at present). If we come across any other internal node
                # (existing or newly created) in nextt extension of same phase, when a new leaf edge
                # gets added (i.e. when Extension Rule 2 applies is any of the nextt extension of
                # same phase) at that point, suffixLink of this node will point to that internal
                # node.
                last_new_node = split

            # One suffix got added in tree, decrement the count of suffixes yet to be added.
            self.remainingSuffixCount -= 1

            if self.activeNode == self.root and self.activeLength > 0:  # APCFER2C1
                self.activeLength -= 1
                self.activeEdge = pos - self.remainingSuffixCount + 1

            elif self.activeNode != self.root:  # APCFER2C2
                self.activeNode = self.activeNode.suffixLink

    def printt(self, i, j):
        k = i
        while k <= j and self.text[k] != '#':
            print("%c" % self.text[k], end="")
            k += 1

        if k <= j:
            print("#", end="")
            pass

    def set_suffix_index_by_dfs(self, n, label_height):
        """
        Print the suffix tree as well along with setting suffix index So tree will be printed
        in DFS manner Each edge along with it's suffix index will be printed
        """
        if n is None:
            return

        if n.start != -1:  # A non-root node
            # Print the label on edge from parent to current node
            # self.printt(n.start, n.end.value)
            pass

        leaf = 1
        for i in range(MAX_CHAR):
            if n.children[i] is not None:
                if leaf == 1 and n.start != -1:
                    # print(" [%d]" % n.suffixIndex)
                    pass

                # Current node is not a leaf as it has outgoing edges from it.
                leaf = 0
                self.set_suffix_index_by_dfs(n.children[i],
                                             label_height + self.edge_length(n.children[i]))

        if leaf == 1:
            for i in range(n.start, n.end.value + 1):
                if self.text[i] == '#':  # Trim unwanted characters
                    n.end = Pointer(i)

            n.suffixIndex = self.size - label_height
            # print(" [%d]" % n.suffixIndex)

    def build_suffix_tree(self):
        """
        Build the suffix tree and print the edge labels along with suffixIndex. suffixIndex for
        leaf edges will be >= 0 and for non-leaf edges will be -1

        """
        self.size = len(self.text)
        root_end = Pointer(-1)

        # Root is a special node with start and end indices as -1, as it has no parent from where
        #  an edge comes to root
        self.root = SuffixTreeNode(-1, root_end, self.root)

        self.activeNode = self.root  # First activeNode will be root
        for i in range(self.size):
            self.extend_suffix_tree(i)

        labelHeight = 0
        self.set_suffix_index_by_dfs(self.root, labelHeight)

    def do_traversal(self, n, suffix_array, idx):
        if n is None:
            return

        if n.suffixIndex == -1:  # If it is internal node
            for i in range(MAX_CHAR):
                if n.children[i] is not None:
                    self.do_traversal(n.children[i], suffix_array, idx)

        # If it is Leaf node other than "$" label
        elif -1 < n.suffixIndex < self.size:
            suffix_array[idx.value] = n.suffixIndex
            idx.value += 1

    def build_suffix_array(self, suffix_array):
        for i in range(self.size):
            suffix_array[i] = -1

        idx = Pointer(0)
        self.do_traversal(self.root, suffix_array, idx)
        print("Suffix Array for String ")

        for i in range(self.size):
            print("%c" % text[i], end="")
        print(" is: ", end="")
        for i in range(self.size):
            print("%d" % suffix_array[i], end="")

        print("")


if __name__ == '__main__':
    # Output:
    # Suffix Array for String banana is: 5 3 1 0 4 2
    # Suffix Array for String GEEKSFORGEEKS is: 9 1 10 2 5 8 0 11 3 6 7 12 4
    # Suffix Array for String AAAAAAAAAA is: 9 8 7 6 5 4 3 2 1 0
    # Suffix Array for String ABCDEFG is: 0 1 2 3 4 5 6
    # Suffix Array for String ABABABA is: 6 4 2 0 5 3 1
    # Suffix Array for String abcabxabcd is: 0 6 3 1 7 4 2 8 9 5
    # Suffix Array for String CCAAACCCGATTA is: 12 2 3 4 9 1 0 5 6 7 8 11 10

    # Ukkonen's Suffix Tree Construction takes O(N) time and space to build suffix tree for a
    # string of length N and after that, traversal of tree take O(N) to build suffix array.

    # So overall, it's linear in time and space.
    # Can you see why traversal is O(N) ?? Because a suffix tree of string of length N will have
    # at most N-1 internal nodes and N leaves. Traversal of these nodes can be done in O(N).

    text = "banana$"
    suffix = SuffixTree(text)
    suffix.build_suffix_tree()
    suffix.size -= 1
    suffix_array = [0] * suffix.size
    suffix.build_suffix_array(suffix_array)

    text = "GEEKSFORGEEKS$"
    suffix = SuffixTree(text)
    suffix.build_suffix_tree()
    suffix.size -= 1
    suffix_array = [0] * suffix.size
    suffix.build_suffix_array(suffix_array)

    text = "AAAAAAAAAA$"
    suffix = SuffixTree(text)
    suffix.build_suffix_tree()
    suffix.size -= 1
    suffix_array = [0] * suffix.size
    suffix.build_suffix_array(suffix_array)

    text = "ABCDEFG$"
    suffix = SuffixTree(text)
    suffix.build_suffix_tree()
    suffix.size -= 1
    suffix_array = [0] * suffix.size
    suffix.build_suffix_array(suffix_array)

    text = "ABABABA$"
    suffix = SuffixTree(text)
    suffix.build_suffix_tree()
    suffix.size -= 1
    suffix_array = [0] * suffix.size
    suffix.build_suffix_array(suffix_array)

    text = "abcabxabcd$"
    suffix = SuffixTree(text)
    suffix.build_suffix_tree()
    suffix.size -= 1
    suffix_array = [0] * suffix.size
    suffix.build_suffix_array(suffix_array)

    text = "CCAAACCCGATTA$"
    suffix = SuffixTree(text)
    suffix.build_suffix_tree()
    suffix.size -= 1
    suffix_array = [0] * suffix.size
    suffix.build_suffix_array(suffix_array)

"""
Generalized Suffix Tree 1
In earlier suffix tree articles, we created suffix tree for one string and then we queried that
tree for substring check, searching all patterns, longest repeated substring and built suffix array
(All linear time operations).

There are lots of other problems where multiple strings are involved.
e.g. pattern searching in a text file or dictionary, spell checker, phone book, Autocomplete,
Longest common substring problem, Longest palindromic substring and More.

For such operations, all the involved strings need to be indexed for faster search and retrieval.
One way to do this is using suffix trie or suffix tree. We will discuss suffix tree here.
A suffix tree made of a set of strings is known as Generalized Suffix Tree.
We will discuss a simple way to build Generalized Suffix Tree here for two strings only.
Later, we will discuss another approach to build Generalized Suffix Tree for two or more strings.

Here we will use the suffix tree implementation for one string discussed already and modify that a
bit to build generalized suffix tree.

Lets consider two strings X and Y for which we want to build generalized suffix tree. For this we
will make a new string X#Y$ where # and $ both are terminal symbols (must be unique). Then we will
build suffix tree for X#Y$ which will be the generalized suffix tree for X and Y. Same logic will
apply for more than two strings (i.e. concatenate all strings using unique terminal symbols and
then build suffix tree for concatenated string).

Lets say X = xabxa, and Y = babxba, then
X#Y$ = xabxa#babxba$

If we run the code implemented at Ukkonen's Suffix Tree Construction -
Part 6 for string xabxa#babxba$, we get following output:

        --- DIAGRAM - GOES -- HERE ---

We can use this tree to solve some of the problems, but we can refine it a bit by removing
unwanted substrings on a path label. A path label should have substring from only one input
string, so if there are path labels having substrings from multiple input strings, we can keep
only the initial portion corresponding to one string and remove all the later portion. For
example, for path labels #babxba$, a#babxba$ and bxa#babxba$, we can remove babxba$ (belongs to
2nd input string) and then new path labels will be #, a# and bxa# respectively. With this change,
above diagram will look like below:

        --- DIAGRAM - GOES -- HERE ---

Below implementation is built on top of original implementation. Here we are removing unwanted
characters on path labels. If a path label has "#" character in it, then we are trimming all
characters after the "#" in that path label.

Note: This implementation builds generalized suffix tree for only two strings X and Y which are
concatenated as X#Y$


If two strings are of size M and N, this implementation will take O(M+N) time and space.
If input strings are not concatenated already, then it will take 2(M+N) space in total, M+N space
to store the generalized suffix tree and another M+N space to store concatenated string.

==Followup:==
Extend above implementation for more than two strings (i.e. concatenate all strings using unique
terminal symbols and then build suffix tree for concatenated string)

One problem with this approach is the need of unique terminal symbol for each input string. This
will work for few strings but if there is too many input strings, we may not be able to find that
many unique terminal symbols.

We will discuss another approach to build generalized suffix tree soon where we will need only
one unique terminal symbol and that will resolve the above problem and can be used to build
generalized suffix tree for any number of input strings.

"""
from __future__ import print_function

# Python program to implement Ukkonen's Suffix Tree Construction And then build generalized
# suffix tree

MAX_CHAR = 256


class SuffixTreeNode(object):
    def __init__(self, start, end, root=None):
        self.children = [None] * MAX_CHAR

        # pointer to other node via suffix link
        self.suffixLink = root

        # (start, end) interval specifies the edge, by which the node is connected to its parent
        # node. Each edge will connect two nodes,  one parent and one child, and (start,
        # end) interval of a given edge  will be stored in the child node. Lets say there are two
        # nods A and B connected by an edge with indices (5, 8) then this indices (5, 8) will be
        # stored in node B.
        self.start = start
        self.end = end

        # for leaf nodes, it stores the index of suffix for the path  from root to leaf

        # suffixIndex will be set to -1 by default and actual suffix index will be set later
        # for leaves at the end of all phases
        self.suffixIndex = -1


class Pointer(object):
    def __init__(self, value):
        self.value = value


class SuffixTree(object):
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

        # set lastNewNode to NULL while starting a new phase, indicating there is no internal
        # node waiting for it's suffix link reset in current phase
        lastNewNode = None

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
                # current activeNode. Then set lastNewNode to NULL indicating no more node waiting
                # for suffix link reset.

                if lastNewNode is not None:
                    lastNewNode.suffixLink = self.activeNode
                    lastNewNode = None

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

                    if lastNewNode is not None and self.activeNode != self.root:
                        lastNewNode.suffixLink = self.activeNode
                        lastNewNode = None

                    # APCFER3
                    self.activeLength += 1
                    # STOP all further processing in this phase and move on to nextt phase*/
                    break

                # We will be here when activePoint is in middle of the edge being traversed and
                # current character being processed is not on the edge (we fall off the tree).
                # In this case, we add a new internal node and a new leaf edge going out of that
                # new node. This is Extension Rule 2, where a new leaf edge and a new internal
                # node get created
                splitEnd = Pointer(0)
                splitEnd.value = nextt.start + self.activeLength - 1

                # New internal node
                split = SuffixTreeNode(nextt.start, splitEnd, self.root)
                self.activeNode.children[ord(self.text[self.activeEdge])] = split

                # New leaf coming out of new internal node)
                split.children[ord(self.text[pos])] = SuffixTreeNode(pos, self.leaf_end)
                nextt.start += self.activeLength
                split.children[ord(self.text[nextt.start])] = nextt

                # We got a new internal node here. If there is any internal node created in last
                # extensions of same phase which is still waiting for it's suffix link reset,
                # do it now.
                if lastNewNode is not None:
                    # suffixLink of lastNewNode points to current newly created internal node
                    lastNewNode.suffixLink = split

                # Make the current newly created internal node waiting for it's suffix link reset
                # (which is pointing to root at present). If we come across any other internal node
                # (existing or newly created) in nextt extension of same phase, when a new leaf edge
                # gets added (i.e. when Extension Rule 2 applies is any of the nextt extension of
                # same phase) at that point, suffixLink of this node will point to that internal
                # node.
                lastNewNode = split

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

    def set_suffix_index_by_dfs(self, n, labelHeight):
        """
        Print the suffix tree as well along with setting suffix index So tree will be printed
        in DFS manner Each edge along with it's suffix index will be printed
        """
        if n is None:
            return

        if n.start != -1:  # A non-root node
            # Print the label on edge from parent to current node
            self.printt(n.start, n.end.value)

        leaf = 1
        for i in range(MAX_CHAR):
            if n.children[i] is not None:
                if leaf == 1 and n.start != -1:
                    print(" [%d]" % n.suffixIndex)

                # Current node is not a leaf as it has outgoing edges from it.
                leaf = 0
                self.set_suffix_index_by_dfs(n.children[i],
                                             labelHeight + self.edge_length(n.children[i]))

        if leaf == 1:
            for i in range(n.start, n.end.value + 1):
                if self.text[i] == '#':  # Trim unwanted characters
                    n.end = Pointer(i)

            n.suffixIndex = self.size - labelHeight
            print("[%d]" % n.suffixIndex)

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


if __name__ == '__main__':
    # text = "xabxac#abcabxabcd$"
    # suffix = SuffixTree(text)
    # suffix.build_suffix_tree()

    text = "xabxa#babxba$"
    suffix = SuffixTree(text)
    suffix.build_suffix_tree()

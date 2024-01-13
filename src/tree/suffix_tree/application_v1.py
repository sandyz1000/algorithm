"""
Suffix Tree Application 1 - Substring Check
Given a text string and a pattern string, check if pattern exists in text or not.

Few pattern searching algorithms (KMP, Rabin-Karp, Naive Algorithm, Finite Automata) are already
discussed, which can be used for this check.
Here we will discuss suffix tree based algorithm.

As a prerequisite, we must know how to build a suffix tree in one or the other way.

Once we have a suffix tree built for given text, we need to traverse the tree from root to leaf
against the characters in pattern. If we do not fall off the tree (i.e. there is a path from root
to leaf or somewhere in middle) while traversal, then pattern exists in text as a substring.

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
        #  stored in node B.
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
                # (which is pointing to root at present). If we come across any other internal
                # node (existing or newly created) in nextt extension of same phase, when a new
                # leaf edge gets added (i.e. when Extension Rule 2 applies is any of the nextt
                # extension of same phase) at that point, suffixLink of this node will point to
                # that internal node.
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

        label_height = 0
        self.set_suffix_index_by_dfs(self.root, label_height)

    def traverse_edge(self, m_string, idx, start, end):
        k = start
        # Traverse the edge with character by character matching
        while k <= end and idx < len(m_string):
            if self.text[k] != m_string[idx]:
                return -1  # mo match
            idx += 1
            k += 1

        if idx >= len(m_string):
            return 1  # match

        return 0  # more characters yet to match

    def do_traversal(self, n, m_string, idx):
        if n is None:
            return -1  # no match

        res = -1

        # If node n is not root node, then traverse edge from node n's parent to node n.
        if n.start != -1:
            res = self.traverse_edge(m_string, idx, n.start, n.end.value)
            if res != 0:
                return res  # match (res = 1) or no match (res = -1)

        # Get the character index to search
        idx = idx + self.edge_length(n)

        # If there is an edge from node n going out  with current character str[idx],
        # traverse that edge

        if n.children[ord(m_string[idx])] is not None:
            return self.do_traversal(n.children[ord(m_string[idx])], m_string, idx)
        else:
            return -1  # no match

    def check_for_substring(self, m_string):
        res = self.do_traversal(self.root, m_string, 0)
        if res == 1:
            print("Pattern <%s> is a Substring" % m_string)
        else:
            print("Pattern <%s> is NOT a Substring" % m_string)


if __name__ == '__main__':
    # Output:
    #
    # Pattern <TEST> is a Substring
    # Pattern <A> is a Substring
    # Pattern < > is a Substring
    # Pattern <IS A> is a Substring
    # Pattern < IS A > is a Substring
    # Pattern <TEST1> is NOT a Substring
    # Pattern <THIS IS GOOD> is NOT a Substring
    # Pattern <TES> is a Substring
    # Pattern <TESA> is NOT a Substring
    # Pattern <ISB> is NOT a Substring

    # Ukkonen's Suffix Tree Construction takes O(N) time and space to build suffix tree for a
    # string of length N and after that, traversal for substring check takes O(M) for a pattern
    # of length M.

    # With slight modification in traversal algorithm discussed here, we can answer following:
    #
    # Find all occurrences of a given pattern P present in text T.
    # How to check if a pattern is prefix of a text?
    # How to check if a pattern is suffix of a text?

    suffix = SuffixTree("THIS IS A TEST TEXT$")
    suffix.build_suffix_tree()

    suffix.check_for_substring("TEST")
    suffix.check_for_substring("A")
    suffix.check_for_substring(" ")
    suffix.check_for_substring("IS A")
    suffix.check_for_substring(" IS A ")
    suffix.check_for_substring("TEST1")
    suffix.check_for_substring("THIS IS GOOD")
    suffix.check_for_substring("TES")
    suffix.check_for_substring("TESA")
    suffix.check_for_substring("ISB")

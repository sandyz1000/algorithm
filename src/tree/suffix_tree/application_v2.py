"""
Suffix Tree Application 2 - Searching All Patterns
Given a text string and a pattern string, find all occurrences of the pattern in string.

Few pattern searching algorithms (KMP, Rabin-Karp, Naive Algorithm, Finite Automata) are already
discussed, which can be used for this check.

Here we will discuss suffix tree based algorithm.

In the 1st Suffix Tree Application (Substring Check), we saw how to check whether a given pattern
is substring of a text or not. It is advised to go through Substring Check 1st.
In this article, we will go a bit further on same problem. If a pattern is substring of a text,
then we will find all the positions on pattern in the text.

As a prerequisite, we must know how to build a suffix tree in one or the other way.

Here we will build suffix tree using Ukkonen's Algorithm, discussed already as below:
Ukkonen's Suffix Tree Construction - Part 1
Ukkonen's Suffix Tree Construction - Part 2
Ukkonen's Suffix Tree Construction - Part 3
Ukkonen's Suffix Tree Construction - Part 4
Ukkonen's Suffix Tree Construction - Part 5
Ukkonen's Suffix Tree Construction - Part 6

        ---- DIAGRAM-GOES-HERE -----

This is suffix tree for String "abcabxabcd$", showing suffix indices and edge label indices
(start, end). The (sub)string value on edges are shown only for explanatory purpose. We never store
path label string in the tree.

Suffix Index of a path tells the index of a substring (starting from root) on that path.
Consider a path "bcd$" in above tree with suffix index 7. It tells that substrings b, bc, bcd, bcd$
are at index 7 in string.
Similarly path "bxabcd$" with suffix index 4 tells that substrings b, bx, bxa, bxab, bxabc, bxabcd,
bxabcd$ are at index 4.
Similarly path "bcabxabcd$" with suffix index 1 tells that substrings b, bc, bca, bcab, bcabx,
bcabxa, bcabxab, bcabxabc, bcabxabcd, bcabxabcd$ are at index 1.

If we see all the above three paths together, we can see that:
    1. Substring "b" is at indices 1, 4 and 7
    2. Substring "bc" is at indices 1 and 7

With above explanation, we should be able to see following:

1. Substring "ab" is at indices 0, 3 and 6
2. Substring "abc" is at indices 0 and 6
3. Substring "c" is at indices 2 and 8
4. Substring "xab" is at index 5
5. Substring "d" is at index 9
6. Substring "cd" is at index 8
.....
.....

Can you see how to find all the occurrences of a pattern in a string ?

1st of all, check if the given pattern really exists in string or not (As we did in Substring
Check). For this, traverse the suffix tree against the pattern.
If you find pattern in suffix tree (don't fall off the tree), then traverse the subtree below that
point and find all suffix indices on leaf nodes. All those suffix indices will be pattern indices
in string

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
    """

    Ukkonen's Suffix Tree Construction takes O(N) time and space to build suffix tree for a
    string of length N and after that, traversal for substring check takes O(M) for a pattern of
    length M and then if there are Z occurrences of the pattern, it will take O(Z) to find
    indices of all those Z occurrences.

    Overall pattern complexity is linear: O(M + Z).

    A bit more detailed analysis
    How many internal nodes will there in a suffix tree of string of length N ??
    Answer: N-1 (Why ??)
    There will be N suffixes in a string of length N.
    Each suffix will have one leaf.
    So a suffix tree of string of length N will have N leaves.
    As each internal node has at least 2 children, an N-leaf suffix tree has at most N-1 internal
    nodes.
    If a pattern occurs Z times in string, means it will be part of Z suffixes, so there will be Z
    leaves below in point (internal node and in between edge) where pattern match ends in tree and
    so subtree with Z leaves below that point will have Z-1 internal nodes. A tree with Z leaves
    can be traversed in O(Z) time.

    Overall pattern complexity is linear: O(M + Z).
    For a given pattern, Z (the number of occurrences) can be atmost N.
    So worst case complexity can be: O(M + N) if Z is close/equal to N (A tree traversal with N
    nodes take O(N) time).

    Followup questions:
    1. Check if a pattern is prefix of a text?
    2. Check if a pattern is suffix of a text?

    """

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
            if res == -1:
                return res  # match (res = 1) or no match (res = -1)

            if res == 1:  # match
                if n.suffixIndex > -1:
                    print("substring count: 1 and position: %d" % n.suffixIndex)
                else:
                    print("substring count: %d" % self.count_leaf(n))
                return 1

        # Get the character index to search
        idx = idx + self.edge_length(n)
        # If there is an edge from node n going out  with current character str[idx],
        # traverse that edge
        if n.children[ord(m_string[idx])] is not None:
            return self.do_traversal(n.children[ord(m_string[idx])], m_string, idx)
        else:
            return -1  # no match

    def check_for_sub_string(self, m_string):
        res = self.do_traversal(self.root, m_string, 0)
        if res == 1:
            print("Pattern <%s> is a Substring" % m_string)
        else:
            print("Pattern <%s> is NOT a Substring" % m_string)

    def count_leaf(self, n):
        if n is None:
            return 0
        return self.do_traversal_to_count_leaf(n)

    def do_traversal_to_count_leaf(self, n):
        if n is None:
            return 0

        if n.suffixIndex > -1:
            print("Found at position: %d" % n.suffixIndex)
            return 1
        count, i = 0, 0

        for i in range(MAX_CHAR):
            if n.children[i] is not None:
                count += self.do_traversal_to_count_leaf(n.children[i])

        return count


if __name__ == '__main__':
    # Output:
    #
    # Text: GEEKSFORGEEKS, Pattern to search: GEEKS
    # Found at position: 8
    # Found at position: 0
    # substring count: 2
    # Pattern <GEEKS> is a Substring
    #
    #
    # Text: GEEKSFORGEEKS, Pattern to search: GEEK1
    # Pattern <GEEK1> is NOT a Substring
    #
    #
    # Text: GEEKSFORGEEKS, Pattern to search: FOR
    # substring count: 1 and position: 5
    # Pattern <FOR> is a Substring
    #
    #
    # Text: AABAACAADAABAAABAA, Pattern to search: AABA
    # Found at position: 13
    # Found at position: 9
    # Found at position: 0
    # substring count: 3
    # Pattern <AABA> is a Substring
    #
    #
    # Text: AABAACAADAABAAABAA, Pattern to search: AA
    # Found at position: 16
    # Found at position: 12
    # Found at position: 13
    # Found at position: 9
    # Found at position: 0
    # Found at position: 3
    # Found at position: 6
    # substring count: 7
    # Pattern <AA> is a Substring
    #
    #
    # Text: AABAACAADAABAAABAA, Pattern to search: AAE
    # Pattern <AAE> is NOT a Substring
    #
    #
    # Text: AAAAAAAAA, Pattern to search: AAAA
    # Found at position: 5
    # Found at position: 4
    # Found at position: 3
    # Found at position: 2
    # Found at position: 1
    # Found at position: 0
    # substring count: 6
    # Pattern <AAAA> is a Substring
    #
    #
    # Text: AAAAAAAAA, Pattern to search: AA
    # Found at position: 7
    # Found at position: 6
    # Found at position: 5
    # Found at position: 4
    # Found at position: 3
    # Found at position: 2
    # Found at position: 1
    # Found at position: 0
    # substring count: 8
    # Pattern <AA> is a Substring
    #
    #
    # Text: AAAAAAAAA, Pattern to search: A
    # Found at position: 8
    # Found at position: 7
    # Found at position: 6
    # Found at position: 5
    # Found at position: 4
    # Found at position: 3
    # Found at position: 2
    # Found at position: 1
    # Found at position: 0
    # substring count: 9
    # Pattern <A> is a Substring
    #
    #
    # Text: AAAAAAAAA, Pattern to search: AB
    # Pattern <AB> is NOT a Substring

    text = "GEEKSFORGEEKS$"
    suffix = SuffixTree(text)
    suffix.build_suffix_tree()
    print("Text: GEEKSFORGEEKS, Pattern to search: GEEKS")
    suffix.check_for_sub_string("GEEKS")
    print("\n\nText: GEEKSFORGEEKS, Pattern to search: GEEK1")
    suffix.check_for_sub_string("GEEK1")
    print("\n\nText: GEEKSFORGEEKS, Pattern to search: FOR")
    suffix.check_for_sub_string("FOR")

    text = "AABAACAADAABAAABAA$"
    suffix = SuffixTree(text)
    suffix.build_suffix_tree()
    print("\n\nText: AABAACAADAABAAABAA, Pattern to search: AABA")
    suffix.check_for_sub_string("AABA")
    print("\n\nText: AABAACAADAABAAABAA, Pattern to search: AA")
    suffix.check_for_sub_string("AA")
    print("\n\nText: AABAACAADAABAAABAA, Pattern to search: AAE")
    suffix.check_for_sub_string("AAE")

    text = "AAAAAAAAA$"
    suffix = SuffixTree(text)
    suffix.build_suffix_tree()
    print("\n\nText: AAAAAAAAA, Pattern to search: AAAA")
    suffix.check_for_sub_string("AAAA")
    print("\n\nText: AAAAAAAAA, Pattern to search: AA")
    suffix.check_for_sub_string("AA")
    print("\n\nText: AAAAAAAAA, Pattern to search: A")
    suffix.check_for_sub_string("A")
    print("\n\nText: AAAAAAAAA, Pattern to search: AB")
    suffix.check_for_sub_string("AB")

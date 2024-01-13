"""
Suffix Tree Application 5 - Longest Common Substring
Given two strings X and Y, find the Longest Common Substring of X and Y.

Naive [O(N*M2)] and Dynamic Programming [O(N*M)] approaches are already discussed here.
In this article, we will discuss a linear time approach to find LCS using suffix tree (The 5th Suffix Tree Application).
Here we will build generalized suffix tree for two strings X and Y as discussed already at:
Generalized Suffix Tree 1

Lets take same example (X = xabxa, and Y = babxba) we saw in Generalized Suffix Tree 1.
We built following suffix tree for X and Y there:

    --- DIAGRAM -GOES -HERE -----

This is generalized suffix tree for xabxa#babxba$
In above, leaves with suffix indices in [0,4] are suffixes of string xabxa and leaves with suffix indices in [6,11] are suffixes of string babxa. Why ??
Because in concatenated string xabxa#babxba$, index of string xabxa is 0 and it's length is 5, so indices of it's suffixes would be 0, 1, 2, 3 and 4. Similarly index of string babxba is 6 and it's length is 6, so indices of it's suffixes would be 6, 7, 8, 9, 10 and 11.

With this, we can see that in the generalized suffix tree figure above, there are some internal nodes having leaves below it from

both strings X and Y (i.e. there is at least one leaf with suffix index in [0,4] and one leaf with suffix index in [6, 11]
string X only (i.e. all leaf nodes have suffix indices in [0,4])
string Y only (i.e. all leaf nodes have suffix indices in [6,11])
Following figure shows the internal nodes marked as "XY", "X" or "Y" depending on which string the leaves belong to, that they have below themselves.

    --- DIAGRAM -GOES -HERE -----

What these "XY", "X" or "Y" marking mean ?
Path label from root to an internal node gives a substring of X or Y or both.
For node marked as XY, substring from root to that node belongs to both strings X and Y.
For node marked as X, substring from root to that node belongs to string X only.
For node marked as Y, substring from root to that node belongs to string Y only.

By looking at above figure, can you see how to get LCS of X and Y ?
By now, it should be clear that how to get common substring of X and Y at least.
If we traverse the path from root to nodes marked as XY, we will get common substring of X and Y.

Now we need to find the longest one among all those common substrings.
Can you think how to get LCS now ? Recall how did we get Longest Repeated Substring in a given string using suffix tree already.
The path label from root to the deepest node marked as XY will give the LCS of X and Y. The deepest node is highlighted in above figure and path label "abx" from root to that node is the LCS of X and Y.

If two strings are of size M and N, then Generalized Suffix Tree construction takes O(M+N) and LCS finding is a DFS on tree which is again O(M+N).
So overall complexity is linear in time and space.

Followup:

1. Given a pattern, check if it is substring of X or Y or both. If it is a substring, find all it's occurrences along with which string (X or Y or both) it belongs to.
2. Extend the implementation to find LCS of more than two strings
3. Solve problem 1 for more than two strings
4. Given a string, find it's Longest Palindromic Substring

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
    def __init__(self, text, size1, root=None):

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
        self.size1 = size1

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

    def do_traversal(self, n, label_height, max_height, substring_start_index):
        if n is None:
            return

        ret = -1
        if n.suffixIndex < 0:  # If it is internal node
            for i in range(MAX_CHAR):
                if n.children[i] is not None:
                    self.do_traversal(n.children[i], label_height + self.edge_length(n.children[i]),
                                      max_height, substring_start_index)

                    if n.suffixIndex == -1:
                        n.suffixIndex = ret

                    elif (n.suffixIndex == -2 and ret == -3) or (
                            n.suffixIndex == -3 and ret == -2) or n.suffixIndex == -4:
                        n.suffixIndex = -4  # Mark node as XY

                        # Keep track of deepest node
                        if max_height.value < label_height:
                            max_height.value = label_height
                            substring_start_index.value = n.end.value - label_height + 1

        elif -1 < n.suffixIndex < self.size1:  # suffix of X
            return -2  # Mark node as X

        elif n.suffixIndex >= self.size1:  # suffix of Y
            return -3  # Mark node as Y

        return n.suffixIndex

    def longest_common_substring(self):
        max_height = Pointer(0)
        substring_start_index = Pointer(0)
        self.do_traversal(self.root, 0, max_height, substring_start_index)

        k = 0
        while k < max_height.value:
            print("%c" % text[k + substring_start_index.value], end="")
            k += 1

        if k == 0:
            print("No common substring")
        else:
            print(", of length: %d" % max_height.value)
        print("")


if __name__ == '__main__':
    # TODO: Fix output

    # Longest Common Substring in xabxac and abcabxabcd is: abxa, of length: 4
    # Longest Common Substring in xabxaabxa and babxba is: abx, of length: 3
    # Longest Common Substring in GeeksforGeeks and GeeksQuiz is: Geeks, of length: 5
    # Longest Common Substring in OldSite:GeeksforGeeks.org and
    # NewSite:GeeksQuiz.com is: Site:Geeks, of length: 10
    # Longest Common Substring in abcde and fghie is: e, of length: 1
    # Longest Common Substring in pqrst and uvwxyz is: No common substring

    size1 = 7
    print("Longest Common Substring in xabxac and abcabxabcd is: ")
    text = "xabxac#abcabxabcd$"
    suffix = SuffixTree(text, size1)
    suffix.build_suffix_tree()
    suffix.longest_common_substring()

    size1 = 10
    print("Longest Common Substring in xabxaabxa and babxba is: ")
    text = "xabxaabxa#babxba$"
    suffix = SuffixTree(text, size1)
    suffix.build_suffix_tree()
    suffix.longest_common_substring()

    size1 = 14
    print("Longest Common Substring in GeeksforGeeks and GeeksQuiz is: ")
    text = "GeeksforGeeks#GeeksQuiz$"
    suffix = SuffixTree(text, size1)
    suffix.build_suffix_tree()
    suffix.longest_common_substring()

    size1 = 26
    print("Longest Common Substring in OldSite:GeeksforGeeks.org")
    print(" and NewSite:GeeksQuiz.com is: ")
    text = "OldSite:GeeksforGeeks.org#NewSite:GeeksQuiz.com$"
    suffix = SuffixTree(text, size1)
    suffix.build_suffix_tree()
    suffix.longest_common_substring()

    size1 = 6
    print("Longest Common Substring in abcde and fghie is: ")
    text = "abcde#fghie$"
    suffix = SuffixTree(text, size1)
    suffix.build_suffix_tree()
    suffix.longest_common_substring()

    size1 = 6
    print("Longest Common Substring in pqrst and uvwxyz is: ")
    text = "pqrst#uvwxyz$"
    suffix = SuffixTree(text, size1)
    suffix.build_suffix_tree()
    suffix.longest_common_substring()
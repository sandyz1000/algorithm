"""
Suffix Tree Application 6 - Longest Palindromic Substring
Given a string, find the longest substring which is palindrome.

We have already discussed Naive [O(n3)], quadratic [O(n2)] and linear [O(n)] approaches in Set 1,
Set 2 and Manacher's Algorithm.
In this article, we will discuss another linear time approach based on suffix tree.
If given string is S, then approach is following:

1. Reverse the string S (say reversed string is R)
2. Get Longest Common Substring of S and R given that LCS in S and R must be from same position in S

Can you see why we say that LCS in R and S must be from same position in S ?

Let's look at following examples:

    1. For S = xababayz and R = zyababax, LCS and LPS both are ababa (SAME)
    2. For S = abacdfgdcaba and R = abacdgfdcaba, LCS is abacd and LPS is aba (DIFFERENT)
    3. For S = pqrqpabcdfgdcba and R = abcdgfdcbapqrqp, LCS and LPS both are pqrqp (SAME)
    4. For S = pqqpabcdfghfdcba and R = abcdfhgfdcbapqqp, LCS is abcdf and LPS is pqqp (DIFFERENT)

We can see that LCS and LPS are not same always. When they are different ?
When S has a reversed copy of a non-palindromic substring in it which is of same or longer
length than LPS in S, then LCS and LPS will be different.

In 2nd example above (S = abacdfgdcaba), for substring abacd, there exists a reverse copy
dcaba in S, which is of longer length than LPS aba and so LPS and LCS are different here. Same
is the scenario in 4th example.

To handle this scenario we say that LPS in S is same as LCS in S and R given that LCS in R and S
must be from same position in S.
If we look at 2nd example again, substring aba in R comes from exactly same position in S as
substring aba in S which is ZERO (0th index) and so this is LPS.

==The Position Constraint:==
- - - - - - - - - - - - - - - - - - - - - - - - - - - - +
                    -- Diagram goes here --

- - - - - - - - - - - - - - - - - - - - - - - - - - - - +

We will refer string S index as forward index (Si) and string R index as reverse index (Ri).

Based on above figure, a character with index i (forward index) in a string S of length N, will
be at index N-1-i (reverse index) in it's reversed string R.
If we take a substring of length L in string S with starting index i and ending index j
(j = i+L-1), then in it's reversed string R, the reversed substring of the same will start at
index N-1-j and will end at index N-1-i.
If there is a common substring of length L at indices Si (forward index) and Ri (reverse index)
in S and R, then these will come from same position in S if Ri = (N - 1) - (Si + L - 1) where N
is string length.

So to find LPS of string S, we find longest common string of S and R where both substrings
satisfy above constraint, i.e. if substring in S is at index Si, then same substring should be in
R at index (N - 1) - (Si + L - 1). If this is not the case, then this substring is not LPS
candidate.

Naive [O(N*M2)] and Dynamic Programming [O(N*M)] approaches to find LCS of two strings are
already discussed here which can be extended to add position constraint to give LPS of a given
string.

Now we will discuss suffix tree approach which is nothing but an extension to Suffix Tree LCS
approach where we will add the position constraint.

While finding LCS of two strings X and Y, we just take deepest node marked as XY (i.e. the node
which has suffixes from both strings as it's children).
While finding LPS of string S, we will again find LCS of S and R with a condition that the common
substring should satisfy the position constraint (the common substring should come from same
position in S). To verify position constraint, we need to know all forward and reverse indices on
each internal node (i.e. the suffix indices of all leaf children below the internal nodes).

In Generalized Suffix Tree of S#R$, a substring on the path from root to an internal node is
a common substring if the internal node has suffixes from both strings S and R. The index of the
common substring in S and R can be found by looking at suffix index at respective leaf node.

If string S# is of length N then:
    1. If suffix index of a leaf is less than N, then that suffix belongs to S and same suffix index
    will become forward index of all ancestor nodes
    2. If suffix index of a leaf is greater than N, then that suffix belongs to R and reverse index
    for all ancestor nodes will be N - suffix index

Let's take string S = cabbaabb. The figure below is Generalized Suffix Tree for cabbaabb#bbaabbac$
where we have shown forward and reverse indices of all children suffixes on all internal nodes
(except root).

Forward indices are in Parentheses () and reverse indices are in square bracket [].



In above figure, all leaf nodes will have one forward or reverse index depending on which string
(S or R) they belong to. Then children's forward or reverse indices propagate to the parent.

Look at the figure to understand what would be the forward or reverse index on a leaf with a
given suffix index. At the bottom of figure, it is shown that leaves with suffix indices from 0
to 8 will get same values (0 to 8) as their forward index in S and leaves with suffix indices 9
to 17 will get reverse index in R from 0 to 8.

For example, the highlighted internal node has two children with suffix indices 2 and 9. Leaf
with suffix index 2 is from position 2 in S and so it's forward index is 2 and shown in (). Leaf
with suffix index 9 is from position 0 in R and so it's reverse index is 0 and shown in []. These
indices propagate to parent and the parent has one leaf with suffix index 14 for which reverse
index is 4. So on this parent node forward index is (2) and reverse index is [0,4]. And in same
way, we should be able to understand the how forward and reverse indices are calculated on all
nodes.

In above figure, all internal nodes have suffixes from both strings S and R, i.e. all of them
represent a common substring on the path from root to themselves. Now we need to find deepest
node satisfying position constraint. For this, we need to check if there is a forward index Si on
a node, then there must be a reverse index Ri with value (N - 2) - (Si + L - 1) where N is length
of string S# and L is node depth (or substring length). If yes, then consider this node as a LPS
candidate, else ignore it. In above figure, deepest node is highlighted which represents LPS as
bbaabb.

We have not shown forward and reverse indices on root node in figure. Because root node itself
doesn't represent any common substring (In code implementation also, forward and reverse indices
will not be calculated on root node)

How to implement this apprach to find LPS? Here are the things that we need:

We need to know forward and reverse indices on each node.
For a given forward index Si on an internal node, we need know if reverse index
Ri = (N - 2) - (Si + L - 1) also present on same node.
Keep track of deepest internal node satisfying above condition.
One way to do above is:

While DFS on suffix tree, we can store forward and reverse indices on each node in some way (
storage will help to avoid repeated traversals on tree when we need to know forward and reverse
indices on a node). Later on, we can do another DFS to look for nodes satisfying position
constraint. For position constraint check, we need to search in list of indices.

What data structure is suitable here to do all these in quickest way ?

1. If we store indices in array, it will require linear search which will make overall approach
non-linear in time.
2. If we store indices in tree (set in C++, TreeSet in Java), we may use binary search but still
overall approach will be non-linear in time.
3. If we store indices in hash function based set (unordered_set in C++, HashSet in Java), it will
provide a constant search on average and this will make overall approach linear in time. A hash
function based set may take more space depending on values being stored.
4. We will use two unordered_set (one for forward and other from reverse indices) in our
implementation, added as a member variable in SuffixTreeNode structure

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
        # nods A and B connected by an edge with indices (5, 8) then this indices (5, 8) will be
        # stored in node B.
        self.start = start
        self.end = end

        # for leaf nodes, it stores the index of suffix for the path  from root to leaf

        # suffixIndex will be set to -1 by default and actual suffix index will be set later
        # for leaves at the end of all phases
        self.suffixIndex = -1

        # To store indices of children suffixes in given string
        self.forwardIndices = set()

        # To store indices of children suffixes in reversed string
        self.reverseIndices = set()


class Pointer:
    def __init__(self, value):
        self.value = value


class SuffixTree:
    def __init__(self, text, size1=0, root=None):

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
        self.size1 = size1  # Size of 1st string

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
            # print("%c" % self.text[k], end="")
            k += 1

        if k <= j:
            # print("#", end="")
            pass

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
                    # print(" [%d]" % n.suffixIndex)
                    pass

                # Current node is not a leaf as it has outgoing edges from it.
                leaf = 0
                self.set_suffix_index_by_dfs(n.children[i],
                                             labelHeight + self.edge_length(n.children[i]))

        if leaf == 1:
            for i in range(n.start, n.end.value + 1):
                if self.text[i] == '#':  # Trim unwanted characters
                    n.end = Pointer(i)

            n.suffixIndex = self.size - labelHeight
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

        # i, ret = 0, -1
        if n.suffixIndex < 0:  # If it is internal node
            for i in range(MAX_CHAR):
                if n.children[i] is not None:
                    self.do_traversal(n.children[i], label_height + self.edge_length(n.children[i]),
                                      max_height, substring_start_index)

                    if max_height.value < label_height and len(n.forwardIndices) > 0 and \
                                    len(n.reverseIndices) > 0:

                        for forward_index, forward_value in enumerate(n.forwardIndices):
                            reverse_index = (size1 - 2) - forward_value + label_height - 1

                            # If reverse suffix comes from SAME position in given string
                            # Keep track of deepest node
                            if reverse_index in n.reverseIndices:
                                max_height.value = label_height
                                substring_start_index.value = n.end.value - label_height + 1
                                break

    def longest_palindromic_substring(self):
        max_height = Pointer(0)
        substring_start_index = Pointer(0)
        self.do_traversal(self.root, 0, max_height, substring_start_index)

        k = 0
        while k < max_height.value:
            print("%c" % self.text[k + substring_start_index.value], end=" ")
            k += 1

        if k == 0:
            print("No palindromic substring", end="")
        else:
            print(", of length: %d" % max_height.value, end="")
        print("")


if __name__ == '__main__':
    # TODO: Fix output
    print("Longest Palindromic Substring in cabbaabb is: ")
    text = "cabbaabb#bbaabbac$"
    suffix = SuffixTree(text, 9)
    suffix.build_suffix_tree()
    suffix.longest_palindromic_substring()

    print("Longest Palindromic Substring in forgeeksskeegfor is: ")
    text = "forgeeksskeegfor#rofgeeksskeegrof$"
    suffix = SuffixTree(text, 17)
    suffix.build_suffix_tree()
    suffix.longest_palindromic_substring()

    size1 = 6
    print("Longest Palindromic Substring in abcde is: ")
    text = "abcde#edcba$"
    suffix = SuffixTree(text, 6)
    suffix.build_suffix_tree()
    suffix.longest_palindromic_substring()

    size1 = 7
    print("Longest Palindromic Substring in abcdae is: ")
    text = "abcdae#eadcba$"
    suffix = SuffixTree(text, 7)
    suffix.build_suffix_tree()
    suffix.longest_palindromic_substring()

    size1 = 6
    print("Longest Palindromic Substring in abacd is: ")
    text = "abacd#dcaba$"
    suffix = SuffixTree(text, 6)
    suffix.build_suffix_tree()
    suffix.longest_palindromic_substring()

    size1 = 13
    print("Longest Palindromic Substring in abacdfgdcaba is: ")
    text = "abacdfgdcaba#abacdgfdcaba$"
    suffix = SuffixTree(text, 13)
    suffix.build_suffix_tree()
    suffix.longest_palindromic_substring()

    size1 = 15
    print("Longest Palindromic Substring in xyabacdfgdcaba is: ")
    text = "xyabacdfgdcaba#abacdgfdcabayx$"
    suffix = SuffixTree(text, 15)
    suffix.build_suffix_tree()
    suffix.longest_palindromic_substring()

    size1 = 9
    print("Longest Palindromic Substring in xababayz is: ")
    text = "xababayz#zyababax$"
    suffix = SuffixTree(text, 9)
    suffix.build_suffix_tree()
    suffix.longest_palindromic_substring()

    size1 = 6
    print("Longest Palindromic Substring in xabax is: ")
    text = "xabax#xabax$"
    suffix = SuffixTree(text, 6)
    suffix.build_suffix_tree()
    suffix.longest_palindromic_substring()

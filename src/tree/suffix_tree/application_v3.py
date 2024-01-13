"""
Suffix Tree Application 3 - Longest Repeated Substring
Given a text string, find Longest Repeated Substring in the text. If there are more than one
Longest Repeated Substrings, get any one of them.

Longest Repeated Substring in GEEKSFORGEEKS is: GEEKS
Longest Repeated Substring in AAAAAAAAAA is: AAAAAAAAA
Longest Repeated Substring in ABCDEFG is: No repeated substring
Longest Repeated Substring in ABABABA is: ABABA
Longest Repeated Substring in ATCGATCGA is: ATCGA
Longest Repeated Substring in banana is: ana
Longest Repeated Substring in abcpqrabpqpq is: ab (pq is another LRS here)
This problem can be solved by different approaches with varying time and space complexities.
Here we will discuss Suffix Tree approach (3rd Suffix Tree Application). Other approaches will be
discussed soon.

    --- DIAGRAM-GOES-HERE ---

This is suffix tree for string "ABABABA$".
In this string, following substrings are repeated:
A, B, AB, BA, ABA, BAB, ABAB, BABA, ABABA
And Longest Repeated Substring is ABABA.

In a suffix tree, one node can't have more than one outgoing edge starting with same character,
and so if there are repeated substring in the text, they will share on same path and that path in
suffix tree will go through one or more internal node(s) down the tree (below the point where
substring ends on that path).
In above figure, we can see that

Path with Substring "A" has three internal nodes down the tree
Path with Substring "AB" has two internal nodes down the tree
Path with Substring "ABA" has two internal nodes down the tree
Path with Substring "ABAB" has one internal node down the tree
Path with Substring "ABABA" has one internal node down the tree
Path with Substring "B" has two internal nodes down the tree
Path with Substring "BA" has two internal nodes down the tree
Path with Substring "BAB" has one internal node down the tree
Path with Substring "BABA" has one internal node down the tree
All above substrings are repeated.

Substrings ABABAB, ABABABA, BABAB, BABABA have no internal node down the tree (after the point
where substring end on the path), and so these are not repeated.

==Can you see how to find longest repeated substring ?==
We can see in figure that, longest repeated substring will end at the internal node which is
farthest from the root (i.e. deepest node in the tree), because length of substring is the path
label length from root to that internal node.

So finding longest repeated substring boils down to finding the deepest node in suffix tree and
then get the path label from root to that deepest internal node.


----------------------------------------------------------------


In case of multiple LRS (As we see in last two test cases), this implementation prints the LRS
which comes 1st lexicographically.

Ukkonen's Suffix Tree Construction takes O(N) time and space to build suffix tree for a string of
length N and after that finding deepest node will take O(N).

So it is linear in time and space.

Followup questions:

Find all repeated substrings in given text
Find all unique substrings in given text
Find all repeated substrings of a given length
Find all unique substrings of a given length
In case of multiple LRS in text, find the one which occurs most number of times

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

        # suffix_index will be set to -1 by default and actual suffix index will be set later
        # for leaves at the end of all phases
        self.suffix_index = -1


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
                    # print(" [%d]" % n.suffix_index)
                    pass

                # Current node is not a leaf as it has outgoing edges from it.
                leaf = 0
                self.set_suffix_index_by_dfs(n.children[i],
                                             label_height + self.edge_length(n.children[i]))

        if leaf == 1:
            for i in range(n.start, n.end.value + 1):
                if self.text[i] == '#':  # Trim unwanted characters
                    n.end = Pointer(i)

            n.suffix_index = self.size - label_height
            # print(" [%d]" % n.suffix_index)

    def build_suffix_tree(self):
        """
        Build the suffix tree and print the edge labels along with suffix_index. suffix_index for
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

    def do_traversal(self, n, label_height, max_height, substring_start_index):
        if n is None:
            return

        if n.suffix_index == -1:  # If it is internal node
            for i in range(MAX_CHAR):
                if n.children[i] is not None:
                    self.do_traversal(n.children[i], label_height + self.edge_length(n.children[i]),
                                      max_height, substring_start_index)

        elif n.suffix_index > -1 and (max_height.value < label_height - self.edge_length(n)):
            max_height.value = label_height - self.edge_length(n)
            substring_start_index.value = n.suffix_index

    def longest_repeated_substring(self):
        max_height = Pointer(0)
        substring_start_index = Pointer(0)
        self.do_traversal(self.root, 0, max_height, substring_start_index)
        # print("max_height %d, substring_start_index %d" %
        #       (max_height.value, substring_start_index.value))
        print("Longest Repeated Substring in %s is: " % self.text)

        k = 0
        while k < max_height.value:
            print("%c" % self.text[k + substring_start_index.value], end="")
            k += 1

        if k == 0:
            print("No repeated substring")
        print("\n")


if __name__ == '__main__':
    text = "GEEKSFORGEEKS$"
    suffix = SuffixTree(text)
    suffix.build_suffix_tree()
    suffix.longest_repeated_substring()

    text = "AAAAAAAAAA$"
    suffix = SuffixTree(text)
    suffix.build_suffix_tree()
    suffix.longest_repeated_substring()

    text = "ABCDEFG$"
    suffix = SuffixTree(text)
    suffix.build_suffix_tree()
    suffix.longest_repeated_substring()

    text = "ABABABA$"
    suffix = SuffixTree(text)
    suffix.build_suffix_tree()
    suffix.longest_repeated_substring()

    text = "ATCGATCGA$"
    suffix = SuffixTree(text)
    suffix.build_suffix_tree()
    suffix.longest_repeated_substring()

    text = "banana$"
    suffix = SuffixTree(text)
    suffix.build_suffix_tree()
    suffix.longest_repeated_substring()

    text = "abcpqrabpqpq$"
    suffix = SuffixTree(text)
    suffix.build_suffix_tree()
    suffix.longest_repeated_substring()

    text = "pqrpqpqabab$"
    suffix = SuffixTree(text)
    suffix.build_suffix_tree()
    suffix.longest_repeated_substring()

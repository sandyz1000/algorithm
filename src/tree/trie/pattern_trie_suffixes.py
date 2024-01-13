"""
Pattern Searching using a Trie of all Suffixes

Problem Statement: Given a text txt[0..n-1] and a pattern pat[0..m-1], write a function search(char
pat[], char txt[]) that prints all occurrences of pat[] in txt[]. You may assume that n > m.

As discussed in the previous post, we discussed that there are two ways efficiently solve the above
problem.

1) Preprocess Pattern: KMP Algorithm, Rabin Karp Algorithm, Finite Automata, Boyer Moore Algorithm.

2) Preoprocess Text: Suffix Tree

The best possible time complexity achieved by first (preprocssing text) is O(n) and by second
(preprocessing pattern) is O(m) where m and n are lengths of pattern and text respectively.

Note that the second way does the searching only in O(m) time and it is preferred when text doesn't
change very frequently and there are many search queries. We have discussed Suffix Tree
(A compressed Trie of all suffixes of Text) .

Implementation of Suffix Tree may be time consuming for problems to be coded in a technical
interview or programming contexts. In this post simple implementation of a Standard Trie of all
Suffixes is discussed. The implementation is close to suffix tree, the only thing is, it's a simple
Trie instead of compressed Trie.

As discussed in Suffix Tree post, the idea is, every pattern that is present in text (or we can say
every substring of text) must be a prefix of one of all possible suffixes. So if we build a Trie of
all suffixes, we can find the pattern in O(m) time where m is pattern length.

Building a Trie of Suffixes
1) Generate all suffixes of given text.
2) Consider all suffixes as individual words and build a trie.

Let us consider an example text "banana\0" where '\0' is string termination character. Following are
all suffixes of "banana\0"

    banana\0
    anana\0
    nana\0
    ana\0
    na\0
    a\0
    \0

If we consider all of the above suffixes as individual words and build a Trie, we get following.

    --- DIAGRAM-GOES-HERE----

===How to search a pattern in the built Trie?===
Following are steps to search a pattern in the built Trie.
1)  Starting from the first character of the pattern and root of the Trie, do following for every
    character.
    a) For the current character of pattern, if there is an edge from the current node, follow the
    edge.
    b) If there is no edge, print "pattern doesn't exist in text" and return.

2)  If all characters of pattern have been processed, i.e., there is a path from root for
    characters of the given pattern, then print print all indexes where pattern is present. To
    store indexes, we use a list with every node that stores indexes of suffixes starting at the
    node. """

from __future__ import print_function
from collections import defaultdict


# Time Complexity of the above search function is O(m+k) where m is length of the pattern and
#  k is the number of occurrences of pattern in text.


class SuffixTrieNode:
    MAX_CHAR = 256

    def __init__(self):
        # Create an empty linked list for indexes of suffixes starting from this node
        self.indexes = []
        self.children = defaultdict(lambda: None)
        # Initialize all child pointers as NULL

    def insert_suffix(self, m_string, index):
        """
        A recursive function to insert a suffix of the text in subtree rooted with this node"""
        # Store index in linked list
        self.indexes.append(index)

        # If string has more characters
        if len(m_string) > 0:
            # Find the first character
            cIndex = m_string[0]

            # If there is no edge for this character, add a new edge
            if self.children[cIndex] is None:
                self.children[cIndex] = SuffixTrieNode()

            # Recur for next suffix
            self.children[cIndex].insert_suffix(m_string[1:], index + 1)

    def search(self, m_string):
        """
        A function to search a pattern in subtree rooted with this node.The function returns
        pointer to a linked list containing all indexes where pattern is present. The returned
        indexes are indexes of last characters of matched text."""

        # If all characters of pattern have been processed,
        if len(m_string) == 0:
            return self.indexes

        # if there is an edge from the current node of suffix tree, follow the edge.
        if self.children[m_string[0]] is not None:
            return (self.children[m_string[0]]).search(m_string[1:])

        else:  # If there is no edge, pattern doesnt exist in text
            return None


class SuffixTree(object):
    """A Trie of all suffixes"""

    # SuffixTrieNode root = new SuffixTrieNode();

    def __init__(self, txt=""):
        """
        Constructor (Builds a trie of suffies of the given text). Consider all suffixes of
        given string and insert them into the Suffix Trie using recursive function insertSuffix()
        in SuffixTrieNode class """
        self.root = SuffixTrieNode()
        for i in range(len(txt)):
            self.root.insert_suffix(txt[i:], i)

    def search_tree(self, pat):
        """Prints all occurrences of pat in the Suffix Trie S (built for text)"""
        # Let us call recursive search function for root of Trie. We get a list of all indexes (
        # where pat is present in text) in variable 'result'
        result = self.root.search(pat)

        # Check if the list of indexes is empty or not
        if result is None:
            print("Pattern not found")
        else:
            patLen = len(pat)
            for i in result:
                print("Pattern found at position %d" % (i - patLen))


if __name__ == '__main__':
    # Let us build a suffix trie for text "geeksforgeeks.org"
    # Output:
    # Search for 'ee'
    # Pattern found at position 1
    # Pattern found at position 9
    #
    # Search for 'geek'
    # Pattern found at position 0
    # Pattern found at position 8
    #
    # Search for 'quiz'
    # Pattern not found
    #
    # Search for 'forgeeks'
    # Pattern found at position 5

    txt = "geeksforgeeks.org"
    S = SuffixTree(txt)

    print("Search for 'ee'")
    S.search_tree("ee")

    print("\nSearch for 'geek'")
    S.search_tree("geek")

    print("\nSearch for 'quiz'")
    S.search_tree("quiz")

    print("\nSearch for 'forgeeks'")
    S.search_tree("forgeeks")

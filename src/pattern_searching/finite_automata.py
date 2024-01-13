"""
Searching for Patterns | Set 5 (Finite Automata)

Given a text txt[0..n-1] and a pattern pat[0..m-1], write a function search(char pat[], char txt[]) 
that prints all occurrences of pat[] in txt[]. You may assume that n > m.

Examples:

Input:  txt[] = "THIS IS A TEST TEXT"
        pat[] = "TEST"
Output: Pattern found at index 10

Input:  txt[] =  "AABAACAADAABAABA"
        pat[] =  "AABA"
Output: Pattern found at index 0
        Pattern found at index 9
        Pattern found at index 12

In this post, we will discuss Finite Automata (FA) based pattern searching algorithm. In FA based
algorithm, we preprocess the pattern and build a 2D array that represents a Finite Automata.
Construction of the FA is the main tricky part of this algorithm. Once the FA is built,
the searching is simple. In search, we simply need to start from the first state of the automata
and the first character of the text. At every step, we consider next character of text, look for
the next state in the built FA and move to a new state. If we reach the final state, then the
pattern is found in the text. The time complexity of the search process is O(n).
Before we discuss FA construction, let us take a look at the following FA for pattern ACACAGA.


        [state, A,  C,  G,  T
            0,  1,  0,  0,  0
            1,  1,  2,  0,  0
            2,  3,  0,  0,  0,
            3,  1,  4,  0,  0
            4,  5,  0,  0,  0
            5,  1,  4,  6,  0
            6,  7,  0,  0,  0
            7,  1,  2,  0,  0]


The above diagrams represent graphical and tabular representations of pattern ACACAGA.

Number of states in FA will be M+1 where M is length of the pattern. The main thing to construct
FA is to get the next state from the current state for every possible character. Given a
character x and a state k, we can get the next state by considering the string "pat[0..k-1]x"
which is basically concatenation of pattern characters pat[0], pat[1] .... pat[k-1] and the
character x. The idea is to get length of the longest prefix of the given pattern such that the
prefix is also suffix of "pat[0..k-1]x". The value of length gives us the next state. For
example, let us see how to get the next state from current state 5 and character 'C' in the above
diagram. We need to consider the string, "pat[0..4]C" which is "ACACAC". The length of the
longest prefix of the pattern such that the prefix is suffix of "ACACAC"is 4 ("ACAC"). So the
next state (from state 5) is 4 for character 'C'.

In the following code, computeTF() constructs the FA. The time complexity of the computeTF() is
O(m^3*NO_OF_CHARS) where m is length of the pattern and NO_OF_CHARS is size of alphabet (total
number of possible characters in pattern and text). The implementation tries all possible
prefixes starting from the longest possible that can be a suffix of "pat[0..k-1]x". There are
better implementations to construct FA in O(m*NO_OF_CHARS) (Hint: we can use something like lps
array construction in KMP algorithm). We have covered the better implementation in our next post
on pattern searching.

---------------------------------------------------
Pattern Searching | Set 6 (Efficient Construction of Finite Automata)

In the previous post, we discussed Finite Automata based pattern searching algorithm. The FA (
Finite Automata) construction method discussed in previous post takes O((m^3)*NO_OF_CHARS) time.
FA can be constructed in O(m*NO_OF_CHARS) time. In this post, we will discuss the O(
m*NO_OF_CHARS) algorithm for FA construction. The idea is similar to lps (longest prefix suffix)
array construction discussed in the KMP algorithm. We use previously filled rows to fill a new
row.

The abvoe diagrams represent graphical and tabular representations of pattern ACACAGA.

Algorithm:

1) Fill the first row. All entries in first row are always 0 except the entry for pat[0]
character. For pat[0] character, we always need to go to state 1.
2) Initialize lps as 0. lps for the first index is always 0.
3) Do following for rows at index i = 1 to M. (M is the length of the pattern)
    a) Copy the entries from the row at index equal to lps.
    b) Update the entry for pat[i] character to i+1.
    c) Update lps "lps = TF[lps][pat[i]]" where TF is the 2D array which is being constructed.

"""
from __future__ import print_function
# Python program for Finite Automata Pattern searching Algorithm

NO_OF_CHARS = 256


def getNextState(pat, M, state, x):
    """calculate the next state Ex. ACACAGA."""

    # If the character c is same as next character in pattern, then simply increment state
    if state < M and x == ord(pat[state]):
        return state + 1

    i = 0
    # ns stores the result which is next state

    # ns finally contains the longest prefix which is also suffix in "pat[0..state-1]c"

    # Start from the largest possible value and stop when you find a prefix which is also suffix
    for ns in range(state, 0, -1):
        if ord(pat[ns - 1]) == x:
            for i in range(ns - 1):
                if pat[i] != pat[state - ns + 1 + i]:
                    break
            if i == ns - 1:
                return ns
    return 0


def computeTF(pat, M):
    """
    This function builds the TF table which represents Finite Automata for a given pattern """
    TF = [[0 for i in range(NO_OF_CHARS)] for _ in range(M + 1)]

    for state in range(M + 1):
        for x in range(65, NO_OF_CHARS):
            z = getNextState(pat, M, state, x)
            TF[state][x] = z

    return TF


def search(pat, txt):
    """Prints all occurrences of pat in txt"""
    M = len(pat)
    N = len(txt)
    TF = computeTF(pat, M)

    # Process txt over FA.
    state = 0
    for i in range(N):
        state = TF[state][ord(txt[i])]
        if state == M:
            print("Pattern found at index: {}".format(i - M + 1))


def computeTransFun(pat, M, TF):
    """
    This function builds the TF table which represents Finite Automata for a given pattern

    Time Complexity for FA construction is O(M*NO_OF_CHARS). The code for search is same as the
    previous post and time complexity for it is O(n).

    :param pat: int
    :param M: int
    :param TF: List[List[int]]
    :return:
    """
    i, lps = 0, 0

    # Fill entries in first row
    for x in range(NO_OF_CHARS):
        TF[0][x] = 0

    TF[0][ord(pat[0])] = 1

    # Fill entries in other rows
    for i in range(1, M + 1):
        # Copy values from row at index lps
        for x in range(NO_OF_CHARS):
            TF[i][x] = TF[lps][x]

        # Update the entry corresponding to this character
        TF[i][ord(pat[i])] = i + 1

        # Update lps for next row to be filled
        if i < M:
            lps = TF[lps][ord(pat[i])]


def search2(pat, txt):
    """
    Prints all occurrences of pat in txt
    :param pat: char*
    :param txt: char*
    :return:
    """
    M = len(pat)
    N = len(txt)

    TF = [[0 for j in range(NO_OF_CHARS)] for i in range(M + 1)]

    computeTransFun(pat, M, TF)

    # process text over FA.
    i, j = 0, 0
    for i in range(N):
        j = TF[j][txt[i]]
        if j == M:
            print("\n pattern found at index %d" % (i - M + 1))


if __name__ == "__main__":
    # TODO: Fix output
    # Output:
    # Pattern found at index 0
    # Pattern found at index 9
    # Pattern found at index 13
    txt = "AABAACAADAABAAABAA"
    pat = "AABA"
    search(pat, txt)

    txt = "GEEKS FOR GEEKS"
    pat = "GEEKS"
    # search2(pat, txt)

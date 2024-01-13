"""
Pattern Searching | Set 7 (Boyer Moore Algorithm - Bad Character Heuristic)

Pattern searching is an important problem in computer science. When we do search for a string in
notepad/word file or browser or database, pattern searching algorithms are used to show the search
results. A typical problem statement would be-

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

--------------------------------------
Explanation:
--------------------------------------

Boyer Moore is a combination of following two approaches.
1) Bad Character Heuristic
2) Good Suffix Heuristic

Both of the above heuristics can also be used independently to search a pattern in a text. Let us 
first understand how two independent approaches work together in the Boyer Moore algorithm. If we 
take a look at the Naive algorithm, it slides the pattern over the text one by one. KMP algorithm 
does pre processing over the pattern so that the pattern can be shifted by more than one. The 
Boyer Moore algorithm does pre processing for the same reason. It pre processes the pattern and 
creates different arrays for both heuristics. At every step, it slides the pattern by max of the 
slides suggested by the two heuristics. So it uses best of the two heuristics at every step. 
Unlike the previous pattern searching algorithms, Boyer Moore algorithm starts matching from the 
last character of the pattern. 

Bad Character Heuristic

The idea of bad character heuristic is simple. The character of the text which doesn't match with 
the current character of pattern is called the Bad Character. Upon mismatch we shift the pattern 
until -
1) The mismatch become a match
2) Pattern P move past the mismatch character.
------------------------------------------------------------

Case 1 - Mismatch become match We will lookup the position of last occurrence of mismatching
character in pattern and if mismatching character exist in pattern then we'll shift the pattern 
such that it get aligned to the mismatching character in text T. 

Explanation: In the above example, we got a mismatch at position 3. Here our mismatching 
character is "A". Now we will search for last occurrence of "A" in pattern. We got "A" at position 
1 in pattern (displayed in Blue) and this is the last occurrence of it. Now we will shift pattern 
2 times so that "A" in pattern get aligned with "A" in text. 
------------------------------------------------------------

Case 2 - Pattern move past the
mismatch character We'll lookup the position of last occurrence of mismatching character in 
pattern and if character does not exist we will shift pattern past the mismatching character. 

Explanation: Here we have a mismatch at position 7. The mismatching character "C" does not exist 
in pattern before position 7 so we'll shift pattern past to the position 7 and eventually in 
above example we have got a perfect match of pattern (displayed in Green). We are doing this 
because, "C" do not exist in pattern so at every shift before position 7 we will get mismatch and 
our search will be fruitless. 
------------------------------------------------------------

REFER DIAGRAM
http://www.geeksforgeeks.org/pattern-searching-set-7-boyer-moore-algorithm-bad-character-heuristic/

The Bad Character Heuristic may take O(mn) time in worst case. The worst case occurs when all 
characters of the text and pattern are same. For example, txt[] = "AAAAAAAAAAAAAAAAAA" and 
pat[] = "AAAAA". 
"""
from __future__ import unicode_literals, print_function

# NO_OF_CHARS = 256
NO_OF_CHARS = 58


def bad_char_heuristic(string, size):
    """
    The pre processing function for Boyer Moore's bad character heuristic
    """

    # Initialize all occurence as -1
    bad_char = [-1] * NO_OF_CHARS

    # Fill the actual value of last occurrence
    for i in range(size):
        bad_char[ord(string[i]) - 65] = i

    # return initialized list
    return bad_char


def search(txt, pat):
    """
    A pattern searching function that uses Bad Character Heuristic of Boyer Moore Algorithm
    """
    m = len(pat)
    n = len(txt)

    # create the bad character list by calling the pre processing function badCharHeuristic()
    # for given pattern
    bad_char = bad_char_heuristic(pat, m)

    # s is shift of the pattern with respect to text
    s = 0
    while s <= n - m:
        j = m - 1

        # Keep reducing index j of pattern while characters of pattern and text are matching
        # at this shift s
        while j >= 0 and pat[j] == txt[s + j]:
            j -= 1

        # If the pattern is present at current shift, then index j will become -1 after the
        # above loop
        if j < 0:
            print("Pattern occur at shift = {}".format(s))

            # Shift the pattern so that the next character in text aligns with the last
            # occurrence of it in pattern. The condition s+m < n is necessary for the case when
            # pattern occurs at the end of text

            s += (m - bad_char[ord(txt[s + m]) - 65] - 1 if s + m < n else 1)
        else:
            # Shift the pattern so that the bad character in text aligns with the last
            # occurrence of it in pattern. The max function is used to make sure that we get
            # a positive shift. We may get a negative shift if the last occurrence of bad
            # character in pattern is on the right side of the current character.
            s += max(1, j - bad_char[ord(txt[s + j]) - 65])


if __name__ == '__main__':
    # Output: Pattern occur at shift = 4
    txt = "ABAAABCDADG"
    pat = "ABC"
    # txt = "GCAATGCCTATGTGACC"
    # pat = "TATGTG"
    search(txt, pat)

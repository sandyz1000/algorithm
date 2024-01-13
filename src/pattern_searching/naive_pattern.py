"""
Searching for Patterns | Set 1 (Naive Pattern Searching)

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

Pattern searching is an important problem in computer science. When we do search for a string in
notepad/word file or browser or database, pattern searching algorithms are used to show the
search results.

-------------------------------------------------------
Searching for Patterns | Set 4 (A Naive Pattern Searching Question)
http://www.geeksforgeeks.org/pattern-searching-set-4-a-naive-string-matching-algo-question/

Question: We have discussed Naive String matching algorithm here. Consider a situation where all
characters of pattern are different. Can we modify the original Naive String Matching algorithm
so that it works better for these types of patterns. If we can, then what are the changes to
original algorithm?

Solution: In the original Naive String matching algorithm , we always slide the pattern by 1.
When all characters of pattern are different, we can slide the pattern by more than 1. Let us see
how can we do this. When a mismatch occurs after j matches, we know that the first character of
pattern will not match the j matched characters because all characters of pattern are different.
So we can always slide the pattern by j without missing any valid shifts. Following is the
modified code that is optimized for the special patterns.

"""


# Python program for Naive Pattern Searching
def search(pat, txt):
    M = len(pat)
    N = len(txt)

    # A loop to slide pat[] one by one
    for i in range(N - M + 1):

        # For current index i, check for pattern match
        for j in range(M):
            if txt[i + j] != pat[j]:
                break
            if j == M - 1:  # if pat[0...M-1] = txt[i, i+1, ...i+M-1]
                print("Pattern found at index " + str(i))


if __name__ == '__main__':
    txt = "AABAACAADAABAAABAA"
    pat = "AABA"

    # Second part
    txt = "ABCEABCDABCEABCD"
    pat = "ABCD"
    search(pat, txt)

"""
Pattern Searching | Set 8 (Suffix Tree Introduction)

Given a text txt[0..n-1] and a pattern pat[0..m-1], write a function search(char pat[], char txt[])
that prints all occurrences of pat[] in txt[]. You may assume that n > m.

http://www.geeksforgeeks.org/pattern-searching-set-8-suffix-tree-introduction/

Suffix tree can be built by chaining node with single child

A suffix array is a sorted array of all suffixes of a given string. The definition is similar
to Suffix Tree which is compressed trie of all suffixes of the given text. Any suffix tree based 
algorithm can be replaced with an algorithm that uses a suffix array enhanced with additional
information and solves the same problem in the same time complexity (Source Wiki). A suffix array
can be constructed from Suffix tree by doing a DFS traversal of the suffix tree. In fact Suffix 
array and suffix tree both can be constructed from each other in linear time. Advantages of
suffix arrays over suffix trees include improved space requirements, simpler linear time 
construction algorithms (e.g., compared to Ukkonen's algorithm) and improved cache locality

A suffix array can be constructed from Suffix tree by doing a DFS traversal of the suffix
tree. In fact Suffix array and suffix tree both can be constructed from each other in linear time

Let the given string be "banana".

0 banana                          5 a
1 anana     Sort the Suffixes     3 ana
2 nana      ---------------->     1 anana  
3 ana        alphabetically       0 banana  
4 na                              4 na   
5 a                               2 nana

So the suffix array for "banana" is [5, 3, 1, 0, 4, 2]

A suffix array based search function to search a given pattern 'pat' in given text 'txt' using
suffix array suffArr[]

"""
from __future__ import print_function
from functools import cmp_to_key


class Suffix(object):
    def __init__(self, index=0, suff=None):
        self.index = index
        self.suff = suff


def cmp(a, b):
    return -1 if a.suff < b.suff else 1


def search(pat, txt, suff_arr, n):
    """
    Search a pattern using the built Suffix Array

    To search a pattern in a text, we pre-process the text and build a suffix array of the text.
    Since we have a sorted array of all suffixes, Binary Search can be used to search. Following
    is the search function. Note that the function doesn't report all occurrences of pattern,
    it only report one of them.

    The time complexity of the above search function is O(mLogn). There are more efficient
    algorithms to search pattern once the suffix array is built. In fact there is a O(m) suffix
    array based algorithm to search a pattern. We will soon be discussing efficient algorithm for
    search.

    Do simple binary search for the pat in txt using the built suffix arr

    :param pat: str
    :param txt: str
    :param suff_arr: List[int]
    :param n: int
    :return: 
    """
    m = len(pat)  # get length of pattern, needed for strncmp()
    l, r = 0, n - 1
    while l <= r:
        mid = l + (r - 1) // 2

        res = txt[suff_arr[mid]:] == pat
        # If match found at the middle, print it and return
        if res:
            print("Pattern found at index ", suff_arr[mid])

        # Move to left half if pattern is alphabetically less than the mid suffix
        if txt[suff_arr[mid]:] > pat:
            r = mid - 1
        else:
            l = mid + 1
    print("Pattern not found")


def build_suffix_array(txt, n):
    """
    Naive method to build Suffix Array
    A simple method to construct suffix array is to make an array of all suffixes and then sort
    the array. Following is implementation of simple method.

    The time complexity of above method to build suffix array is O(n^2Logn) if we consider a
    O(nLogn) algorithm used for sorting. The sorting step itself takes O(n^2Logn) time as every
    comparison is a comparison of two strings and the comparison takes O(n) time.

    There are many efficient algorithms to build suffix array. We will soon be covering them as
    separate posts.

    return  suffixArr;

    :param txt: str
    :param n: int
    :return: 
    """
    # Store suffixes and their indexes in an arr of structures. The structure is needed to sort
    # the suffixes alphabetically and maintain their old indexes while sorting
    suffixes = [Suffix(i, txt[i:]) for i, v in enumerate(txt)]

    # Sort the suffixes using the comparison function defined above.
    suffixes = sorted(suffixes, key=cmp_to_key(cmp))
    suffix_arr = [item.index for item in suffixes]
    return suffix_arr


if __name__ == "__main__":
    txt = "banana"
    pat = "nan"
    n = len(txt)
    suff_arr = build_suffix_array(txt, n)
    print(suff_arr)
    # search pat in txt using the built suffix arr
    search(pat, txt, suff_arr, n)

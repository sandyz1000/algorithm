"""
How to Implement Forward DNS Look Up Cache?

We have discussed implementation of Reverse DNS Look Up Cache. Forward DNS look up is getting IP
address for a given domain name typed in the web browser.

The cache should do the following operations :
1. Add a mapping from URL to IP address
2. Find IP address for a given URL.

There are a few changes from reverse DNS look up cache that we need to incorporate.

1. Instead of [0-9] and (.) dot we need to take care of [A-Z], [a-z] and (.) dot. As most of the
domain name contains only lowercase characters we can assume that there will be [a-z] and (.) 27
children for each trie node.

2. When we type www.google.in and google.in the browser takes us to the same page. So, we need to
add a domain name into trie for the words after www(.). Similarly while searching for a domain
name corresponding IP address remove the www(.) if the user has provided it.

This is left as an exercise and for simplicity we have taken care of www. also.

One solution is to use Hashing. In this post, a Trie based solution is discussed. One advantage
of Trie based solutions is, worst case upper bound is O(1) for Trie, for hashing, the best
possible average case time complexity is O(1). Also, with Trie we can implement prefix search
(finding all IPs for a common prefix of URLs). The general disadvantage of Trie is large amount of
memory requirement.

The idea is to store URLs in Trie nodes and store the corresponding IP address in last or leaf node.

"""
from __future__ import print_function

# Python based program to implement reverse DNS lookup

# There are atmost 27 different chars in a valid URL assuming URL consists [a-z] and (.)
CHARS = 27

# Maximum length of a valid URL
MAX = 100


class TrieNode(object):
    def __init__(self):
        self.isLeaf = False
        self.ipAdd = None
        self.child = [None] * CHARS


class Trie(object):
    def __init__(self, root=None):
        self.root = root

    def get_index(self, c):
        """A utility function to find index of child for a given character 'c'"""
        return 26 if (c == '.') else (ord(c) - ord('a'))

    def get_char_from_index(self, i):
        """A utility function to find character for a given child index."""
        return '.' if (i == 26) else chr(ord('a') + i)

    def insert(self, URL, ip_add):
        """
        This method inserts a URL and corresponding IP address in the trie. The last node in Trie
        contains the ip address.

        """
        # Length of the URL
        length = len(URL)
        p_crawl = self.root

        # Traversing over the length of the URL.
        for level in range(length):
            # Get index of child node from current character in URL[] Index must be from 0 to 26
            # where 0 to 25 is used for alphabets and 26 for dot
            index = self.get_index(URL[level])

            # Create a new child if not exist already
            if not p_crawl.child[index]:
                p_crawl.child[index] = TrieNode()

            # Move to the child
            p_crawl = p_crawl.child[index]

        # Below needs to be carried out for the last node.
        # Save the corresponding ip address of the URL in the last node of trie.
        p_crawl.isLeaf = True
        p_crawl.ipAdd = ip_add

    def search_dns_cache(self, URL):
        """
        This function returns IP address if given URL is present in DNS cache. Else returns NULL

        :param URL:
        :return:
        """
        # Root node of trie.
        pCrawl = self.root
        length = len(URL)

        # Traversal over the length of URL.
        for level in range(length):
            index = self.get_index(URL[level])
            if not pCrawl.child[index]:
                return None
            pCrawl = pCrawl.child[index]

        # If we find the last node for a given ip address, print the ip address.
        if pCrawl is not None and pCrawl.isLeaf:
            return pCrawl.ipAdd

        return None


if __name__ == '__main__':
    # Output:
    # Forward DNS look up resolved in cache:
    # www.samsung.com --> 107.108.11.123

    URL = ["www.samsung.com", "www.samsung.net", "www.google.in"]
    ipAdd = ["107.108.11.123", "107.109.123.255", "74.125.200.106"]
    n = len(URL)
    root = TrieNode()
    trie = Trie(root)
    # Inserts all the domain name and their corresponding ip address

    for i in range(n):
        trie.insert(URL[i], ipAdd[i])

    # If forward DNS look up succeeds print the url along with the resolved ip address.
    url = "www.samsung.com"
    res_ip = trie.search_dns_cache(url)
    if res_ip is not None:
        print("Forward DNS look up resolved in cache:\n%s --> %s" % (url, res_ip))
    else:
        print("Forward DNS look up not resolved in cache ")

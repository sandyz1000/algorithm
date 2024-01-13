"""
How to Implement Reverse DNS Look Up Cache?
Reverse DNS look up is using an internet IP address to find a domain name. For example, if you
type 74.125.200.106 in browser, it automatically redirects to google.in.

How to implement Reverse DNS Look Up cache? Following are the operations needed from cache.
1) Add a IP address to URL Mapping in cache.
2) Find URL for a given IP address.

One solution is to use Hashing.

In this post, a Trie based solution is discussed. One advantage of Trie based solutions is,
worst case upper bound is O(1) for Trie, for hashing, the best possible average case time
complexity is O(1). Also, with Trie we can implement prefix search (finding all urls for a
common prefix of IP addresses).

The general disadvantage of Trie is large amount of memory requirement, this is not a major
problem here as the alphabet size is only 11 here. Ten characters are needed for digits from '0'
to '9' and one for dot ('.').

The idea is to store IP addresses in Trie nodes and in the last node we store the corresponding
domain name.

Note that the above implementation of Trie assumes that the given IP address does not contain
characters other than {'0', '1', ... '9', '.'}. What if a user gives an invalid IP address that
contains some other characters? This problem can be resolved by validating the input IP address
before inserting it into Trie. We can use the approach discussed here for IP address validation.

"""

# Python based program to implement reverse DNS lookup

# There are atmost 11 different chars in a valid IP address
CHARS = 11

# Maximum length of a valid IP address
MAX = 50


class TrieNode:
    def __init__(self):
        self.isLeaf = False
        self.URL = None
        self.child = [None] * CHARS


class Trie:
    def __init__(self, root=None):
        self.root = root

    def get_index(self, c):
        """A utility function to find index of child for a given character 'c'"""
        return 10 if (c == '.') else (ord(c) - ord('0'))

    def get_char_from_index(self, i):
        """A utility function to find character for a given child index."""
        return "." if (i == 10) else chr(ord('0') + i)

    def insert(self, ip_add, URL):
        """
        This method inserts an ip address and the corresponding domain name in the trie.
        The last node in Trie contains the URL.

        :param root:
        :param ip_add: str
        :param URL: str
        :return:
        """
        # Length of the ip address
        length = len(ip_add)
        p_crawl = self.root

        # Traversing over the length of the ip address.
        for level in range(length):
            # Get index of child node from current character in ipAdd[]. Index must be
            # from 0 to 10 where 0 to 9 is used for digits and 10 for dot
            index = self.get_index(ip_add[level])

            # Create a new child if not exist already
            if not p_crawl.child[index]:
                p_crawl.child[index] = TrieNode()

            # Move to the child
            p_crawl = p_crawl.child[index]

        # Below needs to be carried out for the last node.
        # Save the corresponding URL of the ip address in the //last node of trie.
        p_crawl.isLeaf = True
        p_crawl.URL = URL

    def search_dns_cache(self, ipAdd):
        """
        This function returns URL if given IP address is present in DNS cache.
        Else returns NULL
        """
        p_crawl = self.root
        length = len(ipAdd)

        # Traversal over the length of ip address.
        for level in range(length):
            index = self.get_index(ipAdd[level])
            if not p_crawl.child[index]:
                return None
            p_crawl = p_crawl.child[index]

        # If we find the last node for a given ip address, print the URL.
        if p_crawl is not None and p_crawl.isLeaf:
            return p_crawl.URL

        return None


if __name__ == '__main__':
    # Output:
    # Reverse DNS look up resolved in cache:
    # 107.108.11.123 --> www.samsung.com

    # Change third ipAddress for validation
    ipAdd = ["107.108.11.123", "107.109.123.255", "74.125.200.106"]
    URL = ["www.samsung.com", "www.samsung.net", "www.google.in"]
    n = len(ipAdd)
    root = TrieNode()
    trie = Trie(root)
    # Inserts all the ip address and their corresponding domain name after ip address validation.
    for i in range(n):
        trie.insert(ipAdd[i], URL[i])

    # If reverse DNS look up succeeds print the domain name along with DNS resolved.
    ip = "107.108.11.123"
    res_url = trie.search_dns_cache(ip)

    if res_url is not None:
        print("Reverse DNS look up resolved in cache:\n%s --> %s" % (ip, res_url))
    else:
        print("Reverse DNS look up not resolved in cache ")

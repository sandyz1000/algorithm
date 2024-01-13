"""
Trie | (Insert and Search)

Trie is an efficient information retrieval data structure. Using Trie, search complexities can be
brought to optimal limit (key length). If we store keys in binary search tree, a well balanced
BST will need time proportional to M * log N, where M is maximum string length and N is number of
keys in tree. Using Trie, we can search the key in O(M) time. However the penalty is on Trie
storage requirements.

Every node of Trie consists of multiple branches. Each branch represents a possible character of
keys. We need to mark the last node of every key as end of word node. A Trie node field
isEndOfWord is used to distinguish the node as end of word node. A simple structure to represent
nodes of English alphabet can be as following,

# Trie node
class TrieNode:
    def __init__(self):
        self.children = [None] * ALPHABET_SIZE;  # TrieNode
        # isEndOfWord is true if the node represents end of a word
        self.isEndOfWord = False

Inserting a key into Trie is simple approach. Every character of input key is inserted as an
individual Trie node. Note that the children is an array of pointers (or references) to next
level trie nodes. The key character acts as an index into the array children. If the input key is
new or an extension of existing key, we need to construct non-existing nodes of the key,
and mark end of word for last node. If the input key is prefix of existing key in Trie, we simply
mark the last node of key as end of word. The key length determines Trie depth.

Searching for a key is similar to insert operation, however we only compare the characters and
move down. The search can terminate due to end of string or lack of key in trie. In the former
case, if the isEndofWord field of last node is true, then the key exists in trie. In the second
case, the search terminates without examining all the characters of key, since the key is not
present in trie.

The following picture explains construction of trie using keys given in the example below,

                       root
                    /   \    \
                    t   a     b
                    |   |     |
                    h   n     y
                    |   | \   |
                    e   s  y  e
                  / |   |
                 i  r   w
                 |  |   |
                 r  e   e
                        |
                        r

In the picture, every character is of type trie_node_t. For example, the root is of type
trie_node_t, and it's children a, b and t are filled, all other nodes of root will be NULL.
Similarly, "a" at the next level is having only one child ("n"), all other children are NULL. The
leaf nodes are in blue.

Insert and search costs O(key_length), however the memory requirements of Trie is O(ALPHABET_SIZE
* key_length * N) where N is number of keys in Trie. There are efficient representation of trie
nodes (e.g. compressed trie, ternary search tree, etc.) to minimize memory requirements of trie.

"""


# Python program for insert and search operation in a Trie


class TrieNode(object):
    # Trie node class
    def __init__(self):
        self.children = [None] * 26

        # isLeaf is True if node represent the end of the word
        self.isLeaf = False


class Trie(object):
    # Trie data structure class
    def __init__(self):
        self.root: TrieNode = self.get_node()

    def get_node(self) -> TrieNode:
        # Returns new trie node (initialized to NULLs)
        return TrieNode()

    def char_to_index(self, ch):
        # private helper function
        # Converts key current character into index
        # use only 'a' through 'z' and lower case

        return ord(ch) - ord('a')

    def insert(self, key: str):

        # If not present, inserts key into trie
        # If the key is prefix of trie node,
        # just marks leaf node
        p_crawl = self.root
        for level in range(len(key)):
            index = self.char_to_index(key[level])

            # if current character is not present
            if not p_crawl.children[index]:
                p_crawl.children[index] = self.get_node()
            p_crawl = p_crawl.children[index]

        # mark last node as leaf
        p_crawl.isLeaf = True

    def search(self, key: str):
        # Search key in the trie
        # Returns true if key presents in trie, else false
        p_crawl = self.root
        for level in range(len(key)):
            index = self.char_to_index(key[level])
            if not p_crawl.children[index]:
                return False
            p_crawl = p_crawl.children[index]

        return p_crawl and p_crawl.isLeaf  # return True


def main():
    # Output :
    # the --- Present in trie
    # these --- Not present in trie
    # their --- Present in trie
    # thaw --- Not present in trie

    # Input keys (use only 'a' through 'z' and lower case)
    keys = ["the", "a", "there", "answer", "any", "by", "their"]
    output = ["Not present in trie", "Present in tire"]

    # Trie object
    t = Trie()

    # Construct trie
    for key in keys:
        t.insert(key)

    # Search for different keys
    print("{} ---- {}".format("the", output[t.search("the")]))
    print("{} ---- {}".format("these", output[t.search("these")]))
    print("{} ---- {}".format("their", output[t.search("their")]))
    print("{} ---- {}".format("thaw", output[t.search("thaw")]))


if __name__ == '__main__':
    main()
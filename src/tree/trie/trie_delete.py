"""
Trie | (Delete)
http://www.geeksforgeeks.org/trie-delete/

In the previous post on trie we have described how to insert and search a node in trie. Here is an
algorithm how to delete a node from trie.

During delete operation we delete the key in bottom up manner using recursion. The following are
possible conditions when deleting key from trie,

1.  Key may not be there in trie. Delete operation should not modify trie.
2.  Key present as unique key (no part of key contains another key (prefix), nor the key itself is
    prefix of another key in trie). Delete all the nodes.
3.  Key is prefix key of another long key in trie. Unmark the leaf node.
4.  Key present in trie, having at least one other key as prefix key. Delete nodes from end of key
    until first leaf node of longest prefix key.


The highlighted code presents algorithm to implement above conditions. (One may be in dilemma how
a pointer passed to delete helper is reflecting changes from deleteHelper to deleteKey. Note that
we are holding trie as an ADT in trie_t node, which is passed by reference or pointer).

"""


# Python program for delete operation in a Trie

class TrieNode(object):
    """
    Trie node class
    """

    def __init__(self):
        self.children = [None] * 26

        # non zero if leaf
        self.value = 0

    def leaf_node(self):
        """
        Check if node is leaf node or not
        """
        return self.value != 0

    def is_it_free_node(self):
        """
        If node have no children then it is free
        If node have children return False else True
        """
        for c in self.children:
            if c:
                return False
        return True


class Trie(object):
    """
    Trie data structure class
    """

    def __init__(self):
        self.root = self.get_node()

        # keep count on number of keys inserted in trie
        self.count = 0

    def get_index(self, ch):
        """
        private helper function
        Converts key current character into index
        use only 'a' through 'z' and lower case
        """
        return ord(ch) - ord('a')

    def get_node(self):
        """
        Returns new trie node (initialized to NULLs)
        """
        return TrieNode()

    def insert(self, key):
        """
        If not present, inserts key into trie
        If the key is prefix of trie node,mark
        it as leaf(non zero)
        """
        length = len(key)
        pCrawl = self.root
        self.count += 1

        for level in range(length):
            index = self.get_index(key[level])

            if pCrawl.children[index]:
                # skip current node
                pCrawl = pCrawl.children[index]
            else:
                # add new node
                pCrawl.children[index] = self.get_node()
                pCrawl = pCrawl.children[index]

        # mark last node as leaf (non zero)
        pCrawl.value = self.count

    def search(self, key):
        """
        Search key in the trie
        Returns true if key presents in trie, else false
        """
        length = len(key)
        pCrawl = self.root
        for level in range(length):
            index = self.get_index(key[level])
            if not pCrawl.children[index]:
                return False
            pCrawl = pCrawl.children[index]

        return pCrawl is not None and pCrawl.value != 0

    def delete_helper(self, p_node, key, level, length):
        """
        Helper function for deleting key from trie
        """
        if not p_node:  # Base case
            return False

        if level == length:
            if p_node.value:
                p_node.value = 0  # unmark leaf node

            # if empty, node to be deleted
            return p_node.is_it_free_node()

        # recursive case
        else:
            index = self.get_index(key[level])
            if self.delete_helper(p_node.children[index], key, level + 1, length):
                # last node marked,delete it
                del p_node.children[index]

                # recursively climb up and delete eligible nodes
                return not p_node.leaf_node() and p_node.is_it_free_node()

    def delete_key(self, key):
        """
        Delete key from trie
        """
        length = len(key)
        if length > 0:
            self.delete_helper(self.root, key, 0, length)


if __name__ == '__main__':
    keys = ["she", "sells", "sea", "shore", "the", "by", "sheer"]
    trie = Trie()
    for key in keys:
        trie.insert(key)

    trie.delete_key(keys[6])

    print("{} {}".format(keys[0],
                         "Present in trie" if trie.search(keys[0]) else "Not present in trie"))

    print("{} {}".format(keys[6],
                         "Present in trie" if trie.search(keys[6]) else "Not present in trie"))

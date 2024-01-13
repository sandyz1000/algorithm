"""
Longest prefix matching - A Trie based solution in Java
Given a dictionary of words and an input string, find the longest prefix of the string which is
also a word in dictionary.

Examples:

Let the dictionary contains the following words:
{are, area, base, cat, cater, children, basement}

Below are some input/output examples:
--------------------------------------
Input String            Output
--------------------------------------
caterer                 cater
basemexy                base
child                   < Empty >

"""


class TrieNode(object):
    """
    Trie Node, which stores a character and the children in a HashMap
    """

    def __init__(self, ch):
        self.value = ch
        self.children = {}
        self.b_is_end = False


class Trie(object):
    """
    ==Solution==
    We build a Trie of all dictionary words. Once the Trie is built, traverse through it using
    characters of input string. If prefix matches a dictionary word, store current length and
    look for a longer match. Finally, return the longest match.

    Time Complexity: Time complexity of finding the longest prefix is O(n) where n is length of
    the input string. Refer this for time complexity of building the Trie.

    Implements the actual Trie"""

    def __init__(self):
        self.root = TrieNode('0')

    def insert(self, word):
        """
        Method to insert a new word to Trie

        :param word: str
        :return:
        """

        # Find length of the given word
        length = len(word)
        crawl = self.root

        # Traverse through all characters of given word
        for level in range(length):
            child = crawl.children
            ch = word[level]

            # If there is already a child for current character of given word
            if ch in child:
                crawl = child[ch]
            else:  # Else create a child
                temp = TrieNode(ch)
                child[ch] = temp
                crawl = temp

        # Set b_is_end true for last character
        crawl.b_is_end = True

    def get_matching_prefix(self, inputt):
        """
        The main method that finds out the longest string '_input'
        :param inputt: str
        :return:
        """
        result = ""  # Initialize resultant string
        length = len(inputt)  # Find length of the input string

        # Initialize reference to traverse through Trie
        crawl = self.root

        # Iterate through all characters of input string 'str' and traverse down the Trie
        prev_match = 0
        for level in range(length):
            # Find current character of str
            ch = inputt[level]

            # HashMap of current Trie node to traverse down
            child = crawl.children
            if ch not in child:
                break

            # See if there is a Trie edge for the current character
            if ch in child:
                result += ch  # Update result
                crawl = child[ch]  # Update crawl to move down in Trie

                # If this is end of a word, then update prev_match
                if crawl.b_is_end:
                    prev_match = level + 1

        # If the last processed character did not match end of a word, return the
        # previously matching prefix
        return result[0:prev_match] if not crawl.b_is_end else result


if __name__ == '__main__':
    # Output:
    # caterer:   cater
    # basement:   basement
    # are:   are
    # arex:   are
    # basemexz:   base
    # xyz:

    dictionary = Trie()
    dictionary.insert("are")
    dictionary.insert("area")
    dictionary.insert("base")
    dictionary.insert("cat")
    dictionary.insert("cater")
    dictionary.insert("basement")

    inputt = "caterer"
    print(inputt + ":", dictionary.get_matching_prefix(inputt))

    inputt = "basement"
    print(inputt + ":", dictionary.get_matching_prefix(inputt))

    inputt = "are"
    print(inputt + ":", dictionary.get_matching_prefix(inputt))

    inputt = "arex"
    print(inputt + ":", dictionary.get_matching_prefix(inputt))

    inputt = "basemexz"
    print(inputt + ":", dictionary.get_matching_prefix(inputt))

    inputt = "xyz"
    print(inputt + ":", dictionary.get_matching_prefix(inputt))

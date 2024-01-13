"""
Ternary Search Tree

Why is Binary Search preferred over Ternary Search?

Which of the above two does less comparisons in worst case?

From the first look, it seems the ternary search does less number of comparisons as it makes
Log3n recursive calls, but binary search makes Log2n recursive calls. Let us take a closer look.

The following is recursive formula for counting comparisons in worst case of Binary Search.

    T(n) = T(n/2) + 2,  T(1) = 1

The following is recursive formula for counting comparisons in worst case of Ternary Search.

    T(n) = T(n/3) + 4, T(1) = 1

In binary search, there are 2Log2n + 1 comparisons in worst case. In ternary search, there are
4Log3n + 1 comparisons in worst case.

    Time Complexity for Binary search = 2clog2n + O(1)
    Time Complexity for Ternary search = 4clog3n + O(1)

Therefore, the comparison of Ternary and Binary Searches boils down the comparison of expressions
2Log3n and Log2n . The value of 2Log3n can be written as (2 / Log23) * Log2n . Since the value of
(2 / Log23) is more than one, Ternary Search does more comparisons than Binary Search in worst
case."""

from __future__ import print_function, unicode_literals


def ternary_search(arr, l, r, x):
    """
    A recursive ternary search function. It returns location of x in given array arr[l..r]
    is present, otherwise -1

    Time Complexity for Ternary search = 4clog3n + O(1)

    :param arr: List(int)
    :param l:
    :param r:
    :param x:
    :return:
    """
    if r >= l:
        mid1 = l + (r - l) // 3
        mid2 = mid1 + (r - l) // 3

        # If x is present at the mid1
        if arr[mid1] == x:
            return mid1

        # If x is present at the mid2
        if arr[mid2] == x:
            return mid2

        # If x is present in left one-third
        if arr[mid1] > x:
            return ternary_search(arr, l, mid1 - 1, x)

        # If x is present in right one-third
        if arr[mid2] < x:
            return ternary_search(arr, mid2 + 1, r, x)

        # If x is present in middle one-third
        return ternary_search(arr, mid1 + 1, mid2 - 1, x)

    # We reach here when element is not present in array
    return -1


# Python program to demonstrate Ternary Search Tree (TST) insert, travese and search operations


MAX = 50


class Pointer:
    def __init__(self, ref):
        self.ref = ref


class Node:
    def __init__(self, data, left=None, eq=None, right=None):
        self.data = data
        # True if this character is last character of one of the words
        self.isEndOfString = 0
        self.left = None
        self.eq = None
        self.right = None


class TernarySearch:
    """
    Ternary Search Tree

    A ternary search tree is a special trie data structure where the child nodes of a standard trie
    are ordered as a binary search tree.

    Representation of ternary search trees:
    Unlike trie(standard) data structure where each node contains 26 pointers for its children, each
    node in a ternary search tree contains only 3 pointers:
    1. The left pointer points to the node whose value is less than the value in the current node.
    2. The equal pointer points to the node whose value is equal to the value in the current node.
    3. The right pointer points to the node whose value is greater than the value in the current
        node.

    Apart from above three pointers, each node has a field to indicate data(character in case of
    dictionary) and another field to mark end of a string.
    So, more or less it is similar to BST which stores data based on some order. However, data in a
    ternary search tree is distributed over the nodes. e.g. It needs 4 nodes to store the word
    "Geek".

    Below figure shows how exactly the words in a ternary search tree are stored?

                    (C, 0)
                    /  |  \
                 (B,0)(A,0)(U,0)
                   |   |     |
                 (U,0)(T,1) (P,1)
                  |    |     |
                 (G,1)(S,1)

    Following are the 5 fields in a node:
    1) The data (a character)
    2) isEndOfString bit (0, 1). It may be 1 for nonleaf nodes (The node with character T)
    3) Left Pointer
    4) Equal Pointer
    5) Right Pointer

    One of the advantage of using ternary search trees over tries is that ternary search trees are a
    more space efficient (involve only three pointers per node as compared to 26 in standard tries).
    Further, ternary search trees can be used any time a hashtable would be used to store strings.

    Tries are suitable when there is a proper distribution of words over the alphabets so that
    spaces are utilized most efficiently. Otherwise ternary search trees are better. Ternary
    search trees are efficient to use(in terms of space) when the strings to be stored share a
    common prefix.

    Applications of ternary search trees:

    1. Ternary search trees are efficient for queries like "Given a word, find the next word in
    dictionary(near-neighbor lookups)" or "Find all telephone numbers starting with 9342 or "typing
    few starting characters in a web browser displays all website names with this prefix"(Auto
    complete feature)".

    2. Used in spell checks: Ternary search trees can be used as a dictionary to store all the
    words. Once the word is typed in an editor, the word can be parallely searched in the ternary
    search tree to check for correct spelling."""

    def insert(self, root, word):
        """Function to insert a new word in a Ternary Search Tree"""
        # Base Case: Tree is empty
        if not root.ref:
            root.ref = Node(word[0])

        # If current character of word is smaller than root's character, then insert this word
        # in left subtree of root
        if ord(word[0]) < ord(root.ref.data):
            left = Pointer(None)
            self.insert(left, word)
            root.ref.left = left.ref

        # If current character of word is greate than root's character, then insert this word
        # in right subtree of root
        elif ord(word[0]) > ord(root.ref.data):
            right = Pointer(None)
            self.insert(right, word)
            root.ref.right = right.ref

        # If current character of word is same as root's character,
        else:
            if word[1:]:
                eq = Pointer(None)
                self.insert(eq, word[1:])
                root.ref.eq = eq.ref
            else:
                root.ref.isEndOfString = 1

    def traverseTSTUtil(self, root, buffer, depth):
        """A recursive function to traverse Ternary Search Tree"""
        if root:
            # First traverse the left subtree
            self.traverseTSTUtil(root.left, buffer, depth)

            # Store the character of this node
            buffer[depth] = root.data
            if root.isEndOfString:
                buffer[depth + 1] = ''
                m_string = ""
                for index, buf in enumerate(buffer):
                    if buf is None:
                        break
                    m_string += buf
                print("%s\n" % m_string)

            # Traverse the subtree using equal pointer (middle subtree)
            self.traverseTSTUtil(root.eq, buffer, depth + 1)

            # Finally Traverse the right subtree
            self.traverseTSTUtil(root.right, buffer, depth)

    def traverseTST(self, root):
        """The main function to traverse a Ternary Search Tree. It mainly uses traverseTSTUtil()"""
        buffer = [None] * MAX
        self.traverseTSTUtil(root, buffer, 0)

    def searchTST(self, root, word):
        """Function to search a given word in TST"""
        if not root:
            return 0

        if ord(word[0]) < ord(root.data):
            return self.searchTST(root.left, word)

        elif ord(word[0]) > ord(root.data):
            return self.searchTST(root.right, word)

        else:
            if word[1:] == '':
                return root.isEndOfString

            return self.searchTST(root.eq, word[1:])


if __name__ == '__main__':
    # Output:
    # Following is traversal of ternary search tree
    # bug cat cats up
    #
    # Following are search results for cats, bu and cat respectively
    # Found
    # Not Found
    # Found

    ternary = TernarySearch()
    root = Pointer(None)
    ternary.insert(root, "cat")
    ternary.insert(root, "cats")
    ternary.insert(root, "up")
    ternary.insert(root, "bug")

    print("Following is traversal of ternary search tree\n")
    ternary.traverseTST(root.ref)

    print("\nFollowing are search results for cats, bu and cat respectively\n");
    print("Found\n" if ternary.searchTST(root.ref, "cats") else "Not Found\n")
    print("Found\n" if ternary.searchTST(root.ref, "bu") else "Not Found\n")
    print("Found\n" if ternary.searchTST(root.ref, "cat") else "Not Found\n")

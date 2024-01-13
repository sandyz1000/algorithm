"""
Print unique rows in a given boolean matrix

Given a binary matrix, print all unique rows of the given matrix.
- - - - - - - - - - - - - - - - - - - - - - - -
Input:  {0, 1, 0, 0, 1}
        {1, 0, 1, 1, 0}
        {0, 1, 0, 0, 1}
        {1, 1, 1, 0, 0}
Output:
        0 1 0 0 1
        1 0 1 1 0
        1 1 1 0 0
- - - - - - - - - - - - - - - - - - - - - - - -

==Method 1 (Simple)==

A simple approach is to check each row with all processed rows. Print the first row. Now,
starting from the second row, for each row, compare the row with already processed rows. If the
row matches with any of the processed rows, don't print it. If the current row doesn't match with
any row, print it.

Time complexity: O( ROW^2 x COL )
Auxiliary Space: O( 1 )

==Method 2 (Use Binary Search Tree)==

Find the decimal equivalent of each row and insert it into BST. Each node of the BST will contain
two fields, one field for the decimal value, other for row number. Do not insert a node if it is
duplicated. Finally, traverse the BST and print the corresponding rows.

Time complexity: O( ROW x COL + ROW x log( ROW ) )
Auxiliary Space: O( ROW )

This method will lead to Integer Overflow if number of columns is large.

==Method 3 (Use Trie data structure)==

Since the matrix is boolean, a variant of Trie data structure can be used where each node will be
having two children one for 0 and other for 1. Insert each row in the Trie. If the row is already
there, don't print the row. If row is not there in Trie, insert it in Trie and print it.

Time complexity: O( ROW x COL )
Auxiliary Space: O( ROW x COL )
"""

# Given a binary matrix of M X N of integers, you need to return only unique rows of binary array

ROW = 4
COL = 5


class Node:
    """A Trie node"""

    def __init__(self, ):
        self.is_end_of_col = False
        self.child = [None] * 2  # Only two children needed for 0 and 1


class NodePointer:
    def __init__(self, node):
        self.node = node


class Trie:
    def __init__(self, root=None):
        self.root = root

    def insert(self, node_ptr, M, row, col):
        """
        Inserts a new matrix row to Trie.  If row is already present, then returns 0,
        otherwise insets the row and return 1

        :param M:
        :param row:
        :param col:
        :return:
        """
        # base case
        if node_ptr.node is None:
            node_ptr.node = Node()

        # Recur if there are more entries in this row
        if col < COL:
            ptr = NodePointer(node_ptr.node.child[M[row][col]])
            value = self.insert(ptr, M, row, col + 1)
            node_ptr.node.child[M[row][col]] = ptr.node
            return value

        # If all entries of this row are processed
        else:
            # unique row found, return 1
            if not node_ptr.node.is_end_of_col:
                node_ptr.node.is_end_of_col = True
                return node_ptr.node.is_end_of_col

            # duplicate row found, return 0
            return False

    def print_row(self, M, row):
        """A utility function to print a row"""
        for i in range(COL):
            print("%d" % M[row][i], end=" ")
        print("")

    def find_unique_rows(self, M):
        """The main function that prints all unique rows in a given matrix."""
        self.root = None  # create an empty Trie

        # Iterate through all rows
        for i in range(ROW):
            # insert row to TRIE
            node_ptr = NodePointer(self.root)
            inserted = self.insert(node_ptr, M, i, 0)
            self.root = node_ptr.node
            if inserted:
                # unique row found, print it
                self.print_row(M, i)


if __name__ == '__main__':
    trie = Trie()
    M = [[0, 1, 0, 0, 1],
         [1, 0, 1, 1, 0],
         [0, 1, 0, 0, 1],
         [1, 0, 1, 0, 0]]

    trie.find_unique_rows(M)

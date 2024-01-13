"""
Print a Binary Tree in Vertical Order | Set 1
Given a binary tree, print it vertically.

--------------------------------------------------
Example:
--------------------------------------------------

       1
    /    \
   2      3
  / \    / \
 4   5  6   7
         \   \
          8   9

The output of print this tree vertically will be:
4
2
1 5 6
3 8
7
9

Time Complexity:

Time complexity of above algorithm is O(w*n) where w is width of Binary Tree and n is number of nodes in Binary Tree.
In worst case, the value of w can be n (consider a complete tree for example) and time complexity can become O(n^2).

=======================================

"""

from __future__ import print_function
from collections import defaultdict


# Program to print binary tree in vertical order
class Node(object):
    """A binary tree"""

    # Constructor to create a new node
    def __init__(self, key):
        self.key = key
        self.left = None
        self.right = None


class BinTreeVerticalOrder1(object):
    """
    The idea is to traverse the tree once and get the minimum and maximum horizontal distance with respect to
    root. For the tree shown above, minimum distance is -2 (for node with value 4) and maximum distance is 3
    (For node with value 9).
    Once we have maximum and minimum distances from root, we iterate for each vertical line at distance minimum
    to maximum from root, and for each vertical line traverse the tree and print the nodes which lie on that
    vertical line.
    """
    def __init__(self):
        self.minimum = 0
        self.maximum = 0

    def find_min_max(self, node, hd):
        """ A utility function to find min and max distances with respect to root
        """
        # Base Case
        if node is None:
            return None

        # Update min and max
        self.minimum = min(hd, self.minimum)
        self.maximum = max(hd, self.maximum)

        # Recur for left and right subtrees
        self.find_min_max(node.left, hd - 1)
        self.find_min_max(node.right, hd + 1)

    def print_vertical_line(self, node, line_no, hd):
        """ A utility function to print all nodes on a given line_no hd is horizontal distance of
        current node with respect to root
        """
        # Base Case
        if node is None:
            return

        # If this node is on the given line number
        if hd == line_no:
            print(node.key, end=" ")

        # Recur for left and right subtrees
        self.print_vertical_line(node.left, line_no, hd - 1)
        self.print_vertical_line(node.right, line_no, hd + 1)

    def vertical_order_set(self, root):
        """Find min and max distances with respect to root"""
        self.find_min_max(root, 0)

        # Iterate through all possible lines starting from the leftmost line
        # and print nodes line by line
        for line_no in range(self.minimum, self.maximum + 1):
            self.print_vertical_line(root, line_no, 0)
            print("")


class BinTreeVerticalOrder2(object):
    """
    ------------------------------------------------------------------
    Set 2 (Hashmap based Method)

    An efficient solution based on hash map is discussed. We need to check the Horizontal Distances from root for all
    nodes. If two nodes have the same Horizontal Distance (HD), then they are on same vertical line. The idea of HD
    is simple. HD for root is 0, a right edge (edge connecting to right subtree) is considered as +1 horizontal
    distance and a left edge is considered as -1 horizontal distance. For example, in the above tree, HD for Node 4
    is at -2, HD for Node 2 is -1, HD for 5 and 6 is 0 and HD for node 7 is +2.

    We can do preorder traversal of the given Binary Tree. While traversing the tree, we can recursively calculate
    HDs. We initially pass the horizontal distance as 0 for root. For left subtree, we pass the Horizontal Distance
    as Horizontal distance of root minus 1. For right subtree, we pass the Horizontal Distance as Horizontal Distance
    of root plus 1. For every HD value, we maintain a list of nodes in a hasp map. Whenever we see a node in
    traversal, we go to the hash map entry and add the node to the hash map using HD as a key in map.

    Utility function to store vertical order in map 'm'
    'hd' is horizontal distance of current node from root
    'hd' is initially passed as 0
    ------------------------------------------------------------------

    """

    def vertical_order_utils(self, root, hd, m):
        if root is None:  # Base Case
            return

        # Store current node in map 'm'
        m[hd].append(root.key)

        # Store nodes in left subtree
        self.vertical_order_utils(root.left, hd - 1, m)

        # Store nodes in right subtree
        self.vertical_order_utils(root.right, hd + 1, m)

    # The main function to print vertical order of a binary
    # tree ith given root
    def vertical_order_set(self, root):
        # Create a map and store vertical order in map using function getVerticalORder()
        m = defaultdict(list)
        hd = 0
        self.vertical_order_utils(root, hd, m)

        # Traverse the map and print nodes at every horizontal distance (hd)
        for index, value in enumerate(sorted(m)):
            for item in m[value]:
                print(item, end=" ")
            print("")


if __name__ == '__main__':
    # Output: Vertical order traversal is
    # 4
    # 2
    # 1 5 6
    # 3 8
    # 7
    # 9

    root = Node(1)
    root.left = Node(2)
    root.right = Node(3)
    root.left.left = Node(4)
    root.left.right = Node(5)
    root.right.left = Node(6)
    root.right.right = Node(7)
    root.right.left.right = Node(8)
    root.right.right.right = Node(9)

    tree = BinTreeVerticalOrder1()
    print("\nMethod-1: Vertical order traversal is", tree.vertical_order_set(root))

    tree = BinTreeVerticalOrder2()
    print("\nMethod-2: Vertical order traversal is")
    tree.vertical_order_set(root)

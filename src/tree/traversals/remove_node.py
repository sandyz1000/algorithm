"""
Remove nodes on root to leaf paths of length < K

Given a Binary Tree and a number k, remove all nodes that lie only on root to leaf path(s) of
length smaller than k. If a node X lies on multiple root-to-leaf paths and if any of the paths
has path length >= k, then X is not deleted from Binary Tree. In other words a node is deleted if
all paths going through it have lengths smaller than k.

Consider the following example Binary Tree
========================================================

               1
           /      \
         2          3
      /     \         \
    4         5        6
  /                   /
 7                   8
Input: Root of above Binary Tree
       k = 4

Output: The tree should be changed to following
           1
        /     \
      2          3
     /             \
   4                 6
 /                  /
7                  8
There are 3 paths
i) 1->2->4->7      path length = 4
ii) 1->2->5        path length = 3
iii) 1->3->6->8    path length = 4
There is only one path " 1->2->5 " of length smaller than 4.
The node 5 is the only node that lies only on this path, so
node 5 is removed.
Nodes 2 and 1 are not removed as they are parts of other paths
of length 4 as well.

If k is 5 or greater than 5, then whole tree is deleted.

If k is 3 or less than 3, then nothing is deleted.

========================================================

The idea here is to use post order traversal of the tree. Before removing a node we need to check
that all the children of that node in the shorter path are already removed.
There are 2 cases:

i) This node becomes a leaf node in which case it needs to be deleted.

ii) This node has other child on a path with path length >= k. In that case it needs not to be
deleted.

Time complexity of the above solution is O(n) where n is number of nodes in given Binary Tree.

"""
from __future__ import print_function

# Python program to remove nodes on root to leaf paths of length < k


class Node(object):
    def __init__(self, item):
        self.data = item
        self.left, self.right = None, None


class BinaryTree(object):

    def __init__(self, root=None):
        self.root = root

    def remove_short_path_nodes_util(self, node, level, k):
        """
        Utility method that actually removes the nodes which are not on the pathLen >= k.
        This method can change the root as well."""
        # //Base condition
        if node is None:
            return None

        # Traverse the tree in postorder fashion so that if a leaf node path length is
        # shorter than k, then that node and all of its descendants till the node which are not
        # on some other path are removed.
        node.left = self.remove_short_path_nodes_util(node.left, level + 1, k)
        node.right = self.remove_short_path_nodes_util(node.right, level + 1, k)

        # If root is a leaf node and it's level is less than k then remove this node.
        # This goes up and check for the ancestor nodes also for the same condition till it
        # finds a node which is a part of other path(s) too.
        if node.left is None and node.right is None and level < k:
            return None

        # Return root
        return node

    def remove_short_path_nodes(self, node, k):
        """Method which calls the utitlity method to remove the short path nodes."""
        pathLen = 0
        return self.remove_short_path_nodes_util(node, 1, k)

    # Method to print the tree in inorder fashion.
    def print_inorder(self, node):
        if node is not None:
            self.print_inorder(node.left)
            print(node.data, end=" ")
            self.print_inorder(node.right)


if __name__ == '__main__':
    tree = BinaryTree()
    k = 4
    tree.root = Node(1)
    tree.root.left = Node(2)
    tree.root.right = Node(3)
    tree.root.left.left = Node(4)
    tree.root.left.right = Node(5)
    tree.root.left.left.left = Node(7)
    tree.root.right.right = Node(6)
    tree.root.right.right.left = Node(8)
    print("The inorder traversal of original tree is : ")
    tree.print_inorder(tree.root)
    res = tree.remove_short_path_nodes(tree.root, k)
    print("\n")
    print("The inorder traversal of modified tree is : ")
    tree.print_inorder(res)

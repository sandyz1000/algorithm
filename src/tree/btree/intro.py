"""
B-Tree | Set 1 (Introduction)

B-Tree is a self-balancing search tree. In most of the other self-balancing search trees (like
AVL and Red Black Trees), it is assumed that everything is in main memory. To understand use of
B-Trees, we must think of huge amount of data that cannot fit in main memory. When the number of
keys is high, the data is read from disk in the form of blocks. Disk access time is very high
compared to main memory access time. The main idea of using B-Trees is to reduce the number of
disk accesses. Most of the tree operations (search, insert, delete, max, min, ..etc ) require O(
h) disk accesses where h is height of the tree. B-tree is a fat tree. Height of B-Trees is kept
low by putting maximum possible keys in a B-Tree node. Generally, a B-Tree node size is kept
equal to the disk block size. Since h is low for B-Tree, total disk accesses for most of the
operations are reduced significantly compared to balanced Binary Search Trees like AVL Tree,
Red Black Tree, ..etc.

Properties of B-Tree
1) All leaves are at same level.
2) A B-Tree is defined by the term minimum degree 't'. The value of t depends upon disk block size.
3) Every node except root must contain at least t-1 keys. Root may contain minimum 1 key.
4) All nodes (including root) may contain at most 2t - 1 keys.
5) Number of children of a node is equal to the number of keys in it plus 1.
6) All keys of a node are sorted in increasing order. The child between two keys k1 and k2 contains
all keys in range from k1 and k2.
7) B-Tree grows and shrinks from root which is unlike Binary Search Tree. Binary Search Trees grow
downward and also shrink from downward.
8) Like other balanced Binary Search Trees, time complexity to search, insert and delete is O(Logn).

Following is an example B-Tree of minimum degree 3. Note that in practical B-Trees, the value of
minimum degree is much more than 3.

                   3, 30, 60
                /    /     \    \
               /    /       \    \
              /    /         \    \
           (1,2) (4,5,6)  (40,50) (70,80,82,84,86)

==Search==
Search is similar to search in Binary Search Tree. Let the key to be searched be k. We start from
root and recursively traverse down. For every visited non-leaf node, if the node has key,
we simply return the node. Otherwise we recur down to the appropriate child (The child which is
just before the first greater key) of the node. If we reach a leaf node and don't find k in the
leaf node, we return NULL.

==Traverse==
Traversal is also similar to Inorder traversal of Binary Tree. We start from the leftmost child,
recursively print the leftmost child, then repeat the same process for remaining children and
keys. In the end, recursively print the rightmost child. """


class BTree(object):
    def __init__(self, _t):
        self.root = None  # Pointer to root node
        self.t = _t  # Minimum degree

    def traverse(self):
        if self.root:
            self.root.traverse()

    def search(self, k):
        return None if self.root is None else self.root.search(k)


class BTreeNode(object):
    def __init__(self, _t, _leaf=False):
        self.t = _t  # Minimum degree (defines the range for number of keys)
        self.n = 0  # Current number of keys
        self.leaf = _leaf  # Is true when node is leaf. Otherwise false
        self.keys = [0] * (2 * self.t - 1)  # An arr of keys
        self.C = [BTreeNode(0, False)] * (2 * self.t)

    def traverse(self):
        """
        Function to traverse all nodes in a subtree rooted with this node
        :return:
        """
        # There are n keys and n+1 children, traverse through n keys and first n children
        i = 0
        for i in range(self.n):
            # If this is not leaf, then before printing key[i], traverse the subtree rooted
            # with child C[i].
            if not self.leaf:
                self.C[i].traverse()
            print(self.keys[i])

        # Print the subtree rooted with last child
        if not self.leaf:
            self.C[i].traverse()

    def search(self, k):
        """
        Function to search key k in subtree rooted with this node
        :return:
        """
        # Find the first key greater than or equal to k
        i = 0
        while i < self.n and k > self.keys[i]:
            i += 1

        # If the found key is equal to k, return this node
        if self.keys[i] == k:
            return self

        # If key is not found here and this is a leaf node
        if self.leaf:
            return None

        # Go to the appropriate child
        return self.C[i].search(k)


if __name__ == '__main__':
    pass

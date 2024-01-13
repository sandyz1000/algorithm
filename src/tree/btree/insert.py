"""B-Tree | Set 1 (Introduction)

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

                  (3, 30, 60)
                /   /   \    \
              /    /     \    \
            /     /       \    \
          (1,2)(4,5,6) (40,50)(70,80,82,84,86)

==Search==
-----------
Search is similar to search in Binary Search Tree. Let the key to be searched be k. We start from
root and recursively traverse down. For every visited non-leaf node, if the node has key,
we simply return the node. Otherwise we recur down to the appropriate child (The child which is
just before the first greater key) of the node. If we reach a leaf node and don't find k in the
leaf node, we return NULL.

Traverse
-----------
Traversal is also similar to Inorder traversal of Binary Tree. We start from the leftmost child,
recursively print the leftmost child, then repeat the same process for remaining children and
keys. In the end, recursively print the rightmost child."""

from __future__ import print_function


class BTree(object):
    """
    B-Tree | Set 2 (Insert)
    In the previous post, we introduced B-Tree. We also discussed search() and traverse() functions.
    In this post, insert() operation is discussed. A new key is always inserted at leaf node. Let
    the key to be inserted be k. Like BST, we start from root and traverse down till we reach a leaf
    node. Once we reach a leaf node, we insert the key in that leaf node. Unlike BSTs, we have a
    predefined range on number of keys that a node can contain. So before inserting a key to node,
    we make sure that the node has extra space.
    How to make sure that a node has space available for key before the key is inserted? We use an
    operation called splitChild() that is used to split a child of a node. See the following
    diagram to understand split. In the following diagram, child y of x is being split into two
    nodes y and z. Note that the splitChild operation moves a key up and this is the reason B-Trees
    grow up unlike BSTs which grow down.

    As discussed above, to insert a new key, we go down from root to leaf. Before traversing down
    to a node, we first check if the node is full. If the node is full, we split it to create
    space. Following is complete algorithm.

    Insertion
    1) Initialize x as root.
    2) While x is not leaf, do following
    ..a) Find the child of x that is going to to be traversed next. Let the child be y.
    ..b) If y is not full, change x to point to y.
    ..c) If y is full, split it and change x to point to one of the two parts of y. If k is
    smaller than mid key in y, then set x as first part of y. Else second part of y. When we
    split y, we. move a key from y to its parent x.

    3) The loop in step 2 stops when x is leaf. x must have space for 1 extra key as we have been
    splitting all nodes in advance. So simply insert k to x.

    Note that the algorithm follows the Cormen book. It is actually a proactive insertion algorithm
    where before going down to a node, we split it if it is full. The advantage of splitting before
    is, we never traverse a node twice. If we don't split a node before going down to it and split
    it only if new key is inserted (reactive), we may end up traversing all nodes again from leaf to
    root. This happens in cases when all nodes on the path from root to leaf are full. So when we
    come to the leaf node, we split it and move a key up. Moving a key up will cause a split in
    parent node (because parent was already full). This cascading effect never happens in this
    proactive insertion algorithm. There is a disadvantage of this proactive insertion though, we
    may do unnecessary splits.

    Let us understand the algorithm with an example tree of minimum degree 't' as 3 and a
    sequence of integers 10, 20, 30, 40, 50, 60, 70, 80 and 90 in an initially empty B-Tree.

    Initially root is NULL. Let us first insert 10.

        Insert 10
                    (10)

    Let us now insert 20, 30, 40 and 50. They all will be inserted in root because maximum number
    of keys a node can accommodate is 2*t - 1 which is 5.

        Insert 20, 30, 40, 50

                    (20, 30, 40, 50)

    Let us now insert 60. Since root node is full, it will first split into two, then 60 will be
    inserted into the appropriate child.

                    (30)
                    /   \
                   /     \
                  /       \
                (10,20) (40,50)

                      (30)
                      /   \
                     /     \
                    /       \
                (10, 20) (40,50, 60)

    Let us now insert 70 and 80. These new keys will be inserted into the appropriate leaf without
    any split.

                       (30)
                      /   \
                     /     \
                    /       \
                (10, 20) (40,50,60,70,80)

    Let us now insert 90. This insertion will cause a split. The middle key will go up to the
    parent.

                   (30, 60)
                    /   \  \
                  /     \   \
                /       \    \
            (10, 20) (40,50)(70,80)

    """

    def __init__(self, t):
        self.root = None  # Pointer to root node
        self.t = t  # Minimum degree

    def traverse(self):
        if self.root is not None:
            self.root.traverse()

    def search(self, k):
        """
        function to search a key in this tree
        :param k:
        :return:
        """
        return None if self.root is None else self.root.search(k)

    def insert(self, k):
        """
        The main function that inserts a new key in this B-Tree
        """
        # If tree is empty
        if self.root is None:
            # Allocate memory for root
            self.root = BTreeNode(self.t, True)
            self.root.keys[0] = k  # Insert key
            self.root.n = 1  # Update number of keys in root

        else:  # If tree is not empty
            # If root is full, then tree grows in height
            if self.root.n == 2 * self.t - 1:
                # Allocate memory for new root
                s = BTreeNode(self.t, False)

                # Make old root as child of new root
                s.C[0] = self.root

                # Split the old root and move 1 key to the new root
                s.split_child(0, self.root)

                # New root has two children now. Decide which of the two children is going to have
                # new key
                i = 0
                if s.keys[0] < k:
                    i += 1
                s.C[i].insert_non_full(k)
                self.root = s  # Change root

            else:  # If root is not full, call insertNonFull for root
                self.root.insert_non_full(k)


class BTreeNode(object):
    def __init__(self, t1, leaf1=False):
        """
        :type t1:int
        :type leaf1: bool
        """
        self.t = t1  # Minimum degree (defines the range for number of keys)
        self.keys = [0] * (2 * self.t - 1)  # An array of keys
        self.C = [BTreeNode(0, False) for j in range(2 * self.t)]  # An array of child pointers
        self.n = 0  # Current number of keys
        self.leaf = leaf1  # Is true when node is leaf. Otherwise false

    def split_child(self, i, y):
        """
        A utility function to split the child y of this node. i is index of y in
        child arr C[].
        :return:
        """
        z = BTreeNode(y.t, y.leaf)
        z.n = self.t - 1

        # Copy the last (t-1) keys of y to z
        for j in range(self.t - 1):
            z.keys[j] = y.keys[j + self.t]

        # Copy the last t children of y to z
        if not y.leaf:
            for j in range(self.t):
                z.C[j] = y.C[j + self.t]

        # Reduce the number of keys in y
        y.n = self.t - 1

        # Since this node is going to have a new child, create space of new child
        for j in range(self.n, i + 2, -1):
            self.C[j + 1] = self.C[j]

        # Link the new child to this node
        self.C[i + 1] = z

        # A key of y will move to this node. Find location of new key and move all greater keys
        # one space ahead
        for j in range(self.n - 1, i + 1, -1):
            self.keys[j + 1] = self.keys[j]

        # Copy the middle key of y to this node
        self.keys[i] = y.keys[self.t - 1]

        # Increment count of keys in this node
        self.n = self.n + 1

    def insert_non_full(self, k):
        """
        A utility function to insert a new key in the subtree rooted with this node. The assumption
        is, the node must be non-full when this function is called
        :return:
        """
        i = self.n - 1
        if self.leaf:  # If this is a leaf node
            # The following loop does two things
            # a) Finds the location of new key to be inserted
            # b) Moves all greater keys to one place ahead
            while i >= 0 and self.keys[i] > k:
                self.keys[i + 1] = self.keys[i]
                i -= 1

            # Insert the new key at found location
            self.keys[i + 1] = k
            self.n = self.n + 1

        else:  # If this node is not leaf
            #  Find the child which is going to have the new key
            while i >= 0 and self.keys[i] > k:
                i -= 1

            # See if the found child is full
            if self.C[i + 1].n == 2 * self.t - 1:
                # If the child is full, then split it
                self.split_child(i + 1, self.C[i + 1])

                # After split, the middle key of C[i] goes up and C[i] is splitted into two.  See
                # which of the two is going to have the new key
                if self.keys[i + 1] < k:
                    i += 1

            self.C[i + 1].insert_non_full(k)

    def search(self, k):
        """
        A function to search a key in subtree rooted with this node. Function to search key k in
        subtree rooted with this node
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

        return self.C[i].search(k)  # Go to the appropriate child

    def traverse(self):
        """
        A function to traverse all nodes in a subtree rooted with this node
        :return:
        """
        i = 0
        # There are n keys and n+1 children, travers through n keys and first n children
        for i in range(self.n):
            # If this is not leaf, then before printing key[i], traverse the subtree rooted
            # with child C[i].
            if not self.leaf:
                self.C[i].traverse()
            print(self.keys[i], end=" ")

        # Print the subtree rooted with last child
        if not self.leaf:
            self.C[i].traverse()


if __name__ == '__main__':
    t = BTree(3)
    # t.insert(10)
    # t.insert(20)
    # t.insert(5)
    # t.insert(6)
    # t.insert(12)
    # t.insert(30)
    # t.insert(7)
    # t.insert(17)

    t.insert(10)
    t.insert(20)
    t.insert(30)
    t.insert(40)
    t.insert(50)
    t.insert(60)
    t.insert(70)
    t.insert(80)
    t.insert(90)

    print("Traversal of the constucted tree is ")
    t.traverse()
    k = 6
    print("\nPresent for %s" % k if t.search(k) else "\nNot Present for %s" % k)

    k = 15
    print("\nPresent for %s" % k if t.search(k) else "\nNot Present for %s" % k)

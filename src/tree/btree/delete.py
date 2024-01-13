"""B-Tree | Set 3 (Delete)"""


class BTree(object):
    """
    B-Tree is a type of a multi-way search tree. So, if you are not familiar with multi-way search
    trees in general, it is better to take a look at this video lecture from IIT-Delhi,
    before proceeding further. Once you get the basics of a multi-way search tree clear,
    B-Tree operations will be easier to understand.

    Source of the following explanation and algorithm is Introduction to Algorithms 3rd Edition by
    Clifford Stein, Thomas H. Cormen, Charles E. Leiserson, Ronald L. Rivest

    Deletion process: Deletion from a B-tree is more complicated than insertion, because we can
    delete a key from any node-not just a leaf—and when we delete a key from an internal node,
    we will have to rearrange the node’s children.

    As in insertion, we must make sure the deletion doesn't violate the B-tree properties. Just
    as we had to ensure that a node didn't get too big due to insertion, we must ensure that a
    node doesn't get too small during deletion (except that the root is allowed to have fewer
    than the minimum number t-1 of keys). Just as a simple insertion algorithm might have to back
    up if a node on the path to where the key was to be inserted was full, a simple approach to
    deletion might have to back up if a node (other than the root) along the path to where the
    key is to be deleted has the minimum number of keys. The deletion procedure deletes the key k
    from the subtree rooted at x. This procedure guarantees that whenever it calls itself
    recursively on a node x, the number of keys in x is at least the minimum degree t. Note that
    this condition requires one more key than the minimum required by the usual B-tree
    conditions, so that sometimes a key may have to be moved into a child node before recursion
    descends to that child. This strengthened condition allows us to delete a key from the tree
    in one downward pass without having to "back up" (with one exception, which we'll explain).
    You should interpret the following specification for deletion from a B-tree with the
    understanding that if the root node x ever becomes an internal node having no keys (this
    situation can occur in cases 2c and 3b then we delete x, and x's only child x.c1 becomes the
    new root of the tree, decreasing the height of the tree by one and preserving the property
    that the root of the tree contains at least one key (unless the tree is empty).

    We sketch how deletion works with various cases of deleting keys from a B-tree.

    1.	If the key k is in node x and x is a leaf, delete the key k from x.
    2.	If the key k is in node x and x is an internal node, do the following.

        a)	If the child y that precedes k in node x has at least t keys, then find the
        predecessor k0 of k in the sub-tree rooted at y. Recursively delete k0, and replace k by
        k0 in x. (We can find k0 and delete it in a single downward pass.)

        b)	If y has fewer than t keys, then, symmetrically, examine the child z that follows k in
        node x. If z has at least t keys, then find the successor k0 of k in the subtree rooted
        at z. Recursively delete k0, and replace k by k0 in x. (We can find k0 and delete it in a
        single downward pass.)

        c) Otherwise, if both y and z have only t-1 keys, merge k and all of z into y, so that x
        loses both k and the pointer to z, and y now contains 2t-1 keys. Then free z and recursively
        delete k from y.

    3.	If the key k is not present in internal node x, determine the root x.c(i) of the appropriate
    subtree that must contain k, if k is in the tree at all. If x.c(i) has only t-1 keys,
    execute step 3a or 3b as necessary to guarantee that we descend to a node containing at least t
    keys. Then finish by recurs on the appropriate child of x.

        a)	If x.c(i) has only t-1 keys but has an immediate sibling with at least t keys,
        give x.c(i) an extra key by moving a key from x down into x.c(i), moving a key from x.c(
        i) 's immediate left or right sibling up into x, and moving the appropriate child pointer
        from the sibling into x.c(i).

        b)	If x.c(i) and both of x.c(i)'s immediate siblings have t-1 keys, merge x.c(i) with one
        sibling, which involves moving a key from x down into the new merged node to become the
        median key for that node.

    Since most of the keys in a B-tree are in the leaves, deletion operations are most often used to
    delete keys from leaves. The recursive delete procedure then acts in one downward pass through
    the tree, without having to back up. When deleting a key in an internal node, however,
    the procedure makes a downward pass through the tree but may have to return to the node from
    which the key was deleted to replace the key with its predecessor or successor (cases 2a and 2b).

    The following program performs deletion on a B-Tree. It contains functions
    specific for deletion along with all the other functions provided in the
    previous articles on B-Trees. See http://www.geeksforgeeks.org/b-tree-set-1-introduction-2/
    for previous article.

    The deletion function has been compartmentalized into 8 functions for ease
    of understanding and clarity

    The following functions are exclusive for deletion
    In class BTreeNode:
        1) remove
        2) removeFromLeaf
        3) removeFromNonLeaf
        4) getPred
        5) getSucc
        6) borrowFromPrev
        7) borrowFromNext
        8) merge
        9) findKey

    In class BTree:
         1) remove

      The removal of a key from a B-Tree is a fairly complicated process. The program handles
      all the 6 different cases that might arise while removing a key.

      Testing: The code has been tested using the B-Tree provided in the CLRS book( included
      in the main function ) along with other cases.

      Reference: CLRS3 - Chapter 18 - (499-502)
      It is advised to read the material in CLRS before taking a look at the code.
    """

    def __init__(self, _t):
        self.root = None
        self.t = _t

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

    def remove(self, k):
        if not self.root:
            print("The tree is empty\n")
            return

        # Call the remove function for root
        self.root.remove(k)

        # If the root node has 0 keys, make its first child as the new root if it has a child,
        # otherwise set root as NULL
        if self.root.n == 0:
            tmp = self.root
            self.root = None if self.root.leaf else self.root.C[0]
            del tmp  # Free the old root

        return

    def insert(self, k):
        """
        The main function that inserts a new key in this B-Tree
        :return:
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
        self.keys = [0 for j in range((2 * self.t - 1))]  # An arr of keys
        self.C = [None for j in range((2 * self.t))]  # An array of child pointers
        self.n = 0  # Current number of keys
        self.leaf = leaf1  # Is true when node is leaf. Otherwise false

    def find_key(self, k):
        """
        A utility function that returns the index of the first key that is greater than or
        equal to k
        :return:
        """
        idx = 0
        while idx < self.n and self.keys[idx] < k:
            idx += 1
        return idx

    def remove(self, k):
        """
        A function to remove the key k from the sub-tree rooted with this node
        :return:
        """
        idx = self.find_key(k)
        # The key to be removed is present in this node
        if idx < self.n and self.keys[idx] == k:
            # If the node is a leaf node - removeFromLeaf is called
            # Otherwise, removeFromNonLeaf function is called
            if self.leaf:
                self.remove_from_leaf(idx)
            else:
                self.remove_from_non_leaf(idx)

        else:
            # If this node is a leaf node, then the key is not present in tree
            if self.leaf:
                print("The key %d is does not exist in the tree\n" % k)
                return

            # The key to be removed is present in the sub-tree rooted with this node
            # The flag indicates whether the key is present in the sub-tree rooted
            # with the last child of this node
            flag = True if (idx == self.n) else False

            # If the child where the key is supposed to exist has less that t keys,
            # we fill that child
            if self.C[idx].n < self.t:
                self.fill(idx)

            # If the last child has been merged, it must have merged with the previous
            # child and so we recurse on the (idx-1)th child. Else, we recurse on the
            # (idx)th child which now has atleast t keys
            if flag and idx > self.n:
                self.C[idx - 1].remove(k)
            else:
                self.C[idx].remove(k)

        return

    def remove_from_leaf(self, idx):
        """
        A function to remove the idx-th key from this node - which is a leaf node
        """
        # Move all the keys after the idx-th pos one place backward
        for i in range(idx + 1, self.n):
            self.keys[i - 1] = self.keys[i]

        self.n -= 1  # Reduce the count of keys
        return

    def remove_from_non_leaf(self, idx):
        """
        A function to remove the idx-th key from this node - which is a non-leaf node
        :return:
        """
        k = self.keys[idx]
        # If the child that precedes k (C[idx]) has atleast t keys, find the predecessor 'pred'
        # of k in the subtree rooted at C[idx]. Replace k by pred. Recursively delete pred in C[
        # idx]
        if self.C[idx].n >= self.t:
            pred = self.get_predecessor(idx)
            self.keys[idx] = pred
            self.C[idx].remove(pred)

        # If the child C[idx] has less that t keys, examine C[idx+1]. If C[idx+1] has atleast
        # t keys, find the successor 'succ' of k in the subtree rooted at C[idx+1] Replace k by
        # succ Recursively delete succ in C[idx+1]
        elif self.C[idx + 1].n >= self.t:
            succ = self.get_predecessor(idx)
            self.keys[idx] = succ
            self.C[idx + 1].remove(succ)

        # If both C[idx] and C[idx+1] has less that t keys,merge k and all of C[idx+1] into C[
        # idx] Now C[idx] contains 2t-1 keys Free C[idx+1] and recursively delete k from C[idx]
        else:
            self.merge(idx)
            self.C[idx].remove(k)

        return

    def get_predecessor(self, idx):
        """
        A function to get predecessor of keys[idx]
        :return:
        """
        # Keep moving to the right most node until we reach a leaf
        cur = self.C[idx]
        while cur and cur.leaf:
            cur = cur.C[cur.n]

        # Return the last key of the leaf
        return cur.keys[cur.n - 1] if cur and (cur.n - 1) in cur.keys else None

    def get_successor(self, idx):
        """
        Keep moving the left most node starting from C[idx+1] until we reach a leaf
        :param idx:
        :return:
        """
        cur = self.C[idx + 1]
        while not cur.leaf:
            cur = cur.C[0]

        return cur.keys[0]  # Return the first key of the leaf

    def fill(self, idx):
        """
        A function to fill child C[idx] which has less than t-1 keys
        :return:
        """
        # If the previous child(C[idx-1]) has more than t-1 keys, borrow a key from that child
        if idx != 0 and self.C[idx - 1].n >= self.t:
            self.borrow_from_prev(idx)

        # If the next child(C[idx+1]) has more than t-1 keys, borrow a key from that child
        elif idx != self.n and self.C[idx + 1].n >= self.t:
            self.borrow_from_next(idx)

        # Merge C[idx] with its sibling If C[idx] is the last child, merge it with with its
        # previous sibling Otherwise merge it with its next sibling
        else:
            if idx != self.n:
                self.merge(idx)
            else:
                self.merge(idx - 1)

        return

    def borrow_from_prev(self, idx):
        """
        A function to borrow a key from C[idx-1] and insert it into C[idx]
        :return:
        """
        child = self.C[idx]
        sibling = self.C[idx - 1]

        # The last key from C[idx-1] goes up to the parent and key[idx-1] from parent is inserted
        #  as the first key in C[idx]. Thus, the  loses sibling one key and child gains one key
        # Moving all key in C[idx] one step ahead
        for i in range(child.n - 1, 0, -1):
            child.keys[i + 1] = child.keys[i]

        # If C[idx] is not a leaf, move all its child pointers one step ahead
        if not child.leaf:
            for i in range(child.n, 0, -1):
                child.C[i + 1] = child.C[i]

        # Setting child's first key equal to keys[idx-1] from the current node
        child.keys[0] = self.keys[idx - 1]

        # Moving sibling's last child as C[idx]'s first child
        if not self.leaf:
            child.C[0] = sibling.C[sibling.n]

        # Moving the key from the sibling to the parent This reduces the number of keys in the
        # sibling
        self.keys[idx - 1] = sibling.keys[sibling.n - 1]

        child.n += 1
        sibling.n -= 1

        return

    def borrow_from_next(self, idx):
        """
        A function to borrow a key from the C[idx+1] and place it in C[idx]
        :return:
        """
        child, sibling = self.C[idx], self.C[idx + 1]

        # keys[idx] is inserted as the last key in C[idx]
        child.keys[child.n] = self.keys[idx]

        # Sibling's first child is inserted as the last child into C[idx]
        if not child.leaf:
            child.C[child.n + 1] = sibling.C[0]

        # The first key from sibling is inserted into keys[idx]
        self.keys[idx] = sibling.keys[0]

        # Moving all keys in sibling one step behind
        for i in range(sibling.n):
            sibling.keys[i - 1] = sibling.keys[i]

        # Moving the child pointers one step behind
        if not sibling.leaf:
            for i in range(1, sibling.n):
                sibling.C[i - 1] = sibling.C[i]

        # Increasing and decreasing the key count of C[idx] and C[idx+1] respectively
        child.n += 1
        sibling.n -= 1

        return

    def merge(self, idx):
        """
        A function to merge C[idx] with C[idx+1] C[idx+1] is freed after merging
        :type idx: int
        :return:
        """
        child = self.C[idx]
        sibling = self.C[idx + 1]

        # Pulling a key from the current node and inserting it into (t-1)th position of C[idx]
        child.keys[self.t - 1] = self.keys[idx]

        # Copying the keys from C[idx+1] to C[idx] at the end
        for i in range(sibling.n):
            child.keys[i + self.t] = sibling.keys[i]

        # Copying the child pointers from C[idx+1] to C[idx]
        if not child.leaf:
            for i in range(sibling.n):
                child.C[i + self.t] = sibling.C[i]

        # Moving all keys after idx in the current node one step before - to fill the gap created
        #  by moving keys[idx] to C[idx]
        for i in range(idx + 1, self.n):
            self.keys[i - 1] = self.keys[i]

        # Moving the child pointers after (idx+1) in the current node one step before
        for i in range(idx + 2, self.n + 1):
            self.C[i - 1] = self.C[i]

        # Updating the key count of child and the current node
        child.n += sibling.n + 1
        self.n -= 1

        del sibling  # Freeing the memory occupied by sibling
        return

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
            print(self.keys[i])

        # Print the subtree rooted with last child
        if not self.leaf:
            self.C[i].traverse()

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
        for j in range(self.n - 1, i - 1, -1):
            self.keys[j + 1] = self.keys[j]

        # Copy the middle key of y to this node
        self.keys[i] = y.keys[self.t - 1]

        # Increment count of keys in this node
        self.n = self.n + 1


if __name__ == '__main__':
    # TODO: Fix exception of this class
    tree = BTree(3)  # A B-Tree with minimum degree 3
    for i in [1, 3, 7, 10, 11, 13, 14, 15, 18, 16, 19, 24, 25,
              26, 21, 4, 5, 20, 22, 2, 17, 12, 6]:
        tree.insert(i)

    print("Traversal of tree constructed is\n")
    tree.traverse()
    print("\n")

    for j in [6, 13, 7, 4, 2]:
        tree.remove(j)
        print("Traversal of tree after removing %d\n" % j)
        tree.traverse()
        print("\n")

    # tree.remove(16)
    # print("Traversal of tree after removing %d\n" % 16)
    # tree.traverse()

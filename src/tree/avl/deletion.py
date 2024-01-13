# coding=utf-8

"""AVL Tree | Set 2 (Deletion)

We have discussed AVL insertion in the previous post. In this post, we will follow a similar
approach for deletion.

Steps to follow for deletion.
To make sure that the given tree remains AVL after every deletion, we must augment the standard
BST delete operation to perform some re-balancing. Following are two basic operations that can be
performed to re-balance a BST without violating the BST property (keys(left) < key(root) < keys(
right)).

1) Left Rotation
2) Right Rotation

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
T1, T2 and T3 are subtrees of the tree rooted with y (on left side) or x (on right side)
                y                               x
               / \     Right Rotation          /  \
              x   T3   - - - - - - - >        T1   y
             / \       < - - - - - - -            / \
            T1  T2     Left Rotation            T2  T3

Keys in both of the above trees follow the following order
      keys(T1) < key(x) < keys(T2) < key(y) < keys(T3)
So BST property is not violated anywhere.

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

Let w be the node to be deleted

1) Perform standard BST delete for w.

2) Starting from w, travel up and find the first unbalanced node. Let z be the first unbalanced
node, y be the larger height child of z, and x be the larger height child of y. Note that the
definitions of x and y are different from insertion here.

3) Re-balance the tree by performing appropriate rotations on the subtree rooted with z. There can
be 4 possible cases that needs to be handled as x, y and z can be arranged in 4 ways. Following are
the possible 4 arrangements:
    a) y is left child of z and x is left child of y (Left Left Case)
    b) y is left child of z and x is right child of y (Left Right Case)
    c) y is right child of z and x is right child of y (Right Right Case)
    d) y is right child of z and x is left child of y (Right Left Case)

Like insertion, following are the operations to be performed in above mentioned 4 cases. Note
that, unlike insertion, fixing the node z won’t fix the complete AVL tree. After fixing z,
we may have to fix ancestors of z as well (See this video lecture for proof)

a) Left Left Case
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
T1, T2, T3 and T4 are subtrees.
         z                                      y
        / \                                   /   \
       y   T4      Right Rotate (z)          x      z
      / \          - - - - - - - - ->      /  \    /  \
     x   T3                               T1  T2  T3  T4
    / \
  T1   T2
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

b) Left Right Case
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
     z                               z                           x
    / \                            /   \                        /  \
   y   T4  Left Rotate (y)        x    T4  Right Rotate(z)    y      z
  / \      - - - - - - - - ->    /  \      - - - - - - - ->  / \    / \
T1   x                          y    T3                    T1  T2 T3  T4
    / \                        / \
  T2   T3                    T1   T2

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

c) Right Right Case
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  z                                y
 /  \                            /   \
T1   y     Left Rotate(z)       z      x
    /  \   - - - - - - - ->    / \    / \
   T2   x                     T1  T2 T3  T4
       / \
     T3  T4
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

d) Right Left Case
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
   z                            z                            x
  / \                          / \                          /  \
T1   y   Right Rotate (y)    T1   x      Left Rotate(z)   z      x
    / \  - - - - - - - - ->     /  \   - - - - - - - ->  / \    / \
   x   T4                      T2   y                  T1  T2  T3  T4
  / \                              /  \
T2   T3                           T3   T4
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

Unlike insertion, in deletion, after we perform a rotation at z, we may have to perform a
rotation at ancestors of z. Thus, we must continue to trace the path until we reach the root.

"""


# Python program for deletion in AVL Tree

class Node:
    def __init__(self, key, left=None, right=None):
        self.key = key
        self.left = left
        self.right = right
        self.height = 1


class AVLTree:
    """
    Following is the C implementation for AVL Tree Deletion. The following C implementation uses
    the recursive BST delete as basis. In the recursive BST delete, after deletion,
    we get pointers to all ancestors one by one in bottom up manner. So we don’t need parent
    pointer to travel up. The recursive code itself travels up and visits all the ancestors of
    the deleted node.

    1) Perform the normal BST deletion.

    2) The current node must be one of the ancestors of the deleted node. Update the height of
    the current node.

    3) Get the balance factor (left subtree height - right subtree height) of the current node.

    4) If balance factor is greater than 1, then the current node is unbalanced and we are either
    in Left Left case or Left Right case. To check whether it is Left Left case or Left Right
    case, get the balance factor of left subtree. If balance factor of the left subtree is
    greater than or equal to 0, then it is Left Left case, else Left Right case.

    5) If balance factor is less than -1, then the current node is unbalanced and we are either
    in Right Right case or Right Left case. To check whether it is Right Right case or Right Left
    case, get the balance factor of right subtree. If the balance factor of the right subtree is
    smaller than or equal to 0, then it is Right Right case, else Right Left case.

    Time Complexity: The rotation operations (left and right rotate) take constant time as only
    few pointers are being changed there. Updating the height and getting the balance factor also
    take constant time. So the time complexity of AVL delete remains same as BST delete which is
    O(h) where h is height of the tree. Since AVL tree is balanced, the height is O(Logn). So
    time complexity of AVL delete is O(Log n).

    """

    def __init__(self, root=None):
        self.root = root

    def height(self, N):
        """A utility function to get height of the tree"""
        if N is None:
            return 0
        return N.height

    def right_rotate(self, y):
        """A utility function to right rotate subtree rooted with y"""
        x = y.left
        T2 = x.right

        # Perform rotation
        x.right = y
        y.left = T2

        # Update heights
        y.height = max(self.height(y.left), self.height(y.right)) + 1
        x.height = max(self.height(x.left), self.height(x.right)) + 1
        return x  # Return new root

    def left_rotate(self, x):
        """A utility function to left rotate subtree rooted with x"""
        y = x.right
        T2 = y.left

        # Perform rotation
        y.left = x
        x.right = T2

        # Update heights
        x.height = max(self.height(x.left), self.height(x.right)) + 1
        y.height = max(self.height(y.left), self.height(y.right)) + 1

        return y  # Return new root

    def get_balance(self, N):
        """Get Balance factor of node N"""
        if N is None:
            return 0

        return self.height(N.left) - self.height(N.right)

    def insert(self, node, key):
        # 1.  Perform the normal BST insertion
        if node is None:
            return Node(key)

        if key < node.key:
            node.left = self.insert(node.left, key)
        elif key > node.key:
            node.right = self.insert(node.right, key)
        else:  # Duplicate keys not allowed
            return node

        # 2. Update height of this ancestor node
        node.height = 1 + max(self.height(node.left), self.height(node.right))

        # 3. Get the balance factor of this ancestor node to check whether
        # this node became unbalanced
        balance = self.get_balance(node)

        # If this node becomes unbalanced, then there are 4 cases Left Left Case
        if balance > 1 and key < node.left.key:
            return self.right_rotate(node)

        # Right Right Case
        if balance < -1 and key > node.right.key:
            return self.left_rotate(node)

        # Left Right Case
        if balance > 1 and key > node.left.key:
            node.left = self.left_rotate(node.left)
            return self.right_rotate(node)

        # Right Left Case
        if balance < -1 and key < node.right.key:
            node.right = self.right_rotate(node.right)
            return self.left_rotate(node)

        # return the (unchanged) node pointer
        return node

    def min_value_node(self, node):
        """
        Given a non-empty binary search tree, return the node with minimum key value found
        in that tree.
        Note that the entire tree does not need to be searched.
        :param node:
        :return:
        """
        current = node

        # /* loop down to find the leftmost leaf */
        while current.left is not None:
            current = current.left
        return current

    def deleteNode(self, root, key):
        # STEP 1: PERFORM STANDARD BST DELETE
        if root is None:
            return root

        # If the key to be deleted is smaller than the root's key, then it lies in left subtree
        if key < root.key:
            root.left = self.deleteNode(root.left, key)

        # If the key to be deleted is greater than the root's key, then it lies in right subtree
        elif key > root.key:
            root.right = self.deleteNode(root.right, key)

        # if key is same as root's key, then this is the node to be deleted
        else:
            # node with only one child or no child
            if (root.left is None) or (root.right is None):
                temp = None
                temp = root.right if temp == root.left else root.left

                if temp is None:  # No child case
                    root = None
                else:  # One child case
                    root = temp  # Copy the contents of the non-empty child
            else:
                # node with two children: Get the inorder successor (smallest in the right subtree)
                temp = self.min_value_node(root.right)

                # Copy the inorder successor's data to this node
                self.root.key = temp.key

                # Delete the inorder successor
                root.right = self.deleteNode(root.right, temp.key)

        # If the tree had only one node then return
        if root is None:
            return root

        # STEP 2: UPDATE HEIGHT OF THE CURRENT NODE
        root.height = max(self.height(root.left), self.height(root.right)) + 1

        # STEP 3: GET THE BALANCE FACTOR OF THIS NODE (to check whether this node became
        # unbalanced)
        balance = self.get_balance(root)

        # If this node becomes unbalanced, then there are 4 cases
        # Left Left Case
        if balance > 1 and self.get_balance(root.left) >= 0:
            return self.right_rotate(root)

        # Left Right Case
        if balance > 1 and self.get_balance(root.left) < 0:
            root.left = self.left_rotate(root.left)
            return self.right_rotate(root)

        # Right Right Case
        if balance < -1 and self.get_balance(root.right) <= 0:
            return self.left_rotate(root)

        # Right Left Case
        if balance < -1 and self.get_balance(root.right) > 0:
            root.right = self.right_rotate(root.right)
            return self.left_rotate(root)

        return root

    def pre_order(self, node):
        """
        A utility function to print preorder traversal of the tree.
        The function also prints height of every node
        """
        if node is not None:
            print(node.key)
            self.pre_order(node.left)
            self.pre_order(node.right)


if __name__ == '__main__':
    tree = AVLTree()

    # Constructing tree given in the above figure
    tree.root = tree.insert(tree.root, 9)
    tree.root = tree.insert(tree.root, 5)
    tree.root = tree.insert(tree.root, 10)
    tree.root = tree.insert(tree.root, 0)
    tree.root = tree.insert(tree.root, 6)
    tree.root = tree.insert(tree.root, 11)
    tree.root = tree.insert(tree.root, -1)
    tree.root = tree.insert(tree.root, 1)
    tree.root = tree.insert(tree.root, 2)

    # The constructed AVL Tree would be
    #      9
    #     /  \
    #    1    10
    #   /  \    \
    #   0    5    11
    #  /    /  \
    # -1   2    6

    print("Preorder traversal of constructed tree is : ")
    tree.pre_order(tree.root)

    tree.root = tree.deleteNode(tree.root, 10)

    # /* The AVL Tree after deletion of 10
    #    1
    #   /  \
    #  0    9
    # /     / \
    # -1    5   11
    # /  \
    # 2    6

    print("Preorder traversal after deletion of 10 :")
    tree.pre_order(tree.root)

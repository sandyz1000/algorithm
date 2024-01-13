/* AVL Tree | Set 1 (Insertion)

AVL tree is a self-balancing Binary Search Tree (BST) where the difference between heights of left
and right subtrees cannot be more than one for all nodes.

An Example Tree that is an AVL Tree

            12
           /   \
          8    18
        /  \   /
       5  11  17
      /
     4

The above tree is AVL because differences between heights of left and right subtrees for every
node is less than or equal to 1.

An Example Tree that is NOT an AVL Tree

            12
           /   \
          8    18
        /  \   /
       5  11  17
      / \
     4  7
    /
   2

==Why AVL Trees?==
Most of the BST operations (e.g., search, max, min, insert, delete.. etc) take O(h) time where h
is the height of the BST. The cost of these operations may become O(n) for a skewed Binary tree.
If we make sure that height of the tree remains O(Logn) after every insertion and deletion,
then we can guarantee an upper bound of O(Logn) for all these operations. The height of an AVL
tree is always O(Logn) where n is the number of nodes in the tree (See this video lecture for
proof).

==Insertion==
To make sure that the given tree remains AVL after every insertion, we must augment the standard
BST insert operation to perform some re-balancing. Following are two basic operations that can be
performed to re-balance a BST without violating the BST property
(keys(left) < key(root) < keys(right)).
1) Left Rotation
2) Right Rotation

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - +
                                                                              |
T1, T2 and T3 are subtrees of the tree rooted with y (on left side)           |
or x (on right side)                                                          |
                y                               x                             |
               / \     Right Rotation          /  \                           |
              x   T3   - - - - - - - >        T1   y                          |
             / \       < - - - - - - -            / \                         |
            T1  T2     Left Rotation            T2  T3                        |
Keys in both of the above trees follow the following order                    |
      keys(T1) < key(x) < keys(T2) < key(y) < keys(T3)                        |
So BST property is not violated anywhere.                                     |
                                                                              |
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - +

Steps to follow for insertion
Let the newly inserted node be w
1) Perform standard BST insert for w.
2) Starting from x, travel up and find the first unbalanced node. Let z be the first unbalanced
node, y be the child of z that comes on the path from x to z and x be the grandchild of z that
comes on the path from x to z.

3) Re-balance the tree by performing appropriate rotations on the subtree rooted with z. There
can be 4 possible cases that needs to be handled as x, y and z can be arranged in 4 ways. Following
are the possible 4 arrangements:
    a) y is left child of z and x is left child of y (Left Left Case)
    b) y is left child of z and x is right child of y (Left Right Case)
    c) y is right child of z and x is right child of y (Right Right Case)
    d) y is right child of z and x is left child of y (Right Left Case)

Following are the operations to be performed in above mentioned 4 cases. In all of the cases,
we only need to re-balance the subtree rooted with z and the complete tree becomes balanced as
the height of subtree (After appropriate rotations) rooted with z becomes same as it was before
insertion. (See this video lecture for proof)

a) Left Left Case
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
T1, T2, T3 and T4 are subtrees.
         z                                      y
        / \                                   /   \
       y   T4      Right Rotate (z)          x      z
      / \          - - - - - - - - ->      /  \    /  \
     x   T3                               T1  T2  T3  T4
    / \
  T1   T2
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

b) Left Right Case
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
     z                               z                           x
    / \                            /   \                        /  \
   y   T4  Left Rotate (y)        x    T4  Right Rotate(z)    y      z
  / \      - - - - - - - - ->    /  \      - - - - - - - ->  / \    / \
T1   x                          y    T3                    T1  T2 T3  T4
    / \                        / \
  T2   T3                    T1   T2
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

c) Right Right Case
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  z                                y
 /  \                            /   \
T1   y     Left Rotate(z)       z      x
    /  \   - - - - - - - ->    / \    / \
   T2   x                     T1  T2 T3  T4
       / \
     T3  T4
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

d) Right Left Case
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
   z                            z                            x
  / \                          / \                          /  \
T1   y   Right Rotate (y)    T1   x      Left Rotate(z)   z      y
    / \  - - - - - - - - ->     /  \   - - - - - - - ->  / \    / \
   x   T4                      T2   y                  T1  T2  T3  T4
  / \                              /  \
T2   T3                           T3   T4
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 */

class TreeNodeII {
    key: number;
    left: TreeNodeII | null;
    right: TreeNodeII | null;
    height: number;

    constructor(key: number) {
        this.key = key;
        this.left = null;
        this.right = null;
        this.height = 1;
    }
}

class AVLTreeInsert {
    /* 
    Following is the implementation for AVL Tree Insertion. The following implementation uses
    the recursive BST insert to insert a new node. In the recursive BST insert, after insertion,
    we get pointers to all ancestors one by one in bottom up manner. So we don't need parent
    pointer to travel up. The recursive code itself travels up and visits all the ancestors of
    the newly inserted node.

    1)  Perform the normal BST insertion.

    2)  The current node must be one of the ancestors of the newly inserted node. Update the
        height of the current node.

    3)  Get the balance factor (left subtree height - right subtree height) of the current node.

    4)  If balance factor is greater than 1, then the current node is unbalanced and we are
        either in Left Left case or Left Right case. To check whether it is Left Left case or not,
        compare the newly inserted key with the key in Left subtree root.

    5)  If balance factor is less than -1, then the current node is unbalanced and we are either
        in Right Right case or Right Left case. To check whether it is Right Right case or not,
        compare the newly inserted key with the key in right subtree root.

    Python program for insertion in AVL Tree

    ------------------------------------------------------------
    ==Time Complexity:==
    ------------------------------------------------------------
    The rotation operations (left and right rotate) take constant time as only
    few pointers are being changed there. Updating the height and getting the balance factor also
    take constant time. So the time complexity of AVL insert remains same as BST insert which is
    O(h) where h is height of the tree. Since AVL tree is balanced, the height is O(Logn). So
    time complexity of AVL insert is O(Logn).

    ------------------------------------------------------------
    ==Comparison with Red Black Tree:==
    ------------------------------------------------------------
    The AVL tree and other self balancing search trees like Red Black are useful to get all
    basic operations done in O(Log n) time. The AVL trees are more balanced compared to Red Black
    Trees, but they may cause more rotations during insertion and deletion. So if your
    application involves many frequent insertions and deletions, then Red Black trees should be
    preferred. And if the insertions and deletions are less frequent and search is more frequent
    operation, then AVL tree should be preferred over Red Black Tree. 
    */
    root: TreeNodeII | null;

    constructor() {
        this.root = null;
    }

    height(N: TreeNodeII | null): number {
        /* A utility function to get height of the tree */
        if (N === null) {
            return 0;
        }
        return N.height;
    }

    right_rotate(y: TreeNodeII): TreeNodeII {
        /* A utility function to right rotate subtree rooted with y */
        const x = y.left;
        const T2 = x.right;

        // Perform rotation
        x.right = y;
        y.left = T2;

        // Update heights
        y.height = Math.max(this.height(y.left), this.height(y.right)) + 1;
        x.height = Math.max(this.height(x.left), this.height(x.right)) + 1;
        return x; // Return new root
    }

    left_rotate(x: TreeNodeII): TreeNodeII {
        /* A utility function to left rotate subtree rooted with x */
        const y = x.right;
        const T2 = y.left;

        // Perform rotation
        y.left = x;
        x.right = T2;

        // Update heights
        x.height = Math.max(this.height(x.left), this.height(x.right)) + 1;
        y.height = Math.max(this.height(y.left), this.height(y.right)) + 1;
        return y; // Return new root
    }

    get_balance(N: TreeNodeII | null): number {
        /* Get Balance factor of node N */
        if (N === null) {
            return 0;
        }
        return this.height(N.left) - this.height(N.right);
    }

    insert(node: TreeNodeII | null, key: number): TreeNodeII {
        // 1. Perform the normal BST insertion
        if (node === null) {
            return new TreeNodeII(key);
        }

        if (key < node.key) {
            node.left = this.insert(node.left, key);
        } else if (key > node.key) {
            node.right = this.insert(node.right, key);
        } else {
            // Duplicate keys not allowed
            return node;
        }

        // 2. Update height of this ancestor node
        node.height = 1 + Math.max(this.height(node.left), this.height(node.right));

        // 3. Get the balance factor of this ancestor node to check whether
        // this node became unbalanced
        const balance = this.get_balance(node);

        // If this node becomes unbalanced, then there are 4 cases Left Left Case
        if (balance > 1 && key < node.left!.key) {
            return this.right_rotate(node);
        }

        // Right Right Case
        if (balance < -1 && key > node.right!.key) {
            return this.left_rotate(node);
        }

        // Left Right Case
        if (balance > 1 && key > node.left!.key) {
            node.left = this.left_rotate(node.left!);
            return this.right_rotate(node);
        }

        // Right Left Case
        if (balance < -1 && key < node.right!.key) {
            node.right = this.right_rotate(node.right!);
            return this.left_rotate(node);
        }

        // return the (unchanged) node pointer
        return node;
    }

    pre_order(node: TreeNodeII | null): void {
        /*
        A utility function to print preorder traversal of the tree.
        The function also prints height of every node
        */
        if (node !== null) {
            console.log(node.key);
            this.pre_order(node.left);
            this.pre_order(node.right);
        }
    }
}

// const tree = new AVLTree();

// // Constructing tree given in the above figure
// tree.root = tree.insert(tree.root, 9);
// tree.root = tree.insert(tree.root, 5);
// tree.root = tree.insert(tree.root, 10);
// tree.root = tree.insert(tree.root, 0);
// tree.root = tree.insert(tree.root, 6);
// tree.root = tree.insert(tree.root, 11);
// tree.root = tree.insert(tree.root, -1);
// tree.root = tree.insert(tree.root, 1);
// tree.root = tree.insert(tree.root, 2);

// // The constructed AVL Tree would be
// //      9
// //     /  \
// //    1    10
// //   /  \    \
// //   0    5    11
// //  /    /  \
// // -1   2    6

// console.log("Preorder traversal of constructed tree is : ");
// tree.pre_order(tree.root);

const tree = new AVLTreeInsert();
// Constructing tree given in the above figure
tree.root = tree.insert(tree.root, 10);
tree.root = tree.insert(tree.root, 20);
tree.root = tree.insert(tree.root, 30);
tree.root = tree.insert(tree.root, 40);
tree.root = tree.insert(tree.root, 50);
tree.root = tree.insert(tree.root, 25);

// The constructed AVL Tree would be
//      30
//     /  \
//   20   40
//  /  \     \
// 10  25    50

console.log("Preorder traversal of constructed tree is : ");
tree.pre_order(tree.root);
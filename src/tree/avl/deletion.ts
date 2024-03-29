/* """AVL Tree | Set 2 (Deletion)

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
 */


class TreeNode {
    key: number;
    left: TreeNode | null;
    right: TreeNode | null;
    height: number;

    constructor(key: number, left: TreeNode | null = null, right: TreeNode | null = null) {
        this.key = key;
        this.left = left;
        this.right = right;
        this.height = 1;
    }
}
/* 
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
*/
class AVLTree {
    root: TreeNode | null;

    constructor(root: TreeNode | null = null) {
        this.root = root;
    }

    // height(N: TreeNode | null): number {
    //     if (N === null) {
    //         return 0;
    //     }
    //     return N.height;
    // }

    rightRotate(y: TreeNode): TreeNode {
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

    leftRotate(x: TreeNode): TreeNode {
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

    getBalance(N: TreeNode | null): number {
        if (N === null) {
            return 0;
        }

        return this.height(N.left) - this.height(N.right);
    }

    insert(node: TreeNode, key: number): TreeNode {
        // 1.  Perform the normal BST insertion
        if (node === null) {
            return new TreeNode(key);
        }

        if (key < node.key) {
            node.left = this.insert(node.left, key);
        } else if (key > node.key) {
            node.right = this.insert(node.right, key);
        } else {  // Duplicate keys not allowed
            return node;
        }

        // 2. Update height of this ancestor node
        node.height = 1 + Math.max(this.height(node.left), this.height(node.right));

        // 3. Get the balance factor of this ancestor node to check whether
        // this node became unbalanced
        const balance = this.get_balance(node);

        // If this node becomes unbalanced, then there are 4 cases Left Left Case
        if (balance > 1 && key < node.left.key) {
            return this.right_rotate(node);
        }

        // Right Right Case
        if (balance < -1 && key > node.right.key) {
            return this.left_rotate(node);
        }

        // Left Right Case
        if (balance > 1 && key > node.left.key) {
            node.left = this.left_rotate(node.left);
            return this.right_rotate(node);
        }

        // Right Left Case
        if (balance < -1 && key < node.right.key) {
            node.right = this.right_rotate(node.right);
            return this.left_rotate(node);
        }

        // return the (unchanged) node pointer
        return node;
    }

    min_value_node(node: TreeNode): TreeNode {
        /*
        Given a non-empty binary search tree, return the node with minimum key value found
        in that tree.
        Note that the entire tree does not need to be searched.
        */
        let current = node;

        // loop down to find the leftmost leaf
        while (current.left !== null) {
            current = current.left;
        }
        return current;
    }

    deleteNode(root: TreeNode, key: number): TreeNode {
        // STEP 1: PERFORM STANDARD BST DELETE
        if (root === null) {
            return root;
        }

        // If the key to be deleted is smaller than the root's key, then it lies in left subtree
        if (key < root.key) {
            root.left = this.deleteNode(root.left, key);
        }

        // If the key to be deleted is greater than the root's key, then it lies in right subtree
        else if (key > root.key) {
            root.right = this.deleteNode(root.right, key);
        }

        // if key is same as root's key, then this is the node to be deleted
        else {
            // node with only one child or no child
            if (root.left === null || root.right === null) {
                let temp = null;
                temp = root.right ? root.right : root.left;

                if (temp === null) {  // No child case
                    root = null;
                } else {  // One child case
                    root = temp;  // Copy the contents of the non-empty child
                }
            } else {
                // node with two children: Get the inorder successor (smallest in the right subtree)
                const temp = this.min_value_node(root.right);

                // Copy the inorder successor's data to this node
                root.key = temp.key;

                // Delete the inorder successor
                root.right = this.deleteNode(root.right, temp.key);
            }
        }

        // If the tree had only one node then return
        if (root === null) {
            return root;
        }

        // STEP 2: UPDATE HEIGHT OF THE CURRENT NODE
        // STEP 2: UPDATE HEIGHT OF THE CURRENT NODE
        root.height = Math.max(this.height(root.left), this.height(root.right)) + 1;

        // STEP 3: GET THE BALANCE FACTOR OF THIS NODE (to check whether this node became
        // unbalanced)
        const balance = this.get_balance(root);

        // If this node becomes unbalanced, then there are 4 cases
        // Left Left Case
        if (balance > 1 && this.get_balance(root.left) >= 0) {
            return this.right_rotate(root);
        }

        // Left Right Case
        if (balance > 1 && this.get_balance(root.left) < 0) {
            root.left = this.left_rotate(root.left);
            return this.right_rotate(root);
        }

        // Right Right Case
        if (balance < -1 && this.get_balance(root.right) <= 0) {
            return this.left_rotate(root);
        }

        // Right Left Case
        if (balance < -1 && this.get_balance(root.right) > 0) {
            root.right = this.right_rotate(root.right);
            return this.left_rotate(root);
        }

        return root;
    }

    height(node: TreeNode): number {
        if (node === null) {
            return 0;
        }
        return node.height;
    }

    get_balance(node: TreeNode): number {
        if (node === null) {
            return 0;
        }
        return this.height(node.left) - this.height(node.right);
    }

    left_rotate(z: TreeNode): TreeNode {
        const y = z.right;
        const T2 = y.left;

        // Perform rotation
        y.left = z;
        z.right = T2;

        // Update heights
        z.height = Math.max(this.height(z.left), this.height(z.right)) + 1;
        y.height = Math.max(this.height(y.left), this.height(y.right)) + 1;

        // Return the new root
        return y;
    }

    right_rotate(y: TreeNode): TreeNode {
        const x = y.left;
        const T2 = x.right;

        // Perform rotation
        x.right = y;
        y.left = T2;

        // Update heights
        y.height = Math.max(this.height(y.left), this.height(y.right)) + 1;
        x.height = Math.max(this.height(x.left), this.height(x.right)) + 1;

        // Return the new root
        return x;
    }

    pre_order(node: TreeNode): void {
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


const tree = new AVLTree();

// Constructing tree given in the above figure
tree.root = tree.insert(tree.root, 9);
tree.root = tree.insert(tree.root, 5);
tree.root = tree.insert(tree.root, 10);
tree.root = tree.insert(tree.root, 0);
tree.root = tree.insert(tree.root, 6);
tree.root = tree.insert(tree.root, 11);
tree.root = tree.insert(tree.root, -1);
tree.root = tree.insert(tree.root, 1);
tree.root = tree.insert(tree.root, 2);

// The constructed AVL Tree would be
//      9
//     /  \
//    1    10
//   /  \    \
//   0    5    11
//  /    /  \
// -1   2    6

console.log("Preorder traversal of constructed tree is : ");
tree.pre_order(tree.root);

tree.root = tree.deleteNode(tree.root, 10);
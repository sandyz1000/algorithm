"""
Construct BST from given preorder traversal | Set 1
Given preorder traversal of a binary search tree, construct the BST.

------------------------------------------------------
Example:
------------------------------------------------------
Given traversal is {10, 5, 1, 7, 40, 50}, then the output should be root of following tree.

     10
   /   \
  5     40
 /  \      \
1    7      50

"""
import typing
import sys

INT_MAX = sys.maxsize
INT_MIN = - sys.maxsize


class Node(object):
    """A Binary tree node"""

    def __init__(self, data, left=None, right=None):
        # Constructor to created a new node
        self.data = data
        self.left = left
        self.right = right


class PreIndex(object):
    def __init__(self, index=0):
        self.index = index

    
def construct_tree_v1(pre, size):
    """
    Method 1 ( O(n^2) time complexity )

    The first element of preorder traversal is always root. We first construct the root. Then we
    find the index of first element which is greater than root. Let the index be 'i'. The values
    between root and 'i' will be part of left subtree, and the values between 'i+1' and 'n-1'
    will be part of right subtree. Divide given pre[] at index "i" and recur for left and right
    sub-trees.

    For example in {10, 5, 1, 7, 40, 50}, 10 is the first element, so we make it root. Now we
    look for the first element greater than 10, we find 40. So we know the structure of BST is as
    following.

                 10
               /    \
              /      \
      {5, 1, 7}       {40, 50}

    We recursively follow above steps for subarrays {5, 1, 7} and {40, 50}, and get the complete
    tree.

    Time Complexity: O(n^2)

    # This is the main function to construct BST from given preorder traversal. 
    """
    def construct_tree_util(pre: typing.List[int], preIndex: PreIndex,
                            minimum: int, maximum: int, size: int):
        """
        A recursive function to construct BST from pre[]. preIndex is used to keep
        track of index in pre[]
        :return:
        """
        # Base Case
        if preIndex.index >= size or minimum > maximum:
            return None

        # The first node in pre-order traversal is root. So take the node at
        # preIndex from pre[] and make it root, and increment preIndex
        root = Node(pre[preIndex.index])
        preIndex.index += 1

        # If the current sub-arr has only one element, no need to recur
        if minimum == maximum:
            return root

        # Search for the first element greater than root
        i = minimum
        while i <= maximum:
            if pre[i] > root.data:
                break
            i += 1

        # Use the index of element found in pre-order to divide preorder array in two parts.
        # Left subtree and right subtree
        root.left = construct_tree_util(pre, preIndex, preIndex.index, i - 1, size)
        root.right = construct_tree_util(pre, preIndex, i, maximum, size)

        return root

    # construct_tree_util.preIndex = 0
    index = PreIndex()
    return construct_tree_util(pre, index, 0, size - 1, size)


def construct_tree_v2(pre, size):
    """
    Method 2 ( O(n) time complexity )

    The idea used here is inspired from method 3 of this post. The trick is to set a range {min
    .. max} for every node. Initialize the range as {INT_MIN .. INT_MAX}. The first node will
    definitely be in range, so create root node. To construct the left subtree, set the range as
    {INT_MIN ...root->data}. If a values is in the range {INT_MIN .. root->data}, the values is
    part part of left subtree. To construct the right subtree, set the range as {root->data..max
    .. INT_MAX}.

    A O(n) program for construction of BST from preorder traversal
    Time Complexity: O(n) recursive solution
    Time Complexity: O(n). Iterative solution The complexity looks more
    from first look. If we take a closer look, we can observe that every item is pushed and
    popped only once. So at most 2n push/pop operations are performed in the main loops of
    constructTree(). Therefore, time complexity is O(n).


    A recursive function to construct BST from pre[]. preIndex is used to keep
    track of index in pre[].
    """
    def construct_tree_util(pre, preIndex, key, minimum, maximum, size):
        if preIndex.index >= size:  # Base case
            return None

        root = None
        # If current element of pre[] is in range, then only it is part of current subtree
        if minimum < key < maximum:
            # Allocate memory for root of this subtree and increment *preIndex
            root = Node(key)
            preIndex.index = preIndex.index + 1
            if preIndex.index < size:
                # Construct the subtree under root All nodes which are in range {min .. key} will
                # go in left subtree, and first such node will be root of left subtree.
                root.left = construct_tree_util(pre, preIndex, pre[preIndex.index], minimum, key, size)
                # All nodes which are in range {key..max} will go in right subtree, and first
                # such node will be root of right subtree.
                root.right = construct_tree_util(pre, preIndex, pre[preIndex.index], key, maximum, size)

        return root

    index = PreIndex()
    return construct_tree_util(pre, index, pre[0], INT_MIN, INT_MAX, size)


def print_inorder(node):
    if node is None:
        return
    print_inorder(node.left)
    print(node.data, end=" ")
    print_inorder(node.right)


def construct_tree_v3(pre, size):
    """
    Following is a stack based iterative solution that works in O(n) time.

    1. Create an empty stack.

    2. Make the first value as root. Push it to the stack.

    3. Keep on popping while the stack is not empty and the next value is greater than stack's
    top value. Make this value as the right child of the last popped node. Push the new node to
    the stack.

    4. If the next value is less than the stack's top value, make this value as the left child of
    the stack's top node. Push the new node to the stack.

    5. Repeat steps 2 and 3 until there are items remaining in pre[].

    Time Complexity: O(n). The complexity looks more from first look. If we take a closer look,
    we can observe that every item is pushed and popped only once. So at most 2n push/pop
    operations are performed in the main loops of constructTree(). Therefore, time complexity is
    O(n).
    
    A O(n) iterative program for construction of BST from preorder traversal
    A binary tree node has data, pointer to left child and a pointer to right child
    The main function that constructs BST from pre[]
    :param pre:
    :param size:
    :return:
    """
    # Create a stack of capacity equal to size
    stack = []

    # The first element of pre[] is always root
    root = Node(pre[0])
    stack.append(root)  # Push root

    # Iterate through rest of the size-1 items of given preorder array
    for i in range(1, size):
        temp = None
        # Keep on popping while the next value is greater than stack's top value.
        while not stack.is_empty() and pre[i] > stack[-1]:
            temp = stack.pop()

        # Make this greater value as the right child and push it to the stack
        if temp is not None:
            temp.right = Node(pre[i])
            stack.append(temp.right)

        # If the next value is less than the stack's top value, make this value
        # as the left child of the stack's top node. Push the new node to stack
        else:
            stack[-1].left = Node(pre[i])
            stack.push(stack[-1].left)
    return root


if __name__ == '__main__':
    pre = [10, 5, 1, 7, 40, 50]
    size = len(pre)
    # print("\nIterative Method: Inorder traversal of the constructed tree: ")
    # bst = BinarySearchTreeMethod1()
    # root = bst.construct_tree(pre, size)
    # bst.print_inorder(root)
    # # print("\n")

    # print("\nIterative Method-2: Inorder traversal of the constructed tree: ")
    # bst = BinarySearchTreeMethod2()
    # root = bst.construct_tree(pre, size)
    # bst.print_inorder(root)

    # print("\n")
    print("\nRecursion Method: Inorder traversal of the constructed tree:")
    root = construct_tree_v1(pre, size)
    print_inorder(root)

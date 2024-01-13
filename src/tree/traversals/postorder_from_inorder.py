"""
Given Inorder and Preorder traversals of a binary tree, print Postorder traversal.

Example:
---------------------------------------------
Input: Inorder traversal in = [4, 2, 5, 1, 3, 6]
Preorder traversal pre = [1, 2, 4, 5, 3, 6]

Output:
Postorder traversal is [4, 5, 2, 6, 3, 1]
Traversals in the above example represents following tree
---------------------------------------------
        1
      /   \
     2     3
   /   \    \
  4     5    6

"""


# Python program to print postorder traversal from preorder and inorder traversals

def search(arr, x, n):
    """A utility function to search x in arr[] of size n"""
    for i in range(n):
        if arr[i] == x:
            return i
    return -1


def print_post_order(ino, pre, n):
    """
    Prints postorder traversal from given inorder and preorder traversals
    :param ino: list(int)
    :param pre: list(int)
    :param n: int
    :return:
    """
    # The first element in pre[] is always root_index, search it in ino[] to find left
    # and right subtrees
    root_index = search(ino, pre[0], n)

    # If left subtree is not empty, print left subtree
    if root_index != 0:
        print_post_order(ino, pre[1:], root_index)

    # If right subtree is not empty, print right subtree
    if root_index != n - 1:
        print_post_order(ino[root_index + 1:], pre[root_index + 1:], n - root_index - 1)

    print(pre[0], end=" ")  # Print root_index


if __name__ == '__main__':
    ino = [4, 2, 5, 1, 3, 6]
    pre = [1, 2, 4, 5, 3, 6]
    n = len(ino)
    print("Postorder traversal \n")
    print_post_order(ino, pre, n)

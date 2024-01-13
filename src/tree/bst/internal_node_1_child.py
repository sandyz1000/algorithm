"""
Check if each internal node of a BST has exactly one child
Given Preorder traversal of a BST, check if each non-leaf node has only one child. Assume that the
BST contains unique entries.

Examples

Input: pre[] = {20, 10, 11, 13, 12}
Output: Yes
The give array represents following BST. In the following BST, every internal node has exactly
1 child. Therefor, the output is true.

        20
       /
      10
       \
        11
          \
           13
           /
         12

In Preorder traversal, descendants (or Preorder successors) of every node appear after the node.
In the above example, 20 is the first node in preorder and all descendants of 20 appear after it.
All descendants of 20 are smaller than it. For 10, all descendants are greater than it. In
general, we can say, if all internal nodes have only one child in a BST, then all the descendants
of every node are either smaller or larger than the node. The reason is simple, since the tree is
BST and every node has only one child, all descendants of a node will either be on left side or
right side, means all descendants will either be smaller or greater.

"""


def has_only_one_child_v1(pre, size):
    """
    :param pre:
    :param size:
    :return:
    """
    for i in range(size - 1):
        next_diff = pre[i] - pre[i + 1]
        last_diff = pre[i] - pre[size - 1]
        if next_diff * last_diff < 0:
            return False
    return True


def has_only_one_child_v2(pre, size):
    # Initialize min and max using last two elements
    if pre[size - 1] > pre[size - 2]:
        maximum = pre[size - 1]
        minimum = pre[size - 2]
    else:
        maximum = pre[size - 2]
        minimum = pre[size - 1]

    # Every element must be either smaller than min or greater than maximum
    for i in range(size - 3, -1, -1):
        if pre[i] < minimum:
            minimum = pre[i]
        elif pre[i] > maximum:
            maximum = pre[i]
        else:
            return False
    return True


if __name__ == '__main__':
    pre = [8, 3, 5, 7, 6]
    size = len(pre)
    print("Yes" if has_only_one_child_v2(pre, size) else "No")
    print("Yes" if has_only_one_child_v1(pre, size) else "No")

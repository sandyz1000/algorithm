"""
Maximum Path Sum in a Binary Tree
Given a binary tree, find the maximum path sum. The path may start and end at any node in the tree.

Example:

Input: Root of below tree
       1
      / \
     2   3
Output: 6

See below diagram for another example.
1+2+3


For each node there can be four ways that the max path goes through the node:
1. Node only
2. Max path through Left Child + Node
3. Max path through Right Child + Node
4. Max path through Left Child + Node + Max path through Right Child

The idea is to keep trace of four paths and pick up the max one in the end. An important thing to note is,
root of every subtree need to return maximum path sum such that at most one child of root is involved. This is needed
for parent function call. In below code, this sum is stored in 'max_single' and returned by the recursive function. """


# Python program to find maximum path sum in Binary Tree

# A Binary Tree Node
class Node:

    # Constructor to create a new node
    def __init__(self, data):
        self.data = data
        self.left = None
        self.right = None


def findMaxUtil(root):
    """
    This function returns overall maximum path sum in 'res'
    And returns max path sum going through root
    :param root:
    :return:
    """
    # Base Case
    if root is None:
        return 0

    # l and r store maximum path sum going through left
    # and right child of root respectively
    l = findMaxUtil(root.left)
    r = findMaxUtil(root.right)

    # Max path for parent call of root. This path must include at most one child of root
    max_single = max(max(l, r) + root.data, root.data)

    # Max top represents the sum when the node under consideration is the root of the maxSum path and
    # no ancestor of root are there in max sum path
    max_top = max(max_single, l + r + root.data)

    # Static variable to store the changes Store the maximum result
    findMaxUtil.res = max(findMaxUtil.res, max_top)

    return max_single


def findMaxSum(root):
    """Return maximum path sum in tree with given root"""
    # Initialize result
    findMaxUtil.res = float("-inf")

    # Compute and return result
    findMaxUtil(root)
    return findMaxUtil.res


if __name__ == '__main__':
    root = Node(10)
    root.left = Node(2)
    root.right = Node(10)
    root.left.left = Node(20)
    root.left.right = Node(1)
    root.right.right = Node(-25)
    root.right.right.left = Node(3)
    root.right.right.right = Node(4)
    print("Max path sum is ", findMaxSum(root))

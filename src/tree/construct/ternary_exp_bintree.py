"""
Convert Ternary Expression to a Binary Tree
Given a string that contains ternary expressions. The expressions may be nested, task is convert
the given ternary expression to a binary Tree.

Examples:
-------------------------------------------
Input :  string expression =  a?b:c
Output :        a
              /  \
             b    c

Input : expression =  a?b?c:d:e
Output :     a
           /  \
          b    e
        /  \
       c    d

Explanation:
-------------------------------------------
Idea is that we traverse a string make first character as root and do following step recursively .
1.  If we see Symbol '?' then we add next character as the left child of root.
2.  If we see Symbol ':' then we add it as the right child of current root.
3.  do this process until we traverse all element of "String".

"""
from __future__ import print_function
# Python program to covert a ternary expreesion to a tree.


class Node:
    def __init__(self, key, left=None, right=None):
        self.data = key
        self.left = left
        self.right = right


def convert_expression(expression, i):
    """
    Function to convert Ternary Expression to a Binary Tree. It return the root of tree
    :param expression: str
    :param i: int
    :return:
    """
    if i >= len(expression):  # Base case
        return None

    # store current character of expression_string [ 'a' to 'z']
    root = Node(expression[i])
    i += 1  # Move ahead in str

    # if current character of ternary expression is '?' then we add next character
    # as a left child of current node
    if i < len(expression) and expression[i] == '?':
        root.left = convert_expression(expression, i + 1)

    # else we have to add it as a right child of current node expression.at(0) == ':'
    elif i < len(expression):
        root.right = convert_expression(expression, i + 1)

    return root


def print_preorder(root):
    if not root:
        return None

    print(root.data, end=" ")
    print_preorder(root.left)
    print_preorder(root.right)


if __name__ == '__main__':
    expression = "a?b?c:d:e"
    root = convert_expression(expression, 0)
    print_preorder(root)

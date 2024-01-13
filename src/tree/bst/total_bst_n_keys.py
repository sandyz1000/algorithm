"""
Total number of possible Binary Search Trees with n keys
http://www.geeksforgeeks.org/total-number-of-possible-binary-search-trees-with-n-keys/

Total number of possible Binary Search Trees with n different keys = Catalan number Cn =
(2n)!/(n+1)!*n!

For n = 0, 1, 2, 3, .. values of Catalan numbers are 1, 1, 2, 5, 14, 42, 132, 429, 1430, 4862,
.. So are numbers of Binary Search Trees.

==Explanation:==

Here is a systematic way to enumerate these BSTs. Consider all possible binary search trees with
each element at the root. If there are n nodes, then for each choice of root node, there are n -
1 non-root nodes and these non-root nodes must be partitioned into those that are less than a
chosen root and those that are greater than the chosen root.

Let's say node i is chosen to be the root. Then there are i - 1 nodes smaller than i and n - i
nodes bigger than i. For each of these two sets of nodes, there is a certain number of possible
subtrees.

Let t(n) be the total number of BSTs with n nodes. The total number of BSTs with i at the root is
t(i - 1) t(n - i). The two terms are multiplied together because the arrangements in the left and
right subtrees are independent. That is, for each arrangement in the left tree and for each
arrangement in the right tree, you get one BST with i at the root.

t(n) = sum(t(i-1) * t(n-i))  i -> 1 to n
"""
from __future__ import print_function


# See http://www.geeksforgeeks.org/program-nth-catalan-number/
# for reference of below code.

def binomial_coeff(n, k):
    res = 1

    # Since C(n, k) = C(n, n-k)
    if k > n - k:
        k = n - k

    # Calculate value of [n*(n-1)*---*(n-k+1)] / [k*(k-1)*---*1]
    for i in range(k):
        res *= (n - i)
        res /= (i + 1)
    return res


def catalan(n):
    """A Binomial coefficient based function to find nth catalan number in O(n) time"""
    # Calculate value of 2nCn
    c = binomial_coeff(2 * n, n)
    return c / (n + 1)


if __name__ == '__main__':
    pass

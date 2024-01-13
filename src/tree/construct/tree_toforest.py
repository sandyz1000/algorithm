"""
Convert a tree to forest of even nodes

Given a tree of n even nodes. The task is to find the maximum number of edges to be removed from
the given tree to obtain forest of trees having even number of nodes. This problem is always
solvable as given graph has even nodes.

------------------------------------------------------
Examples:
------------------------------------------------------
Input : n = 10
Edge 1: 1 3
Edge 2: 1 6
Edge 3: 1 2
Edge 4: 3 4
Edge 5: 6 8
Edge 6: 2 7
Edge 7: 2 5
Edge 8: 4 9
Edge 9: 4 10

Output : 2

By removing 2 edges (1,2) and (1,3) we can obtain the forest with even node tree.

              (1)
           /   |   \
          /    |    \
         (2)   (3)  (4)
        /      |    /  \
       (5)    (6)  (7) (8)
      /  \
    (9)  (10)

Dotted line shows removed edges. Any further removal of edge will not satisfy the even
nodes condition. """

from __future__ import print_function


# Python program to find maximum number to be removed to convert a tree into forest contains trees
# of even number of nodes
# Time Complexity: O(n)


class IntegerPointer(object):
    def __init__(self, value):
        self.value = value


class TreeToForest(object):
    ans = 0

    def dfs(self, tree, visit, node):
        """
        Return the number of nodes of subtree having node as a root.
        :param tree: list([])
        :param visit: list(int)
        :param node:
        :return:
        """
        num, temp = 0, 0
        visit[node] = 1  # Mark node as visited.

        # Traverse the adjacency list to find non-visited node.
        for i in range(len(tree[node])):
            if visit[tree[node][i]] == 0:
                # Finding number of nodes of the subtree of a subtree.
                temp = self.dfs(tree, visit, tree[node][i])
                if temp % 2:  # If nodes are even, increment number of edges to removed.
                    num += temp
                else:  # Else leave the node as child of subtree.
                    self.ans += 1
        return num + 1

    def min_edge(self, tree, n):
        """
        --------------------------------------------------
        Explanation:
        --------------------------------------------------

        Find a subtree with even number of nodes and remove it from rest of tree by removing the
        edge connecting it. After removal, we are left with tree with even node only because
        initially we have even number of nodes in the tree and removed subtree has also even
        node. Repeat the same procedure until we left with the tree that cannot be further
        decomposed in this manner.

        To do this, the idea is to use Depth First Search to traverse the tree. Implement DFS
        function in such a manner that it will return number of nodes in the subtree whose root
        is node on which DFS is performed. If the number of nodes is even then remove the edge,
        else ignore.


        Return the maximum number of edge to remove to make forest."""
        visit = [0 for i in range(n + 2)]
        self.dfs(tree, visit, 1)
        return self.ans


if __name__ == '__main__':
    # Output: 2
    try:
        n = 10
        tree = [[] for i in range(n + 2)]
        tree[1].append(3)
        tree[1].append(6)
        tree[1].append(2)

        tree[2].append(1)
        tree[2].append(7)
        tree[2].append(5)

        tree[3].append(4)
        tree[3].append(1)

        tree[4].append(3)
        tree[4].append(9)
        tree[4].append(10)

        tree[5].append(2)

        tree[6].append(1)
        tree[6].append(8)

        tree[7].append(2)

        tree[8].append(6)

        tree[9].append(4)

        tree[10].append(4)

        test = TreeToForest()
        print(test.min_edge(tree, n))
    except KeyboardInterrupt:
        pass
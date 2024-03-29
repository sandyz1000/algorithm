/* 
Detect cycle in an undirected graph using BFS

https://www.geeksforgeeks.org/detect-cycle-in-an-undirected-graph-using-bfs/

Given an undirected graph, how to check if there is a cycle in the graph?
For example, the following graph has a cycle 1-0-2-1.

        1 --- 0 --- 3
        |    /      |
        |   /       |
        2 -/        4

Explanation:
------------
We have discussed cycle detection for directed graph. We have also discussed a union-find
algorithm for cycle detection in undirected graphs. The time complexity of the union-find
algorithm is O(ELogV). Like directed graphs, we can use DFS to detect cycle in an undirected
graph in O(V+E) time. We do a DFS traversal of the given graph. For every visited vertex 'v',
if there is an adjacent 'u' such that u is already visited and u is not parent of v, then there
is a cycle in graph. If we don't find such an adjacent for any vertex, we say that there is no
cycle. The assumption of this approach is that there are no parallel edges between any two
vertices.

Time Complexity: The program does a simple DFS Traversal of graph and graph is represented
using adjacency list. So the time complexity is O(V+E)

 */

/* """
Depth First Traversal or DFS for a Graph

http://www.geeksforgeeks.org/depth-first-traversal-for-a-graph/

Depth First Traversal (or Search) for a graph is similar to Depth First Traversal of a tree.
The only catch here is, unlike trees, graphs may contain cycles, so we may come to the same node
again. To avoid processing a node more than once, we use a boolean visited array.

For example, in the following graph, we start traversal from vertex 2. When we come to vertex 0,
we look for all adjacent vertices of it. 2 is also an adjacent vertex of 0. If we don't mark
visited vertices, then 2 will be processed again and it will become a non-terminating process. A
Depth First Traversal of the following graph is 2, 0, 1, 3.

            0 -------> 1
            A       /
            |      /
            |     /
            V <--/
   start--> 2 -------> 3 <- self loop

Time Complexity: O(V+E) where V is number of vertices in the graph and E is number of edges in
the graph
""" */
// TypeScript program to print DFS traversal for a complete graph

// This class represents a directed graph using adjacency list representation
export class Graph {
  private graph: { [key: number]: number[] };

  constructor() {
    // default dictionary to store graph
    this.graph = {};
  }

  // function to add an edge to graph
  addEdge(u: number, v: number): void {
    if (!this.graph[u]) {
      this.graph[u] = [];
    }
    this.graph[u].push(v);
  }

  // A function used by DFS
  private dfsUtil(v: number, visited: boolean[]): void {
    // Mark the current node as visited and print it
    visited[v] = true;
    console.log(v);

    // Recur for all the vertices adjacent to this vertex
    const neighbors = this.graph[v] || [];
    for (const i of neighbors) {
      if (!visited[i]) {
        this.dfsUtil(i, visited);
      }
    }
  }

  dfs(src: number = 0): void {
    // total vertices
    const V = Object.keys(this.graph).length;

    // Mark all the vertices as not visited
    const visited: boolean[] = Array(V).fill(false);

    this.dfsUtil(src, visited);

    // Call the recursive helper function to print DFS traversal starting from all vertices one by one
    for (let i = 0; i < V; i++) {
      if (!visited[i]) {
        this.dfsUtil(i, visited);
      }
    }
  }
}

if (require.main === module) {
  // Output: 0, 1, 2, 3
  const g = new Graph();
  g.addEdge(0, 1);
  g.addEdge(0, 2);
  g.addEdge(1, 2);
  g.addEdge(2, 0);
  g.addEdge(2, 3);
  g.addEdge(3, 3);

  console.log("Following is Depth First Traversal");
  g.dfs(2);


}
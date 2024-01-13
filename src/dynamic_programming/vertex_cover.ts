/* 
# Vertex Cover Problem | Set 1 (Introduction and Approximate Algorithm)

# http://www.geeksforgeeks.org/vertex-cover-problem-set-1-introduction-approximate-algorithm-2/

# A vertex cover of an undirected graph is a subset of its vertices such that for every edge (u,
# v) of the graph, either 'u' or 'v' is in vertex cover. Although the name is Vertex Cover,
# the set covers all edges of the given graph. Given an undirected graph, the vertex cover problem
# is to find minimum size vertex cover.

# Vertex Cover Problem is a known NP Complete problem, i.e., there is no polynomial time solution for
# this unless P = NP. There are approximate polynomial time algorithms to solve the problem though.

# Approximate Algorithm for Vertex Cover:
# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
# 1) Initialize the result as {}
# 2) Consider a set of all edges in given graph.  Let the set be E.
# 3) Do following while E is not empty
#     a) Pick an arbitrary edge (u, v) from set E and add 'u' and 'v' to result
#     b) Remove all edges from E which are either incident on u or v.
# 4) Return result
# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
#                     (0)    (2)                  (0)---(2)
#                         \   |                           \
#                          \  |                      /---/(4)
# (0)   (1)           (1) ---(3)                  (1)   (3)
# No vertex cover     min vertex cover {3}        Min vertex cover {4, 2} or {4, 0}
 */

export class Graph {
  V: number;
  adj: { [key: number]: number[] };

  constructor(V: number) {
    this.V = V; // No. of vertices
    this.adj = {};
  }

  addEdge(v: number, w: number) {
    // Function to add an edge into the graph
    if (!this.adj[v]) {
      this.adj[v] = [];
    }
    if (!this.adj[w]) {
      this.adj[w] = [];
    }

    this.adj[v].push(w); // Add w to v's list.
    this.adj[w].push(v); // Graph is undirected
  }

  printVertexCover() {
    // The function to print vertex cover
    // Initialize all vertices as not visited.
    const visited: boolean[] = Array(this.V).fill(false);

    // Consider all edges one by one
    for (let u = 0; u < this.V; u++) {
      // An edge is only picked when both visited[u] and visited[v] are false
      if (!visited[u]) {
        // Go through all adjacent of u and pick the first not yet visited vertex
        // (We are basically picking an edge (u, v) from remaining edges.
        for (const v of this.adj[u]) {
          if (!visited[v]) {
            // Add the vertices (u, v) to the result set. We make the vertex u and v
            // visited so that all edges from/to them would be ignored
            visited[v] = true;
            visited[u] = true;
            break;
          }
        }
      }
    }

    // Print the vertex cover
    for (let j = 0; j < this.V; j++) {
      if (visited[j]) {
        console.log(j);
      }
    }
  }
}

if (require.main === module) {
  // Test case
  // Output: 0 1 3 4 5 6
  // Time Complexity of above algorithm is O(V + E).
  // Create a graph given in the above diagram
  const g = new Graph(7);
  g.addEdge(0, 1);
  g.addEdge(0, 2);
  g.addEdge(1, 3);
  g.addEdge(3, 4);
  g.addEdge(4, 5);
  g.addEdge(5, 6);

  g.printVertexCover();

}

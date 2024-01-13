/* """
Eulerian path and circuit for undirected graph

Eulerian Path is a path in graph that visits every edge exactly once. Eulerian Circuit is an
Eulerian Path which starts and ends on the same vertex.

    ---- REFER -- DIAGRAM --
    http://www.geeksforgeeks.org/eulerian-path-and-circuit/

How to find whether a given graph is Eulerian or not?
The problem is same as following question. "Is it possible to draw a given graph without lifting
pencil from the paper and without tracing any of the edges more than once".

A graph is called Eulerian if it has an Eulerian Cycle and called Semi-Eulerian if it has an
Eulerian Path. The problem seems similar to Hamiltonian Path which is NP complete problem for a
general graph. Fortunately, we can find whether a given graph has a Eulerian Path or not in
polynomial time. In fact, we can find it in O(V+E) time.

Following are some interesting properties of undirected graphs with an Eulerian path and cycle.
We can use these properties to find whether a graph is Eulerian or not.

Eulerian Cycle
An undirected graph has Eulerian cycle if following two conditions are true.
a)  All vertices with non-zero degree are connected. We don't care about vertices with zero degree
    because they don't belong to Eulerian Cycle or Path (we only consider all edges).
b)  All vertices have even degree.

Eulerian Path
An undirected graph has Eulerian Path if following two conditions are true.
a)  Same as condition (a) for Eulerian Cycle
b)  If zero or two vertices have odd degree and all other vertices have even degree. Note that only
    one vertex with odd degree is not possible in an undirected graph (sum of all degrees is always
    even in an undirected graph)

Note that a graph with no edges is considered Eulerian because there are no edges to traverse.

How does this work?
In Eulerian path, each time we visit a vertex v, we walk through two unvisited edges with one end
point as v. Therefore, all middle vertices in Eulerian Path must have even degree. For Eulerian
Cycle, any vertex can be middle vertex, therefore all vertices must have even degree.

"""
 */


// TypeScript program to check if a given graph is Eulerian or not
// Time Complexity : O(V+E)

// This class represents an undirected graph using adjacency list representation
export class Graph {
  private V: number; // No. of vertices
  private graph: { [key: number]: number[] }; // default dictionary to store graph

  constructor(vertices: number) {
    this.V = vertices;
    this.graph = {};
  }

  // function to add an edge to the graph
  addEdge(u: number, v: number): void {
    if (!this.graph[u]) {
      this.graph[u] = [];
    }
    if (!this.graph[v]) {
      this.graph[v] = [];
    }
    this.graph[u].push(v);
    this.graph[v].push(u);
  }

  // A function used by isConnected
  private DFSUtil(v: number, visited: boolean[]): void {
    // Mark the current node as visited
    visited[v] = true;

    // Recur for all the vertices adjacent to this vertex
    const neighbors = this.graph[v] || [];
    for (const i of neighbors) {
      if (!visited[i]) {
        this.DFSUtil(i, visited);
      }
    }
  }

  isConnected(): boolean {
    /**
     * Method to check if all non-zero degree vertices are connected.
     * It mainly does DFS traversal starting from a node with a non-zero degree
     */
    // Mark all the vertices as not visited
    const visited: boolean[] = Array(this.V).fill(false);
    let i = 0;

    // Find a vertex with non-zero degree
    for (i = 0; i < this.V; i++) {
      if ((this.graph[i] || []).length > 1) {
        break;
      }
    }

    // If there are no edges in the graph, return true
    if (i === this.V - 1) {
      return true;
    }

    // Start DFS traversal from a vertex with non-zero degree
    this.DFSUtil(i, visited);

    // Check if all non-zero degree vertices are visited
    for (i = 0; i < this.V; i++) {
      if (!visited[i] && (this.graph[i] || []).length > 0) {
        return false;
      }
    }

    return true;
  }

  isEulerian(): number {
    /**
     * The function returns one of the following values
     * 0 --> If the graph is not Eulerian
     * 1 --> If the graph has an Euler path (Semi-Eulerian)
     * 2 --> If the graph has an Euler Circuit (Eulerian)
     */
    // Check if all non-zero degree vertices are connected
    if (!this.isConnected()) {
      return 0;
    } else {
      // Count vertices with an odd degree
      let odd = 0;
      for (let i = 0; i < this.V; i++) {
        if ((this.graph[i] || []).length % 2 !== 0) {
          odd += 1;
        }
      }

      // If the odd count is 2, then it's semi-eulerian.
      // If the odd count is 0, then it's eulerian
      // If the count is more than 2, then the graph is not Eulerian
      // Note that the odd count can never be 1 for an undirected graph
      if (odd === 0) {
        return 2;
      } else if (odd === 2) {
        return 1;
      } else if (odd > 2) {
        return 0;
      }

      return 0;
    }
  }

  // Function to run test cases
  test(): void {
    const res = this.isEulerian();
    if (res === 2) {
      console.log("graph has an Euler cycle");
    } else if (res === 1) {
      console.log("graph has an Euler path");
    } else {
      console.log("graph is not Eulerian");
    }
  }
}

if (require.main === module) {
  // Time Complexity: O(V+E)
  const g1 = new Graph(5);
  g1.addEdge(1, 0);
  g1.addEdge(0, 2);
  g1.addEdge(2, 1);
  g1.addEdge(0, 3);
  g1.addEdge(3, 4);
  g1.test();

  const g2 = new Graph(5);
  g2.addEdge(1, 0);
  g2.addEdge(0, 2);
  g2.addEdge(2, 1);
  g2.addEdge(0, 3);
  g2.addEdge(3, 4);
  g2.addEdge(4, 0);
  g2.test();

  const g3 = new Graph(5);
  g3.addEdge(1, 0);
  g3.addEdge(0, 2);
  g3.addEdge(2, 1);
  g3.addEdge(0, 3);
  g3.addEdge(3, 4);
  g3.addEdge(1, 3);
  g3.test();

  // Let us create a graph with 3 vertices
  // connected in the form of a cycle
  const g4 = new Graph(3);
  g4.addEdge(0, 1);
  g4.addEdge(1, 2);
  g4.addEdge(2, 0);
  g4.test();

  // Let us create a graph with all vertices
  // with zero degree
  const g5 = new Graph(3);
  g5.test();

}
/* """Tarjan's Algorithm to find Strongly Connected Components
http://www.geeksforgeeks.org/tarjan-algorithm-find-strongly-connected-components/

A directed graph is strongly connected if there is a path between all pairs of vertices.
A strongly connected component (SCC) of a directed graph is a maximal strongly connected subgraph.
For example, there are 3 SCCs in the following graph.

        (1) --- > (0) --- > (3)
        |       /           |
        |     /             |
        |   /               |
        (2)                 (4)

Tarjan Algorithm is based on following facts:
1. DFS search produces a DFS tree/forest
2. Strongly Connected Components form subtrees of the DFS tree.
3. If we can find head of such subtrees, we can print/store all the nodes in that subtree
(including head) and that will be one SCC.
4. There is no back edge from one SCC to another (There can be cross edges, but cross edges will
not be used while processing the graph).

To find head of a SCC, we calculate desc and low array (as done for articulation point, bridge,
biconnected component). As discussed in the previous posts, low[u] indicates earliest visited
vertex (the vertex with minimum discovery time) that can be reached from subtree rooted with u.
A node u is head if disc[u] = low[u].

# TS program to find strongly connected components in a given
# directed graph using Tarjan's algorithm (single DFS)
# Time Complexity : O(V+E)


"""
 */
// This class represents a directed graph using adjacency list representation

export class Graph {
  private V: number;
  private graph: { [key: number]: number[] };
  private Time: number;

  constructor(vertices: number) {
    // No. of vertices
    this.V = vertices;

    // default dictionary to store graph
    this.graph = {};

    this.Time = 0;
  }

  // function to add an edge to the graph
  public addEdge(u: number, v: number): void {
    if (!this.graph[u]) {
      this.graph[u] = [];
    }
    this.graph[u].push(v);
  }

  private SCCUtil(u: number, low: number[], disc: number[], stackMember: boolean[], st: number[]): void {
    /**
     * A recursive function that finds and prints strongly connected components using DFS traversal
     * @param u The vertex to be visited next
     * @param low earliest visited vertex (the vertex with minimum discovery time) that can
     * be reached from the subtree rooted with the current vertex
     * @param disc Stores discovery times of visited vertices
     * @param stackMember bit/index array for faster check whether a node is in the stack
     * @param st To store all the connected ancestors (could be part of SCC)
     */
    // Initialize discovery time and low value
    disc[u] = this.Time;
    low[u] = this.Time;
    this.Time += 1;
    stackMember[u] = true;
    st.push(u);

    // Go through all vertices adjacent to this
    for (const v of this.graph[u] || []) {
      // If v is not visited yet, then recur for it
      if (disc[v] === -1) {
        this.SCCUtil(v, low, disc, stackMember, st);

        // Check if the subtree rooted with v has a connection to
        // one of the ancestors of u
        // Case 1 (per above discussion on Disc and Low value)
        low[u] = Math.min(low[u], low[v]);
      } else if (stackMember[v]) {
        // Update the low value of 'u' only if 'v' is still in the stack (i.e., it's a back edge, not a cross edge).
        // Case 2 (per above discussion on Disc and Low value)
        low[u] = Math.min(low[u], disc[v]);
      }
    }

    // head node found, pop the stack and print an SCC
    let w = -1; // To store stack-extracted vertices
    if (low[u] === disc[u]) {
      while (w !== u) {
        w = st.pop()!;
        console.log(w);
        stackMember[w] = false;
      }

      console.log("");
    }
  }

  public SCC(): void {
    /** The function to do DFS traversal. It uses recursive SCCUtil() */
    // Mark all the vertices as not visited and Initialize parent and visited,
    // and ap(articulation point) arrays
    const disc: number[] = Array.from({ length: this.V }, () => -1);
    const low: number[] = Array.from({ length: this.V }, () => -1);
    const stackMember: boolean[] = Array.from({ length: this.V }, () => false);
    const st: number[] = [];

    // Call the recursive helper function to find articulation points in DFS tree
    // rooted with vertex 'i'
    for (let i = 0; i < this.V; i++) {
      if (disc[i] === -1) {
        this.SCCUtil(i, low, disc, stackMember, st);
      }
    }
  }
}

if (require.main === module) {

  const g1: Graph = new Graph(5);
  g1.addEdge(1, 0);
  g1.addEdge(0, 2);
  g1.addEdge(2, 1);
  g1.addEdge(0, 3);
  g1.addEdge(3, 4);
  console.log("SSC in the first graph ");
  g1.SCC();

  const g2: Graph = new Graph(4);
  g2.addEdge(0, 1);
  g2.addEdge(1, 2);
  g2.addEdge(2, 3);
  console.log("SSC in the second graph ");
  g2.SCC();

  const g3: Graph = new Graph(7);
  g3.addEdge(0, 1);
  g3.addEdge(1, 2);
  g3.addEdge(2, 0);
  g3.addEdge(1, 3);
  g3.addEdge(1, 4);
  g3.addEdge(1, 6);
  g3.addEdge(3, 5);
  g3.addEdge(4, 5);
  console.log("SSC in the third graph ");
  g3.SCC();

  const g4: Graph = new Graph(11);
  g4.addEdge(0, 1);
  g4.addEdge(0, 3);
  g4.addEdge(1, 2);
  g4.addEdge(1, 4);
  g4.addEdge(2, 0);
  g4.addEdge(2, 6);
  g4.addEdge(3, 2);
  g4.addEdge(4, 5);
  g4.addEdge(4, 6);
  g4.addEdge(5, 6);
  g4.addEdge(5, 7);
  g4.addEdge(5, 8);
  g4.addEdge(5, 9);
  g4.addEdge(6, 4);
  g4.addEdge(7, 9);
  g4.addEdge(8, 9);
  g4.addEdge(9, 8);
  console.log("SSC in the fourth graph ");
  g4.SCC();

  const g5: Graph = new Graph(5);
  g5.addEdge(0, 1);
  g5.addEdge(1, 2);
  g5.addEdge(2, 3);
  g5.addEdge(2, 4);
  g5.addEdge(3, 0);
  g5.addEdge(4, 2);
  console.log("SSC in the fifth graph ");
  g5.SCC();
}

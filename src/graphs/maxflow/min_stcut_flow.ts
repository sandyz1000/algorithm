/* """Find minimum s-t cut in a flow network

In a flow network, an s-t cut is a cut that requires the source ‘s’ and the sink ‘t’ to be in
different subsets, and it consists of edges going from the source’s side to the sink’s side. The
capacity of an s-t cut is defined by the sum of capacity of each edge in the cut-set. (Source:
Wiki)

The problem discussed here is to find minimum capacity s-t cut of the given network. Expected
output is all edges of the minimum cut.

------------------------------------------------------------
Example:
------------------------------------------------------------

In the following flow network, example s-t cuts are {{0 ,1}, {0, 2}}, {{0, 2}, {1,
2}, {1, 3}}, etc. The minimum s-t cut is {{1, 3}, {4, 3}, {4 5}} which has capacity as 12+7+4 =
23.

        --- DIAGRAM GOES HERE ---

------------------------------------------------------------
Explanation:
------------------------------------------------------------

Minimum Cut and Maximum Flow

Like Maximum Bipartite Matching, this is another problem which can solved using Ford-Fulkerson
Algorithm. This is based on max-flow min-cut theorem.

The max-flow min-cut theorem states that in a flow network, the amount of maximum flow is equal
to capacity of the minimum cut. See CLRS book for proof of this theorem.

From Ford-Fulkerson, we get capacity of minimum cut. How to print all edges that form the minimum
cut? The idea is to use residual graph.

Following are steps to print all edges of minimum cut.
1)  Run Ford-Fulkerson algorithm and consider the final residual graph.
2)  Find the set of vertices that are reachable from source in the residual graph.
3)  All edges which are from a reachable vertex to non-reachable vertex are minimum cut edges.
    Print all such edges."""

# Python program for finding min-cut in the given graph
# Complexity : (E*(V^3))
# Total augmenting path = VE and BFS with adj matrix takes :V^2 times */

export class Graph {
  private graph: number[][];
  private orgGraph: number[][];
  private ROW: number;
  private COL: number;

  constructor(graph: number[][]) {
    this.graph = graph;
    this.orgGraph = graph.map(row => row.slice());
    this.ROW = graph.length;
    this.COL = graph[0].length;
  }

  private bfs(s: number, t: number, parent: number[]): boolean {
    // Mark all the vertices as not visited
    const visited: boolean[] = Array(this.ROW).fill(false);

    // Create a queue for BFS
    // Mark the source node as visited and enqueue it
    const queue: number[] = [s];
    visited[s] = true;

    // Standard BFS Loop
    while (queue.length > 0) {
      // Dequeue a vertex from the queue
      const u: number = queue.shift() as number;

      // Get all adjacent vertices of the dequeued vertex u
      // If an adjacent vertex has not been visited, mark it
      // visited and enqueue it
      for (let ind = 0; ind < this.graph[u].length; ind++) {
        const val: number = this.graph[u][ind];
        if (!visited[ind] && val > 0) {
          queue.push(ind);
          visited[ind] = true;
          parent[ind] = u;
        }
      }
    }

    // If we reached the sink in BFS starting from the source, return true; otherwise, return false
    return visited[t];
  }

  // Returns the min-cut of the given graph
  minCut(source: number, sink: number): void {
    // This array is filled by BFS and to store the path
    const parent: number[] = Array(this.ROW).fill(-1);

    // Augment the flow while there is a path from source to sink
    while (this.bfs(source, sink, parent)) {
      // Find minimum residual capacity of the edges along the
      // path filled by BFS. Or we can say find the maximum flow
      // through the path found.
      let pathFlow: number = Number.POSITIVE_INFINITY;
      let s: number = sink;

      while (s !== source) {
        pathFlow = Math.min(pathFlow, this.graph[parent[s]][s]);
        s = parent[s];
      }

      // Update residual capacities of the edges and reverse edges along the path
      let v: number = sink;
      while (v !== source) {
        const u: number = parent[v];
        this.graph[u][v] -= pathFlow;
        this.graph[v][u] += pathFlow;
        v = parent[v];
      }
    }

    // Print the edges which initially had weights
    // but now have 0 weight
    for (let i = 0; i < this.ROW; i++) {
      for (let j = 0; j < this.COL; j++) {
        if (this.graph[i][j] === 0 && this.orgGraph[i][j] > 0) {
          console.log(`${i} - ${j}`);
        }
      }
    }
  }
}

if (require.main === module) {

  // 1 - 3
  // 4 - 3
  // 4 - 5

  const graph: number[][] = [
    [0, 16, 13, 0, 0, 0],
    [0, 0, 10, 12, 0, 0],
    [0, 4, 0, 0, 14, 0],
    [0, 0, 9, 0, 0, 20],
    [0, 0, 0, 7, 0, 4],
    [0, 0, 0, 0, 0, 0]
  ];

  const g = new Graph(graph);
  const source = 0;
  const sink = 5;
  g.minCut(source, sink);
}
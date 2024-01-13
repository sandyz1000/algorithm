
/* Find maximum number of edge disjoint paths between two vertices
Given a directed graph and two vertices in it, source 's' and destination 't', find out the maximum
number of edge disjoint paths from s to t. Two paths are said edge disjoint if they don't share any
edge.

    ----  DIAGRAM GOES HERE -----

There can be maximum two edge disjoint paths from source 0 to destination 7 in the above graph.
Two edge disjoint paths are highlighted below in red and blue colors are 0-2-6-7 and 0-3-6-5-7.

    ----  DIAGRAM GOES HERE -----

Note that the paths may be different, but the maximum number is same. For example, in the above
diagram, another possible set of paths is 0-1-2-6-7 and 0-3-6-5-7 respectively.

This problem can be solved by reducing it to maximum flow problem. Following are steps.
1)  Consider the given source and destination as source and sink in flow network. Assign unit
    capacity to each edge.
2)  Run Ford-Fulkerson algorithm to find the maximum flow from source to sink.
3)  The maximum flow is equal to the maximum number of edge-disjoint paths.

When we run Ford-Fulkerson, we reduce the capacity by a unit. Therefore, the edge can not be used
again. So the maximum flow is equal to the maximum number of edge-disjoint paths.


# program to find maximum number of edge disjoint paths
# Complexity : (E*(V^3))
# Total augmenting path = VE
# and BFS with adj matrix takes :V^2 times
 */

export class Graph {
  private graph: number[][];
  private ROW: number;

  constructor(graph: number[][]) {
    this.graph = graph;
    this.ROW = graph.length;
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

  findDisjointPaths(source: number, sink: number): number {
    // This array is filled by BFS and to store the path
    const parent: number[] = Array(this.ROW).fill(-1);

    let maxFlow: number = 0; // There is no flow initially

    // Augment the flow while there is a path from source to sink
    while (this.bfs(source, sink, parent)) {
      // Find the minimum residual capacity of the edges along the path filled by BFS.
      // Or we can say find the maximum flow through the path found.
      let pathFlow: number = Number.POSITIVE_INFINITY;
      let s: number = sink;

      while (s !== source) {
        pathFlow = Math.min(pathFlow, this.graph[parent[s]][s]);
        s = parent[s];
      }

      // Add the path flow to overall flow
      maxFlow += pathFlow;

      // Update residual capacities of the edges and reverse edges along the path
      let v: number = sink;
      while (v !== source) {
        const u: number = parent[v];
        this.graph[u][v] -= pathFlow;
        this.graph[v][u] += pathFlow;
        v = parent[v];
      }
    }

    return maxFlow;
  }
}

if (require.main === module) {
  // There can be a maximum of 2 edge-disjoint paths from 0 to 7
  const graph: number[][] = [
    [0, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 1, 0],
    [0, 0, 1, 0, 0, 0, 0, 1],
    [0, 1, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 1, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ];

  const g = new Graph(graph);
  const source = 0;
  const sink = 7;

  console.log(`There can be a maximum of ${g.findDisjointPaths(source, sink)} edge-disjoint paths from ${source} to ${sink}`);
}


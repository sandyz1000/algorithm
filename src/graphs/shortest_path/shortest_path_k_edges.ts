/* """Shortest path with exactly k edges in a directed and weighted graph
http://www.geeksforgeeks.org/shortest-path-exactly-k-edges-directed-weighted-graph/

Given a directed and two vertices 'u' and 'v' in it, find shortest path from 'u' to 'v' with
exactly k edges on the path.

The graph is given as adjacency matrix representation where value of graph[i][j] indicates the
weight of an edge from vertex i to vertex j and a value INF(infinite) indicates no edge from i to j.

For example consider the following graph.

    (0) ----> (1)
    |  \
    |    \
    |       \
    (3) ----> (2)

Let source 'u' be vertex 0, destination 'v' be 3 and k
be 2. There are two walks of length 2, the walks are {0, 2, 3} and {0, 1, 3}.
The shortest among the two is {0, 2, 3} and weight of path is 3+6 = 9.

The idea is to browse through all paths of length k from u to v using the approach discussed in the
previous post and return weight of the shortest path. A simple solution is to start from u, go to
all adjacent vertices and recur for adjacent vertices with k as k-1, source as adjacent vertex and
destination as v."""
 */

export class ShortestPath {
  V: number;
  INT_MAX: number;

  constructor() {
    this.V = 4;
    this.INT_MAX = Number.MAX_SAFE_INTEGER;
  }

  shortestPath(graph: number[][], u: number, v: number, k: number): number {
    if (k == 0 && u == v) {
      return 0;
    }
    if (k == 1 && graph[u][v] != this.INT_MAX) {
      return graph[u][v];
    }
    if (k <= 0) {
      return this.INT_MAX;
    }

    let res = this.INT_MAX;

    for (let i = 0; i < this.V; i++) {
      if (graph[u][i] != this.INT_MAX && u != i && v != i) {
        const rec_res = this.shortestPath(graph, i, v, k - 1);
        if (rec_res !== this.INT_MAX) {
          res = Math.min(res, graph[u][i] + rec_res);
        }
      }
    }

    return res;
  }
}

export class ShortestPathDP {
  V: number;
  INT_MAX: number;

  constructor() {
    this.V = 4;
    this.INT_MAX = Number.MAX_SAFE_INTEGER;
  }

  shortestPath(graph: number[][], u: number, v: number, k: number): number {
    const sp: number[][][] = Array.from(
      { length: this.V },
      () => Array.from(
        { length: this.V },
        () => Array(k + 1).fill(0)
      )
    );

    for (let e = 0; e <= k; e++) {
      for (let i = 0; i < this.V; i++) {
        for (let j = 0; j < this.V; j++) {
          sp[i][j][e] = this.INT_MAX;

          if (e === 0 && i === j) {
            sp[i][j][e] = 0;
          }
          if (e === 1 && graph[i][j] !== this.INT_MAX) {
            sp[i][j][e] = graph[i][j];
          }
          if (e > 1) {
            for (let a = 0; a < this.V; a++) {
              if (graph[i][a] !== this.INT_MAX && i !== a && j !== a && sp[a][j][e - 1] !== this.INT_MAX) {
                sp[i][j][e] = Math.min(sp[i][j][e], graph[i][a] + sp[a][j][e - 1]);
              }
            }
          }
        }
      }
    }

    return sp[u][v][k];
  }
}

if (require.main === module) {

  // Output: Weight of the shortest path is 9
  const test1 = new ShortestPath();
  const test2 = new ShortestPathDP();

  const graph = [
    [0, 10, 3, 2],
    [Number.MAX_SAFE_INTEGER, 0, Number.MAX_SAFE_INTEGER, 7],
    [Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER, 0, 6],
    [Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER, 0]
  ];

  const u = 0;
  const v = 3;
  const k = 2;

  console.log("Recursive: Weight of the shortest path is", test1.shortestPath(graph, u, v, k));
  console.log("DP: Weight of the shortest path is", test2.shortestPath(graph, u, v, k));

}
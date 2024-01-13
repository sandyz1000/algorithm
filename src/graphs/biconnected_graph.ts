/* """
Biconnected graph

--REFER -- DIAGRAM
http://www.geeksforgeeks.org/biconnectivity-in-a-graph/

An undirected graph is called Biconnected if there are two vertex-disjoint paths between any two
vertices. In a Biconnected Graph, there is a simple cycle through any two vertices.

By convention, two nodes connected by an edge form a biconnected graph, but this does not verify
the above properties. For a graph with more than two vertices, the above properties must be there
for it to be Biconnected.

---------------------------------
Discussion:
---------------------------------
A connected graph is Biconnected if it is connected and doesn't have any Articulation Point.
We mainly need to check two things in a graph.
1) The graph is connected.
2) There is not articulation point in graph.

We start from any vertex and do DFS traversal. In DFS traversal, we check if there is any
articulation point. If we don't find any articulation point, then the graph is Biconnected.
Finally, we need to check whether all vertices were reachable in DFS or not. If all vertices were
not reachable, then the graph is not even connected.

"""
 */

export class Graph {
  V: number;
  graph: { [key: number]: number[] };
  time: number;

  constructor(vertices: number) {
    this.V = vertices;
    this.graph = {};
    this.time = 0;
  }

  addEdge(u: number, v: number): void {
    if (!this.graph[u]) {
      this.graph[u] = [];
    }
    this.graph[u].push(v);
    if (!this.graph[v]) {
      this.graph[v] = [];
    }
    this.graph[v].push(u);
  }

  isBCUtil(u: number, visited: boolean[], parent: number[], low: number[], disc: number[]): boolean {
    let children = 0;
    visited[u] = true;

    disc[u] = this.time;
    low[u] = this.time;
    this.time += 1;

    for (const v of this.graph[u] || []) {
      if (!visited[v]) {
        parent[v] = u;
        children += 1;
        if (this.isBCUtil(v, visited, parent, low, disc)) {
          return true;
        }

        low[u] = Math.min(low[u], low[v]);

        if ((parent[u] === -1 && children > 1) || (parent[u] !== -1 && low[v] >= disc[u])) {
          return true;
        }
      } else if (v !== parent[u]) {
        low[u] = Math.min(low[u], disc[v]);
      }
    }

    return false;
  }

  isBC(): boolean {
    const visited: boolean[] = Array(this.V).fill(false);
    const disc: number[] = Array(this.V).fill(Number.POSITIVE_INFINITY);
    const low: number[] = Array(this.V).fill(Number.POSITIVE_INFINITY);
    const parent: number[] = Array(this.V).fill(-1);

    if (this.isBCUtil(0, visited, parent, low, disc)) {
      return false;
    }

    if (visited.some((i) => !i)) {
      return false;
    }

    return true;
  }
}

if (require.main === module) {
  const g1 = new Graph(2);
  g1.addEdge(0, 1);
  console.log(g1.isBC() ? "Yes" : "No");

  const g2 = new Graph(5);
  g2.addEdge(1, 0);
  g2.addEdge(0, 2);
  g2.addEdge(2, 1);
  g2.addEdge(0, 3);
  g2.addEdge(3, 4);
  g2.addEdge(2, 4);
  console.log(g2.isBC() ? "Yes" : "No");

  const g3 = new Graph(3);
  g3.addEdge(0, 1);
  g3.addEdge(1, 2);
  console.log(g3.isBC() ? "Yes" : "No");

  const g4 = new Graph(5);
  g4.addEdge(1, 0);
  g4.addEdge(0, 2);
  g4.addEdge(2, 1);
  g4.addEdge(0, 3);
  g4.addEdge(3, 4);
  console.log(g4.isBC() ? "Yes" : "No");

  const g5 = new Graph(3);
  g5.addEdge(0, 1);
  g5.addEdge(1, 2);
  g5.addEdge(2, 0);
  console.log(g5.isBC() ? "Yes" : "No");
}

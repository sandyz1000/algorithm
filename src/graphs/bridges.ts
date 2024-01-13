/* """
https://www.geeksforgeeks.org/bridge-in-a-graph/

Bridges in a graph

An edge in an undirected connected graph is a bridge iff removing it disconnects the graph.
For a disconnected undirected graph, definition is similar, a bridge is an edge removing which
increases number of connected components.

Like Articulation Points,bridges represent vulnerabilities in a connected network and are useful
for designing reliable networks. For example, in a wired computer network, an articulation point
indicates the critical computers and a bridge indicates the critical wires or connections.

    -- REFER -- DIAGRAM --
    http://www.geeksforgeeks.org/bridge-in-a-graph/

How to find all bridges in a given graph?
A simple approach is to one by one remove all edges and see if removal of a edge causes disconnected
graph. Following are steps of simple approach for connected graph.

1) For every edge (u, v), do following
...a) Remove (u, v) from graph
...b) See if the graph remains connected (We can either use BFS or DFS)
...c) Add (u, v) back to the graph.

Time complexity of above method is O(E*(V+E)) for a graph represented using adjacency list.
Can we do better?

A O(V+E) algorithm to find all Bridges
The idea is similar to O(V+E) algorithm for Articulation Points. We do DFS traversal of the given
graph. In DFS tree an edge (u, v) (u is parent of v in DFS tree) is bridge if there does not exit
any other alternative to reach u or an ancestor of u from subtree rooted with v. As discussed in
the previous post, the value low[v] indicates earliest visited vertex reachable from subtree rooted
with v. The condition for an edge (u, v) to be a bridge is, "low[v] > disc[u]"

""" */


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
    if (!(u in this.graph)) {
      this.graph[u] = [];
    }
    if (!(v in this.graph)) {
      this.graph[v] = [];
    }

    this.graph[u].push(v);
    this.graph[v].push(u);
  }

  bridgeUtil(u: number, visited: boolean[], parent: number[], low: number[], disc: number[]): void {
    let children = 0;
    visited[u] = true;
    disc[u] = this.time;
    low[u] = this.time;
    this.time += 1;

    for (const v of this.graph[u]) {
      if (!visited[v]) {
        children += 1;
        parent[v] = u;
        this.bridgeUtil(v, visited, parent, low, disc);
        low[u] = Math.min(low[u], low[v]);

        if (low[v] > disc[u]) {
          console.log(`${u} ${v}`);
        }
      } else if (v !== parent[u]) {
        low[u] = Math.min(low[u], disc[v]);
      }
    }
  }

  bridge(): void {
    const visited: boolean[] = Array(this.V).fill(false);
    const disc: number[] = Array(this.V).fill(Number.POSITIVE_INFINITY);
    const low: number[] = Array(this.V).fill(Number.POSITIVE_INFINITY);
    const parent: number[] = Array(this.V).fill(-1);

    for (let i = 0; i < this.V; i++) {
      if (!visited[i]) {
        this.bridgeUtil(i, visited, parent, low, disc);
      }
    }
  }
}

if (require.main === module) {

  // Testing the graph and finding bridges
  const g1 = new Graph(5);
  g1.addEdge(1, 0);
  g1.addEdge(0, 2);
  g1.addEdge(2, 1);
  g1.addEdge(0, 3);
  g1.addEdge(3, 4);

  console.log("Bridges in first graph ");
  g1.bridge();

  const g2 = new Graph(4);
  g2.addEdge(0, 1);
  g2.addEdge(1, 2);
  g2.addEdge(2, 3);
  console.log("\nBridges in second graph ");
  g2.bridge();

  const g3 = new Graph(7);
  g3.addEdge(0, 1);
  g3.addEdge(1, 2);
  g3.addEdge(2, 0);
  g3.addEdge(1, 3);
  g3.addEdge(1, 4);
  g3.addEdge(1, 6);
  g3.addEdge(3, 5);
  g3.addEdge(4, 5);
  console.log("\nBridges in third graph ");
  g3.bridge();

}
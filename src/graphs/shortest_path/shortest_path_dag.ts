/* 
Shortest Path in Directed Acyclic Graph
http://www.geeksforgeeks.org/shortest-path-for-directed-acyclic-graphs/

Given a Weighted Directed Acyclic Graph and a source vertex in the graph, find the shortest paths
from given source to all other vertices.

For a general weighted graph, we can calculate single source shortest distances in O(VE) time using
Bellman-Ford Algorithm. For a graph with no negative weights, we can do better and calculate single
source shortest distances in O(E + VLogV) time using Dijkstra's algorithm. Can we do even better
for Directed Acyclic Graph (DAG)? We can calculate single source shortest distances in O(V+E) time
for DAGs. The idea is to use Topological Sorting.

We initialize distances to all vertices as infinite and distance to source as 0, then we find a
topological sorting of the graph. Topological Sorting of a graph represents a linear ordering of
the graph (See below, figure (b) is a linear representation of figure (a) ). Once we have
topological order (or linear representation), we one by one process all vertices in topological
order. For every vertex being processed, we update distances of its adjacent using distance of
current vertex.

--------------------------------------------
Algorithm:
--------------------------------------------

Following is complete algorithm for finding shortest distances.
1) Initialize dist[] = {INF, INF, ….} and dist[s] = 0 where s is the source vertex.
2) Create a toplogical order of all vertices.
3) Do following for every vertex u in topological order.
    Do following for every adjacent vertex v of u
    if (dist[v] > dist[u] + weight(u, v))
        dist[v] = dist[u] + weight(u, v) 

*/

export class Graph {
  V: number;
  graph: Record<number, [number, number]>[];

  constructor(vertices: number) {
    this.V = vertices;
    this.graph = {};
  }

  addEdge(u: number, v: number, w: number): void {
    if (!(u in this.graph)) {
      this.graph[u] = [];
    }
    this.graph[u].push([v, w]);
  }

  topologicalSortUtil(v: number, visited: boolean[], stack: number[]): void {
    visited[v] = true;
    if (v in this.graph) {
      for (const [node, _] of this.graph[v]) {
        if (!visited[node]) {
          this.topologicalSortUtil(node, visited, stack);
        }
      }
    }
    stack.push(v);
  }

  shortestPath(s: number): void {
    const visited: boolean[] = Array(this.V).fill(false);
    const stack: number[] = [];

    for (let i = 0; i < this.V; i++) {
      if (!visited[i]) {
        this.topologicalSortUtil(s, visited, stack);
      }
    }

    const dist: number[] = Array(this.V).fill(Number.POSITIVE_INFINITY);
    dist[s] = 0;

    while (stack.length > 0) {
      const i = stack.pop()!;

      if (i in this.graph) {
        for (const [node, weight] of this.graph[i]) {
          if (dist[node] > dist[i] + weight) {
            dist[node] = dist[i] + weight;
          }
        }
      }
    }

    console.log(`Following are shortest distances from source ${s}: ${dist.map(d => (d === Number.POSITIVE_INFINITY) ? 'Inf' : d).join(' ')}`);
  }
}

if (require.main === module) {

  const g = new Graph(6);
  g.addEdge(0, 1, 5);
  g.addEdge(0, 2, 3);
  g.addEdge(1, 3, 6);
  g.addEdge(1, 2, 2);
  g.addEdge(2, 4, 4);
  g.addEdge(2, 5, 2);
  g.addEdge(2, 3, 7);
  g.addEdge(3, 4, -1);
  g.addEdge(4, 5, -2);

  const s = 1;
  console.log(`Following are shortest distances from source ${s}:`);
  g.shortestPath(s);

}
/* """
Check if a given graph is tree or not

Write a function that returns true if a given undirected graph is tree and false otherwise.

For example, the following graph is a tree.
        (1) --- > (0) --- > (3)
        |       /           |
        |     /             |
        |   /               |
        (2)                 (4)

An undirected graph is tree if it has following properties.
1) There is no cycle.
2) The graph is connected.

How to detect cycle in an undirected graph?

We can either use BFS or DFS. For every visited vertex 'v', if there is an adjacent 'u' such that u
is already visited and u is not parent of v, then there is a cycle in graph.
If we don't find such an adjacent for any vertex, we say that there is no cycle (See Detect cycle
in an undirected graph for more details).

How to check for connectivity?

Since the graph is undirected, we can start BFS or DFS from any vertex and check if all vertices
are reachable or not. If all vertices are reachable, then graph is connected, otherwise not. """
 */


export class Graph {
  V: number;
  graph: { [key: number]: number[] };

  constructor(V: number) {
    this.V = V;
    this.graph = {};
  }

  addEdge(v: number, w: number): void {
    // Add w to v list.
    if (!this.graph[v]) {
      this.graph[v] = [];
    }
    this.graph[v].push(w);

    // Add v to w list.
    if (!this.graph[w]) {
      this.graph[w] = [];
    }
    this.graph[w].push(v);
  }

  isCyclicUtil(v: number, visited: boolean[], parent: number | null): boolean {
    // Mark current node as visited.
    visited[v] = true;

    // Recur for all the vertices adjacent to this vertex.
    for (const i of this.graph[v] || []) {
      // If an adjacent is not visited, then recur for that adjacent.
      if (!visited[i]) {
        if (this.isCyclicUtil(i, visited, v)) {
          return true;
        }
      }
      // If an adjacent is visited and not the parent of the current vertex, then there is a cycle.
      else if (i !== parent) {
        return true;
      }
    }

    return false;
  }

  isTree(): boolean {
    // Mark all the vertices as not visited and not part of the recursion stack.
    const visited: boolean[] = Array(this.V).fill(false);

    // The call to isCyclicUtil serves multiple purposes. It returns true if the graph reachable
    // from vertex 0 is cyclic. It also marks all vertices reachable from 0.
    if (this.isCyclicUtil(0, visited, null)) {
      return false;
    }

    // If we find a vertex which is not reachable from 0 (not marked by isCyclicUtil),
    // then we return false.
    for (let i = 0; i < this.V; i++) {
      if (!visited[i]) {
        return false;
      }
    }

    return true;
  }
}

if (require.main === module) {

  // Testing the TypeScript code with the provided examples
  const g1 = new Graph(5);
  g1.addEdge(1, 0);
  g1.addEdge(0, 2);
  g1.addEdge(0, 3);
  g1.addEdge(3, 4);
  console.log(g1.isTree() ? "Graph is a Tree" : "Graph is not a Tree");

  const g2 = new Graph(5);
  g2.addEdge(1, 0);
  g2.addEdge(0, 2);
  g2.addEdge(2, 1);
  g2.addEdge(0, 3);
  g2.addEdge(3, 4);
  console.log(g2.isTree() ? "Graph is a Tree" : "Graph is not a Tree");

}
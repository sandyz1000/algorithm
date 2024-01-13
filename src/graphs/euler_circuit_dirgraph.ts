/* 
Euler Circuit in a Directed Graph
Eulerian Path is a path in graph that visits every edge exactly once. Eulerian Circuit is an
Eulerian Path which starts and ends on the same vertex.

A graph is said to be eulerian if it has eulerian cycle. We have discussed eulerian circuit for an
undirected graph. In this post, same is discussed for a directed graph.

For example, the following graph has eulerian cycle as {1, 0, 3, 4, 0, 2, 1} SCC

        1 ---> 0 <--- 3
        |    /    \   |
        |   /      \  |
        2 -         - 4


How to check if a directed graph is eulerian?
A directed graph has an eulerian cycle if following conditions are true
1) All vertices with nonzero degree belong to a single strongly connected component.
2) In degree and out degree of every vertex is same.

We can detect singly connected component using Kosaraju's DFS based simple algorithm.
To compare in degree and out degree, we need to store in degree an out degree of every vertex.
Out degree can be obtained by size of adjacency list. In degree can be stored by creating an array
of size equal to number of vertices.

Time complexity of the above implementation is O(V + E) as Kosaraju's algorithm takes O(V + E)
time. After running Kosaraju's algorithm we traverse all vertices and compare in degree with out
degree which takes O(V) time


 */


export class Graph {
  private V: number;
  private graph: { [key: number]: number[] };
  private IN: number[];

  constructor(vertices: number) {
    this.V = vertices;
    this.graph = {};
    this.IN = new Array(vertices).fill(0);
  }

  addEdge(v: number, u: number): void {
    if (!this.graph[v]) {
      this.graph[v] = [];
    }
    this.graph[v].push(u);
    this.IN[u]++;
  }

  private DFSUtil(v: number, visited: boolean[]): void {
    visited[v] = true;
    const neighbors = this.graph[v] || [];
    for (const node of neighbors) {
      if (!visited[node]) {
        this.DFSUtil(node, visited);
      }
    }
  }

  private getTranspose(): Graph {
    const gr = new Graph(this.V);

    for (let node = 0; node < this.V; node++) {
      const children = this.graph[node] || [];
      for (const child of children) {
        gr.addEdge(child, node);
      }
    }

    return gr;
  }

  private isSCC(): boolean {
    const visited: boolean[] = Array(this.V).fill(false);
    let v = 0;

    for (v = 0; v < this.V; v++) {
      if ((this.graph[v] || []).length > 0) {
        break;
      }
    }

    this.DFSUtil(v, visited);

    for (let i = 0; i < this.V; i++) {
      if (!visited[i]) {
        return false;
      }
    }

    const gr = this.getTranspose();
    visited.fill(false);
    gr.DFSUtil(v, visited);

    for (let i = 0; i < this.V; i++) {
      if (!visited[i]) {
        return false;
      }
    }

    return true;
  }

  isEulerianCycle(): boolean {
    if (!this.isSCC()) {
      return false;
    }

    for (let v = 0; v < this.V; v++) {
      if ((this.graph[v] || []).length !== this.IN[v]) {
        return false;
      }
    }

    return true;
  }
}

if (require.main === module) {

  // Output: Given directed graph is eulerian
  const g = new Graph(5);
  g.addEdge(1, 0);
  g.addEdge(0, 2);
  g.addEdge(2, 1);
  g.addEdge(0, 3);
  g.addEdge(3, 4);
  g.addEdge(4, 0);

  if (g.isEulerianCycle()) {
    console.log("Given directed graph is eulerian");
  } else {
    console.log("Given directed graph is NOT eulerian");
  }

}
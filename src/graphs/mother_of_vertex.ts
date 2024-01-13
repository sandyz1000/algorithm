/* """
What is a Mother Vertex?
A mother vertex in a graph G = (V,E) is a vertex v such that all other vertices in G
can be reached by a path from v.
""" */

export class Graph {
  private V: number;
  private graph: Record<number, number[]>;

  constructor(vertices: number) {
    this.V = vertices;
    this.graph = {};
  }

  private DFSUtil(v: number, visited: boolean[]): void {
    visited[v] = true;

    for (const i of this.graph[v] || []) {
      if (!visited[i]) {
        this.DFSUtil(i, visited);
      }
    }
  }

  addEdge(v: number, w: number): void {
    if (!this.graph[v]) {
      this.graph[v] = [];
    }
    this.graph[v].push(w);
  }

  findMother(): number {
    const visited: boolean[] = Array(this.V).fill(false);
    let motherVertex = 0;

    for (let i = 0; i < this.V; i++) {
      if (!visited[i]) {
        this.DFSUtil(i, visited);
        motherVertex = i;
      }
    }

    visited.fill(false);
    this.DFSUtil(motherVertex, visited);

    return visited.every((value) => value) ? motherVertex : -1;
  }
}

if (require.main === module) {

  const g = new Graph(7);
  g.addEdge(0, 1);
  g.addEdge(0, 2);
  g.addEdge(1, 3);
  g.addEdge(4, 1);
  g.addEdge(6, 4);
  g.addEdge(5, 6);
  g.addEdge(5, 2);
  g.addEdge(6, 0);

  console.log("A mother vertex is", g.findMother());

}
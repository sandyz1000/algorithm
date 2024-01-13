/* """Given a graph G and an integer K, K-cores of the graph are connected components that are left
after all vertices of degree less than k have been removed

Input : Adjacency list representation of graph shown
        on left side of below diagram
Output: K-Cores :
[2] -> 3 -> 4 -> 6
[3] -> 2 -> 4 -> 6 -> 7
[4] -> 2 -> 3 -> 6 -> 7
[6] -> 2 -> 3 -> 4 -> 7
[7] -> 3 -> 4 -> 6

The standard algorithm to find a k-core graph is to remove all the vertices that have degree less
than- 'K' from the input graph. We must be careful that removing a vertex reduces the degree of
all the vertices adjacent to it, hence the degree of adjacent vertices can also drop below-'K'.
And thus, we may have to remove those vertices also. This process may/may not go until there are
no vertices left in the graph.

To implement above algorithm, we do a modified DFS on the input graph and delete all the vertices
having degree less than 'K', then update degrees of all the adjacent vertices, and if their
degree falls below 'K' we will delete them too.

Time complexity of the above solution is O(V + E) where V is number of vertices and E is
number of edges."""
 */

export class Graph {
    V: number;
    graph: Map<number, number[]>;
  
    constructor(vertices: number) {
      this.V = vertices;
      this.graph = new Map();
    }
  
    addEdge(u: number, v: number): void {
      if (!this.graph.has(u)) {
        this.graph.set(u, []);
      }
      if (!this.graph.has(v)) {
        this.graph.set(v, []);
      }
      this.graph.get(u)!.push(v);
      this.graph.get(v)!.push(u);
    }
  
    DFSUtil(v: number, visited: boolean[], vDegree: number[], k: number): boolean {
      visited[v] = true;
  
      for (const i of this.graph.get(v)!) {
        if (vDegree[v] < k) {
          vDegree[i] -= 1;
        }
  
        if (!visited[i]) {
          if (this.DFSUtil(i, visited, vDegree, k)) {
            vDegree[v] -= 1;
          }
        }
      }
  
      return vDegree[v] < k;
    }
  
    printKCores(k: number): void {
      const visited: boolean[] = new Array(this.V).fill(false);
      const vDegree: number[] = new Array(this.V).fill(0);
  
      for (const [i, neighbors] of this.graph) {
        vDegree[i] = neighbors.length;
      }
  
      this.DFSUtil(0, visited, vDegree, k);
  
      for (let i = 0; i < this.V; i++) {
        if (!visited[i]) {
          this.DFSUtil(i, visited, vDegree, k);
        }
      }
  
      console.log("\n K-cores: ");
      for (let v = 0; v < this.V; v++) {
        if (vDegree[v] >= k) {
          console.log(`\n [ ${v} ]`);
  
          for (const i of this.graph.get(v)!) {
            if (vDegree[i] >= k) {
              console.log(`-> ${i}`);
            }
          }
        }
      }
    }
  }
  
  if (require.main === module) {
    const k = 3;
    const g1 = new Graph(9);
    g1.addEdge(0, 1);
    g1.addEdge(0, 2);
    g1.addEdge(1, 2);
    g1.addEdge(1, 5);
    g1.addEdge(2, 3);
    g1.addEdge(2, 4);
    g1.addEdge(2, 5);
    g1.addEdge(2, 6);
    g1.addEdge(3, 4);
    g1.addEdge(3, 6);
    g1.addEdge(3, 7);
    g1.addEdge(4, 6);
    g1.addEdge(4, 7);
    g1.addEdge(5, 6);
    g1.addEdge(5, 8);
    g1.addEdge(6, 7);
    g1.addEdge(6, 8);
    g1.printKCores(k);
  
    const g2 = new Graph(13);
    g2.addEdge(0, 1);
    g2.addEdge(0, 2);
    g2.addEdge(0, 3);
    g2.addEdge(1, 4);
    g2.addEdge(1, 5);
    g2.addEdge(1, 6);
    g2.addEdge(2, 7);
    g2.addEdge(2, 8);
    g2.addEdge(2, 9);
    g2.addEdge(3, 10);
    g2.addEdge(3, 11);
    g2.addEdge(3, 12);
    g2.printKCores(k);
  }
  
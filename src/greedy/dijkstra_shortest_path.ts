/* """
Greedy Algorithms | Set 7 (Dijkstra's shortest path algorithm)

REFER DIAGRAM

http://www.geeksforgeeks.org/greedy-algorithms-set-6-dijkstras-shortest-path-algorithm/

Given a graph and a source vertex in graph, find shortest paths from source to all vertices in
the given graph.

Dijkstra's algorithm is very similar to Prim's algorithm for minimum spanning tree. Like Prim's
MST, we generate a SPT (shortest path tree) with given source as root. We maintain two sets,
one set contains vertices included in shortest path tree, other set includes vertices not yet
included in shortest path tree. At every step of the algorithm, we find a vertex which is in the
other set (set of not yet included) and has minimum distance from source.

Below are the detailed steps used in Dijkstra's algorithm to find the shortest path from a single
source vertex to all other vertices in the given graph.

------------------------------------
Algorithm
------------------------------------

1) Create a set sptSet (shortest path tree set) that keeps track of vertices included in shortest
path tree, i.e., whose minimum distance from source is calculated and finalized. Initially,
this set is empty.

2) Assign a distance value to all vertices in the input graph. Initialize all distance values as
INFINITE. Assign distance value as 0 for the source vertex so that it is picked first.

3) While sptSet doesn't include all vertices
    a) Pick a vertex u which is not there in sptSet and has minimum distance value.
    b) Include u to sptSet.
    c) Update distance value of all adjacent vertices of u. To update the distance values,
    iterate through all adjacent vertices. For every adjacent vertex v, if sum of distance value
    of u (from source) and weight of edge u-v, is less than the distance value of v, then update
    the distance value of v. """

// # Python program for Dijkstra's single
// # source shortest path algorithm. The program is
// # for adjacency matrix representation of the graph
 */

export class Graph {
  private V: number;
  public graph: number[][];

  constructor(vertices: number) {
    this.V = vertices;
    this.graph = Array.from({ length: vertices }, () => Array(vertices).fill(0));
  }

  printSolution(dist: number[]): void {
    console.log("Vertex Distance from Source");
    for (let node = 0; node < this.V; node++) {
      console.log(`${node}\t\t${dist[node]}`);
    }
  }

  minDistance(dist: number[], sptSet: boolean[]): number {
    let minimum = Infinity;
    let minIndex = Infinity;
    for (let v = 0; v < this.V; v++) {
      if (dist[v] < minimum && !sptSet[v]) {
        minimum = dist[v];
        minIndex = v;
      }
    }
    return minIndex;
  }

  dijkstra(src: number): void {
    const dist: number[] = Array(this.V).fill(Infinity);
    dist[src] = 0;
    const sptSet: boolean[] = Array(this.V).fill(false);

    for (let _ = 0; _ < this.V; _++) {
      const u = this.minDistance(dist, sptSet);
      sptSet[u] = true;

      for (let v = 0; v < this.V; v++) {
        if (this.graph[u][v] > 0 && !sptSet[v] && dist[v] > dist[u] + this.graph[u][v]) {
          dist[v] = dist[u] + this.graph[u][v];
        }
      }
    }

    this.printSolution(dist);
  }
}

if (require.main === module) {
  // Example usage
  const g = new Graph(9);
  g.graph = [
    [0, 4, 0, 0, 0, 0, 0, 8, 0],
    [4, 0, 8, 0, 0, 0, 0, 11, 0],
    [0, 8, 0, 7, 0, 4, 0, 0, 2],
    [0, 0, 7, 0, 9, 14, 0, 0, 0],
    [0, 0, 0, 9, 0, 10, 0, 0, 0],
    [0, 0, 4, 14, 10, 0, 2, 0, 0],
    [0, 0, 0, 0, 0, 2, 0, 1, 6],
    [8, 11, 0, 0, 0, 0, 1, 0, 7],
    [0, 0, 2, 0, 0, 0, 6, 7, 0],
  ];

  g.dijkstra(0);
}

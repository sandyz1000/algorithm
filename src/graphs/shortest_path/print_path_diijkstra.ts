/* """Printing Paths in Dijkstra's Shortest Path Algorithm

http://www.geeksforgeeks.org/printing-paths-dijkstras-shortest-path-algorithm/

Given a graph and a source vertex in graph, find shortest paths from source to all vertices in the
given graph.

The idea is to create a separate array parent[]. Value of parent[v] for a vertex v stores parent
vertex of v in shortest path tree. Parent of root (or source vertex) is -1. Whenever we find
shorter path through a vertex u, we make u as parent of current vertex.

Once we have parent array constructed, we can print path using below recursive function.

def printPath(parent, j):
    # Base Case : If j is source
    if (parent[j]==-1):
        return;
    printPath(parent, parent[j])
    print("%d " % j)

""" */

export class Graph {
  minDistance(dist: number[], queue: number[]): number {
    let minimum = Infinity;
    let minIndex = -1;
    for (let i = 0; i < dist.length; i++) {
      if (dist[i] < minimum && queue.includes(i)) {
        minimum = dist[i];
        minIndex = i;
      }
    }
    return minIndex;
  }

  printPath(parent: number[], j: number): void {
    if (parent[j] === -1) {
      console.log(j);
      return;
    }
    this.printPath(parent, parent[j]);
    console.log(j);
  }

  printSolution(dist: number[], parent: number[]): void {
    const src = 0;
    console.log("Vertex \t\tDistance from Source\tPath");
    for (let i = 1; i < dist.length; i++) {
      console.log(`\n${src} -> ${i} \t\t${dist[i]} \t\t\t\t\t`);
      this.printPath(parent, i);
    }
  }

  dijkstra(graph: number[][], src: number): void {
    const row = graph.length;
    const col = graph[0].length;

    const dist = Array.from({ length: row }, () => Infinity);
    const parent = Array.from({ length: row }, () => -1);

    dist[src] = 0;

    const queue = [...Array(row).keys()];

    while (queue.length > 0) {
      const u = this.minDistance(dist, queue);
      queue.splice(queue.indexOf(u), 1);

      for (let i = 0; i < col; i++) {
        if (graph[u][i] && queue.includes(i)) {
          if (dist[u] + graph[u][i] < dist[i]) {
            dist[i] = dist[u] + graph[u][i];
            parent[i] = u;
          }
        }
      }
    }

    this.printSolution(dist, parent);
  }
}

// Driver Code
if (require.main === module) {

  const g = new Graph();

  const graph = [
    [0, 4, 0, 0, 0, 0, 0, 8, 0],
    [4, 0, 8, 0, 0, 0, 0, 11, 0],
    [0, 8, 0, 7, 0, 4, 0, 0, 2],
    [0, 0, 7, 0, 9, 14, 0, 0, 0],
    [0, 0, 0, 9, 0, 10, 0, 0, 0],
    [0, 0, 4, 14, 10, 0, 2, 0, 0],
    [0, 0, 0, 0, 0, 2, 0, 1, 6],
    [8, 11, 0, 0, 0, 0, 1, 0, 7],
    [0, 0, 2, 0, 0, 0, 6, 7, 0]
  ];

  g.dijkstra(graph, 0);
}

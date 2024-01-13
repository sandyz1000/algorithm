/* """
Breadth First Traversal or BFS for a Graph
http://www.geeksforgeeks.org/breadth-first-traversal-for-a-graph/

Breadth First Traversal (or Search) for a graph is similar to Breadth First Traversal of a
tree (See method 2 of this post). The only catch here is, unlike trees, graphs may contain
cycles, so we may come to the same node again. To avoid processing a node more than once,
we use a boolean visited array. For simplicity, it is assumed that all vertices are reachable
from the starting vertex.

For example, in the following graph, we start traversal from vertex 2. When we come to vertex 0,
we look for all adjacent vertices of it. 2 is also an adjacent vertex of 0. If we don't mark
visited vertices, then 2 will be processed again and it will become a non-terminating process. A
Breadth First Traversal of the following graph is 2, 0, 3, 1.

            0 -------> 1
            A       /
            |      /
            |     /
            V <--/
  start-->  2 -------> 3 <- self loop

Time Complexity: O(V+E) where V is number of vertices in the graph and E is number of edges in
the graph.
""" */

// TypeScript program to print BFS traversal from a given source vertex.

// This class represents a directed graph using adjacency list representation
export class Graph {
  private graph: Map<number, number[]>;

  constructor() {
    // Default dictionary to store graph
    this.graph = new Map<number, number[]>();
  }

  addEdge(u: number, v: number): void {
    // Function to add an edge to the graph
    if (!this.graph.has(u)) {
      this.graph.set(u, []);
    }
    this.graph.get(u)?.push(v);
  }

  bfs(s: number): void {
    // Function to print a BFS of the graph
    // Mark all the vertices as not visited
    const size: number = this.graph.size;
    const visited: boolean[] = new Array(size).fill(false);

    // Create a queue for BFS, mark the source node as visited and enqueue it
    const queue: number[] = [s];
    visited[s] = true;

    while (queue.length > 0) {
      // Dequeue a vertex from the queue and print it
      const vertex: number = queue.shift()!;
      process.stdout.write(`${vertex} `);

      // Get all adjacent vertices of the dequeued vertex.
      // If an adjacent has not been visited, mark it visited and enqueue it
      const neighbors: number[] | undefined = this.graph.get(vertex);
      if (neighbors) {
        for (const neighbor of neighbors) {
          if (!visited[neighbor]) {
            queue.push(neighbor);
            visited[neighbor] = true;
          }
        }
      }
    }
  }
}

if (require.main === module) {

  // Example usage:
  const g: Graph = new Graph();
  g.addEdge(0, 1);
  g.addEdge(0, 2);
  g.addEdge(1, 2);
  g.addEdge(2, 0);
  g.addEdge(2, 3);
  g.addEdge(3, 3);

  console.log("Following is Breadth First Traversal (starting from vertex 2)");
  g.bfs(2);
}

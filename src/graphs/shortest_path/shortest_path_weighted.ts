/* 
Shortest Path in a weighted Graph where weight of an edge is 1 or 2
Given a directed graph where every edge has weight as either 1 or 2, find the shortest path from a
given source vertex 's' to a given destination vertex 't'. Expected time complexity is O(V+E).

A Simple Solution is to use Dijkstra's shortest path algorithm, we can get a shortest path in
O(E + VLogV) time.

How to do it in O(V+E) time?
The idea is to use BFS. One important observation about BFS is,
the path used in BFS always has least number of edges between any two vertices. So if all edges
are of same weight, we can use BFS to find the shortest path. For this problem, we can modify the
graph and split all edges of weight 2 into two edges of weight 1 each. In the modified graph,
we can use BFS to find the shortest path.

How many new intermediate vertices are needed?
We need to add a new intermediate vertex for every source vertex. The reason is simple, if we add
a intermediate vertex x between u and v and if we add same vertex between y and z, then new paths
u to z and y to v are added to graph which might have note been there in original graph.
Therefore in a graph with V vertices, we need V extra vertices.

In the below implementation 2*V vertices are created in a graph and for every edge (u, v), we split
it into two edges (u, u+V) and (u+V, w). This way we make sure that a different intermediate vertex
is added for every source vertex.

Asymptotic Analysis:

How is this approach O(V+E)? In worst case, all edges are of weight 2 and we need to do O(E)
operations to split all edges and 2V vertices, so the time complexity becomes O(E) + O(V+E) which
is O(V+E). */


export class Graph {
  V: number;
  V_org: number;
  graph: { [key: number]: number[] };

  constructor(vertices: number) {
    this.V = vertices;  // No. of vertices
    this.V_org = vertices;
    this.graph = {};
  }

  // Function to add an edge to graph
  addEdge(u: number, v: number, w: number): void {
    if (w === 1) {
      if (!this.graph[u]) {
        this.graph[u] = [];
      }
      this.graph[u].push(v);
    } else {
      // Split all edges of weight 2 into two edges of weight 1 each.
      // The intermediate vertex number is maximum vertex number + 1, that is V.
      if (!this.graph[u]) {
        this.graph[u] = [];
      }
      this.graph[u].push(this.V);
      if (!this.graph[this.V]) {
        this.graph[this.V] = [];
      }
      this.graph[this.V].push(v);
      this.V = this.V + 1;
    }
  }

  // To print the shortest path stored in parent[]
  printPath(parent: number[], j: number): number {
    let pathLen = 1;
    if (parent[j] === -1 && j < this.V_org) {  // Base Case: If j is source
      console.log(j);
      return 0;  // when parent[-1] then path length = 0
    }
    const l = this.printPath(parent, parent[j]);

    // Increment path length
    pathLen = l + pathLen;

    // Print node only if it's less than the original node length.
    // i.e., do not print any new node that has been added later
    if (j < this.V_org) {
      console.log(j);
    }

    return pathLen;
  }

  findShortestPath(src: number, dest: number): number {
    // Mark all the vertices as not visited
    // Initialize parent[] and visited[]
    const visited: boolean[] = Array(this.V).fill(false);
    const parent: number[] = Array(this.V).fill(-1);

    // Create a queue for BFS
    const queue: number[] = [src];

    // Mark the source node as visited and enqueue it
    visited[src] = true;

    while (queue.length > 0) {
      const s = queue.shift()!;  // Dequeue a vertex from the queue
      if (s === dest) {  // If s = dest then print the path and return
        return this.printPath(parent, s);
      }

      // Get all adjacent vertices of the dequeued vertex s
      // If an adjacent has not been visited, then mark it visited and enqueue it
      if (this.graph[s]) {
        for (const i of this.graph[s]) {
          if (!visited[i]) {
            queue.push(i);
            visited[i] = true;
            parent[i] = s;
          }
        }
      }
    }

    return 0;
  }
}

// Output: Shortest Path between 0 and 3 is  [0, 1, 3]
// Shortest Distance between 0 and 3 is 3
if (require.main === module) {

  const g = new Graph(4);
  g.addEdge(0, 1, 2);
  g.addEdge(0, 2, 2);
  g.addEdge(1, 2, 1);
  g.addEdge(1, 3, 1);
  g.addEdge(2, 0, 1);
  g.addEdge(2, 3, 2);
  g.addEdge(3, 3, 2);

  const src = 0;
  const dest = 3;
  console.log(`Shortest Path between ${src} and ${dest} is`);
  const l = g.findShortestPath(src, dest);
  console.log(`\nShortest Distance between ${src} and ${dest} is ${l}`);
}

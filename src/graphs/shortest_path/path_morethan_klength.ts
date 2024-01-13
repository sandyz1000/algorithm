/* 
Find if there is a path of more than k length from a source

Given a graph, a source vertex in the graph and a number k, find if there is a simple path (
without any cycle) starting from given source and ending at any other vertex.

------------------------------------------------
Example:
------------------------------------------------

Input  : Source s = 0, k = 58
Output : True
Explanation: There exists a simple path 0 -> 7 -> 1 -> 2 -> 8 -> 6 -> 5 -> 3 -> 4
Which has a total distance of 60 km which is more than 58.
------------------------
Input  : Source s = 0, k = 62
Output : False
Explanation: In the above graph, the longest simple path has distance 61
(0 -> 7 -> 1-> 2 -> 3 -> 4 -> 5-> 6 -> 8, so output should be false for any input greater than 61.
------------------------

Time Complexity: O(n!)

------------------------------------------------
Explanation:
------------------------------------------------

From the source node, we one-by-one visit all the paths and check if the total weight is greater
than k for each path. So, the worst case will be when the number of possible paths is maximum. This
is the case when every node is connected to every other node.

Beginning from the source node we have n-1 adjacent nodes. The time needed for a path to connect any
two nodes is 2. One for joining the source and the next adjacent vertex. One for breaking the
connection between the source and the old adjacent vertex.
After selecting a node out of n-1 adjacent nodes, we are left with n-2 adjacent nodes (as the source
node is already included in the path) and so on at every step of selecting a node our problem
reduces by 1 node.

We can write this in the form of a recurrence relation as: F(n) = n*(2+F(n-1))
This expands to: 2n + 2n*(n-1) + 2n*(n-1)*(n-2) + ... + 2n(n-1)(n-2)(n-3)...1
As n times 2n(n-1)(n-2)(n-3)...1 is greater than the given expression so we can safely say time
complexity is: n*2*n!

Here in the question the first node is defined so time complexity becomes
F(n-1) = 2(n-1)*(n-1)! = 2*n*(n-1)! - 2*1*(n-1)! = 2*n!-2*(n-1)! = O(n!) */

export class Pair {
  constructor(public first: number, public second: number) { }
}

// TypeScript code to find if there is a simple path with weight more than k
// This class represents a directed graph using adjacency list representation
export class Graph {
  private V: number;
  private adj: Record<number, Pair[]>;

  constructor(V: number) {
    this.V = V;
    // In a weighted graph, we need to store vertex
    // and weight pair for every edge
    this.adj = {};
  }

  pathMoreThanK(src: number, k: number): boolean {
    // Create a path array with nothing included in the path
    const path: boolean[] = Array(this.V).fill(false);
    path[src] = true; // Add the source vertex to the path

    return this.pathMoreThanKUtil(src, k, path);
  }

  // Prints shortest paths from src to all other vertices
  private pathMoreThanKUtil(src: number, k: number, path: boolean[]): boolean {
    // If k is 0 or negative, return true
    if (k <= 0) {
      return true;
    }

    // Get all adjacent vertices of the source vertex src and
    // recursively explore all paths from src
    for (const pair of this.adj[src] || []) {
      const v = pair.first;
      const w = pair.second;

      // If vertex v is already there in the path, then there is a cycle (we ignore this edge)
      if (path[v]) {
        continue;
      }

      if (w >= k) {
        // If the weight is more than k, return true
        return true;
      }

      path[v] = true; // Else, add this vertex to the path

      // If this adjacent can provide a path longer than k, return true
      if (this.pathMoreThanKUtil(v, k - w, path)) {
        return true;
      }
      path[v] = false; // Backtrack
    }

    // If no adjacent could produce a longer path, return false
    return false;
  }

  // Utility function to add an edge (u, v) of weight w
  addEdge(u: number, v: number, w: number): void {
    if (!this.adj[u]) {
      this.adj[u] = [];
    }
    this.adj[u].push(new Pair(v, w));

    if (!this.adj[v]) {
      this.adj[v] = [];
    }
    this.adj[v].push(new Pair(u, w));
  }
}

if (require.main === module) {
  // Example usage:
  // Output:
  // No, Yes
  const V = 9; // Create the graph given in the above figure
  const g = new Graph(V);

  // Making the above-shown graph
  g.addEdge(0, 1, 4);
  g.addEdge(0, 7, 8);
  g.addEdge(1, 2, 8);
  g.addEdge(1, 7, 11);
  g.addEdge(2, 3, 7);
  g.addEdge(2, 8, 2);
  g.addEdge(2, 5, 4);
  g.addEdge(3, 4, 9);
  g.addEdge(3, 5, 14);
  g.addEdge(4, 5, 10);
  g.addEdge(5, 6, 2);
  g.addEdge(6, 7, 1);
  g.addEdge(6, 8, 6);
  g.addEdge(7, 8, 7);

  const src = 0;
  let k = 62;
  console.log(g.pathMoreThanK(src, k) ? "Yes" : "No");

  k = 60;
  console.log(g.pathMoreThanK(src, k) ? "Yes" : "No");
}

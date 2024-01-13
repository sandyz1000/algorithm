/* 
## Kruskal Algorithm:

http://www.geeksforgeeks.org/greedy-algorithms-set-2-kruskals-minimum-spanning-tree-mst/

REFER DIAGRAM

What is Minimum Spanning Tree?

Given a connected and undirected graph, a spanning tree of that graph is a sub-graph that is a
tree and connects all the vertices together. A single graph can have many different spanning
trees. A minimum spanning tree (MST) or minimum weight spanning tree for a weighted, connected
and undirected graph is a spanning tree with weight less than or equal to the weight of every
other spanning tree. The weight of a spanning tree is the sum of weights given to each edge of
the spanning tree.

How many edges does a minimum spanning tree has?
A minimum spanning tree has (V - 1) edges where V is the number of vertices in the given graph.

What are the applications of Minimum Spanning Tree?
See this for applications of MST.

Below are the steps for finding MST using Kruskal's algorithm

1.  Sort all the edges in non-decreasing order of their weight.
2.  Pick the smallest edge. Check if it forms a cycle with the spanning tree formed so far.
    If cycle is not formed, include this edge. Else, discard it.
3.  Repeat step#2 until there are (V-1) edges in the spanning tree.

The algorithm is a Greedy Algorithm. The Greedy Choice is to pick the smallest weight edge that
does not cause a cycle in the MST constructed so far. Let us understand it with an example:
Consider the below input graph.
---------------------------------------------------------------

Time Complexity:
O(ElogE) or O(ElogV). Sorting of edges takes O(ELogE) time. After sorting, we iterate through
all edges and apply find-union algorithm. The find and union operations can take at most
O(LogV) time.
So overall complexity is O(ELogE + ELogV) time. The value of E can be at most O(V2), so O(LogV)
are O(LogE) same. Therefore, overall time complexity is O(ElogE) or O(ElogV) 

# Python program for Kruskal's algorithm to find Minimum Spanning Tree
# of a given connected, undirected and weighted graph
*/

export class Graph {
  private V: number;
  private graph: number[][];

  constructor(vertices: number) {
    this.V = vertices;
    this.graph = [];
  }

  addEdge(u: number, v: number, w: number): void {
    this.graph.push([u, v, w]);
  }

  find(parent: number[], vertex: number): number {
    if (parent[vertex] === vertex) {
      return vertex;
    }
    return this.find(parent, parent[vertex]);
  }

  union(parent: number[], rank: number[], x: number, y: number): void {
    const xroot = this.find(parent, x);
    const yroot = this.find(parent, y);

    if (rank[xroot] < rank[yroot]) {
      parent[xroot] = yroot;
    } else if (rank[xroot] > rank[yroot]) {
      parent[yroot] = xroot;
    } else {
      parent[yroot] = xroot;
      rank[xroot]++;
    }
  }

  kruskalMST(): void {
    const result: number[][] = [];
    let i = 0;
    let e = 0;

    this.graph.sort((a, b) => a[2] - b[2]);

    const parent: number[] = [];
    const rank: number[] = [];

    for (let node = 0; node < this.V; node++) {
      parent.push(node);
      rank.push(0);
    }

    while (e < this.V - 1) {
      const [u, v, w] = this.graph[i];
      i++;

      const x = this.find(parent, u);
      const y = this.find(parent, v);

      if (x !== y) {
        e++;
        result.push([u, v, w]);
        this.union(parent, rank, x, y);
      }
    }

    console.log("Following are the edges in the constructed MST");
    for (const [u, v, weight] of result) {
      console.log(`${u} -- ${v} == ${weight}`);
    }
  }
}
if (require.main === module) {
  // Example usage
  const g = new Graph(4);
  g.addEdge(0, 1, 10);
  g.addEdge(0, 2, 6);
  g.addEdge(0, 3, 5);
  g.addEdge(1, 3, 15);
  g.addEdge(2, 3, 4);

  g.kruskalMST();
}

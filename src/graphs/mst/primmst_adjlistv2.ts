/* """
Greedy Algorithms | Set 6 (Prim's MST for Adjacency List Representation)

http://www.geeksforgeeks.org/greedy-algorithms-set-5-prims-mst-for-adjacency-list-representation/

1. Greedy Algorithms | Set 5 (Prim's Minimum Spanning Tree (MST))
2. Graph and its representations

We have discussed Prim's algorithm and its implementation for adjacency matrix representation of
graphs. The time complexity for the matrix representation is O(V^2). In this post, O(ELogV)
algorithm for adjacency list representation is discussed.

As discussed in the previous post, in Prim's algorithm, two sets are maintained, one set contains
list of vertices already included in MST, other set contains vertices not yet included. With
adjacency list representation, all vertices of a graph can be traversed in O(V+E) time using BFS.
The idea is to traverse all vertices of graph using BFS and use a Min Heap to store the vertices
not yet included in MST. Min Heap is used as a priority queue to get the minimum weight edge from
the cut. Min Heap is used as time complexity of operations like extracting minimum element and
decreasing key value is O(LogV) in Min Heap.

---------------------------------------------------
Explanation:
---------------------------------------------------
Following are the detailed steps.
1) Create a Min Heap of size V where V is the number of vertices in the given graph. Every node
of min heap contains vertex number and key value of the vertex.

2) Initialize Min Heap with first vertex as root (the key value assigned to first vertex is 0).
The key value assigned to all other vertices is INF (infinite).

3) While Min Heap is not empty, do following
    a) Extract the min value node from Min Heap. Let the extracted vertex be u.
    b) For every adjacent vertex v of u, check if v is in Min Heap (not yet included in MST).
    If v is in Min Heap and its key value is more than weight of u-v, then update the key value
    of v as weight of u-v.

---------------------------------------------------
Analysis:
---------------------------------------------------

Time Complexity: The time complexity of the above code/algorithm looks O(V^2) as there are two
nested while loops. If we take a closer look, we can observe that the statements in inner loop
are executed O(V+E) times (similar to BFS). The inner loop has decreaseKey() operation which
takes O(LogV) time. So overall time complexity is O(E+V)*O(LogV) which is
O((E+V)*LogV) = O(ELogV) (For a connected graph, V = O(E))
"""
 */

export class Graph {
  V: number;
  graph: { [key: number]: [number, number][] };

  constructor(V: number) {
    this.V = V;
    this.graph = {};
  }

  addEdge(src: number, dest: number, weight: number): void {
    if (!this.graph[src]) {
      this.graph[src] = [];
    }
    this.graph[src].unshift([dest, weight]);

    if (!this.graph[dest]) {
      this.graph[dest] = [];
    }
    this.graph[dest].unshift([src, weight]);
  }
}

function manhattan(point1: [number, number], point2: [number, number]): number {
  return Math.abs(point1[0] - point2[0]) + Math.abs(point1[1] - point2[1]);
}

function primMST(graph: Graph): void {
  let ans = 0;
  const n = Object.keys(graph.graph).length;
  const seen = new Set<number>();
  const vertices: [number, [number, number]][] = [[0, [0, 0]]];

  while (seen.size < n) {
    const [w, [u, v]] = vertices.shift()!;
    if (seen.has(v)) {
      continue;
    }
    ans += w;
    seen.add(v);
    for (const [neighbor, weight] of graph.graph[v] || []) {
      if (!seen.has(neighbor)) {
        vertices.push([weight, [v, neighbor]]);
        vertices.sort((a, b) => a[0] - b[0]);
      }
    }
  }

  console.log("Edges in MST:");
  seen.forEach((v) => {
    console.log(`${0} - ${v}`);
  });
}

if (require.main === module) {
  const graph = new Graph(9);
  graph.addEdge(0, 1, 4);
  graph.addEdge(0, 7, 8);
  graph.addEdge(1, 2, 8);
  graph.addEdge(1, 7, 11);
  graph.addEdge(2, 3, 7);
  graph.addEdge(2, 8, 2);
  graph.addEdge(2, 5, 4);
  graph.addEdge(3, 4, 9);
  graph.addEdge(3, 5, 14);
  graph.addEdge(4, 5, 10);
  graph.addEdge(5, 6, 2);
  graph.addEdge(6, 7, 1);
  graph.addEdge(6, 8, 6);
  graph.addEdge(7, 8, 7);
  primMST(graph);
}

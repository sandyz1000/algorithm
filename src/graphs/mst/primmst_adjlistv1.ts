/* """
Greedy Algorithms | Set 6 (Prim's MST for Adjacency List Representation)

REFER-DIAGRAM --
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

export class Heap {
  array: [number, number][];
  size: number;
  pos: number[];

  constructor() {
    this.array = [];
    this.size = 0;
    this.pos = [];
  }

  newMinHeapNode(v: number, dist: number): [number, number] {
    return [v, dist];
  }

  swapMinHeapNode(a: number, b: number): void {
    const t = this.array[a];
    this.array[a] = this.array[b];
    this.array[b] = t;
  }

  minHeapify(idx: number): void {
    let smallest = idx;
    const left = 2 * idx + 1;
    const right = 2 * idx + 2;

    if (left < this.size && this.array[left][1] < this.array[smallest][1]) {
      smallest = left;
    }

    if (right < this.size && this.array[right][1] < this.array[smallest][1]) {
      smallest = right;
    }

    if (smallest !== idx) {
      this.pos[this.array[smallest][0]] = idx;
      this.pos[this.array[idx][0]] = smallest;
      this.swapMinHeapNode(smallest, idx);
      this.minHeapify(smallest);
    }
  }

  extractMin(): [number, number] | undefined {
    if (this.isEmpty()) {
      return undefined;
    }

    const root = this.array[0];
    const lastNode = this.array[this.size - 1];
    this.array[0] = lastNode;
    this.pos[lastNode[0]] = 0;
    this.pos[root[0]] = this.size - 1;
    this.size -= 1;
    this.minHeapify(0);

    return root;
  }

  isEmpty(): boolean {
    return this.size === 0;
  }

  decreaseKey(v: number, dist: number): void {
    let i = this.pos[v];
    this.array[i][1] = dist;

    while (i > 0 && this.array[i][1] < this.array[(i - 1) >> 1][1]) {
      this.pos[this.array[i][0]] = (i - 1) >> 1;
      this.pos[this.array[(i - 1) >> 1][0]] = i;
      this.swapMinHeapNode(i, (i - 1) >> 1);
      i = (i - 1) >> 1;
    }
  }

  isInMinHeap(v: number): boolean {
    return this.pos[v] < this.size;
  }
}

function printArr(parent: number[], n: number): void {
  for (let i = 1; i < n; i++) {
    console.log(`${parent[i]} - ${i}`);
  }
}

export class Graph {
  V: number;
  graph: { [key: number]: [number, number][] };

  constructor(vertices: number) {
    this.V = vertices;
    this.graph = {};
  }

  addEdge(src: number, dest: number, weight: number): void {
    const newNode: [number, number] = [dest, weight];
    if (!this.graph[src]) {
      this.graph[src] = [];
    }
    this.graph[src].unshift(newNode);

    const reverseNode: [number, number] = [src, weight];
    if (!this.graph[dest]) {
      this.graph[dest] = [];
    }
    this.graph[dest].unshift(reverseNode);
  }
}

function primMST(graph: Graph): void {
  const V = graph.V;
  const graphAdjList = graph.graph;
  const key: number[] = new Array(V).fill(Number.MAX_SAFE_INTEGER);
  const parent: number[] = new Array(V).fill(-1);
  const minHeap = new Heap();

  for (let v = 0; v < V; v++) {
    key[v] = Number.MAX_SAFE_INTEGER;
    parent[v] = -1;
    minHeap.array.push(minHeap.newMinHeapNode(v, key[v]));
    minHeap.pos.push(v);
  }

  minHeap.pos[0] = 0;
  key[0] = 0;
  minHeap.decreaseKey(0, key[0]);
  minHeap.size = V;

  while (!minHeap.isEmpty()) {
    const newHeapNode = minHeap.extractMin();
    if (!newHeapNode) {
      break;
    }
    const u = newHeapNode[0];

    for (const p_crawl of graphAdjList[u]) {
      const v = p_crawl[0];

      if (minHeap.isInMinHeap(v) && p_crawl[1] < key[v]) {
        key[v] = p_crawl[1];
        parent[v] = u;
        minHeap.decreaseKey(v, key[v]);
      }
    }
  }

  printArr(parent, V);
}

// Example usage
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

/* """
## Greedy Algorithms | Set 7 (Dijkstra's shortest path algorithm)
Given a graph and a source vertex in graph, find shortest paths from source to all vertices in
the given graph.

Dijkstra's algorithm is very similar to Prim's algorithm for minimum spanning tree. Like
Prim's MST, we generate a SPT (shortest path tree) with given source as root. We maintain two
sets, one set contains vertices included in shortest path tree, other set includes vertices
not yet included in shortest path tree. At every step of the algorithm, we find a vertex
which is in the other set (set of not yet included) and has minimum distance from source.

Below are the detailed steps used in Dijkstra's algorithm to find the shortest path from a
single source vertex to all other vertices in the given graph.

Algorithm
1) Create a set sptSet (shortest path tree set) that keeps track of vertices included in
shortest path tree, i.e., whose minimum distance from source is calculated and finalized.
Initially, this set is empty.
2) Assign a distance value to all vertices in the input graph. Initialize all distance values
as INFINITE. Assign distance value as 0 for the source vertex so that it is picked first.
3) While sptSet doesn't include all vertices
    a) Pick a vertex u which is not there in sptSetand has minimum distance value.
    b) Include u to sptSet.
    c) Update distance value of all adjacent vertices of u. To update the distance values,
    iterate through all adjacent vertices. For every adjacent vertex v, if sum of distance value
    of u (from source) and weight of edge u-v, is less than the distance value of v, then update
    the distance value of v.



## Greedy Algorithms | Set 8 (Dijkstra's Algorithm for Adjacency List Representation)

Dijkstra's algorithm and its implementation for adjacency matrix representation of graphs. The
time complexity for the matrix representation is O(V^2). In this post, O(ELogV) algorithm for
adjacency list representation is discussed.

As discussed in the previous post, in Dijkstra's algorithm, two sets are maintained,
one set contains list of vertices already included in SPT (Shortest Path Tree), other set
contains vertices not yet included. With adjacency list representation, all vertices of a graph
can be traversed in O(V+E) time using BFS. The idea is to traverse all vertices of graph using
BFS and use a Min Heap to store the vertices not yet included in SPT (or the vertices for which
shortest distance is not finalized yet).  Min Heap is used as a priority queue to get the
minimum distance vertex from set of not yet included vertices. Time complexity of operations
like extract-min and decrease-key value is O(LogV) for Min Heap.

Following are the detailed steps.

1) Create a Min Heap of size V where V is the number of vertices in the given graph. Every node
of min heap contains vertex number and distance value of the vertex.

2) Initialize Min Heap with source vertex as root (the distance value assigned to source vertex
is 0). The distance value assigned to all other vertices is INF (infinite).

3) While Min Heap is not empty, do following
    a)  Extract the vertex with minimum distance value node from Min Heap. Let the extracted
        vertex be u.
    b)  For every adjacent vertex v of u, check if v is in Min Heap. If v is in Min Heap and
        distance value is more than weight of u-v plus distance value of u, then update the
        distance value of v.

Time Complexity:

The time complexity of the above code/algorithm looks O(V^2) as there are two
nested while loops. If we take a closer look, we can observe that the statements in inner loop
are executed O(V+E) times (similar to BFS). The inner loop has decreaseKey() operation which
takes O(LogV) time. So overall time complexity is O(E+V)*O(LogV) which is
O((E+V)*LogV) = O(ELogV)

Note that the above code uses Binary Heap for Priority Queue implementation.
Time complexity can be reduced to O(E + VLogV) using Fibonacci Heap. The reason is, Fibonacci
Heap takes O(1) time for decrease-key operation while Binary Heap takes O(Logn) time.

Notes:

1) The code calculates shortest distance, but doesn't calculate the path information. We
can create a parent array, update the parent array when distance is updated (like prim's
implementation) and use it show the shortest path from source to different vertices.

2) The code is for undirected graph, same dijkstra function can be used for directed graphs
also.

3) The code finds shortest distances from source to all vertices. If we are interested only in
shortest distance from source to a single target, we can break the for loop when the picked
minimum distance vertex is equal to target (Step 3.a of algorithm).

4) Dijkstra's algorithm doesn't work for graphs with negative weight edges. For graphs with
negative weight edges, Bellman-Ford algorithm can be used, we will soon be discussing it as a
separate post.

*/


export class Pair {
  constructor(public first: number = 0, public second: number = 0) { }
}

export class Graph {
  V: number;
  graph: number[][];

  constructor(vertices: number) {
    this.V = vertices;
    this.graph = Array.from({ length: vertices }, () => Array(vertices).fill(0));
  }

  printSolution(dist: number[]): void {
    console.log("Vertex\tDistance from Source");
    for (let node = 0; node < this.V; node++) {
      console.log(`${node}\t${dist[node]}`);
    }
  }

  minDistance(dist: number[], sptSet: boolean[]): number {
    let min = Infinity;
    let minIndex = 0;

    for (let v = 0; v < this.V; v++) {
      if (dist[v] < min && !sptSet[v]) {
        min = dist[v];
        minIndex = v;
      }
    }

    return minIndex;
  }

  dijkstra(src: number): void {
    const dist: number[] = Array(this.V).fill(Infinity);
    const sptSet: boolean[] = Array(this.V).fill(false);

    dist[src] = 0;

    for (let _ = 0; _ < this.V; _++) {
      const u = this.minDistance(dist, sptSet);
      sptSet[u] = true;

      for (let v = 0; v < this.V; v++) {
        if (this.graph[u][v] > 0 && !sptSet[v] && dist[u] !== Infinity && dist[u] + this.graph[u][v] < dist[v]) {
          dist[v] = dist[u] + this.graph[u][v];
        }
      }
    }

    this.printSolution(dist);
  }
}

export class Heap {
  array: Pair[] = [];
  size = 0;
  pos: number[] = [];

  newMinHeapNode(v: number, dist: number): Pair {
    return new Pair(v, dist);
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

    if (left < this.size && this.array[left].second < this.array[smallest].second) {
      smallest = left;
    }

    if (right < this.size && this.array[right].second < this.array[smallest].second) {
      smallest = right;
    }

    if (smallest !== idx) {
      this.pos[this.array[smallest].first] = idx;
      this.pos[this.array[idx].first] = smallest;

      this.swapMinHeapNode(smallest, idx);

      this.minHeapify(smallest);
    }
  }

  extractMin(): Pair | undefined {
    if (this.isEmpty()) {
      return undefined;
    }

    const root = this.array[0];

    const lastNode = this.array[this.size - 1];
    this.array[0] = lastNode;

    this.pos[lastNode.first] = 0;
    this.pos[root.first] = this.size - 1;

    this.size--;

    this.minHeapify(0);

    return root;
  }

  isEmpty(): boolean {
    return this.size === 0;
  }

  decreaseKey(v: number, dist: number): void {
    let i = this.pos[v];

    this.array[i].second = dist;

    while (i > 0 && this.array[i].second < this.array[Math.floor((i - 1) / 2)].second) {
      this.pos[this.array[i].first] = Math.floor((i - 1) / 2);
      this.pos[this.array[Math.floor((i - 1) / 2)].first] = i;

      this.swapMinHeapNode(i, Math.floor((i - 1) / 2));

      i = Math.floor((i - 1) / 2);
    }
  }

  is_in_min_heap(v: number): boolean {
    return this.pos[v] < this.size;
  }
}

function print_arr(dist: number[], n: number): void {
  console.log("Vertex\tDistance from source");
  for (let i = 0; i < n; i++) {
    console.log(`${i}\t\t${dist[i]}`);
  }
}

export class Graph2 {
  V: number;
  graph: Map<number, Pair[]>;

  constructor(V: number) {
    this.V = V;
    this.graph = new Map();
  }

  addEdge(src: number, dest: number, weight: number): void {
    if (!this.graph.has(src)) {
      this.graph.set(src, []);
    }
    if (!this.graph.has(dest)) {
      this.graph.set(dest, []);
    }

    this.graph.get(src)?.push(new Pair(dest, weight));
    this.graph.get(dest)?.push(new Pair(src, weight));
  }

  dijkstra(src: number): void {
    const V = this.V;
    const dist: number[] = Array(V).fill(Infinity);
    const minHeap = new Heap();

    for (let v = 0; v < V; v++) {
      dist[v] = Infinity;
      minHeap.array.push(minHeap.newMinHeapNode(v, dist[v]));
      minHeap.pos.push(v);
    }

    minHeap.pos[src] = src;
    dist[src] = 0;
    minHeap.decreaseKey(src, dist[src]);
    minHeap.size = V;

    while (!minHeap.isEmpty()) {
      const newHeapNode = minHeap.extractMin();
      const u = newHeapNode?.first as number;

      for (const pair of (this.graph.get(u) || [])) {
        if (minHeap.is_in_min_heap(pair.v) && dist[u] !== Infinity && dist[u] + pair.weight < dist[pair.v]) {
          dist[pair.v] = dist[u] + pair.weight;
          minHeap.decreaseKey(pair.v, dist[pair.v]);
        }
      }
    }

    print_arr(dist, V);
  }
}

if (require.main === module) {
  console.log("\n ---- Method-1 --------");
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
    [0, 0, 2, 0, 0, 0, 6, 7, 0]
  ];
  g.dijkstra(0);

  console.log("\n ---- Method-2 --------");
  const graph = new Graph2(9);
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
  graph.dijkstra(0);
}

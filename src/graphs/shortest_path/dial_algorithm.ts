/* """Dial’s Algorithm (Optimized Dijkstra for small range weights)

http://www.geeksforgeeks.org/dials-algorithm-optimized-dijkstra-for-small-range-weights/

Dial's Algorithm (Optimized Dijkstra for small range weights)
Dijkstra's shortest path algorithm runs in O(Elog V) time when implemented with adjacency list
representation

Can we optimize Dijkstra's shortest path algorithm to work better than O(E log V) if maximum
weight is small (or range of edge weights is small)?

For example:
In the above diagram, maximum weight is 14. Many a times the range of weights on
edges in is in small range (i.e. all edge weight can be mapped to 0, 1, 2.. w where w is a small
number). In that case, Dijkstra's algorithm can be modified by using different data structure,
buckets, which is called dial implementation of dijkstra's algorithm.
time complexity is O(E + WV) where W is maximum weight on any edge of graph, so we can see that,
if W is small then this implementation runs much faster than traditional algorithm.

Following are important observations.
1) Maximum distance between any two node can be at max w(V - 1) (w is maximum edge weight and we
can have at max V-1 edges between two vertices).

2) In Dijkstra algorithm, distances are finalized in non-decreasing, i.e., distance of the closer
(to given source) vertices is finalized before the distant vertices.

---------------------------------------------
Algorithm
---------------------------------------------

-> Maintains some buckets, numbered 0, 1, 2,..... ,wV.
-> Bucket k contains all temporarily labeled nodes with distance equal to k.
-> Nodes in each bucket are represented by list of vertices.
-> Buckets 0, 1, 2,..wV are checked sequentially until the first non-empty bucket is found. Each
node contained in the first non-empty bucket has the minimum distance label by definition.
-> One by one, these nodes with minimum distance label are permanently labeled and deleted from the
bucket during the scanning process.
-> Thus operations involving vertex include:
    a. Checking if a bucket is empty
    b. Adding a vertex to a bucket
    c. Deleting a vertex from a bucket.
-> The position of a temporarily labeled vertex in the buckets is updated accordingly when the
distance label of a vertex changes.
-> Process repeated until all vertices are permanently labeled (or distances of all vertices are
finalized). """
 */

export class Pair {
  constructor(public first: number = 0, public second: number = 0) { }
}

export class Graph {
  V: number;
  adj: Map<number, Pair[]>;

  constructor(V: number) {
    this.V = V;
    this.adj = new Map();
  }

  addEdge(u: number, v: number, w: number): void {
    if (!this.adj.has(u)) {
      this.adj.set(u, []);
    }
    if (!this.adj.has(v)) {
      this.adj.set(v, []);
    }

    this.adj.get(u)?.push(new Pair(v, w));
    this.adj.get(v)?.push(new Pair(u, w));
  }

  shortestPath(src: number, W: number): void {
    const INF = Number.POSITIVE_INFINITY;
    const dist: Pair[] = Array.from({ length: this.V }, () => new Pair(INF, 0));
    const B = new Map<number, number[]>();

    B.set(0, [src]);
    dist[src].first = 0;

    let idx = 0;

    while (true) {
      while (B.get(idx)?.length === 0 && idx < W * this.V) {
        idx++;
      }

      if (idx === W * this.V) {
        break;
      }

      const u = B.get(idx)?.shift() as number;

      for (const { first: v, second: weight } of (this.adj.get(u) || [])) {
        const du = dist[u].first;
        const dv = dist[v].first;

        if (dv > du + weight) {
          if (dv !== INF) {
            B.get(dv)?.splice(B.get(dv)?.indexOf(dist[v].second) as number, 1);
          }

          dist[v].first = du + weight;
          const updatedBucket = B.get(dist[v].first) || [];
          updatedBucket.push(v);
          B.set(dist[v].first, updatedBucket);

          dist[v].second = B.get(dist[v].first)?.[0] || 0;
        }
      }
    }

    console.log("Vertex   Distance from Source\n");
    for (let i = 0; i < this.V; i++) {
      console.log(`${i}\t${dist[i].first}`);
    }
  }
}

if (require.main === module) {
  const V = 9;
  const g = new Graph(V);

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

  g.shortestPath(0, 14);
}

/* """
Hopcroft–Karp Algorithm for Maximum Matching | Set 1 (Introduction)

http://www.geeksforgeeks.org/hopcroft-karp-algorithm-for-maximum-matching-set-1-introduction/

A matching in a Bipartite Graph is a set of the edges chosen in such a way that no two edges
share an endpoint. A maximum matching is a matching of maximum size (maximum number of edges). In
a maximum matching, if any edge is added to it, it is no longer a matching. There can be more
than one maximum matching for a given Bipartite Graph.

We have discussed importance of maximum matching and Ford Fulkerson Based approach for maximal
Bipartite Matching in previous post. Time complexity of the Ford Fulkerson based algorithm is O(V
x E).

Hopcroft Karp algorithm is an improvement that runs in O(math.sqrt(V) x E) time. Let us define
few terms before we discuss the algorithm

Free Node or Vertex: Given a matching M, a node that is not part of matching is called free node.
Initially all vertices as free (See first graph of below diagram). In second graph, u2 and v2 are
free. In third graph, no vertex is free.

Matching and Not-Matching edges: Given a matching M, edges that are part of matching are called
Matching edges and edges that are not part of M (or connect free nodes) are called Not-Matching
edges. In first graph, all edges are non-matching. In second graph, (u0, v1), (u1, v0) and (u3,
v3) are matching and others not-matching.

Alternating Paths: Given a matching M, an alternating path is a path in which the edges belong
alternatively to the matching and not matching. All single edges paths are alternating paths.
Examples of alternating paths in middle graph are u0-v1-u2 and u2-v1-u0-v2.

Augmenting path: Given a matching M, an augmenting path is an alternating path that starts from
and ends on free vertices. All single edge paths that start and end with free vertices are
augmenting paths. In below diagram, augmenting paths are highlighted with blue color. Note that
the augmenting path always has one extra matching edge.

The Hopcroft Karp algorithm is based on below concept.

A matching M is not maximum if there exists an augmenting path. It is also true other way, i.e,
a matching is maximum if no augmenting path exists

So the idea is to one by one look for augmenting paths. And add the found paths to current matching.

---------------------------------
Hopcroft Karp Algorithm
---------------------------------

1) Initialize Maximal Matching M as empty.
2) While there exists an Augmenting Path p
     Remove matching edges of p from M and add not-matching edges of p to M
     (This increases size of M by 1 as p starts and ends with a free vertex)
3) Return M.

In the initial graph all single edges are augmenting paths and we can pick in any order. In the
middle stage, there is only one augmenting path. We remove matching edges of this path from M and
add not-matching edges. In final matching, there are no augmenting paths so the matching is
maximum.

There are few important things to note before we start implementation.

We need to find an augmenting path (A path that alternates between matching and not matching
edges, and has free vertices as starting and ending points).

Once we find alternating path, we need to add the found path to existing Matching. Here adding
path means, making previous matching edges on this path as not-matching and previous not-matching
edges as matching.

The idea is to use BFS (Breadth First Search) to find augmenting paths. Since BFS traverses level
by level, it is used to divide the graph in layers of matching and not matching edges. A dummy
vertex NIL is added that is connected to all vertices on left side and all vertices on right
side. Following arrays are used to find augmenting path. Distance to NIL is initialized as INF (
infinite). If we start from dummy vertex and come back to it using alternating path of distinct
vertices, then there is an augmenting path.

pairU[]: An array of size m+1 where m is number of vertices on left side of Bipartite Graph.
pairU[u] stores pair of u on right side if u is matched and NIL otherwise.

pairV[]: An array of size n+1 where n is number of vertices on right side of Bipartite Graph.
pairU[v] stores pair of v on left side if v is matched and NIL otherwise.

dist[]: An array of size m+1 where m is number of vertices on left side of Bipartite Graph. dist[
u] is initialized as 0 if u is not matching and INF (infinite) otherwise. dist[] of NIL is also
initialized as INF

Once an augmenting path is found, DFS (Depth First Search) is used to add augmenting paths to
current matching. DFS simply follows the distance array setup by BFS. It fills values in pairU[u]
and pairV[v] if v is next to u in BFS.
""" */


import { Queue } from 'datastructures-js';

const NIL = 0;
const INF = 99999999999;

class BipGraph {
  m: number;
  n: number;
  adj: { [key: number]: number[] };
  pairU: number[] | null;
  pairV: number[] | null;
  dist: number[] | null;

  constructor(m: number, n: number) {
    this.m = m;
    this.n = n;
    this.adj = {};
    this.pairU = null;
    this.pairV = null;
    this.dist = null;
  }

  hopcroftKarp(): number {
    this.pairU = new Array(this.m + 1).fill(NIL);
    this.pairV = new Array(this.n + 1).fill(NIL);
    this.dist = new Array(this.m + 1).fill(0);

    let result = 0;

    while (this.bfs()) {
      for (let i = 1; i <= this.m; i++) {
        if (this.pairU[i] === NIL && this.dfs(i)) {
          result += 1;
        }
      }
    }

    return result;
  }

  bfs(): boolean {
    const queue = new Queue<number>();

    for (let u = 1; u <= this.m; u++) {
      if (this.pairU[u] === NIL) {
        this.dist[u] = 0;
        queue.enqueue(u);
      } else {
        this.dist[u] = INF;
      }
    }

    this.dist[NIL] = INF;

    while (!queue.isEmpty()) {
      const u = queue.dequeue();

      if (this.dist[u] < this.dist[NIL]) {
        for (const v of this.adj[u] || []) {
          if (this.dist[this.pairV[v]] === INF) {
            this.dist[this.pairV[v]] = this.dist[u] + 1;
            queue.enqueue(this.pairV[v]);
          }
        }
      }
    }

    return this.dist[NIL] !== INF;
  }

  dfs(u: number): boolean {
    if (u !== NIL) {
      for (const v of this.adj[u] || []) {
        if (this.dist[this.pairV[v]] === this.dist[u] + 1) {
          if (this.dfs(this.pairV[v])) {
            this.pairV[v] = u;
            this.pairU[u] = v;
            return true;
          }
        }
      }

      this.dist[u] = INF;
      return false;
    }

    return true;
  }

  addEdge(u: number, v: number): void {
    if (!this.adj[u]) {
      this.adj[u] = [];
    }
    this.adj[u].push(v);

    if (!this.adj[v]) {
      this.adj[v] = [];
    }
    this.adj[v].push(u);
  }
}

if (require.main === module) {

  // Testing the TypeScript code with the provided example
  const g = new BipGraph(4, 4);
  g.addEdge(1, 2);
  g.addEdge(1, 3);
  g.addEdge(2, 1);
  g.addEdge(3, 2);
  g.addEdge(4, 2);
  g.addEdge(4, 4);

  console.log("Size of maximum matching is", g.hopcroftKarp());
}

/* """Karger's algorithm for Minimum Cut | Set 1 (Introduction and Implementation)

http://www.geeksforgeeks.org/kargers-algorithm-for-minimum-cut-set-1-introduction-and-implementation/

Given an undirected and unweighted graph, find the smallest cut (smallest number of edges that
disconnects the graph into two components).

The input graph may have parallel edges.

    (0)-- a --(1)
     |  \       |
     b    c     d
     |       \  |
    (2)-- e --(3)

A Simple Solution use Max-Flow based s-t cut algorithm to find minimum cut. Consider every pair of
vertices as source 's' and sink 't', and call minimum s-t cut algorithm to find the s-t cut. Return
minimum of all s-t cuts. Best possible time complexity of this algorithm is O(V5) for a graph.
[How? there are total possible V2 pairs and s-t cut algorithm for one pair takes O(V*E) time and
E = O(V2)].

Below is simple Karger's Algorithm for this purpose. Below Karger's algorithm can be implemented in
O(E) = O(V2) time.

1)  Initialize contracted graph CG as copy of original graph
2)  While there are more than 2 vertices.
      a) Pick a random edge (u, v) in the contracted graph.
      b) Merge (or contract) u and v into a single vertex (update
         the contracted graph).
      c) Remove self-loops
3) Return cut represented by two vertices.""" */


export class Edge {
  constructor(public src: number, public dest: number) { }
}

export class Subset {
  parent: number;
  rank: number;

  constructor(parent: number, rank: number) {
    this.parent = parent;
    this.rank = rank;
  }

  static find(subsets: Subset[], i: number): number {
    if (subsets[i].parent !== i) {
      subsets[i].parent = Subset.find(subsets, subsets[i].parent);
    }

    return subsets[i].parent;
  }

  static union(subsets: Subset[], x: number, y: number): void {
    const xroot = Subset.find(subsets, x);
    const yroot = Subset.find(subsets, y);

    if (subsets[xroot].rank < subsets[yroot].rank) {
      subsets[xroot].parent = yroot;
    } else if (subsets[xroot].rank > subsets[yroot].rank) {
      subsets[yroot].parent = xroot;
    } else {
      subsets[yroot].parent = xroot;
      subsets[xroot].rank += 1;
    }
  }
}

export class Graph {
  V: number;
  E: number;
  edge: Edge[];

  constructor(V: number, E: number, edge: Edge[] = []) {
    this.V = V;
    this.E = E;
    this.edge = edge;
  }

  kargerMinCut(): number {
    const V = this.V;
    const E = this.E;
    const edge = this.edge;

    const subsets: Subset[] = Array.from({ length: V }, (_, v) => new Subset(v, 0));
    let vertices = V;

    while (vertices > 2) {
      const i = Math.floor(Math.random() * E);
      const subset1 = Subset.find(subsets, edge[i].src);
      const subset2 = Subset.find(subsets, edge[i].dest);

      if (subset1 === subset2) {
        continue;
      } else {
        console.log(`Contracting edge ${edge[i].src}-${edge[i].dest}`);
        vertices -= 1;
        Subset.union(subsets, subset1, subset2);
      }
    }

    let cutEdges = 0;
    for (let i = 0; i < E; i++) {
      const subset1 = Subset.find(subsets, edge[i].src);
      const subset2 = Subset.find(subsets, edge[i].dest);
      if (subset1 !== subset2) {
        cutEdges += 1;
      }
    }

    return cutEdges;
  }
}

if (require.main === module) {
  const V = 4;
  const E = 5;
  const edges = [
    [0, 1],
    [0, 2],
    [0, 3],
    [1, 3],
    [2, 3],
  ];

  const graph = new Graph(V, E, edges.map((edge) => new Edge(edge[0], edge[1])));
  console.log(`Cut found by Karger's randomized algo is ${graph.kargerMinCut()}`);
}

/* 
https://www.geeksforgeeks.org/union-find/

Disjoint Set (Or Union-Find) | Set 1 (Detect Cycle in an Undirected Graph)

A disjoint-set data structure is a data structure that keeps track of a set of elements
partitioned into a number of disjoint (non-overlapping) subsets. A union-find algorithm is an
algorithm that performs two useful operations on such a data structure:

Find: Determine which subset a particular element is in. This can be used for determining if two
elements are in the same subset.

Union: Join two subsets into a single subset.

In this post, we will discuss an application of Disjoint Set Data Structure. The application is
to check whether a given graph contains a cycle or not.

Union-Find Algorithm can be used to check whether an undirected graph contains cycle or not. Note
that we have discussed an algorithm to detect cycle. This is another method based on Union-Find.
This method assumes that graph doesn't contain any self-loops. We can keeps track of the subsets
in a 1D array, lets call it parent[].

            0
            |  \
            |    \
            2 --- 1

For each edge, make subsets using both the vertices of the edge. If both the vertices are in the
same subset, a cycle is found.

Initially, all slots of parent array are initialized to -1 (means there is only one item in
every subset).

- - - - - - - - - - - - - - - - - - - - - - - -
0   1   2
-1 -1  -1
- - - - - - - - - - - - - - - - - - - - - - - -

Now process all edges one by one.

Edge 0-1: Find the subsets in which vertices 0 and 1 are. Since they are in different subsets, we
take the union of them. For taking the union, either make node 0 as parent of node 1 or vice-versa.

- - - - - - - - - - - - - - - - - - - - - - - -
0   1   2    <----- 1 is made parent of 0 (1 is now representative of subset {0, 1})
1  -1  -1
- - - - - - - - - - - - - - - - - - - - - - - -

Edge 1-2: 1 is in subset 1 and 2 is in subset 2. So, take union.

- - - - - - - - - - - - - - - - - - - - - - - -
0   1   2    <----- 2 is made parent of 1 (2 is now representative of subset {0, 1, 2})
1   2  -1
- - - - - - - - - - - - - - - - - - - - - - - -

Edge 2-0: 0 is in subset 2 and 2 is also in subset 2. Hence, including this edge forms a cycle.

How subset of 0 is same as 2?
0->1->2 # 1 is parent of 0 and 2 is parent of 1

Note that the implementation of union() and find() is naive and takes O(n) time in worst case.
These methods can be improved to O(Logn) using Union by Rank or Height. We will soon be discussing
Union by Rank in a separate post.

 */

export class Graph {
  V: number;
  graph: Map<number, number[]>;

  constructor(vertices: number) {
    this.V = vertices;
    this.graph = new Map<number, number[]>();
  }

  addEdge(u: number, v: number): void {
    if (!this.graph.has(u)) {
      this.graph.set(u, []);
    }
    this.graph.get(u)?.push(v);
  }

  findParent(parents: number[], i: number): number {
    if (parents[i] === -1) {
      return i;
    }
    if (parents[i] !== -1) {
      return this.findParent(parents, parents[i]);
    }
    return -1; // Return -1 to handle TypeScript strictNullChecks
  }

  union(parent: number[], x: number, y: number): void {
    x = this.findParent(parent, x);
    y = this.findParent(parent, y);
    parent[x] = y;
  }

  isCyclic(): boolean {
    const parent: number[] = Array(this.V).fill(-1);

    for (const i of this.graph.keys()) {
      for (const j of this.graph.get(i) || []) {
        const x = this.findParent(parent, i);
        const y = this.findParent(parent, j);
        if (x === y) {
          return true;
        }
        this.union(parent, x, y);
      }
    }

    return false;
  }
}

if (require.main === module) {
  // Output: Graph contains cycle
  // Create a graph given in the above diagram
  const g = new Graph(3);
  g.addEdge(0, 1);
  g.addEdge(1, 2);
  g.addEdge(2, 0);

  if (g.isCyclic()) {
    console.log("Graph contains cycle");
  } else {
    console.log("Graph does not contain cycle");
  }
}

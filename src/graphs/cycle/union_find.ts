/* """
https://www.geeksforgeeks.org/union-find-algorithm-set-2-union-by-rank/

Union-Find Algorithm | Set 2 (Union By Rank and Path Compression)

The above union() and find() are naive and the worst case time complexity is linear. The trees
created to represent subsets can be skewed and can become like a linked list. Following is an
example worst case scenario.

Let there be 4 elements 0, 1, 2, 3

Initially, all elements are single element subsets.
0 1 2 3

Do Union(0, 1)
   1   2   3
  /
 0

Do Union(1, 2)
     2   3
    /
   1
 /
0

Do Union(2, 3)
         3
        /
      2
     /
   1
 /
0

The above operations can be optimized to O(Log n) in worst case. The idea is to always attach
smaller depth tree under the root of the deeper tree. This technique is called union by rank. The
term rank is preferred instead of height because if path compression technique (we have discussed
it below) is used, then rank is not always equal to height. Also, size (in place of height) of
trees can also be used as rank. Using size as rank also yields worst case time complexity as 
O(Logn) (See this for proof)



Let us see the above example with union by rank
Initially, all elements are single element subsets.
0 1 2 3

Do Union(0, 1)
   1   2   3
  /
 0

Do Union(1, 2)
   1    3
 /  \
0    2

Do Union(2, 3)
    1
 /  |  \
0   2   3

The second optimization to naive method is Path Compression. The idea is to flatten the tree when
find() is called. When find() is called for an element x, root of the tree is returned. The find()
operation traverses up from x to find root. The idea of path compression is to make the found root
as parent of x so that we don't have to traverse all intermediate nodes again. If x is root
of a subtree, then path (to root) from all nodes under x also compresses.


Let the subset {0, 1, .. 9} be represented as below and find() is called
for element 3.
              9
         /    |    \
        4     5      6
     /     \        /  \
    0        3     7    8
            /  \
           1    2

When find() is called for 3, we traverse up and find 9 as representative
of this subset. With path compression, we also make 3 as the child of 9 so
that when find() is called next time for 1, 2 or 3, the path to root is reduced.

               9
         /    /  \    \
        4    5    6     3
     /           /  \   /  \
    0           7    8  1   2

The two techniques complement each other. The time complexity of each operation becomes even
smaller than O(Logn). In fact, amortized time complexity effectively becomes small constant.

""" */

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

  find_parent(parent: number[], i: number): number {
    if (parent[i] === -1) {
      return i;
    } else if (parent[i] !== -1) {
      return this.find_parent(parent, parent[i]);
    }
    return -1; // Default return value
  }

  union(parent: number[], x: number, y: number): void {
    const x_set = this.find_parent(parent, x);
    const y_set = this.find_parent(parent, y);
    parent[x_set] = y_set;
  }

  isCyclic(): boolean {
    const parent: number[] = Array(this.V).fill(-1);

    for (const i of this.graph.keys()) {
      for (const j of this.graph.get(i) || []) {
        const x = this.find_parent(parent, i);
        const y = this.find_parent(parent, j);
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
  const g = new Graph(3);
  g.addEdge(0, 1);
  g.addEdge(1, 2);
  g.addEdge(2, 0);

  if (g.isCyclic()) {
    console.log("Graph contains cycle");
  } else {
    console.log("Graph doesn't contain cycle");
  }
}

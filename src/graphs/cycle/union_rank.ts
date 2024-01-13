/* """
Union-Find Algorithm | Set 2 (Union By Rank and Path Compression)
In the previous post, we introduced union find algorithm and used it to detect cycle in a graph.
We used following union() and find() operations for subsets.

# Naive implementation of find()
def find(parent: List[int], i: int):
    if (parent[i] == -1):
        return i
    return find(parent, parent[i])

# Naive implementation of union()
def union(parent: List, x: int, y: int):
    xset = find(parent, x)
    yset = find(parent, y)
    parent[xset] = yset

The above union() and find() are naive and the worst case time complexity is linear. The trees created to represent
subsets can be skewed and can become like a linked list. Following is an example worst case scenario.

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
The above operations can be optimized to O(Log n) in worst case. The idea is to always attach smaller depth tree
under the root of the deeper tree. This technique is called union by rank. The term rank is preferred instead of
height because if path compression technique (we have discussed it below) is used, then rank is not always equal
to height. Also, size (in place of height) of trees can also be used as rank. Using size as rank also yields worst
case time complexity as O(Logn) (See this for proof)

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

The second optimization to naive method is Path Compression. The idea is to flatten the tree when find() is called.
When find() is called for an element x, root of the tree is returned. The find() operation traverses up from x to
find root. The idea of path compression is to make the found root as parent of x so that we don’t have to traverse
all intermediate nodes again. If x is root of a subtree, then path (to root) from all nodes under x also compresses.

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

The two techniques complement each other. The time complexity of each operation becomes even smaller than O(Logn). 
In fact, amortized time complexity effectively becomes small constant.

""" */

export class Subset {
  parent: number;
  rank: number;

  constructor(parent: number, rank: number) {
    this.parent = parent;
    this.rank = rank;
  }
}

export class Graph {
  num_of_v: number;
  edges: Map<number, number[]>;

  constructor(num_of_v: number) {
    this.num_of_v = num_of_v;
    this.edges = new Map<number, number[]>();
  }

  addEdge(u: number, v: number): void {
    if (!this.edges.has(u)) {
      this.edges.set(u, []);
    }
    this.edges.get(u)?.push(v);
  }
}

function find(subsets: Subset[], node: number): number {
  if (subsets[node].parent !== node) {
    subsets[node].parent = find(subsets, subsets[node].parent);
  }
  return subsets[node].parent;
}

function union(subsets: Subset[], u: number, v: number): void {
  if (subsets[u].rank > subsets[v].rank) {
    subsets[v].parent = u;
  } else if (subsets[v].rank > subsets[u].rank) {
    subsets[u].parent = v;
  } else {
    subsets[v].parent = u;
    subsets[u].rank += 1;
  }
}

function isCycle(graph: Graph): boolean {
  const subsets: Subset[] = [];

  for (let u = 0; u < graph.num_of_v; u++) {
    subsets.push(new Subset(u, 0));
  }

  for (const u of graph.edges.keys()) {
    for (const v of graph.edges.get(u) || []) {
      const u_rep = find(subsets, u);
      const v_rep = find(subsets, v);
      if (u_rep === v_rep) {
        return true;
      }
      union(subsets, u_rep, v_rep);
    }
  }

  return false;
}

if (require.main === module) {
  const g = new Graph(3);
  g.addEdge(0, 1);
  g.addEdge(1, 2);
  g.addEdge(0, 2);

  if (isCycle(g)) {
    console.log('Graph contains cycle');
  } else {
    console.log('Graph does not contain cycle');
  }
}

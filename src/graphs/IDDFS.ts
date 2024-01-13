/* """
Iterative Deepening Search(IDS) or Iterative Deepening Depth First Search(IDDFS)
http://www.geeksforgeeks.org/iterative-deepening-searchids-iterative-deepening-depth-first-searchiddfs/

There are two common ways to traverse a graph, BFS and DFS. Considering a Tree (or Graph) of
huge height and width, both BFS and DFS are not very efficient due to following reasons.

1. DFS first traverses nodes going through one adjacent of root, then next adjacent. The problem
with this approach is, if there is a node close to root, but not in first few subtrees explored
by DFS, then DFS reaches that node very late. Also, DFS may not find shortest path to a node (in
terms of number of edges).

2. BFS goes level by level, but requires more space. The space required by DFS is O(d) where d is
depth of tree, but space required by BFS is O(n) where n is number of nodes in tree (Why? Note
that the last level of tree can have around n/2 nodes and second last level n/4 nodes and in BFS
we need to have every level one by one in queue).

IDDFS combines depth-first search's space-efficiency and breadth-first search's fast search
(for nodes closer to root).

How does IDDFS work?
IDDFS calls DFS for different depths starting from an initial value. In every call,
DFS is restricted from going beyond given depth. So basically we do DFS in a BFS fashion.

------------------------------------------------------------
Algorithm:
------------------------------------------------------------

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
# Returns true if target is reachable from src within max_depth
bool IDDFS(src, target, max_depth)
    for limit from 0 to max_depth
       if DLS(src, target, limit) == true
           return true
    return false

bool DLS(src, target, limit)
    if (src == target)
        return true;

    // If reached the maximum depth,
    // stop recursing.
    if (limit <= 0)
        return false;

    foreach adjacent i of src
        if DLS(i, target, limit?1)
            return true

    return false
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

An important thing to note is, we visit top level nodes multiple times. The last (or max depth)
level is visited once, second last level is visited twice, and so on. It may seem expensive,
but it turns out to be not so costly, since in a tree most of the nodes are in the bottom level.
So it does not matter much if the upper levels are visited multiple times.


Time Complexity: Suppose we have a tree having branching factor 'b' (number of children of each
node), and its depth 'd', i.e., there are bd nodes.

In an iterative deepening search, the nodes on the bottom level are expanded once, those on the
next to bottom level are expanded twice, and so on, up to the root of the search tree, which is
expanded d+1 times. So the total number of expansions in an iterative deepening search is-

- - - - - - - - - - - - - - - - - - - - - - - - - - -
(d)b + (d-1)b2 + .... + 3bd-2 + 2bd-1 + bd

That is, Summation[(d + 1 - i) bi], from i = 0 to i = d Which is same as O(bd)
- - - - - - - - - - - - - - - - - - - - - - - - - - -

After evaluating the above expression, we find that asymptotically IDDFS takes the same time as
that of DFS and BFS, but it is indeed slower than both of them as it has a higher constant factor
in its time complexity expression.

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

    dls(src: number, target: number, maxDepth: number): boolean {
        if (src === target) {
            return true;
        }

        if (maxDepth <= 0) {
            return false;
        }

        for (const i of this.graph.get(src) || []) {
            if (this.dls(i, target, maxDepth - 1)) {
                return true;
            }
        }

        return false;
    }

    iddfs(src: number, target: number, maxDepth: number): boolean {
        for (let i = 0; i < maxDepth; i++) {
            if (this.dls(src, target, i)) {
                return true;
            }
        }

        return false;
    }
}

if (require.main === module) {
    const g = new Graph(7);
    g.addEdge(0, 1);
    g.addEdge(0, 2);
    g.addEdge(1, 3);
    g.addEdge(1, 4);
    g.addEdge(2, 5);
    g.addEdge(2, 6);

    const target = 6;
    const maxDepth = 3;
    const src = 0;

    if (g.iddfs(src, target, maxDepth)) {
        console.log("Target is reachable from source within max depth");
    } else {
        console.log("Target is NOT reachable from source within max depth");
    }
}

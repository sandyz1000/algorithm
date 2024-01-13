/* """
http://www.geeksforgeeks.org/articulation-points-or-cut-vertices-in-a-graph/

Articulation Points (or Cut Vertices) in a Graph

A vertex in an undirected connected graph is an articulation point (or cut vertex) iff removing it
(and edges through it) disconnects the graph. Articulation points represent vulnerabilities in a
connected network - single points whose failure would split the network into 2 or more disconnected
components. They are useful for designing reliable networks.

For a disconnected undirected graph, an articulation point is a vertex removing which increases
number of connected components.

How to find all articulation points in a given graph?
A simple approach is to one by one remove all vertices and see if removal of a vertex causes
disconnected graph. Following are steps of simple approach for connected graph.

1) For every vertex v, do following
    a) Remove v from graph
    b) See if the graph remains connected (We can either use BFS or DFS)
    c) Add v back to the graph

Time complexity of above method is O(V*(V+E)) for a graph represented using adjacency list.
Can we do better?

------------------------------------------
Algorithm:
------------------------------------------
A O(V+E) algorithm to find all Articulation Points (APs)

The idea is to use DFS (Depth First Search). In DFS, we follow vertices in tree form called DFS
tree. In DFS tree, a vertex u is parent of another vertex v, if v is discovered by u (obviously v
is an adjacent of u in graph). In DFS tree, a vertex u is articulation point if one of the
following two conditions is true.
    1) u is root of DFS tree and it has at least two children.
    2) u is not root of DFS tree and it has a child v such that no vertex in subtree rooted with v
    has a back edge to one of the ancestors (in DFS tree) of u.

We do DFS traversal of given graph with additional code to find out Articulation Points (APs). In
DFS traversal, we maintain a parent[] array where parent[u] stores parent of vertex u. Among the
above mentioned two cases, the first case is simple to detect. For every vertex, count children.
If currently visited vertex u is root (parent[u] is NIL) and has more than two children, print it.

How to handle second case? The second case is trickier. We maintain an array disc[] to store
discovery time of vertices. For every node u, we need to find out the earliest visited vertex
(the vertex with minimum discovery time) that can be reached from subtree rooted with u. So we
maintain an additional array low[] which is defined as follows.

- - - - - - - - - - - - - - - - - - - - - - - -
low[u] = min(disc[u], disc[w])
where w is an ancestor of u and there is a back edge from some descendant of u to w.
- - - - - - - - - - - - - - - - - - - - - - - -
"""
 */

export class Graph {
    V: number;
    graph: Map<number, number[]>;
    time: number;

    constructor(vertices: number) {
        this.V = vertices;
        this.graph = new Map<number, number[]>();
        this.time = 0;
    }

    addEdge(u: number, v: number): void {
        if (!this.graph.has(u)) {
            this.graph.set(u, []);
        }
        if (!this.graph.has(v)) {
            this.graph.set(v, []);
        }
        this.graph.get(u)?.push(v);
        this.graph.get(v)?.push(u);
    }

    APUtil(u: number, visited: boolean[], ap: boolean[], parent: number[], low: number[], disc: number[]): void {
        let children = 0;
        visited[u] = true;
        disc[u] = this.time;
        low[u] = this.time;
        this.time += 1;

        for (const v of this.graph.get(u) || []) {
            if (!visited[v]) {
                children += 1;
                parent[v] = u;
                this.APUtil(v, visited, ap, parent, low, disc);

                low[u] = Math.min(low[u], low[v]);

                if (parent[u] === -1 && children > 1) {
                    ap[u] = true;
                }

                if (parent[u] !== -1 && low[v] >= disc[u]) {
                    ap[u] = true;
                }
            } else if (v !== parent[u]) {
                low[u] = Math.min(low[u], disc[v]);
            }
        }
    }

    AP(): void {
        const visited: boolean[] = Array(this.V).fill(false);
        const disc: number[] = Array(this.V).fill(Number.POSITIVE_INFINITY);
        const low: number[] = Array(this.V).fill(Number.POSITIVE_INFINITY);
        const parent: number[] = Array(this.V).fill(-1);
        const ap: boolean[] = Array(this.V).fill(false);

        for (let i = 0; i < this.V; i++) {
            if (!visited[i]) {
                this.APUtil(i, visited, ap, parent, low, disc);
            }
        }

        for (let i = 0; i < ap.length; i++) {
            if (ap[i]) {
                console.log(i);
            }
        }
    }
}

if (require.main === module) {
    const g1 = new Graph(5);
    g1.addEdge(1, 0);
    g1.addEdge(0, 2);
    g1.addEdge(2, 1);
    g1.addEdge(0, 3);
    g1.addEdge(3, 4);

    console.log("\nArticulation points in first graph ");
    g1.AP();

    const g2 = new Graph(4);
    g2.addEdge(0, 1);
    g2.addEdge(1, 2);
    g2.addEdge(2, 3);
    console.log("\nArticulation points in second graph ");
    g2.AP();

    const g3 = new Graph(7);
    g3.addEdge(0, 1);
    g3.addEdge(1, 2);
    g3.addEdge(2, 0);
    g3.addEdge(1, 3);
    g3.addEdge(1, 4);
    g3.addEdge(1, 6);
    g3.addEdge(3, 5);
    g3.addEdge(4, 5);
    console.log("\nArticulation points in third graph ");
    g3.AP();
}

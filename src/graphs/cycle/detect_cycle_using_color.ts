/* Detect Cycle in a directed graph using colors
http://www.geeksforgeeks.org/detect-cycle-direct-graph-using-colors/

Given a directed graph, check whether the graph contains a cycle or not. Your function should
return true if the given graph contains at least one cycle, else return false. For example,
the following graph contains three cycles 0->2->0, 0->1->2->0 and 3->3, so your function must
return true.

Time complexity of above solution is O(V + E) where V is number of vertices and E is number of
edges in the graph.


Solution:
---------
Depth First Traversal can be used to detect cycle in a Graph. DFS for a connected graph
produces a tree. There is a cycle in a graph only if there is a back edge present in the
graph. A back edge is an edge that is from a node to itself (selfloop) or one of its ancestor
in the tree produced by DFS. In the following graph, there are 3 back edges, marked with
cross sign. We can observe that these 3 back edges indicate 3 cycles present in the graph.

    --- DIAGRAM -GOES -HERE ---

For a disconnected graph, we get the DFS forest as output. To detect cycle, we can check for
cycle in individual trees by checking back edges.

In this post a different solution is discussed. The solution is from CLRS book. The idea is
to do DFS of given graph and while doing traversal, assign one of the below three colors to
every vertex.

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

WHITE : Vertex is not processed yet. Initially all vertices are WHITE.

GRAY : Vertex is being processed (DFS for this vertex has started, but not finished which
means that all descendants (ind DFS tree) of this vertex are not processed yet (or this
vertex is in function call stack)

BLACK : Vertex and all its descendants are processed.

While doing DFS, if we encounter an edge from current vertex to a GRAY vertex, then this
edge is back edge and hence there is a cycle.

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

Algorithm:
----------
1. Create a recursive function that takes the edge and color array (this can be also kept as a global variable)
2. Mark the current node as GREY.
3. Traverse all the adjacent nodes and if any node is marked GREY then return true as a loop is bound to exist.
4. If any adjacent vertex is WHITE then call the recursive function for that node. If the function returns true.
    Return true.
5. If no adjacent node is grey or has not returned true then mark the current Node as BLACK and return false.

Complexity Analysis:
-------------------
Time complexity: O(V + E), where V is the number of vertices and E is the number of edges in the graph.
Space Complexity :O(V).
Since an extra color array is needed of size V.

 */

export enum Color {
    GREY = 1,
    WHITE = 2,
    BLACK = 3,
}

export class Graph {
    V: number;
    graph: Map<number, number[]>;

    constructor(V: number) {
        this.V = V;
        this.graph = new Map<number, number[]>();
    }

    addEdge(u: number, v: number): void {
        if (!this.graph.has(u)) {
            this.graph.set(u, []);
        }
        this.graph.get(u)?.push(v);
    }

    dfsUtil(u: number, color: Color[]): boolean {
        color[u] = Color.GREY;

        for (const v of this.graph.get(u) || []) {
            if (color[v] === Color.GREY) {
                return true;
            }
            if (color[v] === Color.WHITE && this.dfsUtil(v, color)) {
                return true;
            }
        }

        color[u] = Color.BLACK;
        return false;
    }

    isCyclic(): boolean {
        const color: Color[] = Array(this.V).fill(Color.WHITE);

        for (let i = 0; i < this.V; i++) {
            if (color[i] === Color.WHITE) {
                if (this.dfsUtil(i, color)) {
                    return true;
                }
            }
        }

        return false;
    }
}

if (require.main === module) {
    // Output: Graph contains cycle
    const g = new Graph(4);
    g.addEdge(0, 1);
    g.addEdge(0, 2);
    g.addEdge(1, 2);
    g.addEdge(2, 0);
    g.addEdge(2, 3);
    g.addEdge(3, 3);
    console.log(g.isCyclic() ? "Graph contains cycle" : "Graph doesn't contain cycle");
}

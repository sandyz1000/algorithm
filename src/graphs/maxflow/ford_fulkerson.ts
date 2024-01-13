/* Ford-Fulkerson Algorithm for Maximum Flow Problem
Given a graph which represents a flow network where every edge has a capacity. Also given two
vertices source 's' and sink 't' in the graph, find the maximum possible flow from s to t with
following constraints:

a) Flow on an edge doesn't exceed the given capacity of the edge.

b) Incoming flow is equal to outgoing flow for every vertex except s and t.

For example, consider the following graph from CLRS book

    -- DIAGRAM GOES HERE ---

The maximum possible flow in the above graph is 23.

    -- DIAGRAM GOES HERE ---


Ford-Fulkerson Algorithm
- - - - - - - - - - - - - - - - - - - - -

    The following is simple idea of Ford-Fulkerson algorithm:
    1) Start with initial flow as 0.
    2) While there is a augmenting path from source to sink.
               Add this path-flow to flow.
    3) Return flow.

- - - - - - - - - - - - - -- - - - - - -- - - - - - -

Time Complexity: Time complexity of the above algorithm is O(max_flow * E). We run a loop while
there is an augmenting path. In worst case, we may add 1 unit flow in every iteration. Therefore
the time complexity becomes O(max_flow * E).

How to implement the above simple algorithm?
Let us first define the concept of Residual Graph which is needed for understanding the
implementation.

Residual Graph of a flow network is a graph which indicates additional possible flow. If there is
a path from source to sink in residual graph, then it is possible to add flow. Every edge of a
residual graph has a value called residual capacity which is equal to original capacity of the
edge minus current flow. Residual capacity is basically the current capacity of the edge.

Let us now talk about implementation details. Residual capacity is 0 if there is no edge between
two vertices of residual graph. We can initialize the residual graph as original graph as there
is no initial flow and initially residual capacity is equal to original capacity. To find an
augmenting path, we can either do a BFS or DFS of the residual graph. We have used BFS in below
implementation. Using BFS, we can find out if there is a path from source to sink. BFS also
builds parent[] array. Using the parent[] array, we traverse through the found path and find
possible flow through this path by finding minimum residual capacity along the path. We later add
the found path flow to overall flow.

The important thing is, we need to update residual capacities in the residual graph. We subtract
path flow from all edges along the path and we add path flow along the reverse edges We need to
add path flow along reverse edges because may later need to send flow in reverse direction (See
following link for example).  
*/

export class Graph {
    private ROW: number;
    private graph: number[][];

    constructor(graph: number[][]) {
        this.graph = graph;
        this.ROW = graph.length;
    }

    private bfs(s: number, t: number, parent: number[]): boolean {
        const visited: boolean[] = Array(this.ROW).fill(false);
        const queue: number[] = [s];
        visited[s] = true;

        while (queue.length > 0) {
            const u: number = queue.shift()!;

            for (let ind = 0; ind < this.graph[u].length; ind++) {
                const val: number = this.graph[u][ind];
                if (!visited[ind] && val > 0) {
                    queue.push(ind);
                    visited[ind] = true;
                    parent[ind] = u;
                }
            }
        }

        return visited[t];
    }

    fordFulkerson(source: number, sink: number): number {
        const parent: number[] = Array(this.ROW).fill(-1);
        let maxFlow: number = 0;

        while (this.bfs(source, sink, parent)) {
            let pathFlow: number = Number.POSITIVE_INFINITY;
            let s: number = sink;

            while (s !== source) {
                pathFlow = Math.min(pathFlow, this.graph[parent[s]][s]);
                s = parent[s];
            }

            maxFlow += pathFlow;

            let v: number = sink;
            while (v !== source) {
                const u: number = parent[v];
                this.graph[u][v] -= pathFlow;
                this.graph[v][u] += pathFlow;
                v = parent[v];
            }
        }

        return maxFlow;
    }
}

if (require.main === module) {
    // Output: The maximum possible flow is 23
    const graph: number[][] = [
        [0, 16, 13, 0, 0, 0],
        [0, 0, 10, 12, 0, 0],
        [0, 4, 0, 0, 14, 0],
        [0, 0, 9, 0, 0, 20],
        [0, 0, 0, 7, 0, 4],
        [0, 0, 0, 0, 0, 0],
    ];

    const g = new Graph(graph);
    const source: number = 0;
    const sink: number = 5;
    console.log(`The maximum possible flow is ${g.fordFulkerson(source, sink)}`);
}

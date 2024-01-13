/* """
https://www.geeksforgeeks.org/prims-minimum-spanning-tree-mst-greedy-algo-5/

Prim's algorithm is also a Greedy algorithm. It starts with an empty spanning tree. The idea
is to maintain two sets of vertices. The first set contains the vertices already included in the
MST, the other set contains the vertices not yet included. At every step, it considers all the
edges that connect the two sets, and picks the minimum weight edge from these edges. After
picking the edge, it moves the other endpoint of the edge to the set containing MST.

A group of edges that connects two set of vertices in a graph is called cut in graph theory. So, at
every step of Prim's algorithm, we find a cut (of two sets, one contains the vertices already
included in MST and other contains rest of the vertices), pick the minimum weight edge from the cut
and include this vertex to MST Set (the set that contains already included vertices).

How does Prim's Algorithm Work? The idea behind Prim's algorithm is simple, a spanning tree means
all vertices must be connected. So the two disjoint subsets (discussed above) of vertices must be
connected to make a Spanning Tree. And they must be connected with the minimum weight edge to
make it a Minimum Spanning Tree.

----------------------------------------
Algorithm
----------------------------------------
1) Create a set mst_set that keeps track of vertices already included in MST.

2) Assign a key value to all vertices in the input graph. Initialize all key values as INFINITE.
Assign key value as 0 for the first vertex so that it is picked first.

3) While mstSet doesn't include all vertices
    a) Pick a vertex u which is not there in mstSet and has minimum key value.
    b) Include u to mstSet.
    c) Update key value of all adjacent vertices of u. To update the key values, iterate through
    all adjacent vertices. For every adjacent vertex v, if weight of edge u-v is less than the
    previous key value of v, update the key value as weight of u-v

The idea of using key values is to pick the minimum weight edge from cut. The key values are used
only for vertices which are not yet included in MST, the key value for these vertices indicate
the minimum weight edges connecting them to the set of vertices included in MST.

Time Complexity of the above program is O(V^2). If the input graph is represented using adjacency
list, then the time complexity of Prim's algorithm can be reduced to O(E log V) with the help of
binary heap.

"""

 */

export class Graph {
    V: number;
    graph: number[][];

    constructor(vertices: number) {
        this.V = vertices;
        this.graph = new Array(this.V).fill(null).map(() => new Array(this.V).fill(0));
    }

    printMST(parent: number[]): void {
        console.log("Edge \tWeight");
        for (let i = 1; i < this.V; i++) {
            console.log(parent[i], "-", i, "\t", this.graph[i][parent[i]]);
        }
    }

    minKey(key: number[], mstSet: boolean[]): number {
        let minimum = Number.MAX_SAFE_INTEGER;
        let minIndex = Number.MAX_SAFE_INTEGER;

        for (let v = 0; v < this.V; v++) {
            if (key[v] < minimum && !mstSet[v]) {
                minimum = key[v];
                minIndex = v;
            }
        }

        return minIndex;
    }

    primMST(): void {
        const key: number[] = new Array(this.V).fill(Number.MAX_SAFE_INTEGER);
        const parent: number[] = new Array(this.V).fill(null);
        const mstSet: boolean[] = new Array(this.V).fill(false);

        key[0] = 0;
        parent[0] = -1;

        for (let _ = 0; _ < this.V; _++) {
            const u = this.minKey(key, mstSet);
            mstSet[u] = true;

            for (let v = 0; v < this.V; v++) {
                if (0 < this.graph[u][v] && this.graph[u][v] < key[v] && !mstSet[v]) {
                    key[v] = this.graph[u][v];
                    parent[v] = u;
                }
            }
        }

        this.printMST(parent);
    }
}

// Example usage
const g = new Graph(5);
g.graph = [
    [0, 2, 0, 6, 0],
    [2, 0, 3, 8, 5],
    [0, 3, 0, 0, 7],
    [6, 8, 0, 0, 9],
    [0, 5, 7, 9, 0]
];

g.primMST();

/* """
Boruvka's algorithm:

REFER DIAGRAM

http://www.geeksforgeeks.org/greedy-algorithms-set-9-boruvkas-algorithm/

Like Prim's and Kruskal's, Boruvka's algorithm is also a Greedy algorithm.

-----------------------------------------------------
Algorithm:
-----------------------------------------------------
1) Input is a connected, weighted and directed graph.
2) Initialize all vertices as individual components (or sets).
3) Initialize MST as empty.
4) While there are more than one components, do following for each component.
    a) Find the closest weight edge that connects this component to any other component.
    b) Add this closest edge to MST if not already added.
5) Return MST.

Interesting Facts about Boruvka's algorithm:
1) Time Complexity of Boruvka's algorithm is O(E log V) which is same as Kruskal's and Prim's
algorithms.

2) Boruvka's algorithm is used as a step in a faster randomized algorithm that works in linear
time O(E).

3) Boruvka's algorithm is the oldest minimum spanning tree algorithm was discovered by Boruvka's
in 1926, long before computers even existed. The algorithm was published as a method of
constructing an efficient electricity network.

""" */


export class Graph {
    private V: number; // No. of vertices
    private graph: number[][]; // Adjacency list to store the graph

    constructor(vertices: number) {
        this.V = vertices;
        this.graph = [];
    }

    // Function to add an edge to the graph
    addEdge(u: number, v: number, w: number): void {
        this.graph.push([u, v, w]);
    }

    // Utility function to find the set of an element i (uses path compression technique)
    find(parent: number[], i: number): number {
        if (parent[i] === i) {
            return i;
        }
        return this.find(parent, parent[i]);
    }

    // Function to perform union of two sets x and y (uses union by rank)
    union(parent: number[], rank: number[], x: number, y: number): void {
        const xroot = this.find(parent, x);
        const yroot = this.find(parent, y);

        // Attach smaller rank tree under the root of the higher rank tree (Union by Rank)
        if (rank[xroot] < rank[yroot]) {
            parent[xroot] = yroot;
        } else if (rank[xroot] > rank[yroot]) {
            parent[yroot] = xroot;
        } else {
            parent[yroot] = xroot;
            rank[xroot] += 1;
        }
    }

    boruvkaMST(): void {
        const parent: number[] = [];
        const rank: number[] = [];
        // Array to store the index of the cheapest edge of each subset [u, v, w]
        const cheapest: number[][] = [];

        // Initially, there are V different trees; finally, there will be one tree that will be the MST
        let numTrees = this.V;
        let mstWeight = 0;

        // Create V subsets with single elements
        for (let node = 0; node < this.V; node++) {
            parent.push(node);
            rank.push(0);
            cheapest.push([-1, -1, -1]);
        }

        // Keep combining components (or sets) until all components are not combined into a single MST
        while (numTrees > 1) {
            // Traverse through all edges and update the cheapest of every component
            for (let i = 0; i < this.graph.length; i++) {
                const [u, v, w] = this.graph[i];
                const set1 = this.find(parent, u);
                const set2 = this.find(parent, v);

                // If two corners of the current edge belong to the same set, ignore the current edge.
                // Else, check if the current edge is closer to the previous cheapest edges of set1 and set2
                if (set1 !== set2) {
                    if (cheapest[set1][2] === -1 || cheapest[set1][2] > w) {
                        cheapest[set1] = [u, v, w];
                    }
                    if (cheapest[set2][2] === -1 || cheapest[set2][2] > w) {
                        cheapest[set2] = [u, v, w];
                    }
                }
            }

            // Consider the above-picked cheapest edges and add them to the MST
            for (let node = 0; node < this.V; node++) {
                // Check if the cheapest for the current set exists
                if (cheapest[node][2] !== -1) {
                    const [u, v, w] = cheapest[node];
                    const set1 = this.find(parent, u);
                    const set2 = this.find(parent, v);

                    if (set1 !== set2) {
                        mstWeight += w;
                        this.union(parent, rank, set1, set2);
                        console.log(`Edge ${u}-${v} with weight ${w} included in MST`);
                        numTrees--;
                    }
                }
            }

            // Reset the cheapest array
            for (let i = 0; i < this.V; i++) {
                cheapest[i] = [-1, -1, -1];
            }
        }

        console.log(`Weight of MST is ${mstWeight}`);
    }
}

if (require.main === module) {
    // Example usage
    const g = new Graph(4);
    g.addEdge(0, 1, 10);
    g.addEdge(0, 2, 6);
    g.addEdge(0, 3, 5);
    g.addEdge(1, 3, 15);
    g.addEdge(2, 3, 4);
    
    g.boruvkaMST();
}

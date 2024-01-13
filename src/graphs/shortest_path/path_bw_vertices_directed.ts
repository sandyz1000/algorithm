/* """Find if there is a path between two vertices in a directed graph

Given a Directed Graph and two vertices in it, check whether there is a path from the first given
vertex to second.

            (0) ----> (2)
            |       /
            |     /
            |   /
    start-->(2) ----> (3)

For example, in the following graph, there is a path from vertex 1 to 3. As another example,
there is no path from 3 to 0.

We can either use Breadth First Search (BFS) or Depth First Search (DFS) to find path between two
vertices. Take the first vertex as source in BFS (or DFS), follow the standard BFS (or DFS).
If we see the second vertex in our traversal, then return true. Else return false."""
 */

// TypeScript code to check if there exists a path between two vertices of a graph

export class Graph {
    private V: number; // No. of vertices
    private graph: Record<number, number[]>; // Adjacency list representation

    constructor(vertices: number) {
        this.V = vertices;
        this.graph = {};
    }

    // Function to add an edge to the graph
    addEdge(u: number, v: number): void {
        if (!this.graph[u]) {
            this.graph[u] = [];
        }
        this.graph[u].push(v);
    }

    isReachable(s: number, d: number): boolean {
        // Mark all the vertices as not visited
        const visited: boolean[] = Array(this.V).fill(false);
        const queue: number[] = [s]; // Create a queue for BFS
        visited[s] = true; // Mark the source node as visited

        while (queue.length > 0) {
            const n = queue.shift()!; // Dequeue a vertex from the queue
            // If this adjacent node is the destination node, then return true
            if (n === d) {
                return true;
            }

            // Else, continue to do BFS
            if (this.graph[n]) {
                for (const i of this.graph[n]) {
                    if (!visited[i]) {
                        queue.push(i);
                        visited[i] = true;
                    }
                }
            }
        }
        // If BFS is complete without reaching the destination
        return false;
    }
}

if (require.main === module) {
    // Example usage:
    // Output:
    // There is a path from 1 to 3
    // There is no path from 3 to 1
    const g = new Graph(4);
    g.addEdge(0, 1);
    g.addEdge(0, 2);
    g.addEdge(1, 2);
    g.addEdge(2, 0);
    g.addEdge(2, 3);
    g.addEdge(3, 3);
    
    let u = 1;
    let v = 3;
    
    if (g.isReachable(u, v)) {
        console.log(`There is a path from ${u} to ${v}`);
    } else {
        console.log(`There is no path from ${u} to ${v}`);
    }
    
    u = 3;
    v = 1;
    if (g.isReachable(u, v)) {
        console.log(`There is a path from ${u} to ${v}`);
    } else {
        console.log(`There is no path from ${u} to ${v}`);
    }
}

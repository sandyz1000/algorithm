/* """
All Topological Sorts of a Directed Acyclic Graph

Topological sorting for Directed Acyclic Graph (DAG) is a linear ordering of vertices such
that for every directed edge uv, vertex u comes before v in the ordering. Topological Sorting for
a graph is not possible if the graph is not a DAG.

Given a DAG, print all topological sorts of the graph.

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
For example, consider the below graph.

    5 ---> 0 <--- 4
    |             |
    |             |
    v             v
    2 ---> 3 ---> 1

All topological sorts of the given graph are:

    4 5 0 2 3 1
    4 5 2 0 3 1
    4 5 2 3 0 1
    4 5 2 3 1 0
    5 2 3 4 0 1
    5 2 3 4 1 0
    5 2 4 0 3 1
    5 2 4 3 0 1
    5 2 4 3 1 0
    5 4 0 2 3 1
    5 4 2 0 3 1
    5 4 2 3 0 1
    5 4 2 3 1 0
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

In a Directed acyclic graph many a times we can have vertices which are unrelated to each other
because of which we can order them in many ways. These various topological sorting is important
in many cases, for example if some relative weight is also available between the vertices,
which is to minimize then we need to take care of relative ordering as well as their relative
weight, which creates the need of checking through all possible topological ordering.

We can go  through all possible ordering via backtracking , the algorithm step are as follows :
1) Initialize all vertices as unvisited.

2) Now choose vertex which is unvisited and has zero indegree and decrease indegree of all those
vertices by 1 (corresponding to removing edges) now add this vertex to result and call the
recursive function again and backtrack.

3) After returning from function reset values of visited, result and indegree for enumeration
of other possibilities.

""" */

// TypeScript program to print all topological sorts of a graph

export class Graph {
    private V: number;
    private adj: Record<number, number[]>;
    private indegree: number[];

    constructor(V: number) {
        this.V = V; // No. of vertices
        this.adj = {};
        this.indegree = Array(this.V).fill(0); // Vector to store indegree of vertices
    }

    private allTopologicalSortUtil(res: number[], visited: boolean[]): void {
        // To indicate whether all topological sorts are found or not
        let flag = false;

        for (let i = 0; i < this.V; i++) {
            // If in-degree is 0 and not yet visited, then only choose that vertex
            if (this.indegree[i] === 0 && !visited[i]) {
                // Reducing in-degree of adjacent vertices
                for (const j of this.adj[i] || []) {
                    this.indegree[j] -= 1;
                }

                // Including in result
                res.push(i);
                visited[i] = true;
                this.allTopologicalSortUtil(res, visited);

                // Resetting visited, res, and in-degree for backtracking
                visited[i] = false;
                res.pop();
                for (const j of this.adj[i] || []) {
                    this.indegree[j] += 1;
                }

                flag = true;
            }
        }

        // We reach here if all vertices are visited. So, we print the solution here
        if (!flag) {
            console.log(res.join(" "));
        }
    }

    addEdge(v: number, w: number): void {
        this.adj[v] = this.adj[v] || [];
        this.adj[v].push(w);
        // Increasing in-degree of w by 1
        this.indegree[w] += 1;
    }

    allTopologicalSort(): void {
        // Mark all the vertices as not visited
        const visited: boolean[] = Array(this.V).fill(false);
        const res: number[] = [];
        this.allTopologicalSortUtil(res, visited);
    }
}

// Example usage:
// Create a graph given in the above diagram
const g = new Graph(6);
g.addEdge(5, 2);
g.addEdge(5, 0);
g.addEdge(4, 0);
g.addEdge(4, 1);
g.addEdge(2, 3);
g.addEdge(3, 1);
console.log("All Topological sorts\n");
g.allTopologicalSort();

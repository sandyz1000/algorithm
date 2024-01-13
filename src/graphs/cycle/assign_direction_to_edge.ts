
/* Assign directions to edges so that the directed graph remains acyclic
http://www.geeksforgeeks.org/assign-directions-to-edges-so-that-the-directed-graph-remains-acyclic/

Given a graph with both directed and undirected edges. It is given that the directed edges
don't form cycle. How to assign directions to undirected edges so that the graph (with all
directed edges) remains acyclic even after the assignment?  */


export class Graph {
    graph: Map<number, number[]>;
    V: number;

    constructor(vertices: number) {
        this.graph = new Map<number, number[]>();
        this.V = vertices;
    }

    addEdge(u: number, v: number): void {
        if (!this.graph.has(u)) {
            this.graph.set(u, []);
        }
        this.graph.get(u)?.push(v);
    }

    isCyclicUtil(v: number, visited: boolean[], recStack: boolean[]): boolean {
        visited[v] = true;
        recStack[v] = true;

        for (const neighbour of this.graph.get(v) || []) {
            if (!visited[neighbour]) {
                if (this.isCyclicUtil(neighbour, visited, recStack)) {
                    return true;
                }
            } else if (recStack[neighbour]) {
                return true;
            }
        }

        recStack[v] = false;
        return false;
    }

    isCyclic(): boolean {
        const visited: boolean[] = Array(this.V).fill(false);
        const recStack: boolean[] = Array(this.V).fill(false);

        for (let node = 0; node < this.V; node++) {
            if (!visited[node]) {
                if (this.isCyclicUtil(node, visited, recStack)) {
                    return true;
                }
            }
        }

        return false;
    }
}

if (require.main === module) {
    const g = new Graph(4);
    g.addEdge(0, 1);
    g.addEdge(0, 2);
    g.addEdge(1, 2);
    g.addEdge(2, 0);
    g.addEdge(2, 3);
    g.addEdge(3, 3);

    if (g.isCyclic()) {
        console.log("Graph has a cycle");
    } else {
        console.log("Graph has no cycle");
    }
}

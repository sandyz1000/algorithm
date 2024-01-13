/* Detect Cycle in a Directed Graph
https://www.geeksforgeeks.org/detect-cycle-in-a-graph/


Given a directed graph, check whether the graph contains a cycle or not. Your function should
return true if the given graph contains at least one cycle, else return false. For example,
the following graph contains three cycles 0->2->0, 0->1->2->0 and 3->3, so your function must
return true.
        ---- REFER DIAGRAM ----

Depth First Traversal can be used to detect cycle in a Graph. DFS for a connected graph produces
a tree. There is a cycle in a graph only if there is a back edge present in the graph. A back
edge is an edge that is from a node to itself (selfloop) or one of its ancestor in the tree
produced by DFS. In the following graph, there are 3 back edges, marked with cross sign. We can
observe that these 3 back edges indicate 3 cycles present in the graph.

        ---- REFER DIAGRAM - GOES - HERE ----

For a disconnected graph, we get the DFS forrest as output. To detect cycle, we can check for
cycle in individual trees by checking back edges.

To detect a back edge, we can keep track of vertices currently in recursion stack of function for
DFS traversal. If we reach a vertex that is already in the recursion stack, then there is a cycle
in the tree. The edge that connects current vertex to the vertex in the recursion stack is back
edge. We have used recStack[] array to keep track of vertices in the recursion stack.

Time Complexity of this method is same as time complexity of DFS traversal which is O(V+E). */


export class Graph {
  V: number;
  graph: Map<number, number[]>;

  constructor(vertices: number) {
    this.V = vertices;
    this.graph = new Map<number, number[]>();
  }

  addEdge(v: number, w: number): void {
    if (!this.graph.has(v)) {
      this.graph.set(v, []);
    }
    this.graph.get(v)?.push(w);

    if (!this.graph.has(w)) {
      this.graph.set(w, []);
    }
    this.graph.get(w)?.push(v);
  }

  isCyclicUtil(v: number, visited: boolean[], parent: number): boolean {
    visited[v] = true;

    for (const i of this.graph.get(v) || []) {
      if (!visited[i]) {
        if (this.isCyclicUtil(i, visited, v)) {
          return true;
        }
      } else if (parent !== i) {
        return true;
      }
    }

    return false;
  }

  isCyclic(): boolean {
    const visited: boolean[] = Array(this.V).fill(false);

    for (let i = 0; i < this.V; i++) {
      if (!visited[i]) {
        if (this.isCyclicUtil(i, visited, -1)) {
          return true;
        }
      }
    }

    return false;
  }
}

if (require.main === module) {
  const g = new Graph(5);
  g.addEdge(1, 0);
  g.addEdge(0, 2);
  g.addEdge(2, 0);
  g.addEdge(0, 3);
  g.addEdge(3, 4);

  if (g.isCyclic()) {
    console.log("Graph contains cycle");
  } else {
    console.log("Graph does not contain cycle");
  }

  const g1 = new Graph(3);
  g1.addEdge(0, 1);
  g1.addEdge(1, 2);

  if (g1.isCyclic()) {
    console.log("Graph contains cycle");
  } else {
    console.log("Graph does not contain cycle");
  }
}

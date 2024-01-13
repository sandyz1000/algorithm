// Longest Path in a Directed Acyclic Graph

export class AdjListNode {
  vertex: number;
  weight: number;

  constructor(vertex: number, weight: number) {
    this.vertex = vertex;
    this.weight = weight;
  }
}

export class Graph {
  V: number;
  graph: Record<number, AdjListNode[]>;

  constructor(V: number) {
    this.V = V;
    this.graph = {};
  }

  topologicalSortUtil(v: number, visited: boolean[], stack: number[]): void {
    visited[v] = true;

    for (const node of this.graph[v] || []) {
      if (!visited[node.vertex]) {
        this.topologicalSortUtil(node.vertex, visited, stack);
      }
    }

    stack.push(v);
  }

  addEdge(u: number, v: number, weight: number): void {
    if (!this.graph[u]) {
      this.graph[u] = [];
    }
    this.graph[u].push(new AdjListNode(v, weight));
  }

  longestPath(s: number): void {
    const stack: number[] = [];
    const dist: number[] = Array(this.V).fill(INF);

    const visited: boolean[] = Array(this.V).fill(false);
    for (let i = 0; i < this.V; i++) {
      visited[i] = false;
    }

    for (let i = 0; i < this.V; i++) {
      if (!visited[i]) {
        this.topologicalSortUtil(i, visited, stack);
      }
    }

    for (let i = 0; i < this.V; i++) {
      dist[i] = INF;
    }
    dist[s] = 0;

    let size = stack.length;
    while (size > 0) {
      const u = stack[size - 1];
      stack.pop();
      size--;

      if (dist[u] !== INF) {
        for (const node of this.graph[u]) {
          if (dist[node.vertex] < dist[u] + node.weight) {
            dist[node.vertex] = dist[u] + node.weight;
          }
        }
      }
    }

    for (let i = 0; i < this.V; i++) {
      console.log(dist[i] === INF ? 'INF' : dist[i]);
    }
  }
}

export const INF = -Number.MAX_SAFE_INTEGER;

if (require.main === module) {

  const g = new Graph(6);
  g.addEdge(0, 1, 5);
  g.addEdge(0, 2, 3);
  g.addEdge(1, 3, 6);
  g.addEdge(1, 2, 2);
  g.addEdge(2, 4, 4);
  g.addEdge(2, 5, 2);
  g.addEdge(2, 3, 7);
  g.addEdge(3, 5, 1);
  g.addEdge(3, 4, -1);
  g.addEdge(4, 5, -2);

  const s = 1;
  console.log(`Following are longest distances from source vertex ${s}`);
  g.longestPath(s);

}
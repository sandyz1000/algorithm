/* 
Check whether a given graph is Bipartite or not
http://www.geeksforgeeks.org/bipartite-graph/


A Bipartite Graph is a graph whose vertices can be divided into two independent sets, U and V such
that every edge (u, v) either connects a vertex from U to V or a vertex from V to U. In other words,
for every edge (u, v), either u belongs to U and v to V, or u belongs to V and v to U. We can also
say that there is no edge that connects vertices of same set.

----------------------------------
Explanation:
----------------------------------

    --- DIAGRAM GOES HERE ---

A bipartite graph is possible if the graph coloring is possible using two colors such that
vertices in a set are colored with the same color. Note that it is possible to color a cycle
graph with even cycle using two colors. For example, see the following graph.

    --- DIAGRAM GOES HERE ---

It is not possible to color a cycle graph with odd cycle using two colors.

    --- DIAGRAM GOES HERE ---

Algorithm to check if a graph is Bipartite:
One approach is to check whether the graph is 2-colorable or not using backtracking algorithm m
coloring problem.

Following is a simple algorithm to find out whether a given graph is Birpartite or not using
Breadth First Search (BFS).
1.	Assign RED color to the source vertex (putting into set U).
2.	Color all the neighbors with BLUE color (putting into set V).
3.	Color all neighbor’s neighbor with RED color (putting into set U).
4.	This way, assign color to all vertices such that it satisfies all the constraints of m way
    coloring problem where m = 2.
5.  While assigning colors, if we find a neighbor which is colored with same color as current
    vertex, then the graph cannot be colored with 2 vertices (or graph is not Bipartite)

Time Complexity of the above approach is same as that Breadth First Search. In above
implementation is O(V^2) where V is number of vertices. If graph is represented using adjacency
list, then the complexity becomes O(V+E).

 */

import { Queue } from 'datastructures-js';

export class Graph {
  V: number;
  graph: number[][];

  constructor(V: number) {
    this.V = V;
    this.graph = Array.from({ length: V }, () => Array(V).fill(0));
  }

  isBipartite(src: number): boolean {
    const colorArr: number[] = Array(this.V).fill(-1);
    colorArr[src] = 1;

    const queue = new Queue<number>();
    queue.enqueue(src);

    while (!queue.isEmpty()) {
      const u = queue.dequeue()!;

      if (this.graph[u][u] === 1) {
        return false;
      }

      for (let v = 0; v < this.V; v++) {
        if (this.graph[u][v] === 1 && colorArr[v] === -1) {
          colorArr[v] = 1 - colorArr[u];
          queue.enqueue(v);
        } else if (this.graph[u][v] === 1 && colorArr[v] === colorArr[u]) {
          return false;
        }
      }
    }

    return true;
  }
}

export class Graph2 {
  VERTEX: number;

  constructor() {
    this.VERTEX = 4;
  }

  isBipartiteUtil(G: number[][], src: number, colorArr: number[]): boolean {
    colorArr[src] = 1;
    const que = new Queue<number>();
    que.enqueue(src);

    while (!que.isEmpty()) {
      const u = que.dequeue()!;

      if (G[u][u] === 1) {
        return false;
      }

      for (let v = 0; v < this.VERTEX; v++) {
        if (G[u][v] && colorArr[v] === -1) {
          colorArr[v] = 1 - colorArr[u];
          que.enqueue(v);
        } else if (G[u][v] && colorArr[v] === colorArr[u]) {
          return false;
        }
      }
    }

    return true;
  }

  isBipartite(G: number[][]): boolean {
    const colorArr: number[] = Array(this.VERTEX).fill(-1);

    for (let i = 0; i < this.VERTEX; i++) {
      if (colorArr[i] === -1) {
        if (!this.isBipartiteUtil(G, i, colorArr)) {
          return false;
        }
      }
    }

    return true;
  }
}

if (require.main === module) {
  console.log("\n ------------ Method -1 ---------- \n");

  // Output: Yes
  const g = new Graph(4);
  g.graph = [
    [0, 1, 0, 1],
    [1, 0, 1, 0],
    [0, 1, 0, 1],
    [1, 0, 1, 0],
  ];

  console.log(g.isBipartite(0) ? "Yes" : "No");

  console.log("\n ------------ Method -2 ---------- \n");

  // Output: Yes
  const gr = new Graph2();
  const graph: number[][] = [
    [0, 1, 0, 1],
    [1, 0, 1, 0],
    [0, 1, 0, 1],
    [1, 0, 1, 0],
  ];

  console.log(gr.isBipartite(graph) ? "Yes" : "No");
}

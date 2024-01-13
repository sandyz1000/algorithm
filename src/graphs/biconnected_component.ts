/* """
Biconnected Components

A biconnected component is a maximal biconnected subgraph.

Biconnected Graph is already discussed here. In this article, we will see how to find biconnected
component in a graph using algorithm by John Hopcroft and Robert Tarjan.

In above graph, following are the biconnected components:

-> 4-2 3-4 3-1 2-3 1-2
-> 8-9
-> 8-5 7-8 5-7
-> 6-0 5-6 1-5 0-1
-> 10-11

Algorithm is based on Disc and Low Values discussed in Strongly Connected Components Article.

Idea is to store visited edges in a stack while DFS on a graph and keep looking for Articulation
Points (highlighted in above figure). As soon as an Articulation Point u is found, all edges
visited while DFS from node u onwards will form one biconnected component. When DFS completes for
one connected component, all edges present in stack will form a biconnected component.

If there is no Articulation Point in graph, then graph is biconnected and so there will be one
biconnected component which is the graph itself.

# TS program to find bi-connected components in a given undirected graph
# Complexity : O(V+E)
""" */

import { stdout } from "process";

export class Graph {
  V: number;
  graph: { [key: number]: number[] };
  time: number;
  count: number;

  constructor(vertices: number) {
    this.V = vertices;
    this.graph = {};
    this.time = 0;
    this.count = 0;
  }

  addEdge(u: number, v: number): void {
    if (!this.graph[u]) {
      this.graph[u] = [];
    }
    this.graph[u].push(v);
    if (!this.graph[v]) {
      this.graph[v] = [];
    }
    this.graph[v].push(u);
  }

  bccUtil(u: number, parent: number[], low: number[], disc: number[], st: [number, number][]): void {
    let children = 0;

    disc[u] = this.time;
    low[u] = this.time;
    this.time += 1;

    for (const v of this.graph[u] || []) {
      if (disc[v] === -1) {
        parent[v] = u;
        children += 1;
        st.push([u, v]);
        this.bccUtil(v, parent, low, disc, st);

        low[u] = Math.min(low[u], low[v]);

        if ((parent[u] === -1 && children > 1) || (parent[u] !== -1 && low[v] >= disc[u])) {
          this.count += 1;
          let w: [number, number] | null = null;
          while (w !== null && w.toString() !== [u, v].toString()) {
            w = st.pop() || null;
            stdout.write(`${w} `);
          }
          stdout.write("\n");
        }
      } else if (v !== parent[u] && low[u] > disc[v]) {
        low[u] = Math.min(low[u], disc[v]);
        st.push([u, v]);
      }
    }
  }

  bcc(): void {
    const disc: number[] = Array(this.V).fill(-1);
    const low: number[] = Array(this.V).fill(-1);
    const parent: number[] = Array(this.V).fill(-1);
    const st: [number, number][] = [];

    for (let i = 0; i < this.V; i++) {
      if (disc[i] === -1) {
        this.bccUtil(i, parent, low, disc, st);
      }

      if (st.length > 0) {
        this.count += 1;
        while (st.length > 0) {
          const w = st.pop();
          stdout.write(`${w} `);
        }
        stdout.write("\n");
      }
    }
  }
}

if (require.main === module) {
  const g = new Graph(12);
  g.addEdge(0, 1);
  g.addEdge(1, 2);
  g.addEdge(1, 3);
  g.addEdge(2, 3);
  g.addEdge(2, 4);
  g.addEdge(3, 4);
  g.addEdge(1, 5);
  g.addEdge(0, 6);
  g.addEdge(5, 6);
  g.addEdge(5, 7);
  g.addEdge(5, 8);
  g.addEdge(7, 8);
  g.addEdge(8, 9);
  g.addEdge(10, 11);

  g.bcc();
  console.log(`Above are ${g.count} biconnected components in the graph`);
}

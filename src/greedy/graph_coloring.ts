/* """
1. Color first vertex with first color.
2. Consider the currently picked vertex and color it with the lowest numbered color that has not
been used on any previously colored vertices adjacent to it. If all previously used colors
appear on vertices adjacent to v, assign a new color to it.
Time Complexity: O(V^2 + E) in worst case.
""" */

export class Graph {
  VERTEX: number;
  adjacency: Map<number, number[]>;

  constructor(vertices: number) {
      this.VERTEX = vertices;
      this.adjacency = new Map();
  }

  addEdge(v: number, w: number) {
      if (!this.adjacency.has(v)) {
          this.adjacency.set(v, []);
      }
      if (!this.adjacency.has(w)) {
          this.adjacency.set(w, []);
      }

      this.adjacency.get(v)?.push(w);
      this.adjacency.get(w)?.push(v);
  }

  greedyColoring() {
      const result = Array(this.VERTEX).fill(-1);
      result[0] = 0;

      for (let u = 1; u < this.VERTEX; u++) {
          const available = Array(this.VERTEX).fill(false);

          // Process all adjacent vertices and flag their colors as unavailable
          if (this.adjacency.has(u)) {
            let connections: number[] = this.adjacency.get(u) as number[];
            for (const conn of connections) {
                if (result[conn] !== -1) {
                    available[result[conn]] = true;
                }
            }
          }

          let cr;
          for (cr = 0; cr < this.VERTEX; cr++) {
              if (!available[cr]) {
                  break;
              }
          }

          result[u] = cr;

          // Reset the values back to false for the next iteration
          if (this.adjacency.has(u)) {
            let connections: number[] = this.adjacency.get(u) as number[];
            for (const conn of connections) {
                if (result[conn] !== -1) {
                    available[result[conn]] = false;
                }
            }
          }
      }

      return result;
  }
}

if (require.main === module) {
  // Example usage
  const g1 = new Graph(5);
  g1.addEdge(0, 1);
  g1.addEdge(0, 2);
  g1.addEdge(1, 2);
  g1.addEdge(1, 3);
  g1.addEdge(2, 3);
  g1.addEdge(3, 4);
  console.log("Coloring of graph-1 \n", g1.greedyColoring());
  
  const g2 = new Graph(5);
  g2.addEdge(0, 1);
  g2.addEdge(0, 2);
  g2.addEdge(1, 2);
  g2.addEdge(1, 4);
  g2.addEdge(2, 4);
  g2.addEdge(4, 3);
  console.log("\nColoring of graph-2 \n", g2.greedyColoring());
}

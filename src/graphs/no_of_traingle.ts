/* """
Number of Triangles in an Undirected Graph
Given an Undirected simple graph, We need to find how many triangles it can have.

For example below graph have 2 triangles in it.

    0 --- 1 --- 3
     \    |    /
       \  |  /
          2

    0 --- 1     1 --- 2
      \   |     |   /
        \ |     |  /
          2     3

Explanation:

Let A[][] be adjacency matrix representation of graph. If we calculate A3, then the number of
triangle in Undirected Graph is equal to trace(A3) / 6. Where trace(A) is the sum of the elements
on the main diagonal of matrix A.

Trace of a graph represented as adjacency matrix A[V][V] is,
trace(A[V][V]) = A[0][0] + A[1][1] + .... + A[V-1][V-1]

Count of triangles = trace(A3) / 6

How does this work?

If we compute An for an adjacency matrix representation of graph, then a value An[i][j]
represents number of distinct walks between vertex i to j in graph. In A3, we get all distinct
paths of length 3 between every pair of vertices.

A triangle is a cyclic path of length three, i.e. begins and ends at same vertex. So A3[i][i]
represents a triangle beginning and ending with vertex i. Since a triangle has three vertices and
it is counted for every vertex, we need to divide result by 3. Furthermore, since the graph is
undirected, every triangle twice as i-p-q-j and i-q-p-j, so we divide by 2 also. Therefore,
number of triangles is trace(A3) / 6.

Time Complexity: The time complexity of above algorithm is O(V3) where V is number of vertices in
the graph, we can improve the performance to O(V2.8074) using Strassen’s matrix multiplication
algorithm."""
 */

// Class to represent a graph
export class Graph {
  private readonly VERTEX: number = 4;

  // Utility function for matrix multiplication
  private multiply(A: number[][], B: number[][], C: number[][]): void {
    for (let i = 0; i < this.VERTEX; i++) {
      for (let j = 0; j < this.VERTEX; j++) {
        C[i][j] = 0;
        for (let k = 0; k < this.VERTEX; k++) {
          C[i][j] += A[i][k] * B[k][j];
        }
      }
    }
  }

  // Utility function to calculate trace of a matrix (sum of diagonal elements)
  private getTrace(graph: number[][]): number {
    let trace: number = 0;
    for (let i = 0; i < this.VERTEX; i++) {
      trace += graph[i][i];
    }
    return trace;
  }

  // Utility function for calculating the number of triangles in the graph
  triangleInGraph(graph: number[][]): number {
    const aux2: number[][] = new Array(this.VERTEX).fill([]).map(() => new Array(this.VERTEX).fill(0));
    const aux3: number[][] = new Array(this.VERTEX).fill([]).map(() => new Array(this.VERTEX).fill(0));

    // Initializing aux matrices with 0
    for (let i = 0; i < this.VERTEX; i++) {
      for (let j = 0; j < this.VERTEX; j++) {
        aux2[i][j] = aux3[i][j] = 0;
      }
    }

    // aux2 is graph^2 now
    this.multiply(graph, graph, aux2);

    // after this multiplication aux3 is graph^3
    this.multiply(graph, aux2, aux3);

    const trace: number = this.getTrace(aux3);
    return trace / 6;
  }
}

// Main function
if (require.main === module) {
  // Output: Total number of Triangles in Graph: 2
  // Let us create the example graph discussed above
  const gfg: Graph = new Graph();
  const graph: number[][] = [
    [0, 1, 1, 0],
    [1, 0, 1, 1],
    [1, 1, 0, 1],
    [0, 1, 1, 0]
  ];

  console.log(`Total number of Triangles in Graph: ${gfg.triangleInGraph(graph)}`);
}

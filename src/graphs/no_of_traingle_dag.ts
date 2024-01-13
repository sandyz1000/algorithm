/* """
Number of Triangles in Directed and Undirected Graphs
Given a Graph, count number of triangles in it. The graph is can be directed or undirected.

------------------
Example:
------------------

Input: digraph = [[0, 0, 1, 0],
                [1, 0, 0, 1],
                [0, 1, 0, 0],
                [0, 0, 1, 0]]
Output: 2

Two traingle: (0, 2, 1) and (1, 3, 2)

    0 <-- 1 --> 3
     \    ^    /
       \  |  /
          2

Explanation:

We have discussed a method based on graph trace that works for undirected graphs. In this post a
new method is discussed with that is simpler and works for both directed and undirected graphs.

The idea is to use three nested loops to consider every triplet (i, j, k) and check for the above
condition (there is an edge from i to j, j to k and k to i)
However in an undirected graph, the triplet (i, j, k) can be permuted to give six combination
(See previous post for details). Hence we divide the total count by 6 to get the actual number of
triangles.
In case of directed graph, the number of permutation would be 3 (as order of nodes becomes
relevant). Hence in this case the total number of triangles will be obtained by dividing total count
by 3. For example consider the directed graph given below """

 */

// Function to calculate the number of triangles in a simple
// directed/undirected graph.
// isDirected is true if the graph is directed, it's false otherwise
function countTriangle(g: number[][], isDirected: boolean): number {
  const nodes: number = g.length;
  let countTriangle: number = 0;

  // Consider every possible triplet of edges in the graph
  for (let i = 0; i < nodes; i++) {
    for (let j = 0; j < nodes; j++) {
      for (let k = 0; k < nodes; k++) {
        // Check the triplet if it satisfies the condition
        if (i !== j && i !== k && j !== k &&
          g[i][j] !== 0 && g[j][k] !== 0 && g[k][i] !== 0) {
          countTriangle += 1;
        }
      }
    }
  }

  // If the graph is directed, division is done by 3
  // Else division by 6 is done
  return isDirected ? countTriangle / 3 : countTriangle / 6;
}

// Main function
if (require.main === module) {
  // The Number of triangles in an undirected graph: 2
  // The Number of triangles in a directed graph: 2

  const graph: number[][] = [
    [0, 1, 1, 0],
    [1, 0, 1, 1],
    [1, 1, 0, 1],
    [0, 1, 1, 0]
  ];

  // Create the adjacency matrix of a directed graph
  const digraph: number[][] = [
    [0, 0, 1, 0],
    [1, 0, 0, 1],
    [0, 1, 0, 0],
    [0, 0, 1, 0]
  ];

  console.log(`The Number of triangles in an undirected graph: ${countTriangle(graph, false)}`);
  console.log(`The Number of triangles in a directed graph: ${countTriangle(digraph, true)}`);
}

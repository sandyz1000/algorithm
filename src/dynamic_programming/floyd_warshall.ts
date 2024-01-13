/* https://www.geeksforgeeks.org/floyd-warshall-algorithm-dp-16/

Dynamic Programming | Set 16 (Floyd Warshall Algorithm)

The problem is to find shortest distances between every pair of vertices in a given edge weighted
directed Graph.

Input:
       graph[][] = { {0,   5,  INF, 10},
                    {INF,  0,  3,  INF},
                    {INF, INF, 0,   1},
                    {INF, INF, INF, 0} }
which represents the following graph

             10
       (0)------->(3)
        |         /|\
      5 |          |
        |          | 1
       \|/         |
       (1)------->(2)
            3       
Note that the value of graph[i][j] is 0 if i is equal to j 
And graph[i][j] is INF (infinite) if there is no edge from vertex i to j.

Output:
Shortest distance matrix
      0      5      8      9
    INF      0      3      4
    INF    INF      0      1
    INF    INF    INF      0 

            
Floyd Warshall Algorithm
=========================
We initialize the solution matrix same as the input graph matrix as a first step. Then we update
the solution matrix by considering all vertices as an intermediate vertex. The idea is to one by
one pick all vertices and update all shortest paths which include the picked vertex as an
intermediate vertex in the shortest path. When we pick vertex number k as an intermediate vertex,
we already have considered vertices {0, 1, 2, .. k-1} as intermediate vertices. For every pair
(i, j) of source and destination vertices respectively, there are two possible cases.

# REFER IMAGE IN THE LINK ABOVE

1) k is not an intermediate vertex in shortest path from i to j. We keep the value of dist[i][j]
as it is.

2) k is an intermediate vertex in shortest path from i to j. We update the value of dist[i][j]
as dist[i][k] + dist[k][j].
 */

const V: number = 4;
export const INF: number = Number.POSITIVE_INFINITY;

// Solves all pair shortest path via Floyd Warshall Algorithm
function floydWarshall(graph: number[][]): void {
  // Initializing the solution matrix same as the input graph matrix
  const dist: number[][] = graph.map(row => [...row]);

  // Add all vertices one by one to the set of intermediate vertices
  for (let k = 0; k < V; k++) {
    // Pick all vertices as source one by one
    for (let i = 0; i < V; i++) {
      // Pick all vertices as destination for the above picked source
      for (let j = 0; j < V; j++) {
        // If vertex k is on the shortest path from i to j, then update the value of dist[i][j]
        dist[i][j] = Math.min(dist[i][j], dist[i][k] + dist[k][j]);
      }
    }
  }
  printSolution(dist);
}

// A utility function to print the solution
function printSolution(dist: number[][]): void {
  console.log("Following matrix shows the shortest distances between every pair of vertices");
  for (let i = 0; i < V; i++) {
    for (let j = 0; j < V; j++) {
      if (dist[i][j] === INF) {
        process.stdout.write(`INF\t`);
      } else {
        process.stdout.write(`${dist[i][j]}\t`);
      }
      if (j === V - 1) {
        console.log();
      }
    }
  }
}

if (require.main === module) {
  const graph: number[][] = [
    [0, 5, INF, 10],
    [INF, 0, 3, INF],
    [INF, INF, 0, 1],
    [INF, INF, INF, 0]
  ];
  // Print the solution
  floydWarshall(graph);
}


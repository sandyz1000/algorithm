/* """Count all possible walks from a source to a destination with exactly k edges

Given a directed graph and two vertices 'u' and 'v' in it, count all possible walks from 'u' to 'v'
with exactly k edges on the walk.

The graph is given as adjacency matrix representation where value of graph[i][j] as 1 indicates
that there is an edge from vertex i to vertex j and a value 0 indicates no edge from i to j.

For example:
Consider the following graph. Let source 'u' be vertex 0, destination 'v' be 3 and k be 2.
The output should be 2 as there are two walk from 0 to 3 with exactly 2 edges.
The walks are {0, 2, 3} and {0, 1, 3}

"""
 */


// TypeScript program to count walks from u to v with exactly k edges

// Number of vertices in the graph
const V: number = 4;

function countWalks(graph: number[][], u: number, v: number, k: number): number {
  // A naive recursive function to count walks from u to v with k edges
  // The worst case time complexity of the above function is O(V^k) where V is the number
  // of vertices in the given graph

  if (k == 0 && u === v) {
    return 1;
  }

  if (k === 1 && graph[u][v]) {
    return 1;
  }

  if (k <= 0) {
    return 0;
  }

  let count = 0; // Initialize result

  // Go to all adjacents of u and recur
  for (let i = 0; i < V; i++) {
    if (graph[u][i] === 1) { // Check if i is adjacent to u
      count += countWalks(graph, i, v, k - 1);
    }
  }

  return count;
}

function countWalksDP(graph: number[][], u: number, v: number, k: number): number {
  // A Dynamic programming based function to count walks from u to v with k edges
  // Time complexity of the above DP based solution is O(V^3 * K) which is much better than the naive
  // solution.

  // Table to be filled up using DP. The value count[i][j][e] will
  // store count of possible walks from i to j with exactly k edges
  const count: number[][][] = Array.from({ length: V }, () =>
    Array.from({ length: V }, () =>
      Array(k + 1).fill(0)
    )
  );

  // Loop for number of edges from 0 to k
  for (let e = 0; e <= k; e++) {
    for (let i = 0; i < V; i++) { // for source
      for (let j = 0; j < V; j++) { // for destination
        count[i][j][e] = 0; // initialize value

        if (e === 0 && i === j) { // from base cases
          count[i][j][e] = 1;
        }

        if (e === 1 && graph[i][j]) {
          count[i][j][e] = 1;
        }

        // go to adjacent only when number of edges is more than 1
        if (e > 1) {
          for (let a = 0; a < V; a++) { // adjacent of source i
            if (graph[i][a]) {
              count[i][j][e] += count[a][j][e - 1];
            }
          }
        }
      }
    }
  }

  return count[u][v][k];
}

if (require.main === module) {
  // Example usage:
  const graph: number[][] = [
    [0, 1, 1, 1],
    [0, 0, 0, 1],
    [0, 0, 0, 1],
    [0, 0, 0, 0]
  ];
  const u = 0, v = 3, k = 2;

  console.log("Method-1 Count all possible walks from a source to a destination with exactly k edges",
    countWalks(graph, u, v, k));

  console.log("Method-2 Count all possible walks from a source to a destination with exactly k edges",
    countWalksDP(graph, u, v, k));
}

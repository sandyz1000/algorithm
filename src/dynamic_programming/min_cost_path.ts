/* Given a cost matrix cost[][] and a position (m, n) in cost[][], write a function that returns
cost of minimum cost path to reach (m, n) from (0, 0). Each cell of the matrix represents a cost
to traverse through that cell. Total cost of a path to reach (m, n) is sum of all the costs on
that path (including both source and destination). You can only traverse down, right and
diagonally lower cells from a given cell, i.e., from a given cell (i, j), cells (i+1, j), (i,
j+1) and (i+1, j+1) can be traversed. You may assume that all costs are positive integers.

mC refers to minCost()
                                    mC(2, 2)
                          /            |           \
                         /             |            \
                 mC(1, 1)           mC(1, 2)             mC(2, 1)
              /     |     \       /     |     \           /     |     \
             /      |      \     /      |      \         /      |       \
       mC(0,0) mC(0,1) mC(1,0) mC(0,1) mC(0,2) mC(1,1) mC(1,0) mC(1,1) mC(2,0) 
*/

export const R = 3;
export const C = 3;

function minCost(cost: number[][], m: number, n: number): number {
  const tc: number[][] = Array.from({ length: R }, () => Array(C).fill(0));

  tc[0][0] = cost[0][0];

  // Initialize first column of total cost(tc) arr
  for (let i = 1; i <= m; i++) {
    tc[i][0] = tc[i - 1][0] + cost[i][0];
  }

  // Initialize first row of tc arr
  for (let j = 1; j <= n; j++) {
    tc[0][j] = tc[0][j - 1] + cost[0][j];
  }

  // Construct the rest of the tc arr
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      tc[i][j] = Math.min(tc[i - 1][j - 1], tc[i - 1][j], tc[i][j - 1]) + cost[i][j];
    }
  }

  return tc[m][n];
}

if (require.main === module) {
  const cost = [
    [1, 2, 3],
    [4, 8, 2],
    [1, 5, 3],
  ];

  console.log(minCost(cost, 2, 2));
}

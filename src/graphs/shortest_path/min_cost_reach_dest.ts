/* """Find the minimum cost to reach destination using a train

There are N stations on route of a train. The train goes from station 0 to N-1. The ticket cost for
all pair of stations (i, j) is given where j is greater than i. Find the minimum cost to reach
the destination.

Consider the following example:

Input:
cost = [[0, 15, 80, 90],
        [INF, 0, 40, 50],
        [INF, INF, 0, 70],
        [INF, INF, INF, 0]]

There are 4 stations and cost[i][j] indicates cost to reach j from i.
The entries where j < i are meaningless.

Output:
The minimum cost is 65
The minimum cost can be obtained by first going to station 1 from 0.
Then from station 1 to station 3.""" */

export const N = 4;
export const INF = Number.MAX_SAFE_INTEGER;

function minCostRec(cost: number[][], s: number, d: number): number {
  if (s === d || s + 1 === d) {
    return cost[s][d];
  }

  let min = cost[s][d];

  for (let i = s + 1; i < d; i++) {
    const c = minCostRec(cost, s, i) + minCostRec(cost, i, d);
    if (c < min) {
      min = c;
    }
  }

  return min;
}

function minCost(cost: number[][]): number {
  return minCostRec(cost, 0, N - 1);
}

// Output: The Minimum cost to reach station 4 is 65
const cost: number[][] = [
  [0, 15, 80, 90],
  [INF, 0, 40, 50],
  [INF, INF, 0, 70],
  [INF, INF, INF, 0],
];

console.log(`The Minimum cost to reach station ${N} is ${minCost(cost)}`);

/* Find the number of islands | Set 1 (Using DFS)

Given a boolean 2D matrix, find the number of islands. A group of connected 1s forms an island.

Example:
the below matrix contains 5 islands
Input : mat= {{1, 1, 0, 0, 0},
               {0, 1, 0, 0, 1},
               {1, 0, 0, 1, 1},
               {0, 0, 0, 0, 0},
               {1, 0, 1, 0, 1}
Output : 5
------------------------------------------
Discussion:
This is an variation of the standard problem:
Counting number of connected components in a undirected graph.

Before we go to the problem, let us understand what is a connected component. A connected component
of an undirected graph is a subgraph in which every two vertices are connected to each other by a
path(s), and which is connected to no other vertices outside the subgraph.

A graph where all vertices are connected with each other, has exactly one connected component,
consisting of the whole graph. Such graph with only one connected component is called as Strongly
Connected Graph.

The problem can be easily solved by applying DFS() on each component. In each DFS() call, a
component or a sub-graph is visited. We will call DFS on the next un-visited component.
The number of calls to DFS() gives the number of connected components. BFS can also be used.

What is an island?
A group of connected 1s forms an island. For example, the below matrix contains 5 islands
{1, 1, 0, 0, 0},
{0, 1, 0, 0, 1},
{1, 0, 0, 1, 1},
{0, 0, 0, 0, 0},
{1, 0, 1, 0, 1}
 */

export class Graph {
  private ROW: number;
  private COL: number;
  private graph: number[][];

  constructor(row: number, col: number, g: number[][]) {
    this.ROW = row;
    this.COL = col;
    this.graph = g;
  }

  // A function to check if a given cell (row, col) can be included in DFS
  private isSafe(i: number, j: number, visited: boolean[][]): boolean {
    // row number is in range, column number is in range, value is 1, and not yet visited
    return 0 <= i && i < this.ROW && 0 <= j && j < this.COL && !visited[i][j] && this.graph[i][j] === 1;
  }

  private DFS(i: number, j: number, visited: boolean[][]): void {
    // These arrays are used to get row and column numbers of 8 neighbours of a given cell
    const rowNbr = [-1, -1, -1, 0, 0, 1, 1, 1];
    const colNbr = [-1, 0, 1, -1, 1, -1, 0, 1];

    // Mark this cell as visited
    visited[i][j] = true;

    // Recur for all connected neighbours
    for (let k = 0; k < 8; k++) {
      if (this.isSafe(i + rowNbr[k], j + colNbr[k], visited)) {
        this.DFS(i + rowNbr[k], j + colNbr[k], visited);
      }
    }
  }

  public countIslands(): number {
    // Make a boolean array to mark visited cells. Initially, all cells are unvisited
    const visited: boolean[][] = Array.from({ length: this.ROW }, () => Array(this.COL).fill(false));

    // Initialize count as 0 and traverse through all cells of the given matrix
    let count = 0;
    for (let i = 0; i < this.ROW; i++) {
      for (let j = 0; j < this.COL; j++) {
        // If a cell with value 1 is not visited yet, then a new island is found
        if (!visited[i][j] && this.graph[i][j] === 1) {
          // Visit all cells in this island and increment the island count
          this.DFS(i, j, visited);
          count++;
        }
      }
    }

    return count;
  }
}

// Output: Number of islands is: 5
const graph: number[][] = [
  [1, 1, 0, 0, 0],
  [0, 1, 0, 0, 1],
  [1, 0, 0, 1, 1],
  [0, 0, 0, 0, 0],
  [1, 0, 1, 0, 1]
];

const row: number = graph.length;
const col: number = graph[0].length;

const g = new Graph(row, col, graph);

console.log("Number of islands is:");
console.log(g.countIslands());

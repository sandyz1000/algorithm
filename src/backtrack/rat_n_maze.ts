/* 
We have discussed Backtracking and Knight's tour problem in Set 1. Let us discuss Rat in a
Maze as another example problem that can be solved using Backtracking.

A Maze is given as N*N binary matrix of blocks where source block is the upper left most block
i.e., maze[0][0] and destination block is lower rightmost block i.e., maze[N-1][N-1]. A rat
starts from source and has to reach destination. The rat can move only in two directions: forward
and down.

In the maze matrix, 0 means the block is dead end and 1 means the block can be used in the path
from source to destination. Note that this is a simple version of the typical Maze problem. For
example, a more complex version can be that the rat can move in 4 directions and a more complex
version can be with limited number of moves.

Gray blocks are dead ends (value = 0).

                {1, 0, 0, 0}
                {1, 1, 0, 1}
                {0, 1, 0, 0}
                {1, 1, 1, 1}

All enteries in solution path are marked as 1.

                {1, 0, 0, 0}
                {1, 1, 0, 0}
                {0, 1, 0, 0}
                {0, 1, 1, 1}

 */

// program to solve Rat in a Maze problem using backtracking

export class RatInMaze {
  private N: number;

  constructor(N: number) {
    this.N = N;
  }

  private isSafe(maze: number[][], x: number, y: number): boolean {
    return x >= 0 && x < this.N && y >= 0 && y < this.N && maze[x][y] === 1;
  }

  private solveMazeUtil(
    maze: number[][], x: number, y: number, sol: number[][]
  ): boolean {
    if (x === this.N - 1 && y === this.N - 1) {
      sol[x][y] = 1;
      return true;
    }

    if (this.isSafe(maze, x, y)) {
      sol[x][y] = 1;

      if (this.solveMazeUtil(maze, x + 1, y, sol)) {
        return true;
      }
      
      // If moving in x direction doesn't give solution then Move down in y direction
      if (this.solveMazeUtil(maze, x, y + 1, sol)) {
        return true;
      }
      // If none of the above movements work then BACKTRACK: unmark x,y as part of solution
      // path
      sol[x][y] = 0;
      return false;
    }

    return false;
  }

  /* 
  This function solves the Maze problem using Backtracking. It mainly uses solveMazeUtil()
        to solve the problem. It returns false if no path is possible, otherwise return true and
        prints the path in the form of 1s. Please note that there may be more than one solutions,
        this function prints one of the feasible solutions
  */
  public solveMaze(maze: number[][]): number[][] | null {
    const sol: number[][] = Array.from({ length: this.N }, () =>
      Array.from({ length: this.N }, () => 0)
    );

    if (!this.solveMazeUtil(maze, 0, 0, sol)) {
      return null;
    }

    return sol;
  }
}

if (require.main === module) {
  const rim = new RatInMaze(4);
  const maze: number[][] = [
    [1, 0, 0, 0],
    [1, 1, 0, 1],
    [0, 1, 0, 0],
    [1, 1, 1, 1]
  ];
  
  const solution = rim.solveMaze(maze);
  if (solution) {
    for (const row of solution) {
      for (const item of row) {
        process.stdout.write(`${item} `);
      }
      process.stdout.write("\n");
    }
  }
}
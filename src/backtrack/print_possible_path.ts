
/* Print all possible paths from top left to bottom right of a mXn matrix

The problem is to print all the possible paths from top left to bottom right of a mXn matrix with
the constraints that from each cell you can either move only to right or down.

The algorithm is a simple recursive algorithm, from each cell first print all paths by going down
and then print all paths by going right. Do this recursively for each cell encountered.

Note that in the above code, the last line of print_all_paths_util() is commented, If we uncomment
this line, we get all the paths from the top left to bottom right of a nXm matrix if the diagonal
movements are also allowed. And also if moving to some of the cells are not permitted then the
same code can be improved by passing the restriction array to the above function and that is left
as an exercise. */

export class GFG {
  /* 
  mat:  Pointer to the starting of mXn matrix
  i, j: Current position of the robot (For the first call use 0,0)
  m, n: Dimensions of given the matrix
  pi:   Next index to be filed in path array
  path[0..pi-1]: The path traversed by robot till now (Array to hold the path need to have
  space for at least m+n elements)
  */
  printAllPathsUtil(
    mat: number[][], i: number, j: number, m: number, n: number, path: number[], pi: number
  ): void {
    if (i === m - 1) {
      for (let k = j; k < n; k++) {
        path[pi + k - j] = mat[i * n % m][k];
      }

      for (let l = 0; l < pi + n - j; l++) {
        process.stdout.write(path[l] + " ");
      }
      console.log("");
      return;
    }

    if (j === n - 1) {
      for (let k = i; k < m; k++) {
        path[pi + k - i] = mat[k * n % m][j];
      }

      for (let l = 0; l < pi + m - i; l++) {
        process.stdout.write(path[l] + " ");
      }
      console.log("");
      return;
    }

    path[pi] = mat[i * n % m][j];

    this.printAllPathsUtil(mat, i + 1, j, m, n, path, pi + 1);
    this.printAllPathsUtil(mat, i, j + 1, m, n, path, pi + 1);
  }

  printAllPaths(mat: number[][], m: number, n: number): void {
    const path: number[] = Array(m + n).fill(0);
    this.printAllPathsUtil(mat, 0, 0, m, n, path, 0);
  }
}

if (require.main === module) {
  const test = new GFG();
  const mat: number[][] = [
    [1, 2, 3],
    [4, 5, 6]
  ];
  test.printAllPaths(mat, 2, 3);
}


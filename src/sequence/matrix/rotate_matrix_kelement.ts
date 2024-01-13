/* Rotate Matrix Elements

Given a matrix, clockwise rotate elements in it.

Examples:
---------------------
Input
1    2    3
4    5    6
7    8    9

Output:
4    1    2
7    5    3
8    9    6

For 4*4 matrix
Input:
1    2    3    4
5    6    7    8
9    10   11   12
13   14   15   16

Output:
5    1    2    3
9    10   6    4
13   11   7    8
14   15   16   12

------------------------------------------
Explanation:
------------------------------------------
The idea is to use loops similar to the program for printing a matrix in spiral form. One by one
rotate all rings of elements, starting from the outermost. To rotate a ring, we need to do
following.
1) Move elements of top row.
2) Move elements of last column.
3) Move elements of bottom row.
4) Move elements of first column.
Repeat above steps for inner ring while there is an inner ring.  */

function rotateMatrix(mat: number[][]): number[][] {
  if (!mat.length) {
    return mat;
  }

  let top = 0;
  let bottom = mat.length - 1;
  let left = 0;
  let right = mat[0].length - 1;

  while (left < right && top < bottom) {
    let prev = mat[top + 1][left];

    for (let i = left; i <= right; i++) {
      let curr = mat[top][i];
      mat[top][i] = prev;
      prev = curr;
    }
    top++;

    for (let i = top; i <= bottom; i++) {
      let curr = mat[i][right];
      mat[i][right] = prev;
      prev = curr;
    }
    right--;

    for (let i = right; i >= left; i--) {
      let curr = mat[bottom][i];
      mat[bottom][i] = prev;
      prev = curr;
    }
    bottom--;

    for (let i = bottom; i >= top; i--) {
      let curr = mat[i][left];
      mat[i][left] = prev;
      prev = curr;
    }
    left++;
  }

  return mat;
}

// Utility Function
function printMatrix(mat: number[][]): void {
  for (const row of mat) {
    console.log(row.join(" "));
  }
}

if (require.main === module) {
  let matrix: number[][] = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 16]
  ];

  matrix = rotateMatrix(matrix);
  // Print modified matrix
  printMatrix(matrix);
}

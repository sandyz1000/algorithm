
// Matrix Multiplication | Recursive

// Given two matrices A and B. The task is to multiply matrix A and matrix B recursively. If matrix
// A and matrix B are not multiplicative compatible, then generate output "Not Possible".

// Examples:
// ----------------
// Input: A = 12 56
//            45 78
//        B = 2 6
//            5 8
// Output: 304 520
//         480 894

// Input: A = 1 2 3
//            4 5 6
//            7 8 9
//        B = 1 2 3
//            4 5 6
//            7 8 9

// Output: 30  36  42
//         66  81  96
//        102 126 150

// Algorithm:
// -----------------
// 1.  First check if multiplication between matrices is possible or not. For this, check if number of
// columns of first matrix is equal to number of rows of second matrix or not. If both are equal than
// proceed further otherwise generate output "Not Possible".

// 2.  In Recursive Matrix Multiplication, we implement three loops of Iteration through recursive
// calls. The inner most Recursive call of multiplyMatrix() is to iterate k (col1 or row2). The second
// recursive call of multiplyMatrix() is to change the columns and the outermost recursive call is to
// change rows.



const MAX: number = 100;
let i: number = 0;
let j: number = 0;
let k: number = 0;


class MatrixMultiplier {
  multiplyMatrixRec(
    row1: number,
    col1: number,
    A: number[][],
    row2: number,
    col2: number,
    B: number[][],
    C: number[][]
  ) {
    if (i >= row1) {
      return;
    }

    if (j < col2) {
      if (k < col1) {
        C[i][j] += A[i][k] * B[k][j];
        k += 1;
        this.multiplyMatrixRec(row1, col1, A, row2, col2, B, C);
      }

      k = 0;
      j += 1;
      this.multiplyMatrixRec(row1, col1, A, row2, col2, B, C);
    }

    j = 0;
    i += 1;
    this.multiplyMatrixRec(row1, col1, A, row2, col2, B, C);
  }

  multiplyMatrix(row1: number, col1: number, A: number[][], row2: number, col2: number, B: number[][]) {
    if (row2 !== col1) {
      console.log("Not Possible\n");
      return;
    }

    const C: number[][] = Array.from({ length: MAX }, () => Array.from({ length: MAX }, () => 0));
    this.multiplyMatrixRec(row1, col1, A, row2, col2, B, C);

    for (let i = 0; i < row1; i++) {
      console.log(C[i].slice(0, col2));
    }
  }
}

if (require.main === module) {
  const multiplier: MatrixMultiplier = new MatrixMultiplier();
  
  const A: number[][] = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ];
  
  const B: number[][] = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ];
  
  const row1: number = 3;
  const col1: number = 3;
  const row2: number = 3;
  const col2: number = 3;
  
  multiplier.multiplyMatrix(row1, col1, A, row2, col2, B);
}
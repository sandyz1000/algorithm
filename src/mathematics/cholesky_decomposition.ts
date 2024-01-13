/* """
L_{j,j}=\sqrt {A_{j,j}-\sum_{k=0}^{j-1}(L_{j,k})^{2}}
L_{i,j}=\frac{1}{L_{j,j}}(A_{j,j}-\sum_{k=0}^{j-1}L_{i,k}L_{j,k})

"""
 */

export const MAX = 100;

function choleskyDecomposition(matrix: number[][], n: number): void {
  const lower: number[][] = new Array(n + 1).fill(0).map(() => new Array(n + 1).fill(0));

  // Decomposing a matrix into Lower Triangular
  for (let i = 0; i < n; i++) {
    for (let j = 0; j <= i; j++) {
      let sum1 = 0;

      // sum1mation for diagnols
      if (j === i) {
        for (let k = 0; k < j; k++) {
          sum1 += Math.pow(lower[j][k], 2);
        }
        lower[j][j] = Math.sqrt(matrix[j][j] - sum1);
      } else {
        // Evaluating L(i, j) using L(j, j)
        for (let k = 0; k < j; k++) {
          sum1 += lower[i][k] * lower[j][k];
        }
        if (lower[j][j] > 0) {
          lower[i][j] = (matrix[i][j] - sum1) / lower[j][j];
        }
      }
    }
  }

  // Displaying Lower Triangular and its Transpose
  console.log("Lower Triangular\t\tTranspose");
  for (let i = 0; i < n; i++) {
    // Lower Triangular
    for (let j = 0; j < n; j++) {
      process.stdout.write(`${lower[i][j]}\t`);
    }
    process.stdout.write("\t");

    // Transpose of Lower Triangular
    for (let j = 0; j < n; j++) {
      process.stdout.write(`${lower[j][i]}\t`);
    }
    console.log();
  }
}

if (require.main === module) {
  const n = 3;
  const matrix = [
    [4, 12, -16],
    [12, 37, -43],
    [-16, -43, 98],
  ];

  choleskyDecomposition(matrix, n);
}

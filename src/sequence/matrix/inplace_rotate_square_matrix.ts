/* 
Method-1
-------------------------------------------------
Inplace rotate square matrix by 90 degrees | Set 1
Given an square matrix, turn it by 90 degrees in anti-clockwise direction without using any extra
space.

Examples:
------------------------

Input
 1  2  3
 4  5  6
 7  8  9

Output:
 3  6  9
 2  5  8
 1  4  7

Input:
 1  2  3  4
 5  6  7  8
 9 10 11 12
13 14 15 16

Output:
 4  8 12 16
 3  7 11 15
 2  6 10 14
 1  5  9 13

Explanation:
------------------------
How to do without extra space?
Below are some important observations.

First row of source -> First column of destination, elements filled in opposite order
Second row of source -> Second column of destination, elements filled in opposite order
so.. on
Last row of source -> Last column of destination, elements filled in opposite order.

An N x N matrix will have floor(N/2) square cycles. For example, a 4 X 4 matrix will have 2 cycles.
The first cycle is formed by its 1st row, last column, last row and 1st column. The second cycle is
formed by 2nd row, second-last column, second-last row and 2nd column.

The idea is for each square cycle, we swap the elements involved with the corresponding cell in the
matrix in anti-clockwise direction i.e. from top to left, left to bottom, bottom to right and from
right to top one at a time. We use nothing but a temporary variable to achieve this.

Method-2
------------------------------------------------------------
Rotate a matrix by 90 degree without using any extra space | Set 2

Explanation:-
There are two steps :
1) Find transpose of matrix.
2) Reverse columns of the transpose.

 */


const N = 4;
const NUM_ROW = 4;
const NUM_COL = 4;

function rotateMatrix(mat: number[][]): void {
  for (let x = 0; x < N / 2; x++) {
    for (let y = x; y < N - x - 1; y++) {
      const temp = mat[x][y];
      mat[x][y] = mat[y][N - 1 - x];
      mat[y][N - 1 - x] = mat[N - 1 - x][N - 1 - y];
      mat[N - 1 - x][N - 1 - y] = mat[N - 1 - y][x];
      mat[N - 1 - y][x] = temp;
    }
  }
}

function displayMatrix(mat: number[][]): void {
  for (let i = 0; i < N; i++) {
    console.log(mat[i]);
  }
}

function reverseColumns(arr: number[][]): void {
  for (let i = 0; i < C; i++) {
    let j = 0;
    let k = C - 1;
    while (j < k) {
      [arr[j][i], arr[k][i]] = [arr[k][i], arr[j][i]];
      j++;
      k--;
    }
  }
}

function transpose(arr: number[][]): void {
  for (let i = 0; i < R; i++) {
    for (let j = i; j < C; j++) {
      [arr[i][j], arr[j][i]] = [arr[j][i], arr[i][j]];
    }
  }
}

function rotate90(arr: number[][]): void {
  transpose(arr);
  reverseColumns(arr);
}

function rotate(pS: number[][], pD: number[][], r: number, c: number): void {
  for (let row = 0; row < r; row++) {
    for (let col = 0; col < c; col++) {
      pD[c - col - 1][row] = pS[row][col];
    }
  }
}


if (require.main === module) {
    
    console.log("\n----- Method-1 ------\n")
    let mat = [[1, 2, 3, 4],
           [5, 6, 7, 8],
           [9, 10, 11, 12],
           [13, 14, 15, 16]];
    
    // mat = [[1, 2, 3],
    //        [4, 5, 6],
    //        [7, 8, 9]]
    
    // mat = [[1, 2],
    //        [4, 5]]
    
    rotateMatrix(mat)
    displayMatrix(mat)
    
    // Method-2
    console.log("\n----- Method-2 ------\n")
    let arr1: number[][] = [[1, 2, 3, 4],
           [5, 6, 7, 8],
           [9, 10, 11, 12],
           [13, 14, 15, 16]];
    rotate90(arr1)
    displayMatrix(arr1)
    
    // Method-3 (using extra space)
    let arr: number[][] = [[1, 2, 3, 4],
           [5, 6, 7, 8],
           [9, 10, 11, 12],
           [13, 14, 15, 16]];

    const [R1, C1]: [number, number] = [4, 4];
    const pDest: number[][] = Array.from({ length: R1 }, () => Array(C1).fill(0));
    rotate(arr, pDest, R1, C1)
    displayMatrix(pDest)
}
    

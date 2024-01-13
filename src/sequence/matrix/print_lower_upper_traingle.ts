/* 
Program to print Lower triangular and Upper triangular matrix of an array
Prerequisite – Multidimensional Arrays in Python

Given a two dimensional array, Write a program to print lower triangular matrix and upper
triangular matrix.

1)  Lower triangular matrix is a matrix which contain elements below principle diagonal including
    principle diagonal elements and rest of the elements are 0.
2)  Upper triangular matrix is a matrix which contain elements above principle diagonal including
    principle diagonal elements and rest of the elements are 0.

    Lower traingle

    [A(0, 0) 0  0   0 .... 0
    A(1, 0) A(1,1) 0   0 .... 0
    A(2, 0) A(2,1)  A(2, 2) 0 .... 0
    A(3, 0) A(3,1)  A(3,2)  A(3,3) .... 0
    .   ......
    .   ......
    .   ......
    A(row, 0)   A(row, 1)   A(row,2).... A(row, col)]


    Upper traingle

    [A(0,0)  A(0,1)   A(0, 2)  ... A(0, col)
    0   A(1,2)  A(1,2) ... A(1,col)
    0   0   A(2,2)  ... A(2,col)
    .   ......
    .   ......
    .   ......s
    0   0   0   .....   A(row,col)]

Algorithm:
--------------------
1.  For lower triangular matrix, we check the index position i and j i.e row and column
    respectively. If column position is greater than row position we simply make that position 0.
2.  For upper triangular matrix, we check the index position i and j i.e row and column
    respectively. If column position is smaller than row position we simply make that position 0.
 */


// program to print Lower triangular and Upper triangular matrix of an array

function lower(matrix: number[][], row: number, col: number): void {
    for (let i = 0; i < row; i++) {
        const output: number[] = [];
        for (let j = 0; j < col; j++) {
            if (i < j) {
                matrix[i][j] = 0;
            }
            output.push(matrix[i][j]);
        }
        console.log(output);
    }
}

function upper(matrix: number[][], row: number, col: number): void {
    for (let i = 0; i < row; i++) {
        const output: number[] = [];
        for (let j = 0; j < col; j++) {
            if (i > j) {
                matrix[i][j] = 0;
            }
            output.push(matrix[i][j]);
        }
        console.log(output);
    }
}

if (require.main === module) {
    const matrix: number[][] = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
    ];
    const row: number = 3;
    const col: number = 3;
    
    console.log("\nLower triangular matrix:");
    lower(matrix, row, col);
    
    console.log("\nUpper triangular matrix:");
    upper(matrix, row, col);
}
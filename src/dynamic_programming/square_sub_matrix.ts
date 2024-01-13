/* 
Given a binary matrix, find out the maximum size square sub-matrix with all 1s

        [   [0, 1, 1, 0, 1],
            [1, 1, 0, 1, 0],
            #  This is a sub matrix
            [0, 1, 1, 1, 0],
            [1, 1, 1, 1, 1],
            [1, 1, 1, 1, 0],
            #  -----------------
            [0, 0, 0, 0, 0] ]

Algorithm:
Let the given binary matrix be M[R][C]. The idea of the algorithm is to construct an
auxiliary size matrix S[][] in which each entry S[i][j] represents size of the square sub-matrix
with all 1s including M[i][j] where M[i][j] is the rightmost and bottommost entry in sub-matrix.

Time Complexity: O(m*n) where m is number of rows and n is number of columns in the given matrix.
Auxiliary Space: O(m*n) where m is number of rows and n is number of columns in the given matrix.
Algorithmic Paradigm: Dynamic Programming

 */

export const R = 6;
export const C = 5;

function getMaxSubSquare(M: number[][]): void {
    const S: number[][] = Array.from({ length: R }, () => Array(C).fill(0));

    // Set first column of S[][]
    for (let i = 0; i < R; i++) {
        S[i][0] = M[i][0];
    }

    // Set first row of S[][]
    for (let j = 0; j < C; j++) {
        S[0][j] = M[0][j];
    }

    // Construct other entries of S[][]
    for (let i = 1; i < R; i++) {
        for (let j = 1; j < C; j++) {
            if (M[i][j] === 1) {
                S[i][j] = Math.min(S[i][j - 1], S[i - 1][j], S[i - 1][j - 1]) + 1;
            } else {
                S[i][j] = 0;
            }
        }
    }

    // Find the maximum entry, and indexes of the maximum entry in S[][]
    let maxOfS = S[0][0];
    let maxI = 0;
    let maxJ = 0;

    for (let i = 0; i < R; i++) {
        for (let j = 0; j < C; j++) {
            if (maxOfS < S[i][j]) {
                maxOfS = S[i][j];
                maxI = i;
                maxJ = j;
            }
        }
    }

    console.log("Maximum size sub-matrix is: \n");
    for (let i = maxI; i > maxI - maxOfS; i--) {
        for (let j = maxJ; j > maxJ - maxOfS; j--) {
            console.log(`${M[i][j]} `);
        }
        console.log("\n");
    }
}

// Test case
const matrix: number[][] = [
    [0, 1, 1, 0, 1],
    [1, 1, 0, 1, 0],
    [0, 1, 1, 1, 0],
    [1, 1, 1, 1, 0],
    [1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0],
];

getMaxSubSquare(matrix);

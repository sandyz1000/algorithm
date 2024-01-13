/* 
Backtracking | Set 3 (N Queen Problem)

We have discussed Knight's tour and Rat in a Maze problems in Set 1 and Set 2
respectively. Let us discuss N Queen as another example problem that can be solved
using Backtracking.

The N Queen is the problem of placing N chess queens on an N×N chessboard so that no
two queens attack each other. For example, following is a solution for 4 Queen problem.

            [[0, 1, 0, 0],
             [0, 0, 0, 1],
             [1, 0, 0, 0],
             [0, 0, 1, 0]]

------------------------------------------------
Backtracking Algorithm:
------------------------------------------------

The idea is to place queens one by one in different columns, starting from the leftmost
column. When we place a queen in a column, we check for clashes with already placed
queens. In the current column, if we find a row for which there is no clash, we mark
this row and column as part of the solution. If we do not find such a row due to
clashes then we backtrack and return false.

1) Start in the leftmost column
2) If all queens are placed
    return true
3) Try all rows in the current column.  Do following for every tried row.

    a) If the queen can be placed safely in this row then mark this [row, column] as
    part of the solution and recursively check if placing queen here leads to a solution.

    b) If placing queen in [row, column] leads to a solution then return true.

    c) If placing queen doesn't lead to a solution then umark this [row, column] (
    Backtrack) and go to step (a) to try other rows.

3) If all rows have been tried and nothing worked, return false to trigger
    backtracking.

*/

import { performance } from 'perf_hooks';

const N = 4;

/* 
    A utility function to check if a queen can be placed on board[row][col]. Note that
    this function is called when "col" queens are already placed in columns from 0 to
    col -1. So we need to check only left side for attacking queens
*/
function is_safe(board: number[][], row: number, col: number): boolean {
    for (let i = 0; i < col; i++) {
        if (board[row][i]) {
            return false;
        }
    }

    let i = row;
    let j = col;
    while (i >= 0 && j >= 0) {
        if (board[i][j]) {
            return false;
        }
        i--;
        j--;
    }

    i = row;
    j = col;
    while (i < N && j >= 0) {
        if (board[i][j]) {
            return false;
        }
        i++;
        j--;
    }

    return true;
}

function solve_nq(board: number[][], col: number): boolean {
    if (col >= N) {
        return true;
    }
    // Consider this column and try placing this queen in all rows one by one
    for (let row = 0; row < N; row++) {
        // Check if queen can be placed on board[i][col]
        if (is_safe(board, row, col)) {
            board[row][col] = 1;
            if (solve_nq(board, col + 1)) {
                return true;
            }
            board[row][col] = 0;
        }
    }
    return false;
}

if (require.main === module) {
    const start = performance.now();
    const board: number[][] = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];

    if (solve_nq(board, 0)) {
        for (const row of board) {
            for (const j of row) {
                process.stdout.write(j + " ");
            }
            process.stdout.write("\n");
        }
    }
    console.log("Total time: ", performance.now() - start);
}
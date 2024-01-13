/* Backtracking | Set 7 (Sudoku)
Given a partially filled 9×9 2D array 'grid[9][9]', the goal is to assign digits (from 1 to 9) to
the empty cells so that every row, column, and subgrid of size 3×3 contains exactly one instance
of the digits from 1 to 9.

            [[3, 0, 6, 5, 0, 8, 4, 0, 0],
            [5, 2, 0, 0, 0, 0, 0, 0, 0],
            [0, 8, 7, 0, 0, 0, 0, 3, 1],
            [0, 0, 3, 0, 1, 0, 0, 8, 0],
            [9, 0, 0, 8, 6, 3, 0, 0, 5],
            [0, 5, 0, 0, 9, 0, 6, 0, 0],
            [1, 3, 0, 0, 0, 0, 2, 5, 0],
            [0, 0, 0, 0, 0, 0, 0, 7, 4],
            [0, 0, 5, 2, 0, 6, 3, 0, 0]]

------------------------------------------------
Backtracking Algorithm:
------------------------------------------------
Like all other Backtracking problems, we can solve Sudoku by one by one assigning numbers to
empty cells. Before assigning a number, we check whether it is safe to assign. We basically check
that the same number is not present in current row, current column and current 3X3 sub-grid. After
checking for safety, we assign the number, and recursively check whether this assignment leads to
a solution or not. If the assignment doesn't lead to a solution, then we try next number for
current empty cell. And if none of number (1 to 9) lead to solution, we return false.

Find row, col of an unassigned cell
If there is none, return true
For digits from 1 to 9
    a) If there is no conflict for digit at row,col assign digit to row,col and recursively try
    fill in rest of grid
    b) If recursion successful, return true
    c) Else, remove digit and try another
If all digits have been tried and nothing worked, return false

Time complexity: O(9^(n*n)). 
For every unassigned index, there are 9 possible options so the time complexity is O(9^(n*n)). The time 
complexity remains the same but there will be some early pruning so the time taken will be much less than 
the naive algorithm but the upper bound time complexity remains the same.

Space Complexity: O(n*n). 
To store the output array a matrix is needed.
 */

/* 
Function to Find the entry in the Grid that is still not used Searches the grid to find an
entry that is still unassigned. If found, the reference parameters row, col will be set the
location that is unassigned, and true is returned. If no unassigned entries remain, false is
returned.

'l' is a list  variable that has been passed from the solve_sudoku function to keep track
of incrementation of Rows and Columns
*/
function find_empty_location(arr: number[][], l: number[]): boolean {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (arr[row][col] === 0) {
                l[0] = row;
                l[1] = col;
                return true;
            }
        }
    }
    return false;
}

// Returns a boolean which indicates whether any assigned entry in the specified row matches
// the given number.
function used_in_row(arr: number[][], row: number, num: number): boolean {
    for (let i = 0; i < 9; i++) {
        if (arr[row][i] === num) {
            return true;
        }
    }
    return false;
}

// Returns a boolean which indicates whether any assigned entry in the specified column
// matches the given number.
function used_in_col(arr: number[][], col: number, num: number): boolean {
    for (let i = 0; i < 9; i++) {
        if (arr[i][col] === num) {
            return true;
        }
    }
    return false;
}
/* Returns a boolean which indicates whether any assigned entry within the specified 3x3 box
    matches the given number
 */
function used_in_box(arr: number[][], row: number, col: number, num: number): boolean {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (arr[i + row][j + col] === num) {
                return true;
            }
        }
    }
    return false;
}
/* Checks whether it will be legal to assign num to the given row,col Returns a boolean which
    indicates whether it will be legal to assign num to the given row,col location. */
function check_location_is_safe(arr: number[][], row: number, col: number, num: number): boolean {
    return (
        !used_in_row(arr, row, num) &&
        !used_in_col(arr, col, num) &&
        !used_in_box(arr, row - row % 3, col - col % 3, num)
    );
}
/* 
Takes a partially filled-in grid and attempts to assign values to all unassigned locations
    in such a way to meet the requirements for Sudoku solution (non-duplication across rows,
    columns, and boxes)
*/
function solve_sudoku(arr: number[][]): boolean {
    const l: number[] = [0, 0];
    if (!find_empty_location(arr, l)) {
        return true;
    }
    const row = l[0];
    const col = l[1];
    for (let num = 1; num <= 9; num++) {
        if (check_location_is_safe(arr, row, col, num)) {
            arr[row][col] = num;
            if (solve_sudoku(arr)) {
                return true;
            }
            arr[row][col] = 0;
        }
    }
    return false;
}

const grid: number[][] = [
    [3, 0, 6, 5, 0, 8, 4, 0, 0],
    [5, 2, 0, 0, 0, 0, 0, 0, 0],
    [0, 8, 7, 0, 0, 0, 0, 3, 1],
    [0, 0, 3, 0, 1, 0, 0, 8, 0],
    [9, 0, 0, 8, 6, 3, 0, 0, 5],
    [0, 5, 0, 0, 9, 0, 6, 0, 0],
    [1, 3, 0, 0, 0, 0, 2, 5, 0],
    [0, 0, 0, 0, 0, 0, 0, 7, 4],
    [0, 0, 5, 2, 0, 6, 3, 0, 0]
];

console.log(grid);

# coding=utf-8
"""
Backtracking | Set 7 (Sudoku)
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

"""
from __future__ import print_function
from numba import jit, int32, boolean
import numpy as np
import time
# A Backtracking program in Python to solve Sudoku problem


# A Utility Function to print the Grid
def print_grid(arr):
    for i in range(9):
        for j in range(9):
            print(arr[i][j], end=" ")
        print()


@jit(nopython=True)
def find_empty_location(arr, l):
    """
    Function to Find the entry in the Grid that is still not used Searches the grid to find an
    entry that is still unassigned. If found, the reference parameters row, col will be set the
    location that is unassigned, and true is returned. If no unassigned entries remain, false is
    returned.

    'l' is a list  variable that has been passed from the solve_sudoku function to keep track
    of incrementation of Rows and Columns
    """
    for row in range(9):
        for col in range(9):
            if arr[row][col] == 0:
                l[0] = row
                l[1] = col
                return True
    return False


@jit(nopython=True)
def used_in_row(arr, row, num):
    """
    Returns a boolean which indicates whether any assigned entry in the specified row matches
    the given number.
    """
    for i in range(9):
        if arr[row][i] == num:
            return True
    return False


@jit(nopython=True)
def used_in_col(arr, col, num):
    """
    Returns a boolean which indicates whether any assigned entry in the specified column
    matches the given number.
    """
    for i in range(9):
        if arr[i][col] == num:
            return True
    return False


@jit(nopython=True)
def used_in_box(arr, row, col, num):
    """
    Returns a boolean which indicates whether any assigned entry within the specified 3x3 box
    matches the given number
    """
    for i in range(3):
        for j in range(3):
            if arr[i + row][j + col] == num:
                return True
    return False


@jit(nopython=True)
def check_location_is_safe(arr, row, col, num):
    """
    Checks whether it will be legal to assign num to the given row,col Returns a boolean which
    indicates whether it will be legal to assign num to the given row,col location.
    """
    # Check if 'num' is not already placed in current row, current column and current 3x3 box
    return (not used_in_row(arr, row, num) and
            not used_in_col(arr, col, num) and
            not used_in_box(arr, row - row % 3, col - col % 3, num))


@jit(boolean(int32[:, :]), nopython=True)
def solve_sudoku(arr: np.ndarray):
    """
    Takes a partially filled-in grid and attempts to assign values to all unassigned locations
    in such a way to meet the requirements for Sudoku solution (non-duplication across rows,
    columns, and boxes)
    """
    # 'l' is a list variable that keeps the record of row and col in find_empty_location Function
    l = [0, 0]

    # If there is no unassigned location, we are done
    if not find_empty_location(arr, l):
        return True

    # Assigning list values to row and col that we got from the above Function
    row = l[0]
    col = l[1]

    # consider digits 1 to 9
    for num in range(1, 10):
        # if looks promising
        if check_location_is_safe(arr, row, col, num):
            # make tentative assignment
            arr[row][col] = num
            # return, if success, yay!
            if solve_sudoku(arr):
                return True
            # failure, unmake & try again
            arr[row][col] = 0

    # this triggers backtracking
    return False


# Driver main function to test above functions
if __name__ == "__main__":

    # creating a 2D array for the grid and assigning values to the grid
    grid = [[3, 0, 6, 5, 0, 8, 4, 0, 0],
            [5, 2, 0, 0, 0, 0, 0, 0, 0],
            [0, 8, 7, 0, 0, 0, 0, 3, 1],
            [0, 0, 3, 0, 1, 0, 0, 8, 0],
            [9, 0, 0, 8, 6, 3, 0, 0, 5],
            [0, 5, 0, 0, 9, 0, 6, 0, 0],
            [1, 3, 0, 0, 0, 0, 2, 5, 0],
            [0, 0, 0, 0, 0, 0, 0, 7, 4],
            [0, 0, 5, 2, 0, 6, 3, 0, 0]]

    # grid = [[0, 0, 0, 0, 0, 7, 0, 0, 5],
    #         [0, 0, 0, 0, 0, 0, 9, 0, 6],
    #         [0, 0, 6, 0, 0, 0, 3, 0, 0],
    #         [0, 0, 0, 0, 4, 2, 0, 0, 0],
    #         [0, 0, 0, 9, 0, 0, 5, 0, 0],
    #         [7, 0, 0, 6, 0, 0, 1, 4, 0],
    #         [0, 2, 8, 0, 5, 1, 0, 9, 0],
    #         [0, 0, 0, 0, 0, 9, 6, 0, 7],
    #         [9, 7, 0, 0, 0, 0, 0, 2, 0]]

    grid = np.array(grid, dtype=np.int32)
    start = time.perf_counter()
    # if success print the grid
    if solve_sudoku(grid):
        print_grid(grid)
    else:
        print("No solution exists")
    print("------------------")
    print("Time taken", start - time.perf_counter())

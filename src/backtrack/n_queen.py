# coding=utf-8
"""
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

"""
import time
import numpy as np
from numba import jit, int32, boolean

N = 4


@jit(boolean(int32[:, :], int32, int32), nopython=True)
def is_safe(board, row, col):
    """
    A utility function to check if a queen can be placed on board[row][col]. Note that
    this function is called when "col" queens are already placed in columns from 0 to
    col -1. So we need to check only left side for attacking queens
    """
    # Check this row on left side
    for i in range(col):
        if board[row][i]:
            return False
    # Check upper diagonal on left side
    i, j = row, col
    while i >= 0 and j >= 0:
        if board[i][j]:
            return False
        i -= 1
        j -= 1
    # Check lower diagonal on left side
    i, j = row, col
    while i < N and j >= 0:
        if board[i][j]:
            return False
        i += 1
        j -= 1

    return True


# A recursive utility function to solve N Queen problem
@jit(boolean(int32[:, :], int32), nopython=True)
def solve_nq(board: np.ndarray, col: np.int32):
    if col >= N:
        return True

    # Consider this column and try placing this queen in all rows one by one
    for row in range(N):
        # Check if queen can be placed on board[i][col]
        if is_safe(board, row, col):
            # Place this queen in board[i][col]
            board[row][col] = 1
            # recur to place rest of the queens
            if solve_nq(board, col + 1):
                return True
            # If placing queen in board[i][col] doesn't lead to a solution, then remove
            #  queen from board[i][col]
            board[row][col] = 0

    return False


# This function solves the N Queen problem using Backtracking. It mainly uses
# solveNQUtil() to solve the problem. It returns false if queens cannot be placed,
# otherwise return true and prints placement of queens in the form of 1s. Please note
# that there may be more than one solutions, this function prints one  of the feasible
# solutions.

if __name__ == "__main__":
    start = time.time()
    board = [[0, 0, 0, 0],
             [0, 0, 0, 0],
             [0, 0, 0, 0],
             [0, 0, 0, 0]]

    board = np.zeros(shape=(4, 4), dtype=np.int32)
    if solve_nq(board, 0):
        for row in board:
            for j in row:
                print(j, end=" ")
            print("")
    print("Total time: ", time.time() - start)

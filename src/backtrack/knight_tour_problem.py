"""
Backtracking | Set 1 (The Knight's tour problem)

Backtracking is an algorithmic paradigm that tries different solutions until finds a solution
that "works". Problems which are typically solved using backtracking technique have following
property in common. These problems can only be solved by trying every possible configuration and
each configuration is tried only once. A Naive solution for these problems is to try all
configurations and output a configuration that follows given problem constraints. Backtracking
works in incremental way and is an optimization over the Naive solution where all possible
configurations are generated and tried.

For example, consider the following Knight's Tour problem.
The knight is placed on the first block of an empty board and, moving according to the rules of
chess, must visit each square exactly once.

Path followed by Knight to cover all the cells

Following is chessboard with 8 x 8 cells. Numbers in cells indicate move number of Knight.

    0  59  38  33  30  17   8  63
    37  34  31  60   9  62  29  16
    58   1  36  39  32  27  18   7
    35  48  41  26  61  10  15  28
    42  57   2  49  40  23   6  19
    47  50  45  54  25  20  11  14
    56  43  52   3  22  13  24   5
    51  46  55  44  53   4  21  12

Let us first discuss the Naive algorithm for this problem and then the Backtracking algorithm.

Naive Algorithm for Knight's tour
The Naive Algorithm is to generate all tours one by one and check if the generated tour satisfies
the constraints.
- - - - - - - - - - - - - - - - - - - - - - - -
while(there are untried tours):
    generate_the_next_tour()
    if(this tour covers all squares):
        print(this path)

- - - - - - - - - - - - - - - - - - - - - - - -

Backtracking works in an incremental way to attack problems. Typically, we start from an empty
solution vector and one by one add items (Meaning of item varies from problem to problem. In
context of Knight's tour problem, an item is a Knight's move). When we add an item, we check if
adding the current item violates the problem constraint, if it does then we remove the item and
try other alternatives. If none of the alternatives work out then we go to previous stage and
remove the item added in the previous stage. If we reach the initial stage back then we say that
no solution exists. If adding an item doesn't violate constraints then we recursively add items
one by one. If the solution vector becomes complete then we print the solution.

Backtracking Algorithm for Knight's tour
Following is the Backtracking algorithm for Knight's tour problem.

- - - - - - - - - - - - - - - - - - - - - - - -

If all squares are visited
    print the solution
Else
   a) Add one of the next moves to solution vector and recursively check if this move leads to
   a solution. (A Knight can make maximum eight moves. We choose one of the 8 moves in this step).
   b) If the move chosen in the above step doesn't lead to a solution then remove this move
   from the solution vector and try other alternative moves.
   c) If none of the alternatives work then return false (Returning false will remove the
   previously added item in recursion and if false is returned by the initial call of recursion
   then "no solution exists" )

- - - - - - - - - - - - - - - - - - - - - - - -

Following are implementations for Knight's tour problem. It prints one of the possible solutions
in 2D matrix form. Basically, the output is a 2D 8*8 matrix with numbers from 0 to 63 and these
numbers show steps made by Knight.

"""

import time
import numpy as np
from numba import boolean, int32, jit
N = 8


@jit(boolean(int32, int32, int32[:, :]), nopython=True)
def is_safe(x, y, sol):
    """A utility function to check if i,j are valid indexes for N*N chessboard"""
    return 0 <= x < N and 0 <= y < N and sol[x, y] == -1


# Eager compilation of numba
@jit(boolean(int32, int32, int32, int32[:, :], int32[:], int32[:]), nopython=True)
def solve_kt_util(x, y, move, sol, x_move, y_move):
    """A recursive utility function to solve Knight Tour problem"""
    if move == N ** 2:
        return True

    # Try all next moves from the current coordinate x, y
    for k in range(8):
        next_x = x + x_move[k]
        next_y = y + y_move[k]
        if is_safe(next_x, next_y, sol):
            sol[next_x, next_y] = move
            if solve_kt_util(next_x, next_y, move + 1, sol, x_move, y_move):
                return True
            sol[next_x, next_y] = -1  # backtracking

    return False


# Python program for Knight Tour problem


def solve_kt(sol):
    """
    This function solves the Knight Tour problem using Backtracking. This function mainly
    uses solve_kt_util() to solve the problem. It returns false if no complete tour is
    possible, otherwise return true and prints the tour. Please note that there may be more
    than one solutions, this function prints one of the feasible solutions.
    """
    # x_move[] and y_move[] define next move of Knight.
    # x_move[] is for next value of x coordinate
    # y_move[] is for next value of y coordinate
    x_move = np.array([2, 1, -1, -2, -2, -1, 1, 2], dtype=np.int32)
    y_move = np.array([1, 2, 2, 1, -1, -2, -2, -1], dtype=np.int32)

    # Since the Knight is initially at the first block
    sol[0, 0] = 0

    # Start from 0,0 and explore all tours using solveKTUtil()
    if not solve_kt_util(0, 0, 1, sol, x_move, y_move):
        print("Solution does not exist")
        return False

    print(sol)
    return True


if __name__ == '__main__':
    start = time.time()
    solution = np.full((8, 8), -1, dtype=np.int32)
    solve_kt(solution)
    print("Time taken: ", time.time() - start)

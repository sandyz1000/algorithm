
/* Backtracking | Set 1 (The Knight's tour problem)

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

 */
import { assert } from "console";
import { performance } from 'perf_hooks';
const N = 8;

function is_safe(x: number, y: number, sol: number[][]): boolean {
    return 0 <= x && x < N && 0 <= y && y < N && sol[x][y] === -1;
}

function solve_kt_util(x: number, y: number, move: number, sol: number[][], x_move: number[], y_move: number[]): boolean {
    if (move === N ** 2) {
        return true;
    }

    for (let k = 0; k < 8; k++) {
        const next_x = x + x_move[k];
        const next_y = y + y_move[k];
        if (is_safe(next_x, next_y, sol)) {
            sol[next_x][next_y] = move;
            if (solve_kt_util(next_x, next_y, move + 1, sol, x_move, y_move)) {
                return true;
            }
            sol[next_x][next_y] = -1; // backtracking
        }
    }

    return false;
}

/* 
This function solves the Knight Tour problem using Backtracking. This function mainly
    uses solve_kt_util() to solve the problem. It returns false if no complete tour is
    possible, otherwise return true and prints the tour. Please note that there may be more
    than one solutions, this function prints one of the feasible solutions.
*/
function solve_kt(sol: number[][]): boolean {
    const x_move = [2, 1, -1, -2, -2, -1, 1, 2];
    const y_move = [1, 2, 2, 1, -1, -2, -2, -1];

    sol[0][0] = 0;

    if (!solve_kt_util(0, 0, 1, sol, x_move, y_move)) {
        console.log("Solution does not exist");
        return false;
    }

    // console.log(sol);
    return true;
}

const solution: number[][] = Array.from({ length: N }, () => Array(N).fill(-1));
let start = performance.now();
let res = solve_kt(solution);
console.log("Total time: ", performance.now() - start);
// console.log(solution);
assert(res === true, "Solution doesn't match");


/* Longest Possible Route in a Matrix with Hurdles

Given an M x N matrix, with a few hurdles arbitrarily placed, calculate the length of longest
possible route possible from source to destination within the matrix. We are allowed to move to
only adjacent cells which are not hurdles. The route cannot contains any diagonal moves and a
location once visited in a particular path cannot be visited again.

For example, longest path with no hurdles from source to destination is highlighted for below
matrix. The length of the path is 24.


    [
        { 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 },
        { 1, 1, 0, 1, 1, 0, 1, 1, 0, 1 },
        { 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 }
    ]

The idea is to use Backtracking. We start from the source cell of the matrix, move forward in all
four allowed directions and recursively checks if they leads to the solution or not. If
destination is found, we update the value of longest path else if none of the above solutions
work we return false from our function.
 */


const R = 3;
const C = 10;
const INT_MAX = Number.MAX_SAFE_INTEGER;
const INT_MIN = Number.MIN_SAFE_INTEGER;

/* 
A Pair to store status of a cell. found is set to true of destination is reachable and
value stores distance of longest path
*/
export class Pair {
    found: boolean;
    value: number;

    constructor(found: boolean, value: number) {
        this.found = found;
        this.value = value;
    }
}

/**
 * Function to find Longest Possible Route in the matrix with hurdles. If the destination is not
 * reachable the function returns false with cost INT_MAX. (i, j) is source cell and (x, y)
 * is destination cell.
 *
 * @param mat - The matrix represented as a List of Lists of integers.
 * @param i - The row index of the source cell.
 * @param j - The column index of the source cell.
 * @param x - The row index of the destination cell.
 * @param y - The column index of the destination cell.
 * @param visited - The matrix representing the visited cells, a List of Lists of booleans.
 * @returns A Pair object containing the status of the destination cell (found) and the cost of the longest path (value).
 */
function find_longest_path_util(mat: number[][], i: number, j: number, x: number, y: number, visited: boolean[][]): Pair {
    if (i === x && j === y) {
        const p = new Pair(true, 0);
        return p;
    }

    if (i < 0 || i >= R || j < 0 || j >= C || mat[i][j] === 0 || visited[i][j]) {
        const p = new Pair(false, INT_MAX);
        return p;
    }

    visited[i][j] = true;

    let res = INT_MIN;

    let sol = find_longest_path_util(mat, i, j - 1, x, y, visited);
    if (sol.found) {
        res = Math.max(res, sol.value);
    }

    sol = find_longest_path_util(mat, i, j + 1, x, y, visited);
    if (sol.found) {
        res = Math.max(res, sol.value);
    }

    sol = find_longest_path_util(mat, i - 1, j, x, y, visited);
    if (sol.found) {
        res = Math.max(res, sol.value);
    }

    sol = find_longest_path_util(mat, i + 1, j, x, y, visited);
    if (sol.found) {
        res = Math.max(res, sol.value);
    }

    visited[i][j] = false;

    if (res !== INT_MIN) {
        const p = new Pair(true, 1 + res);
        return p;
    } else {
        const p = new Pair(false, INT_MAX);
        return p;
    }
}

function find_longest_path(mat: number[][], i: number, j: number, x: number, y: number): void {
    const visited: boolean[][] = Array.from({ length: R }, () => Array(C).fill(false));

    const p = find_longest_path_util(mat, i, j, x, y, visited);
    if (p.found) {
        console.log("Length of longest possible route is", p.value);
    } else {
        console.log("Destination not reachable from given source");
    }
}

if (require.main === module) {
    const mat: number[][] = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 0, 1, 1, 0, 1, 1, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    
    find_longest_path(mat, 0, 0, 1, 7);
}
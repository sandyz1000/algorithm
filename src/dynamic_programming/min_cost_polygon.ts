/* 
Minimum Cost Polygon Triangulation
https://www.geeksforgeeks.org/minimum-cost-polygon-triangulation/

A triangulation of a convex polygon is formed by drawing diagonals between non-adjacent vertices (corners)
such that the diagonals never intersect. The problem is to find the cost of triangulation with the minimum cost.
The cost of a triangulation is sum of the weights of its component triangles. Weight of each triangle is its
perimeter (sum of lengths of all sides)

See following example taken from this source (REFER IMAGE FROM SOURCE).

:!:!:......::::................:!:!:.....:::!:..............
:::!:::::::::::................:::!:::::::::::..............
..%&@@@@@@@&&@*:.................@@@@@@@@@&&$*:.............
..$&&&&&&&&&&&&&$*:..............@&&&&&&&&&&&&@$!:..........
..$&&&&&&&&&&&&&&&&$*:...........@&&&&&&&&&&&&&&&@%!:.......
..$&&&&&&&&&&&&&&&&&&@$*:::::....@&&&&&&&&&&&&&&&&&&@%!:::::
..$&&&&&&&&&&&&&&&&&&&&$!::::....@&&&&&&&&&&&&&&&&&&&@%:::::
..$&&&&&&&&&&&&&&&&&$*:..........@&&&&&&&&&&&&&&&&@%!.......
..$&&&&&&&&&&&&&&$*:.............@&&&&&&&&&&&&&@$!:.........
..$#&&&&&&&&&&$*:................&#&&&&&&&&&&$*:............
.:!**********!..................:***********:...............
:!:!:......::!!................:!:!:.....:::!:..............


Two triangulations of the same convex pentagon. The triangulation on the left has a cost of 8 + 2√2 + 2√5
(approximately 15.30), the one on the right has a cost of 4 + 2√2 + 4√5 (approximately 15.77).

Solution:
=========

This problem has recursive substructure. The idea is to divide the polygon into three parts: a single triangle,
the sub-polygon to the left, and the sub-polygon to the right. We try all possible divisions like this and find
the one that minimizes the cost of the triangle plus the cost of the triangulation of the two sub-polygons.

------------------------------------------------------------------------
Let Minimum Cost of triangulation of vertices from i to j be minCost(i, j)
If j < i + 2 Then
  minCost(i, j) = 0
Else:
  minCost(i, j) = Min { minCost(i, k) + minCost(k, j) + cost(i, k, j) }
                  Here k varies from 'i+1' to 'j-1'

Cost of a triangle formed by edges (i, j), (j, k) and (k, i) is
  cost(i, j, k)  = dist(i, j) + dist(j, k) + dist(k, i)
------------------------------------------------------------------------

The above problem is similar to Matrix Chain Multiplication. The following is recursion tree for mTC(points[], 0, 4).

                                (0, 4)
                      /     /       |    \     \
                   (0,1)  (1,4)     (0,2) (0,3) (3,4)
                        /   / \  \   
                    (1,2)(2,4)(1,3)(3,4)  
It can be easily seen in the above recursion tree that the problem has many overlapping subproblems. 
Since the problem has both properties: Optimal Substructure and Overlapping Subproblems, it can be efficiently
solved using dynamic programming.

 */

export type Point = [number, number];

export const MAX = Number.MAX_SAFE_INTEGER;

function dist(p1: Point, p2: Point): number {
    return Math.sqrt((p1[0] - p2[0]) ** 2 + (p1[1] - p2[1]) ** 2);
}

function cost(points: Point[], i: number, j: number, k: number): number {
    const p1 = points[i];
    const p2 = points[j];
    const p3 = points[k];
    return dist(p1, p2) + dist(p2, p3) + dist(p3, p1);
}

function mTC(points: Point[], i: number, j: number): number {
    if (j < i + 2) {
        return 0;
    }

    let res = MAX;

    for (let k = i + 1; k < j; k++) {
        res = Math.min(res, mTC(points, i, k) + mTC(points, k, j) + cost(points, i, k, j));
    }

    return parseFloat(res.toFixed(4));
}

function mTCDP(points: Point[], n: number): number {
    if (n < 3) {
        return 0;
    }

    const table: number[][] = Array.from({ length: n }, () => Array(n).fill(n));

    for (let gap = 0; gap < n; gap++) {
        let i = 0;
        let j = gap;

        while (j < n) {
            if (j < i + 2) {
                table[i][j] = 0.0;
            } else {
                table[i][j] = MAX;

                for (let k = i + 1; k < j; k++) {
                    const val = table[i][k] + table[k][j] + cost(points, i, j, k);
                    if (table[i][j] > val) {
                        table[i][j] = val;
                    }
                }
            }

            i++;
            j++;
        }
    }

    return parseFloat(table[0][n - 1].toFixed(4));
}

const points: Point[] = [[0, 0], [1, 0], [2, 1], [1, 2], [0, 2]];
const n = points.length;

console.log(mTC(points, 0, n - 1));
console.log(mTCDP(points, n));

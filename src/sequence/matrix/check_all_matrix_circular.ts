/* 
Check if all rows of a matrix are circular rotations of each other

Given a matrix of n*n size, the task is to find whether all rows are circular rotations of each
other or not.

------------------------------------
Example:
------------------------------------

Input: mat = 1, 2, 3
             3, 1, 2
             2, 3, 1
Output:  Yes
All rows are rotated permutation of each other.

Input: mat = 1, 2, 3
             3, 2, 1
             1, 3, 2
Output:  No

------------------------------------
Explanation:
------------------------------------

As 3, 2, 1 is not a rotated or circular permutation of 1, 2, 3

------------------------------------
Algorithm:
------------------------------------

1)  Create a string of first row elements and concatenate the string with itself so that string
    search operations can be efficiently performed. Let this string be str_cat.
2)  Traverse all remaining rows. For every row being traversed, create a string str_curr of
    current row elements. If str_curr is not a substring of str_cat, return false.
3)  Return True. 

 */

import { assert } from "console";


const MAX = 1000;

function isPermutedMatrix(mat: number[][], n: number): boolean {
  let strCat = "";
  for (let i = 0; i < n; i++) {
    strCat += "-" + mat[0][i];
  }

  strCat += strCat;

  for (let i = 1; i < n; i++) {
    let currStr = "";
    for (let j = 0; j < n; j++) {
      currStr += "-" + mat[i][j];
    }

    if (strCat.indexOf(currStr) < 0) {
      return false;
    }
  }

  return true;
}

if (require.main === module) {
    const n = 4;
    const mat = [
      [1, 2, 3, 4],
      [4, 1, 2, 3],
      [3, 4, 1, 2],
      [2, 3, 4, 1]
    ];
    assert(isPermutedMatrix(mat, n), "All rows are not circular rotations of each other");
}
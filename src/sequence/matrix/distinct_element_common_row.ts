/* 
Find distinct elements common to all rows of a matrix
http://www.geeksforgeeks.org/find-distinct-elements-common-rows-matrix/

Given a n x n matrix. The problem is to find all the distinct elements common to all rows of the
matrix. The elements can be printed in any order.

Examples:
---------------
Input : mat = [[2, 1, 4, 3],
               [1, 2, 3, 2],
               [3, 6, 2, 3],
               [5, 2, 5, 3]]
Output : 2 3

Input : mat = [[12, 1, 14, 3, 16],
               [14, 2, 1, 3, 35],
               [14, 1, 14, 3, 11],
               [14, 25, 3, 2, 1],
               [1, 18, 3, 21, 14]]
Output : 1 3 14

 */


function sortRows(mat: number[][], n: number): void {
  for (let i = 0; i < n; i++) {
    mat[i].sort();
  }
}


// Sort all the rows of the matrix individually in increasing order. Then apply a
// modified approach of the problem of finding common elements in 3 sorted arrays.

// TS implementation to find distinct elements common to all rows of a matrix

// function to find all the common elements
// Time Complexity: O(n^2log n), each row of size n requires O(nlogn) for sorting and there
// are total n rows.
// Auxiliary Space : O(n) to store current column indexes for each row.
function commonElementsMethod2(mat: number[][], n: number): void {
  sortRows(mat, n);

  const currIndex: number[] = new Array(n).fill(0);
  let f = 0;

  while (currIndex[0] < n) {
    const value = mat[0][currIndex[0]];
    let present = true;

    for (let i = 1; i < n; i++) {
      while (currIndex[i] < n && mat[i][currIndex[i]] <= value) {
        currIndex[i]++;
      }

      if (mat[i][currIndex[i] - 1] !== value) {
        present = false;
      }

      if (currIndex[i] === n) {
        f = 1;
        break;
      }
    }

    if (present) {
      console.log(value);
    }

    if (f === 1) {
      break;
    }

    currIndex[0]++;
  }
}


//   Method 3: It uses the concept of hashing. The following steps are:
//   1. Map the element of 1st row in a hash table. Let it be hash.
//   2. Fow row = 2 to n
//   3. Map each element of the current row into a temporary hash table. Let it be temp.
//   4. Iterate through the elements of hash and check that the elements in hash are present
//   in temp. If not present then delete those elements from hash.
//   5. When all the rows are being processed in this manner, then the elements left in hash are
//   the required common elements.

//   Python program to find distinct elements common to all rows of a matrix
//   function to individually sort each row in increasing order
//   Time Complexity: O(n2)
//   Space Complexity: O(n)

function commonElementsMethod3(mat: number[][], n: number): void {
  const us = new Set<number>();

  for (let i = 0; i < n; i++) {
    us.add(mat[0][i]);
  }

  for (let i = 1; i < n; i++) {
    const temp = new Set<number>(mat[i]);
    us.forEach((el) => {
      if (!temp.has(el)) {
        us.delete(el);
      }
    });

    if (us.size === 0) {
      break;
    }
  }

  us.forEach((el) => {
    console.log(el);
  });
}

if (require.main === module) {
  const n = 4;
  const mat = [
    [1, 2, 3, 4],
    [4, 1, 2, 3],
    [3, 4, 1, 2],
    [2, 3, 4, 1]
  ];
  commonElementsMethod2(mat, n);

  const mat1 = [
    [12, 1, 14, 3, 16],
    [14, 2, 1, 3, 35],
    [14, 1, 14, 3, 11],
    [14, 25, 3, 2, 1],
    [1, 18, 3, 21, 14]
  ];
  const n1 = 5;
  commonElementsMethod3(mat1, n1);

  const mat2 = [
    [2, 1, 4, 3],
    [1, 2, 3, 2],
    [3, 6, 2, 3],
    [5, 2, 5, 3]
  ];
  const n2 = 4;
  commonElementsMethod3(mat2, n2);
}
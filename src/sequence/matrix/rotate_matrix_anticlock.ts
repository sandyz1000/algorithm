/* Rotate each ring of matrix anticlockwise by K elements

Given a matrix of order M*N and a value K, the task is to rotate each ring of the matrix
anticlockwise by K elements. If in any ring elements are less than and equal K then don't rotate
it.

Examples:
------------

Input : k = 3
        mat = [[1, 2, 3, 4],
               [5, 6, 7, 8],
               [9, 10, 11, 12],
               [13, 14, 15, 16]]

Output: 4 8  12 16
        3 10  6 15
        2 11  7 14
        1  5  9 13

Input : k = 2
        mat = [[1, 2, 3, 4],
               [10, 11, 12, 5],
               [9, 8, 7, 6]]

Output: 3 4  5  6
        2 11 12 7
        1 10  9 8


Algorithm:
------------
The idea is to traverse matrix in spiral form. Here is the algorithm to solve this problem :
1.  Make an auxiliary array temp[] of size M*N.
2.  Start traversing matrix in spiral form and store elements of current ring in temp[] array.
    While storing the elements in temp, keep track of starting and ending positions of current ring.
3.  For every ring that is being stored in temp[], rotate that subarray temp[]
4.  Repeat this process for each ring of matrix.
5.  In last traverse matrix again spirally and copy elements of temp[] array to matrix.

 */

// Time Complexity : O(M*N)
// Auxiliary space : O(M*N)

// program to rotate individual rings by k in spiral order traversal.

class RotateKElement {
  fillSpiral(mat: number[][], m: number, n: number, temp: number[]): void {
    let i = 0, k = 0, l = 0;
    let tIdx = 0;

    while (k < m && l < n) {
      for (i = l; i < n; i++) {
        mat[k][i] = temp[tIdx++];
      }
      k++;

      for (i = k; i < m; i++) {
        mat[i][n - 1] = temp[tIdx++];
      }
      n--;

      if (k < m) {
        for (i = n - 1; i >= l; i--) {
          mat[m - 1][i] = temp[tIdx++];
        }
        m--;
      }

      if (l < n) {
        for (i = m - 1; i >= k; i--) {
          mat[i][l] = temp[tIdx++];
        }
        l++;
      }
    }
  }

  spiralRotate(mat: number[][], M: number, N: number, k: number): void {
    const temp: number[] = new Array(M * N).fill(0);

    let m = M, n = N, s = 0, l = 0;
    let start = 0;
    let tIdx = 0;

    while (s < m && l < n) {
      let end = start;

      for (let i = l; i < n; i++) {
        temp[tIdx++] = mat[s][i];
        end++;
      }
      s++;

      for (let i = s; i < m; i++) {
        temp[tIdx++] = mat[i][n - 1];
        end++;
      }
      n--;

      if (s < m) {
        for (let i = n - 1; i >= l; i--) {
          temp[tIdx++] = mat[m - 1][i];
          end++;
        }
        m--;
      }

      if (l < n) {
        for (let i = m - 1; i >= s; i--) {
          temp[tIdx++] = mat[i][l];
          end++;
        }
        l++;
      }

      if (end - start > k) {
        temp.splice(start, k, ...temp.slice(start, start + k).reverse());
        temp.splice(start + k, end, ...temp.slice(start + k, end).reverse());
        temp.splice(start, end, ...temp.slice(start, end).reverse());
        start = end;
      } else {
        break;
      }
    }

    this.fillSpiral(mat, M, N, temp);
  }

  printArr(mat: number[][]): void {
    for (const item of mat) {
      console.log(item.join(" "));
    }
  }
}

if (require.main === module) {
  const M = 4, N = 4, k = 3;
  const mat: number[][] = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 16]
  ];

  const pDestination: number[][] = new Array(N).fill([]).map(() => new Array(M).fill(0));
  rotate(mat, pDestination, M, N);

  const test = new RotateKElement();
  test.spiralRotate(mat, M, N, k);
  test.printArr(mat);
}

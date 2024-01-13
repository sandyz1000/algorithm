/* 
Turn an image by 90 degree

Given an image, how will you turn it by 90 degrees? A vague question. Minimize the browser and try
your solution before going further.

An image can be treated as 2D matrix which can be stored in a buffer. We are provided with matrix
dimensions and it's base address. How can we turn it?

For example see the below picture,

    * * * ^ * * *
    * * * | * * *
    * * * | * * *
    * * * | * * *

After rotating right, it appears (observe arrow direction)

    * * * *
    * * * *
    * * * *
    -- - - >
    * * * *
    * * * *
    * * * *

Explanation:
----------------------------
The idea is simple. Transform each row of source matrix into required column of final image.
We will use an auxiliary buffer to transform the image.

From the above picture, we can observe that

first row of source ------> last column of destination
second row of source ------> second last column of destination
so ... on
last row of source ------> first column of destination
 */

function rotate(pS: number[][], pD: number[][], r: number, c: number): void {
  for (let row = 0; row < r; row++) {
    for (let col = 0; col < c; col++) {
      pD[col][r - row - 1] = pS[row][col];
    }
  }
}

if (require.main === module) {
  // Output:
  // 9	    5	1
  // 10	6	2
  // 11	7	3
  // 12	8	4
  const image: number[][] = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12]
  ];

  // Setting initial values and memory allocation
  const m = 3;
  const n = 4;
  const pDestination: number[][] = new Array(n).fill([]).map(() => new Array(m).fill(0));

  // Process each buffer
  console.log("Before rotation", image);
  rotate(image, pDestination, m, n);
  console.log("After rotation", pDestination);
}

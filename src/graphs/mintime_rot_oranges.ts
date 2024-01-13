/*  Minimum time required to rot all oranges

Given a matrix of dimension m*n where each cell in the matrix can have values 0, 1 or 2 which has
the following meaning:

0: Empty cell
1: Cells have fresh oranges
2: Cells have rotten oranges

So we have to determine what is the minimum time required so that all the oranges become rotten. A
rotten orange at index [i,j] can rot other fresh orange at indexes [i-1,j], [i+1,j], [i,j-1],
[i,j+1] (up, down, left and right). If it is impossible to rot every orange then simply return -1.

Examples:

Input:  arr = [{2, 1, 0, 2, 1},
                {1, 0, 1, 2, 1},
                {1, 0, 0, 2, 1}]
Output:
All oranges can become rotten in 2 time frames.


Input:  arr = [{2, 1, 0, 2, 1},
                {0, 0, 1, 2, 1},
                {1, 0, 0, 2, 1}]

Output: All oranges cannot be rotten. */

export class Ele {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

export class RotOrange {
  static R: number = 3;
  static C: number = 5;

  is_valid(i: number, j: number): boolean {
    return 0 <= i && i < RotOrange.R && 0 <= j && j < RotOrange.C;
  }

  is_delim(temp: Ele): boolean {
    return temp.x === -1 && temp.y === -1;
  }

  check_all(arr: number[][]): boolean {
    for (let i = 0; i < RotOrange.R; i++) {
      for (let j = 0; j < RotOrange.C; j++) {
        if (arr[i][j] === 1) {
          return true;
        }
      }
    }
    return false;
  }

  rot_oranges(arr: number[][]): number {
    let Q: Ele[] = [];
    let ans: number = 0;

    for (let i = 0; i < RotOrange.R; i++) {
      for (let j = 0; j < RotOrange.C; j++) {
        if (arr[i][j] === 2) {
          Q.push(new Ele(i, j));
        }
      }
    }

    Q.push(new Ele(-1, -1));

    while (Q.length > 0) {
      let flag: boolean = false;

      while (!this.is_delim(Q[0])) {
        let temp: Ele = Q[0];

        if (this.is_valid(temp.x + 1, temp.y) && arr[temp.x + 1][temp.y] === 1) {
          if (!flag) {
            ans += 1;
            flag = true;
          }
          arr[temp.x + 1][temp.y] = 2;
          temp.x += 1;
          Q.push(new Ele(temp.x, temp.y));
          temp.x -= 1;
        }

        if (this.is_valid(temp.x - 1, temp.y) && arr[temp.x - 1][temp.y] === 1) {
          if (!flag) {
            ans += 1;
            flag = true;
          }
          arr[temp.x - 1][temp.y] = 2;
          temp.x -= 1;
          Q.push(new Ele(temp.x, temp.y));
          temp.x += 1;
        }

        if (this.is_valid(temp.x, temp.y + 1) && arr[temp.x][temp.y + 1] === 1) {
          if (!flag) {
            ans += 1;
            flag = true;
          }
          arr[temp.x][temp.y + 1] = 2;
          temp.y += 1;
          Q.push(new Ele(temp.x, temp.y));
          temp.y -= 1;
        }

        if (this.is_valid(temp.x, temp.y - 1) && arr[temp.x][temp.y - 1] === 1) {
          if (!flag) {
            ans += 1;
            flag = true;
          }
          arr[temp.x][temp.y - 1] = 2;
          temp.y -= 1;
          Q.push(new Ele(temp.x, temp.y));
        }

        Q.shift();
      }

      Q.shift();

      if (Q.length > 0) {
        Q.push(new Ele(-1, -1));
      }
    }

    return this.check_all(arr) ? -1 : ans;
  }
}

if (require.main === module) {
  const test = new RotOrange();
  const arr = [
    [2, 1, 0, 2, 1],
    [1, 0, 1, 2, 1],
    [1, 0, 0, 2, 1]
  ];

  const ans = test.rot_oranges(arr);

  if (ans === -1) {
    console.log("All oranges cannot rot");
  } else {
    console.log(`Time required for all oranges to rot = ${ans}`);
  }
}

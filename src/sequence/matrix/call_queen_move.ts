/* 
"""
Number of cells a queen can move with obstacles on the chessboard
http://www.geeksforgeeks.org/number-cells-queen-can-move-obstacles-chessborad/

Consider a N X N chessboard with a Queen and K obstacles. The Queen cannot pass through obstacles.
Given the position (x, y) of Queen, the task is to find the number of cells the queen can move

"""
*/


// Method 1:

//     The idea is to iterate over the cells the queen can attack and stop until there is an
//     obstacle or end of the board. To do that, we need to iterate horizontally, vertically and
//     diagonally.
//     The moves from position (x, y) can be:
//     (x+1, y): one step horizontal move to the right.
//     (x-1, y): one step horizontal move to the left.
//     (x+1, y+1): one step diagonal move up-right.
//     (x-1, y-1): one step diagonal move down-left.
//     (x-1, y+1): one step diagonal move left-up.
//     (x+1, y-1): one step diagonal move right-down.
//     (x, y+1): one step upward.
//     (x, y-1): one step downward.
class QueenMove {
  private check(n: number, x: number, y: number, xx: number, yy: number, mp: Map<string, number>): number {
    // Return if position is valid on chessboard
    const ranged = (n: number, x: number, y: number): boolean => n >= x && x > 0 && n >= y && y > 0;

    let ans = 0;

    // Checking valid move of Queen in a direction
    while (ranged(n, x, y) && !mp.has(`${x},${y}`)) {
      x += xx;
      y += yy;
      ans += 1;
    }

    return ans;
  }

  public numberOfPositionMethod(n: number, k: number, x: number, y: number, obstPosx: number[], obstPosy: number[]): number {
    let x1 = 0;
    let y1 = 0;
    let ans = 0;
    const mp: Map<string, number> = new Map();

    // Mapping each obstacle's position
    for (let i = 0; i < k; i++) {
      x1 = obstPosx[i];
      y1 = obstPosy[i];
      mp.set(`${x1},${y1}`, 1);
    }

    // Fetching number of positions a queen can move in each direction
    ans += this.check(n, x + 1, y, 1, 0, mp);
    ans += this.check(n, x - 1, y, -1, 0, mp);
    ans += this.check(n, x, y + 1, 0, 1, mp);
    ans += this.check(n, x, y - 1, 0, -1, mp);
    ans += this.check(n, x + 1, y + 1, 1, 1, mp);
    ans += this.check(n, x + 1, y - 1, 1, -1, mp);
    ans += this.check(n, x - 1, y + 1, -1, 1, mp);
    ans += this.check(n, x - 1, y - 1, -1, -1, mp);

    return ans;
  }
}


class QueenMove2 {
  public numberOfPositionMethod(n: number, k: number, x: number, y: number, obstPosx: number[], obstPosy: number[]): number {
    let d11 = Math.min(x - 1, y - 1);
    let d12 = Math.min(n - x, n - y);
    let d21 = Math.min(n - x, y - 1);
    let d22 = Math.min(x - 1, n - y);

    let r1 = y - 1;
    let r2 = n - y;
    let c1 = x - 1;
    let c2 = n - x;

    // For each obstacle, find the minimum distance. If obstacle is present in any direction,
    // distance will be updated.
    for (let i = 0; i < k; i++) {
      if (x > obstPosx[i] && y > obstPosy[i] && x - obstPosx[i] === y - obstPosy[i]) {
        d11 = Math.min(d11, x - obstPosx[i] - 1);
      }

      if (obstPosx[i] > x && obstPosy[i] > y && obstPosx[i] - x === obstPosy[i] - y) {
        d12 = Math.min(d12, obstPosx[i] - x - 1);
      }

      if (obstPosx[i] > x && y > obstPosy[i] && obstPosx[i] - x === y - obstPosy[i]) {
        d21 = Math.min(d21, obstPosx[i] - x - 1);
      }

      if (x > obstPosx[i] && obstPosy[i] > y && x - obstPosx[i] === obstPosy[i] - y) {
        d22 = Math.min(d22, x - obstPosx[i] - 1);
      }

      if (x === obstPosx[i] && obstPosy[i] < y) {
        r1 = Math.min(r1, y - obstPosy[i] - 1);
      }

      if (x === obstPosx[i] && obstPosy[i] > y) {
        r2 = Math.min(r2, obstPosy[i] - y - 1);
      }

      if (y === obstPosy[i] && obstPosx[i] < x) {
        c1 = Math.min(c1, x - obstPosx[i] - 1);
      }

      if (y === obstPosy[i] && obstPosx[i] > x) {
        c2 = Math.min(c2, obstPosx[i] - x - 1);
      }
    }

    return d11 + d12 + d21 + d22 + r1 + r2 + c1 + c2;
  }
}

if (require.main === module) {
  const test1 = new QueenMove();
  const test2 = new QueenMove2();
  const n = 8; // Chessboard size
  const k = 1; // Number of obstacles
  const qposx = 4; // Queen x position
  const qposy = 4; // Queen y position
  const obst_posx = [3]; // x position of obstacles
  const obst_posy = [5]; // y position of obstacles

  console.log("\n---- Method-1 ------");
  console.log(test1.numberOfPositionMethod(n, k, qposx, qposy, obst_posx, obst_posy));

  console.log("\n---- Method-2 ------");
  console.log(test2.numberOfPositionMethod(n, k, qposx, qposy, obst_posx, obst_posy));
}


// // Example usage
// (() => {
//   const queenMove = new QueenMove();
//   const n = 8;
//   const k = 3;
//   const x = 4;
//   const y = 4;
//   const obstPosx = [3, 5, 2];
//   const obstPosy = [4, 2, 6];
//   const numberOfPositions = queenMove.numberOfPositionMethod(n, k, x, y, obstPosx, obstPosy);
//   console.log(`Number of positions a queen can move: ${numberOfPositions}`);
// })


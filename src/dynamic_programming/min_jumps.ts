/* 
Given an array of integers where each element represents the max number of steps that can be
made forward from that element. Write a function to return the minimum number of jumps to reach
the end of the array (starting from the first element). If an element is 0, then cannot move
through that element. 
*/

export const INF = Number.MAX_SAFE_INTEGER;

function minJumps(arr: number[], l: number, h: number): number {
  if (h === l) {
    return 0;
  }

  if (arr[l] === 0) {
    return INF;
  }

  let minimum = INF;
  let i = l + 1;

  while (i <= h && i <= l + arr[l]) {
    const jumps = minJumps(arr, i, h);
    if (jumps !== INF && jumps + 1 < minimum) {
      minimum = jumps + 1;
    }
    i++;
  }

  return minimum;
}

function minJumpsDP(arr: number[]): number {
  const n = arr.length;
  const jumps: number[] = Array(n).fill(0);

  if (n === 0 || arr[0] === 0) {
    return INF;
  }

  jumps[0] = 0;

  for (let i = 1; i < n; i++) {
    jumps[i] = INF;
    for (let j = 0; j < i; j++) {
      if (i <= j + arr[j] && jumps[j] !== INF) {
        jumps[i] = Math.min(jumps[i], jumps[j] + 1);
        break;
      }
    }
  }

  return jumps[n - 1];
}

if (require.main === module) {

  const arr = [1, 3, 6, 3, 2, 3, 6, 8, 9, 5];
  const size = arr.length;

  console.log("Minimum number of jumps to reach end is", minJumps(arr, 0, size - 1));
  console.log("Minimum number of jumps to reach end is", minJumpsDP(arr));
}

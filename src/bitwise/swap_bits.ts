function swapBits(x: number, p1: number, p2: number, n: number): number {
  // Move all bits of first set to rightmost side
  const set1 = (x >> p1) & ((1 << n) - 1);

  // Move all bits of second set to rightmost side
  const set2 = (x >> p2) & ((1 << n) - 1);

  // XOR the two sets
  const xor = set1 ^ set2;

  // Put the xor bits back to their original positions
  const shiftedXor = (xor << p1) | (xor << p2);

  // XOR the 'shiftedXor' with the original number so that the two sets are swapped
  const result = x ^ shiftedXor;
  return result;
}

const res = swapBits(28, 0, 3, 2);
console.log(`Result = ${res}`);
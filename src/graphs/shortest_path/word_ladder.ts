/* """Word Ladder (Length of shortest chain to reach a target word)

Given a dictionary, and two words 'start' and 'target' (both of same length). Find length of the
smallest chain from 'start' to 'target' if it exists, such that adjacent words in the chain only
differ by one character and each word in the chain is a valid word i.e., it exists in the
dictionary. It may be assumed that the 'target' word exists in dictionary and length of all
dictionary words is same.

Example:

Input:  Dictionary = [POON, PLEE, SAME, POIE, PLEA, PLIE, POIN]
        start = TOON
        target = PLEA

Output: 7

Explanation: TOON - POON - POIN - POIE - PLIE - PLEE - PLEA"""

from typing import List


# Time Complexity of the above code is O(n^m) where n is the number of entries originally in the
# dictionary and m is the size of the string
# To check if strings differ by exactly one character */

// TypeScript program to find the length of the shortest chain to reach 'target' from 'start'
// using a minimum number of adjacent moves.

export class QItem {
  word: string;
  len: number;

  constructor(word: string, length: number) {
    this.word = word;
    this.len = length;
  }
}

function isAdjacent(a: string, b: string): boolean {
  let count = 0;
  const n = a.length;

  // Iterate through all characters and return false
  // if there are more than one mismatching characters
  for (let i = 0; i < n; i++) {
    if (a[i] !== b[i]) {
      count += 1;
    }
    if (count > 1) {
      break;
    }
  }

  return count === 1;
}

function shortestChainLen(start: string, target: string, D: string[]): number {
  // Create a queue for BFS and insert 'start' as the source vertex
  const Q: QItem[] = [];
  const item = new QItem(start, 1);
  Q.push(item);

  while (Q.length > 0) {
    const curr = Q.pop()!;

    // Go through all words in the dictionary
    for (let i = 0; i < D.length; i++) {
      // Process a dictionary word if it is adjacent to the current word (or vertex) of BFS
      const temp = D[i];
      if (isAdjacent(curr.word, temp)) {
        item.word = temp;  // Add the dictionary word to Q
        item.len = curr.len + 1;
        Q.push(new QItem(item.word, item.len));

        // Remove from the dictionary so that this word is not processed again.
        // This is like marking it as visited
        D.splice(i, 1);

        // If we reached the target
        if (temp === target) {
          return item.len;
        }
      }
    }
  }

  return 0; // If no transformation sequence is found
}

// Example usage:
const D = ["poon", "plee", "same", "poie", "plie", "poin", "plea"];
const start = "toon";
const target = "plea";
console.log(`Length of the shortest chain is: ${shortestChainLen(start, target, D)}`);

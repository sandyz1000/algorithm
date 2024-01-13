/* 
Dynamic Programming | Set 24 (Optimal Binary Search Tree)

Given a sorted array keys[0.. n-1] of search keys and an array freq[0.. n-1] of frequency
counts, where freq[i] is the number of searches to keys[i]. Construct a binary search tree of all
keys such that the total cost of all the searches is as small as possible.

Let us first define the cost of a BST. The cost of a BST node is level of that node multiplied by
its frequency. Level of root is 1.

Example 1
Input:  keys[] = {10, 12}, freq[] = {34, 50}
There can be following two possible BSTs
        10                       12
          \                     /
           12                 10
          I                     II

Frequency of searches of 10 and 12 are 34 and 50 respectively.
The cost of tree I is 34*1 + 50*2 = 134
The cost of tree II is 50*1 + 34*2 = 118

Example 2
Input:  keys[] = {10, 12, 20}, freq[] = {34, 8, 50}

There can be following possible BSTs

    10                12                 20         10              20
      \             /    \              /             \            /
      12          10     20           12               20         10
        \                            /                 /           \
         20                        10                12             12
     I               II             III             IV             V

Among all possible BSTs, cost of the fifth BST is minimum.
Cost of the fifth BST is 1*50 + 2*34 + 3*8 = 142

Notes:
1) The time complexity of the above solution is O(n^4). The time complexity can be easily
reduced to O(n^3) by pre-calculating sum of frequencies instead of calling sum() again and again.

2) In the above solutions, we have computed optimal cost only. The solutions can be easily
modified to store the structure of BSTs also. We can create another auxiliary array of size n to
store the structure of tree. All we need to do is, store the chosen 'r' in the innermost loop.

 */

const INF = Number.MAX_SAFE_INTEGER;

class BinarySearchTree {
  optCost(freq: number[], i: number, j: number): number {
    if (j < i) {
      return 0;
    }

    if (j === i) {
      return freq[i];
    }

    const fsum = freq.slice(i, j + 1).reduce((acc, val) => acc + val, 0);
    let minimum = INF;

    for (let r = i; r <= j; r++) {
      const cost = this.optCost(freq, i, r - 1) + this.optCost(freq, r + 1, j);
      if (cost < minimum) {
        minimum = cost;
      }
    }

    return minimum + fsum;
  }

  optimalSearchTree(keys: number[], freq: number[], n: number): number {
    return this.optCost(freq, 0, n - 1);
  }
}

class BinaryTreeTreeDP {
  optimalSearchTree(keys: number[], freq: number[], n: number): number {
    const cost: number[][] = Array.from({ length: n + 1 }, () => Array(n + 1).fill(0));

    for (let i = 0; i < n; i++) {
      cost[i][i] = freq[i];
    }

    for (let L = 2; L <= n; L++) {
      for (let i = 0; i <= n - L + 1; i++) {
        const j = i + L - 1;
        cost[i][j] = INF;

        for (let r = i; r <= j; r++) {
          const c = (r > i ? cost[i][r - 1] : 0) + (r < j ? cost[r + 1][j] : 0) +
            freq.slice(i, j + 1).reduce((acc, val) => acc + val, 0);
          if (c < cost[i][j]) {
            cost[i][j] = c;
          }
        }
      }
    }

    return cost[0][n - 1];
  }
}

if (require.main === module) {
  const test1 = new BinarySearchTree();
  const test2 = new BinaryTreeTreeDP();
  const keys = [10, 12, 20];
  const freq = [34, 8, 50];
  const keySize = keys.length;

  console.log("Cost of Optimal BST is", test1.optimalSearchTree(keys, freq, keySize));
  console.log("DP: Cost of Optimal BST is", test2.optimalSearchTree(keys, freq, keySize));
}

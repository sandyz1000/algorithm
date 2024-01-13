/* Given a value V, if we want to make change for V cents, and we have infinite supply of each of
C = { C1, C2, .. , Cm} valued coins, what is the minimum number of coins to make the change?

Examples:

Input: coins[] = {25, 10, 5}, V = 30
Output: Minimum 2 coins required
We can use one coin of 25 cents and one of 5 cents

Input: coins[] = {9, 6, 5, 1}, V = 11
Output: Minimum 2 coins required
We can use one coin of 6 cents and 1 coin of 5 cents

This problem is a variation of the problem discussed Coin Change Problem. Here instead of finding
total number of possible solutions, we need to find the solution with minimum number of coins.

The minimum number of coins for a value V can be computed using below recursive formula.
-----------------------------------------------------------------------------------------
If V == 0, then 0 coins required.
If V > 0
   minCoin(coins[0..m-1], V) = min {1 + minCoins(V-coin[i])}
                               where i varies from 0 to m-1
                               and coin[i] <= V
------------------------------------------------------------------------------------------

The time complexity of above solution is exponential. If we draw the complete recursion tree,
we can observer that many subproblems are solved again and again. For example, when we start from
V = 11, we can reach 6 by subtracting one 5 times and by subtracting 5 one times. So the
subproblem for 6 is called twice.
Since same suproblems are called again, this problem has Overlapping Subprolems property. So the
min coins problem has both properties (see this and this) of a dynamic programming problem. Like
other typical Dynamic Programming(DP) problems, recomputations of same subproblems can be avoided
by constructing a temporary array table[][] in bottom up manner. Below is Dynamic Programming
based solution.

Dynamic Programming time complexity:
Time complexity of the above solution is O(mV).
 */

export const INT_MAX = 10000000;

function minCoinsRec(coins: number[], m: number, amount: number): number {
    if (amount === 0) {
        return 0; // Base case
    }

    let res = INT_MAX; // Initialize result

    // Try every coin that has smaller value than amount
    for (let i = 0; i < m; i++) {
        if (coins[i] <= amount) {
            const subRes = minCoinsRec(coins, m, amount - coins[i]);

            // Check for INT_MAX to avoid overflow and see if the result can be minimized
            if (subRes !== INT_MAX && subRes + 1 < res) {
                res = subRes + 1;
            }
        }
    }

    return res;
}

function minCoinsDP(coins: number[], totalCoins: number, amount: number): number {
    const table: number[] = Array(amount + 1).fill(0);
    table[0] = 0; // Base case (If given value amount is 0)

    // Initialize all table values as Infinite
    for (let value = 1; value <= amount; value++) {
        table[value] = INT_MAX;
    }

    // Compute minimum coins required for all values from 1 to amount
    for (let value = 1; value <= amount; value++) {
        // Go through all coins smaller than value
        for (let j = 0; j < totalCoins; j++) {
            if (coins[j] <= value) {
                const subRes = table[value - coins[j]];
                if (subRes !== INT_MAX && subRes + 1 < table[value]) {
                    table[value] = subRes + 1;
                }
            }
        }
    }

    return table[amount];
}

const coins = [9, 6, 5, 1];
const m = coins.length;
const amount = 11;
console.log(`Minimum coins required is ${minCoinsRec(coins, m, amount)}`);
console.log(`Minimum coins required is ${minCoinsDP(coins, m, amount)}`);

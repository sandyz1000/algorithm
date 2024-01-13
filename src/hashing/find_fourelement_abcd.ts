/* """
Find four elements a, b, c and d in an array such that a+b = c+d

Given an array of distinct integers, find if there are two pairs (a, b) and (c, d) such that
a+b = c+d, and a, b, c and d are distinct elements. If there are multiple answers,
then print any of them.

==Example:==

Input:   {3, 4, 7, 1, 2, 9, 8}
Output:  (3, 8) and (4, 7)
Explanation: 3+8 = 4+7

Input:   {3, 4, 7, 1, 12, 9};
Output:  (4, 12) and (7, 9)
Explanation: 4+12 = 7+9

Input:  {65, 30, 7, 90, 1, 9, 8};
Output:  No pairs found

---------------------------------------------------
Explanation:
---------------------------------------------------

A Simple Solution is to run four loops to generate all possible quadruples of array element.
For every quadruple (a, b, c, d), check if (a+b) = (c+d). Time complexity of this solution is
O(n^4).

An Efficient Solution can solve this problem in O(n^2) time. The idea is to use hashing. We use
sum as key and pair as value in hash table.

Loop i = 0 to n-1 :
    Loop j = i + 1 to n-1 :
        calculate sum
        If in hash table any index already exist
            Then print (i, j) and previous pair
            from hash table
        Else update hash table
    EndLoop;
EndLoop;

---------------------------------------------------
Asymptotic analysis:
---------------------------------------------------
Time complexity of map insert and search is actually O(Log n) instead of O(1).
So below implementation is O(n2 Log n).

function to find a, b, c, d such that (a + b) = (c + d)
 */

// Program to find four different elements a,b,c and d of array such that a+b = c+d


function findPairs(arr: number[]): boolean {
    // Create an empty hashmap to store mapping from summation to pair indexes
    const hash: Record<number, [number, number]> = {};

    // Traverse through all possible pairs of arr[]
    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            const summation = arr[i] + arr[j];
            
            // Sum already present in hash
            if (summation in hash) {
                const prev = hash[summation];
                console.log(`${prev} and (${arr[i]}, ${arr[j]})`);
                return true;
            }
            
            // Summation is not in hash, store it and continue to the next pair
            else {
                hash[summation] = [arr[i], arr[j]];
            }
        }
    }
    return false;
}

if (require.main === module) {
    const arr = [3, 4, 7, 1, 2, 9, 8];
    console.log(findPairs(arr) ? "Found pairs" : "No pairs found");
}

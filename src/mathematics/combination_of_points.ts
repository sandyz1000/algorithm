/* """
Print all combinations of points that can compose a given number
You can win three kinds of basketball points, 1 point, 2 points, and 3 points.
Given a total score n, print out all the combination to compose n.

Examples:
- - - - - - - - - - - - - - - - - - - - - - - - - - - +
    For n = 1, the program should print following:
    1

    For n = 2, the program should print following:
    1 1
    2

    For n = 3, the program should print following:
    1 1 1
    1 2
    2 1
    3

    For n = 4, the program should print following:
    1 1 1 1
    1 1 2
    1 2 1
    1 3
    2 1 1
    2 2
    3 1

    and so on ...

- - - - - - - - - - - - - - - - - - - - - - - - - - - +
Algorithm:

1. At first position we can have three numbers 1 or 2 or 3.
2. First put 1 at first position and recursively call for n-1.
3. Then put 2 at first position and recursively call for n-2.
4. Then put 3 at first position and recursively call for n-3.
5. If n becomes 0 then we have formed a combination that compose n, so print the current
combination.

Below is a generalized implementation. In the below implementation, we can change MAX_POINT if
there are higher points (more than 3) in the basketball game.

 */

export class GFG {
    printCompositions(arr: number[], n: number, i: number, MAX_POINT: number): number[][] {
        const result: number[][] = [];

        if (n === 0) {
            result.push(arr.slice(0, i));
        } else if (n > 0) {
            for (let k = 1; k <= MAX_POINT; k++) {
                arr[i] = k;
                result.push(...this.printCompositions(arr, n - k, i + 1, MAX_POINT));
            }
        }

        return result;
    }
}

if (require.main === module) {
    const test = new GFG();
    const n = 5;
    const size = 100;
    const arr: number[] = new Array(size).fill(0);
    const MAX_POINT = 3;
    const compositions = test.printCompositions(arr, n, 0, MAX_POINT);
    console.log(`Different compositions formed by 1, 2, and 3 of ${n} are:`, compositions);
}

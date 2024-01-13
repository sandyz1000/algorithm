/* """
Snake and Ladder Problem

Given a snake and ladder board, find the minimum number of dice throws required to reach the
destination or last cell from source or 1st cell. Basically, the player has total control over
outcome of dice throw and wants to find out minimum number of throws required to reach last cell.

If the player reaches a cell which is base of a ladder, the player has to climb up that ladder
and if reaches a cell is mouth of the snake, has to go down to the tail of snake without a dice
throw.

----------------------------------
Example:
----------------------------------

REFER-DIAGRAM
http://www.geeksforgeeks.org/snake-ladder-problem-2/

Consider the board shown on right side (taken from here), the minimum number of dice throws
required to reach cell 30 from cell 1 is 3. Following are steps.

a) First throw two on dice to reach cell number 3 and then ladder to reach 22
b) Then throw 6 to reach 28.
c) Finally through 2 to reach 30.

There can be other solutions as well like (2, 2, 6), (2, 4, 4), (2, 3, 5).. etc.


The idea is to consider the given snake and ladder board as a directed graph with number of
vertices equal to the number of cells in the board. The problem reduces to finding the shortest
path in a graph. Every vertex of the graph has an edge to next six vertices if next 6 vertices do
not have a snake or ladder. If any of the next six vertices has a snake or ladder, then the edge
from current vertex goes to the top of the ladder or tail of the snake. Since all edges are of
equal weight, we can efficiently find shortest path using Breadth First Search of the graph.

Following is Python implementation of the above idea. The input is represented by two things,
first is 'N' which is number of cells in the given board, second is an array 'move[0...N-1]' of
size N. An entry move[i] is -1 if there is no snake and no ladder from i, otherwise move[i]
contains index of destination cell for the snake or the ladder at i.

Time complexity of the above solution is O(N) as every cell is added and removed only once from
queue. And a typical enqueue or dequeue operation takes O(1) time.

"""
 */


export class QEntry {
    // An entry in queue used in BFS
    constructor(public v: number, public dist: number) {}
}

export 
class SnakesLadder {
    getMinDiceThrows(moves: number[], n: number): number {
        // This function returns the minimum number of dice throws required to reach the last cell
        // from the 0'th cell in a snake and ladder game.

        const visited: number[] = Array(n).fill(0);
        const queue: QEntry[] = [];
        const qe: QEntry = new QEntry(0, 0);

        // Mark the node 0 as visited and enqueue it.
        visited[0] = 1;
        queue.push(qe);

        // Do a BFS starting from vertex at index 0
        while (queue.length > 0) {
            const current: QEntry = queue.shift()!;
            const v: number = current.v;

            // If the front vertex is the destination vertex, we are done
            if (v === n - 1) {
                break;
            }

            // Otherwise dequeue the front vertex and enqueue its adjacent vertices (or cell numbers
            // reachable through a dice throw)
            let j: number = v + 1;
            while (j <= v + 6 && j < n) {
                // If this cell is already visited, then ignore
                if (visited[j] === 0) {
                    // Otherwise calculate its distance and mark it as visited
                    const a: QEntry = new QEntry(0, current.dist + 1);
                    visited[j] = 1;

                    // Check if there is a snake or ladder at 'j' then tail of snake or top of
                    // ladder becomes the adjacent of 'i'
                    if (moves[j] !== -1) {
                        a.v = moves[j];
                    } else {
                        a.v = j;
                    }
                    queue.push(a);
                }
                j++;
            }
        }

        // We reach here when 'qe' has the last vertex; return the distance of the vertex in 'qe'
        return queue[queue.length - 1].dist;
    }
}

// Main function
if (require.main === module) {
    // Let us construct the board given in the above diagram
    // Output: Min Dice throws required are 3

    const snakeLadder: SnakesLadder = new SnakesLadder();
    const N: number = 30;
    const moves: number[] = Array(N).fill(-1);

    // Ladders
    moves[2] = 21;
    moves[4] = 7;
    moves[10] = 25;
    moves[19] = 28;

    // Snakes
    moves[26] = 0;
    moves[20] = 8;
    moves[16] = 3;
    moves[18] = 6;

    console.log("Min Dice throws required are", snakeLadder.getMinDiceThrows(moves, N));
}

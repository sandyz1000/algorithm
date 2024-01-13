/* 
Find if there is a path of more than k length from a source

- - - - - - - - - - - - - -
REFER DIAGRAM
http:www.geeksforgeeks.org/find-if-there-is-a-path-of-more-than-k-length-from-a-source/

Input  : Source s = 0, k = 58
Output : True
There exists a simple path 0 -> 7 -> 1 -> 2 -> 8 -> 6 -> 5 -> 3 -> 4

Which has a total distance of 60 km which is more than 58.

Input  : Source s = 0, k = 62
Output : False

In the above graph, the longest simple path has distance 61 (0 -> 7 -> 1-> 2 -> 3 -> 4 -> 5
-> 6 -> 8, so output  should be false for any input greater  than 61.
- - - - - - - - - - - - - -

One important thing to note is, simply doing BFS or DFS and picking the longest edge at every
step would not work. The reason is, a shorter edge can produce longer path due to higher weight
edges connected through it.

The idea is to use Backtracking. We start from given source, explore all paths from current
vertex. We keep track of current distance from source. If distance becomes more than k, we return
true. If a path doesn't produces more than k distance, we backtrack.

How do we make sure that the path is simple and we don't loop in a cycle? The idea is to keep
track of current path vertices in an array. Whenever we add a vertex to path, we check if it
already exists or not in current path. If it exists, we ignore the edge.


---------------------------------------
Explanation:
---------------------------------------
Time Complexity: O(n!)

From the source node, we one-by-one visit all the paths and check if the total weight is greater
than k for each path. So, the worst case will be when the number of possible paths is maximum.
This is the case when every node is connected to every other node.
Beginning from the source node we have n-1 adjacent nodes. The time needed for a path to connect
any two nodes is 2. One for joining the source and the next adjacent vertex. One for breaking the
connection between the source and the old adjacent vertex.
After selecting a node out of n-1 adjacent nodes, we are left with n-2 adjacent nodes (as the
source node is already included in the path) and so on at every step of selecting a node our
problem reduces by 1 node.

We can write this in the form of a recurrence relation as: F(n) = n*(2+F(n-1))
This expands to: 2n + 2n*(n-1) + 2n*(n-1)*(n-2) + .... + 2n(n-1)(n-2)(n-3) .....1
As n times 2n(n-1)(n-2)(n-3)....1 is greater than the given expression so we can safely say time
complexity is: n*2*n!

Here in the question the first node is defined so time complexity becomes
F(n-1) = 2(n-1)*(n-1)! = 2*n*(n-1)! - 2*1*(n-1)! = 2*n!-2*(n-1)! = O(n!)

*/

import { assert } from "console";

class Pair {
  constructor(public first: number, public second: number) { }
}

// This class represents a dipathted graph using adjacency list representation
export class Graph {
  private V: number;
  private adj: Map<number, Pair[]>;

  constructor(V: number) {
    this.V = V;
    this.adj = new Map<number, Pair[]>();
  }

  addEdge(u: number, v: number, w: number): void {
    const pair1 = new Pair(v, w);
    const pair2 = new Pair(u, w);
    if (!this.adj.has(u)) {
      this.adj.set(u, []);
    }
    if (!this.adj.has(v)) {
      this.adj.set(v, []);
    }
    this.adj.get(u)!.push(pair1);
    this.adj.get(v)!.push(pair2);
  }

  pathMoreThanK(src: number, k: number): boolean {
    const path: boolean[] = Array(this.V).fill(false);
    path[src] = true;
    return this.pathMoreThanKUtil(src, k, path);
  }

  pathMoreThanKUtil(src: number, k: number, path: boolean[]): boolean {
    if (k <= 0) {
      return true;
    }

    for (const i of this.adj.get(src) || []) {
      const v = i.first;
      const w = i.second;

      if (path[v]) {
        continue;
      }

      if (w >= k) {
        return true;
      }

      path[v] = true;

      if (this.pathMoreThanKUtil(v, k - w, path)) {
        return true;
      }

      path[v] = false;
    }

    return false;
  }
}

if (require.main === module) {
  // Test graph
  const V = 9;
  const g = new Graph(V);
  
  g.addEdge(0, 1, 4);
  g.addEdge(0, 7, 8);
  g.addEdge(1, 2, 8);
  g.addEdge(1, 7, 11);
  g.addEdge(2, 3, 7);
  g.addEdge(2, 8, 2);
  g.addEdge(2, 5, 4);
  g.addEdge(3, 4, 9);
  g.addEdge(3, 5, 14);
  g.addEdge(4, 5, 10);
  g.addEdge(5, 6, 2);
  g.addEdge(6, 7, 1);
  g.addEdge(6, 8, 6);
  g.addEdge(7, 8, 7);
  
  
  const src = 0;
  assert(g.pathMoreThanK(src, 62) === false, "Test case 1 failed");
  
  assert(g.pathMoreThanK(src, 60) === true, "Test case 2 failed");
}
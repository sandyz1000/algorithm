/* 
http://www.geeksforgeeks.org/travelling-salesman-problem-set-1/

Travelling Salesman Problem | Set 1 (Naive and Dynamic Programming)

Travelling Salesman Problem (TSP): Given a set of cities and distance between every pair of
cities, the problem is to find the shortest possible route that visits every city exactly once
and returns to the starting point.

Note the difference between Hamiltonian Cycle and TSP. The Hamiltoninan cycle problem is to find
if there exist a tour that visits every city exactly once. Here we know that Hamiltonian Tour
exists (because the graph is complete) and in fact many such tours exist, the problem is to find
a minimum weight Hamiltonian Cycle.

        _1_
      /  |  \
  10 /   4   \  15
    /  /   \  \
   2 -- 35 --  3


--------------------------------
Example:
--------------------------------
Consider the graph shown in figure on right side. A TSP tour in the graph is 1-2-4-3-1. The cost of
the tour is 10+25+30+15 which is 80.

The problem is a famous NP hard problem. There is no polynomial time know solution for this problem.

Following are different solutions for the traveling salesman problem.

Naive Solution:
1) Consider city 1 as the starting and ending point.
2) Generate all (n-1)! Permutations of cities.
3) Calculate cost of every permutation and keep track of minimum cost permutation.
4) Return the permutation with minimum cost.

Time Complexity: ?(n!)

Dynamic Programming:

Let the given set of vertices be {1, 2, 3, 4,...n}. Let us consider 1 as
starting and ending point of output. For every other vertex i (other than 1), we find the minimum
cost path with 1 as the starting point, i as the ending point and all vertices appearing exactly
once. Let the cost of this path be cost(i), the cost of corresponding Cycle would be cost(i) +
dist(i, 1) where dist(i, 1) is the distance from i to 1. Finally, we return the minimum of all [
cost(i) + dist(i, 1)] values. This looks simple so far. Now the question is how to get cost(i)?
To calculate cost(i) using Dynamic Programming, we need to have some recursive relation in terms
of sub-problems. Let us define a term C(S, i) be the cost of the minimum cost path visiting each
vertex in set S exactly once, starting at 1 and ending at i.
We start with all subsets of size 2 and calculate C(S, i) for all subsets where S is the subset,
then we calculate C(S, i) for all subsets S of size 3 and so on. Note that 1 must be present in
every subset.

- - - - - - - - - - - - - - - - - - -
Algorithm:

If size of S is 2, then S must be {1, i},
 C(S, i) = dist(1, i)
Else if size of S is greater than 2.
 C(S, i) = min { C(S-{i}, j) + dis(j, i)} where j belongs to S, j != i and j != 1.

- - - - - - - - - - - - - - - - - - -

For a set of size n, we consider n-2 subsets each of size n-1 such that all subsets don't have nth
in them.
Using the above recurrence relation, we can write dynamic programming based solution. There are
at most O(n*2n) subproblems, and each one takes linear time to solve. The total running time is
therefore O(n2*2n). The time complexity is much less than O(n!), but still exponential. Space
required is also exponential. So this approach is also infeasible even for slightly higher number
of vertices.

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

Travelling Salesman Problem | Set 2 (Approximate using MST)

We introduced Travelling Salesman Problem and discussed Naive and Dynamic Programming Solutions
for the problem in the previous post,. Both of the solutions are infeasible. In fact, there is no
polynomial time solution available for this problem as the problem is a known NP-Hard problem.
There are approximate algorithms to solve the problem though. The approximate algorithms work
only if the problem instance satisfies Triangle-Inequality.
Triangle-Inequality: The least distant path to reach a vertex j from i is always to reach j
directly from i, rather than through some other vertex k (or vertices), i.e., dis(i, j) is always
less than or equal to dis(i, k) + dist(k, j). The Triangle-Inequality holds in many practical
situations.
When the cost function satisfies the triangle inequality, we can design an approximate algorithm
for TSP that returns a tour whose cost is never more than twice the cost of an optimal tour. The
idea is to use Minimum Spanning Tree (MST). Following is the MST based algorithm.

Algorithm:
1)	Let 1 be the starting and ending point for salesman.
2)	Construct MST from with 1 as root using Prim's Algorithm.
3)	List vertices visited in preorder walk of the constructed MST and add 1 at the end.

Let us consider the following example. The first diagram is the given graph. The second diagram
shows MST constructed with 1 as root. The preorder traversal of MST is 1-2-4-3. Adding 1 at the end
gives 1-2-4-3-1 which is the output of this algorithm.

    -REFER-DIAGRAM-HERE
    http://www.geeksforgeeks.org/travelling-salesman-problem-set-2-approximate-using-mst/

In this case, the approximate algorithm produces the optimal tour, but it may not produce optimal
tour in all cases.

How is this algorithm 2-approximate? The cost of the output produced by the above algorithm is
never more than twice the cost of best possible output. Let us see how is this guaranteed by the
above algorithm.
Let us define a term full walk to understand this. A full walk is lists all vertices when they are
first visited in preorder, it also list vertices when they are returned after a subtree is visited
in preorder. The full walk of above tree would be 1-2-1-4-1-3-1.

Following are some important facts that prove the 2-approximateness.
1)  The cost of best possible Travelling Salesman tour is never less than the cost of MST.
    (The definition of MST says, it is a minimum cost tree that connects all vertices).
2)  The total cost of full walk is at most twice the cost of MST (Every edge of MST is visited
    at-most twice)
3)  The output of the above algorithm is less than the cost of full walk. In above algorithm, we
    print preorder walk as output. In prreorder walk, two or more edges of full walk are replaced
    with a single edge. For example, 2-1 and 1-4 are replaced by 1 edge 2-4. So if the graph follows
    triangle inequality, then this is always true.

From the above three statements, we can conclude that the cost of output produced by the
approximate algorithm is never more than twice the cost of best possible solution.

We have discussed a very simple 2-approximate algorithm for the travelling salesman problem.
There are other better approximate algorithms for the problem. For example Christofides algorithm
is 1.5 approximate algorithm. We will soon be discussing these algorithms as separate posts.

 */
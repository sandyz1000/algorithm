// """K Centers Problem | Set 1 (Greedy Approximate Algorithm)

// Given n cities and distances between every pair of cities, select k cities to place warehouses (or
// ATMs or Cloud Server) such that the maximum distance of a city to a warehouse (or ATM or Cloud
// Server) is minimized.

// For example consider the following four cities, 0, 1, 2 and 3 and distances between them, how do
// place 2 ATMs among these 4 cities so that the maximum distance of a city to an ATM is minimized.

//     ---- DIAGRAM GOES HERE ----

// There is no polynomial time solution available for this problem as the problem is a known NP-Hard
// problem. There is a polynomial time Greedy approximate algorithm, the greedy algorithm provides a
// solution which is never worse that twice the optimal solution. The greedy solution works only if
// the distances between cities follow Triangular Inequality (Distance between two points is always
// smaller than sum of distances through a third point).

// The 2-Approximate Greedy Algorithm:
// 1) Choose the first center arbitrarily.

// 2) Choose remaining k-1 centers using the following criteria.
//        Let c1, c2, c3, … ci be the already chosen centers. Choose
//        (i+1)’th center by picking the city which is farthest from already
//        selected centers, i.e, the point p which has following value as maximum
//                  Min[dist(p, c1), dist(p, c2), dist(p, c3), …. dist(p, ci)]

// ---------------------------------
// Algorithm:
// ---------------------------------

// The following diagram taken from here illustrates above algorithm.

// Example (k = 3 in the above shown Graph)
// a)  Let the first arbitrarily picked vertex be 0.
// b)  The next vertex is 1 because 1 is the farthest vertex from 0.
// c)  Remaining cities are 2 and 3. Calculate their distances from already selected centers (0 and 1).
//     The greedy algorithm basically calculates following values.

//         Minimum of all distanced from 2 to already considered centers
//         Min[dist(2, 0), dist(2, 1)] = Min[7, 8] = 7

//         Minimum of all distanced from 3 to already considered centers
//         Min[dist(3, 0), dist(3, 1)] = Min[6, 5] = 5

//         After computing the above values, the city 2 is picked as the value corresponding to 2 is
//         maximum.

// Note that the greedy algorithm doesn’t give best solution for k = 2 as this is just an
// approximate algorithm with bound as twice of optimal.

// ---------------------------------
// Explanation:
// ---------------------------------

// Proof that the above greedy algorithm is 2 approximate.
// Let OPT be the maximum distance of a city from a center in the Optimal solution. We need to show
// that the maximum distance obtained from Greedy algorithm is 2*OPT.

// The proof can be done using contradiction.

// a) Assume that the distance from the furthest point to all centers is > 2·OPT.

// b) This means that distances between all centers are also > 2·OPT.

// c) We have k + 1 points with distances > 2·OPT between every pair.

// d) Each point has a center of the optimal solution with distance <= OPT to it.

// e) There exists a pair of points with the same center X in the optimal solution (pigeonhole
// principle: k optimal centers, k+1 points)

// f) The distance between them is at most 2·OPT (triangle inequality) which is a contradiction."""
/* 
https://www.geeksforgeeks.org/convex-hull-set-1-jarviss-algorithm-or-wrapping/

The idea of Jarvis's Algorithm is simple, we start from the leftmost point (or point with
minimum x coordinate value) and we keep wrapping points in counterclockwise direction.
The big question is, given a point p as current point, how to find the next point in output?
- The idea is to use orientation() here. Next point is selected as the point that beats all other
points at counterclockwise orientation, i.e., next point is q if for any other point r, we have
"orientation(p, r, q) = counterclockwise". Following is the detailed algorithm.

1) Initialize p as leftmost point.
2) Do following while we don't come back to the first (or leftmost) point.
    a) The next point q is the point such that the triplet (p, q, r) is counterclockwise for any
    other point r.
    b) next[p] = q (Store q as next of p in the output convex hull).
    c) p = q (Set p as q for next iteration).

Time Complexity:
For every point on the hull we examine all the other points to determine the
next point. Time complexity is (m * n) where n is number of input points and m is number of
output or hull points (m <= n). In worst case, time complexity is O(n^2). The worst case occurs
when all the points are on the hull (m = n)
 */

export class Point {
  constructor(public x: number, public y: number) {
  }

  toString() {
    return `(${this.x}, ${this.y})`;
  }
}

class JarvisConvexHull {
  points: Point[];
  size: number;

  constructor(points: Point[] = []) {
    this.points = points;
    this.size = points.length;
  }

  orientation(p: Point, q: Point, r: Point) {
    const val = (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);
    if (val === 0) {
      return 0; // co-linear
    }
    return val > 0 ? 1 : 2; // clock or counter clock wise
  }

  findExtremePoint(hull: Point[], p: number, n: number) {
    hull.push(this.points[p]); // Add current point to result
    // Search for a point 'q' such that orientation(p, x, q) is counterclockwise for all
    // points 'x'. The idea is to keep track of the last visited most counterclockwise point
    // in q. If any point 'i' is more counterclockwise than q, then update q.
    let q = (p + 1) % n;
    for (let i = 0; i < n; i++) {
      // If i is more counterclockwise than the current q, then update q
      if (this.orientation(this.points[p], this.points[i], this.points[q]) === 2) {
        q = i;
      }
    }

    // Now q is the most counterclockwise with respect to p. Set p as q for the next iteration,
    // so that q is added to the result 'hull'
    p = q;
    return p;
  }

  convexHull() {
    const points = this.points;
    const n = this.size;
    // There must be at least 3 points
    if (n < 3) {
      return null;
    }

    let hull: Point[] = []; // Initialize Result
    let l = 0; // Find the leftmost point
    for (let i = 1; i < n; i++) {
      if (points[i].x < points[l].x) {
        l = i;
      }
    }

    // Start from the leftmost point, keep moving counterclockwise until reaching the start point
    // again. This loop runs O(h) times where h is the number of points in the result or output.
    let p = this.findExtremePoint(hull, l, n);
    while (p !== l) {
      p = this.findExtremePoint(hull, p, n);
    }

    return hull;
  }
}

if (require.main === module) {
  const points: Point[] = [
    new Point(0, 3),
    new Point(2, 2),
    new Point(1, 1),
    new Point(2, 1),
    new Point(3, 0),
    new Point(0, 0),
    new Point(3, 3),
  ];

  const jch = new JarvisConvexHull(points);
  const results = jch.convexHull();

  if (results && results.length > 0) {
    console.log("The results are:");
    for (const res of results) {
      console.log(res.toString());
    }
  } else {
    console.log("Enter a minimum set of points");
  }
}
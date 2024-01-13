/* """
Given a set of points in the plane. the convex hull of the set is the smallest convex polygon that
contains all the points of it.
Using Graham's scan algorithm, we can find Convex Hull in O(nLogn) time.

Let points[0..n-1] be the input array.

1) Find the bottom-most point by comparing y coordinate of all points. If there are two points
with same y value, then the point with smaller x coordinate value is considered. Let the
bottom-most point be P0. Put P0 at first position in output hull.

2) Consider the remaining n-1 points and sort them by polar angle in counterclockwise order
around points[0]. If polar angle of two points is same, then put the nearest point first.

3 After sorting, check if two or more points have same angle. If two more points have same angle,
then remove all same angle points except the point farthest from P0. Let the size of new array be
m.

4) If m is less than 3, return (Convex Hull not possible)

5) Create an empty stack 'S' and push points[0], points[1] and points[2] to S.

6) Process remaining m-3 points one by one. Do following for every point 'points[i]'
    4.1) Keep removing points from stack while orientation of following 3 points is not
    counterclockwise (or they don't make a left turn).
        a) Point next to top in stack b) Point at the top of stack c) points[i]
    4.2) Push points[i] to S

7) Print contents of S

Phase 1 (Sort points):
We first find the bottom-most point. The idea is to pre-process points be
sorting them with respect to the bottom-most point. Once the points are sorted, they form a
simple closed path. What should be the sorting criteria? computation of actual angles would be
inefficient since trigonometric functions are not simple to evaluate. The idea is to use the
orientation to compare angles without actually computing them (See the compare() function below)

Phase 2 (Accept or Reject Points):
Once we have the closed path, the next step is to traverse the
path and remove concave points on this path. How to decide which point to remove and which to
keep? Again, orientation helps here. The first two points in sorted array are always part of
Convex Hull. For remaining points, we keep track of recent three points, and find the angle
formed by them. Let the three points be prev(p), curr(c) and next(n). If orientation of these
points (considering them in same order) is not counterclockwise, we discard c, otherwise we keep it


Time Complexity:
Let n be the number of input points. The algorithm takes O(nLogn) time if we use a O(nLogn)
sorting algorithm.

The first step (finding the bottom-most point) takes O(n) time.
The second step (sorting points) takes O(nLogn) time.
Third step takes O(n) time. In third step, every element is pushed and popped at most one time.
So the sixth step to process points one by one takes O(n) time, assuming that the stack operations
take O(1) time. Overall complexity is O(n) + O(nLogn) + O(n) + O(n) which is O(nLogn)

""" */

export class Point {
    constructor(public x: number, public y: number) {
    }
}

class GrahamConvexHull {
    p0: Point | null;
    points: Point[];
    size: number;

    constructor(points: Point[] = []) {
        this.p0 = null;
        this.points = points;
        this.size = points.length;
    }

    nextToTop(stack: Point[]) {
        const size = stack.length;
        return stack[size - 2];
    }

    distanceSq(p1: Point, p2: Point) {
        return (p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2;
    }

    orientation(p: Point, q: Point, r: Point) {
        const val = (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);
        if (val === 0) {
            return 0;
        }
        return val > 0 ? 1 : 2;
    }

    compare(vp1: Point, vp2: Point) {
        if (this.p0 === null) {
            return 1;
        }
        const o = this.orientation(this.p0, vp1, vp2);
        if (o === 0) {
            return this.distanceSq(this.p0, vp2) >= this.distanceSq(this.p0, vp1) ? -1 : 1;
        }
        return o === 2 ? -1 : 1;
    }

    convexHull(): Point[] {
        let points = [...this.points];
        const n = this.size;

        // Find the bottom most point
        let ymin = points[0].y;
        let min = 0;

        for (let i = 0; i < n; i++) {
            const y = points[i].y;
            if (y < ymin || (ymin === y && points[i].x < points[min].x)) {
                ymin = points[i].y;
                min = i;
            }
        }

        // Place the bottom-most point at first position
        [points[0], points[min]] = [points[min], points[0]];

        // Sort n-1 points with respect to the first point.
        this.p0 = points[0];
        points = [this.p0, ...points.slice(1).sort((a, b) => this.compare(a, b))];

        // If two or more points make the same angle with p0, remove all but the one that is farthest
        // from p0. In the above sorting, the criteria was to keep the farthest point at the end when more
        // than one point has the same angle.
        let m = 1; // Initialize size of modified array

        for (let i = 1; i < n; i++) {
            while (i < n - 1 && this.orientation(this.p0, points[i], points[i + 1]) === 0) {
                i++;
            }
            points[m] = points[i];
            m++;
        }

        // If the modified array of points has fewer than 3 points, convex hull is not possible
        if (m < 3) {
            return [];
        }

        // Create an empty stack and push the first three points to it
        const stack = [points[0], points[1], points[2]];
        let size = stack.length;

        // Process the remaining n-3 points
        for (let i = 3; i < m; i++) {
            while (stack.length >= 2 && this.orientation(this.nextToTop(stack), stack[stack.length - 1], points[i]) !== 2) {
                stack.pop();
                size--;
            }
            stack.push(points[i]);
        }

        return stack;
    }
}

if (require.main === module) {
    const points: Point[] = [
        new Point(0, 3),
        new Point(1, 1),
        new Point(2, 2),
        new Point(4, 4),
        new Point(0, 0),
        new Point(1, 2),
        new Point(3, 1),
        new Point(3, 3),
    ];
    
    const gch = new GrahamConvexHull(points);
    const results = gch.convexHull();
    let size = results.length;
    
    // Now stack has the output points, print contents of stack
    while (results.length !== 0) {
        const point = results[size - 1];
        console.log(`(${point.x}, ${point.y})`);
        results.pop();
        size--;
    }
}

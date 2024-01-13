/* 
https://www.geeksforgeeks.org/check-if-two-given-line-segments-intersect/

Given two line segments (p1, q1) and (p2, q2), find if the given line segments intersect with
each other. Let us define notion of orientation.
Orientation of an  ordered triplet of points in the plane can be
- counterclockwise
- clockwise
- collinear
 */

export class Point {
    constructor(public x: number, public y: number) {}
}

class LineSegIntersect {
    p1: Point;
    q1: Point;
    p2: Point;
    q2: Point;

    constructor(points: Point[] = []) {
        this.p1 = points[0];
        this.q1 = points[1];
        this.p2 = points[2];
        this.q2 = points[3];
    }

    onSegment(p: Point, q: Point, r: Point): boolean {
        /**
         * Given three co-linear points p, q, r, the function checks if point q lies on line
         * segment 'pr'
         */
        if (Math.max(p.x, r.x) >= q.x && q.x >= Math.min(p.x, r.x) &&
            Math.max(p.y, r.y) >= q.y && q.y >= Math.min(p.y, r.y)) {
            return true;
        }
        return false;
    }

    orientation(p: Point, q: Point, r: Point): number {
        /**
         * To find orientation of ordered triplet (p, q, r). The function returns following values
         * 0 --> p, q and r are collinear
         * 1 --> Clockwise
         * 2 --> Counterclockwise
         */
        // See http://www.geeksforgeeks.org/orientation-3-ordered-points/
        // for details of below formula.
        const val = (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);
        if (val === 0) {
            return 0; // collinear
        }
        return val > 0 ? 1 : 2; // clock or counter clock wise
    }

    doIntersect(): boolean {
        /**
         * The main function that returns True if line segment 'p1q1' and 'p2q2' intersect.
         */
        const { p1, q1, p2, q2 } = this;
        // Find the four orientations needed for general and special cases
        const o1 = this.orientation(p1, q1, p2);
        const o2 = this.orientation(p1, q1, q2);
        const o3 = this.orientation(p2, q2, p1);
        const o4 = this.orientation(p2, q2, q1);

        // General case
        if (o1 !== o2 && o3 !== o4) {
            return true;
        }

        // Special Cases
        // p1, q1 and p2 are collinear and p2 lies on segment p1q1
        if (o1 === 0 && this.onSegment(p1, p2, q1)) {
            return true;
        }

        // p1, q1 and p2 are collinear and q2 lies on segment p1q1
        if (o2 === 0 && this.onSegment(p1, q2, q1)) {
            return true;
        }

        // p2, q2 and p1 are collinear and p1 lies on segment p2q2
        if (o3 === 0 && this.onSegment(p2, p1, q2)) {
            return true;
        }

        // p2, q2 and q1 are collinear and q1 lies on segment p2q2
        if (o4 === 0 && this.onSegment(p2, q1, q2)) {
            return true;
        }

        return false; // Doesn't fall in any of the above cases
    }
}

// Test cases
const lsi1 = new LineSegIntersect([new Point(1, 1), new Point(10, 1), new Point(1, 2), new Point(10, 2)]);
const result1 = lsi1.doIntersect();
console.log(result1 ? "Points Intersect" : "Points do not intersect");
console.log("------------------------");

const lsi2 = new LineSegIntersect([new Point(10, 0), new Point(0, 10), new Point(0, 0), new Point(10, 10)]);
const result2 = lsi2.doIntersect();
console.log(result2 ? "Points Intersect" : "Points do not intersect");
console.log("------------------------");

const lsi3 = new LineSegIntersect([new Point(-5, -5), new Point(0, 0), new Point(1, 1), new Point(10, 10)]);
const result3 = lsi3.doIntersect();
console.log(result3 ? "Points Intersect" : "Points do not intersect");

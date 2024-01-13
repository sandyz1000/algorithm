/* Orientation of an ordered triplet of points in the plane can be
-> counterclockwise
-> clockwise
-> collinear

Algorithm:
Slope of line segment (p1, p2): σ = (y2 - y1)/(x2 - x1)
Slope of line segment (p2, p3): τ = (y3 - y2)/(x3 - x2)

If  σ < τ, the orientation is counterclockwise (left turn)
If  σ = τ, the orientation is collinear
If  σ > τ, the orientation is clockwise (right turn)

Using above values of σ and τ, we can conclude that,
the orientation depends on sign of  below expression:

(y2 - y1)*(x3 - x2) - (y3 - y2)*(x2 - x1)

Above expression is negative when σ < τ, i.e., counterclockwise
Above expression is 0 when σ = τ, i.e., collinear
Above expression is positive when σ > τ, i.e., clockwise


 */

export class Point {
    constructor(public x: number, public y: number) {}
}

function orientation(p1: Point, p2: Point, p3: Point): number {
    /**
     * To find the orientation of the ordered triplet (p1, p2, p3).
     * The function returns the following values
     * 0 --> p, q, and r are collinear
     * 1 --> Clockwise
     * 2 --> Counterclockwise
     */
    const val = (p2.y - p1.y) * (p3.x - p2.x) - (p2.x - p1.x) * (p3.y - p2.y);
    if (val === 0) {
        return 0; // collinear
    }
    return val > 0 ? 1 : 2; // clock or counter clock wise
}

// Test case
const p1 = new Point(0, 0);
const p2 = new Point(4, 4);
const p3 = new Point(1, 2);

const o = orientation(p1, p2, p3);

if (o === 0) {
    console.log("Linear");
} else if (o === 1) {
    console.log("Clockwise");
} else {
    console.log("Counter Clockwise");
}

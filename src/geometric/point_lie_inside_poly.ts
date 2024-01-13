/* 
Given a polygon and a point 'p', find if 'p' lies inside the polygon or not. The points lying on
the border are considered inside

Following is a simple idea to check whether a point is inside or outside:
1) Draw a horizontal line to the right of each point and extend it to infinity
1) Count the number of times the line intersects with polygon edges.
2) A point is inside the polygon if either count of intersections is odd or
   point lies on an edge of polygon.  If none of the conditions is true, then
   point lies outside.

Time Complexity: O(n) where n is the number of vertices in the given polygon. 
*/

export class Point {
  constructor(public x: number, public y: number) { }

  toString(): string {
    return `(${this.x}, ${this.y})`;
  }
}

class PointLieInsidePolygon {
  points: Point[];
  n: number;

  constructor(points: Point[], n: number) {
    this.points = points;
    this.n = n;
  }

  onSegment(p: Point, q: Point, r: Point): boolean {
    /**
     * Given three collinear points p, q, r, the function checks if point q lies on line
     * segment 'pr'
     */
    return q.x >= Math.min(p.x, r.x) && q.x <= Math.max(p.x, r.x) &&
      q.y >= Math.min(p.y, r.y) && q.y <= Math.max(p.y, r.y);
  }

  orientation(p: Point, q: Point, r: Point): number {
    /**
     * To find the orientation of the ordered triplet (p, q, r).
     * The function returns the following values
     * 0 --> p, q, and r are colinear
     * 1 --> Clockwise
     * 2 --> Counterclockwise
     */
    const value = (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);
    if (value === 0) {
      return 0; // colinear
    }
    return value > 0 ? 1 : 2; // clock or counterclock wise
  }

  doIntersect(p1: Point, q1: Point, p2: Point, q2: Point): boolean {
    /**
     * The function that returns true if line segment 'p1q1' and 'p2q2' intersect.
     */
    const o1 = this.orientation(p1, q1, p2);
    const o2 = this.orientation(p1, q1, q2);
    const o3 = this.orientation(p2, q2, p1);
    const o4 = this.orientation(p2, q2, q1);

    // General case
    if (o1 !== o2 && o3 !== o4) {
      return true;
    }

    // Special Cases
    if (o1 === 0 && this.onSegment(p1, p2, q1)) {
      return true;
    }
    if (o2 === 0 && this.onSegment(p1, q2, q1)) {
      return true;
    }
    if (o3 === 0 && this.onSegment(p2, p1, q2)) {
      return true;
    }
    if (o4 === 0 && this.onSegment(p2, q1, q2)) {
      return true;
    }

    return false;
  }

  isInside(point: Point): boolean {
    /**
     * A function to check whether point P(x, y) lies inside the polygon
     * formed by vertices in this.points
     */
    const polygon = this.points;
    const n = this.n;

    // There must be at least 3 vertices in the polygon
    if (n < 3) {
      return false;
    }

    // Create a point for the line segment from point to infinite
    const extreme = new Point(10000, point.y);

    // Count intersections of the above line with sides of the polygon
    let i = 0, count = 0;
    do {
      const nextPoint = (i + 1) % n;

      // Check if the line segment from 'point' to 'extreme' intersects
      // with the line segment from 'polygon[i]' to 'polygon[nextPoint]'
      if (this.doIntersect(polygon[i], polygon[nextPoint], point, extreme)) {
        // If the point 'p' is collinear with line segment 'i-nextPoint',
        // then check if it lies on segment. If it lies, return true, otherwise false
        if (this.orientation(polygon[i], point, polygon[nextPoint]) === 0) {
          return this.onSegment(polygon[i], point, polygon[nextPoint]);
        }
        count++;
      }

      i = nextPoint;

    } while (i !== 0);

    // Return true if count is odd, false otherwise
    return (count & 1) === 1;  // Same as (count % 2 == 1)
  }
}

if (require.main == module) {

  // Test cases
  const polygon1 = [new Point(0, 0), new Point(10, 0), new Point(10, 10), new Point(0, 10)];
  const assertion1 = new PointLieInsidePolygon(polygon1, polygon1.length);

  let point = new Point(20, 20);
  let result = assertion1.isInside(point) ? "Yes" : "No";
  console.log(`${result} for point ${point}`);

  point = new Point(5, 5);
  result = assertion1.isInside(point) ? "Yes" : "No";
  console.log(`${result} for point ${point}`);

  const polygon2 = [new Point(0, 0), new Point(10, 0), new Point(10, 10), new Point(0, 10)];
  const assertion2 = new PointLieInsidePolygon(polygon2, polygon2.length);

  point = new Point(3, 3);
  result = assertion2.isInside(point) ? "Yes" : "No";
  console.log(`${result} for point ${point}`);

  point = new Point(5, 1);
  result = assertion2.isInside(point) ? "Yes" : "No";
  console.log(`${result} for point ${point}`);

  point = new Point(8, 1);
  result = assertion2.isInside(point) ? "Yes" : "No";
  console.log(`${result} for point ${point}`);

  const polygon3 = [new Point(0, 0), new Point(10, 0), new Point(10, 10), new Point(0, 10)];
  const assertion3 = new PointLieInsidePolygon(polygon3, polygon3.length);

  point = new Point(-1, 10);
  result = assertion3.isInside(point) ? "Yes" : "No";
  console.log(`${result} for point ${point}`);

  console.log("-------------------------------");
}

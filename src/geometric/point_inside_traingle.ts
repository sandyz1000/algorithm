/* 
Given three corner points of a triangle, and one more point P. Write a function to check whether
P lies within the triangle or not.

For example, consider the following program, the function should return true for P(10,
15) and false for P'(30, 15)

              B(10,30)
                / \
               /   \
              /     \
             /   P   \      P'
            /         \
     A(0,0) ----------- C(20,0)

 */

class PointInsideTriangle {
  isInside(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, x: number, y: number): boolean {
    /**
     * A function to check whether point P(x, y) lies inside the triangle
     * formed by A(x1, y1), B(x2, y2) and C(x3, y3)
     */
    // Calculate area of triangle ABC
    const A = this.area(x1, y1, x2, y2, x3, y3);
    // Calculate area of triangle PBC
    const A1 = this.area(x, y, x2, y2, x3, y3);
    // Calculate area of triangle PAC
    const A2 = this.area(x1, y1, x, y, x3, y3);
    // Calculate area of triangle PAB
    const A3 = this.area(x1, y1, x2, y2, x, y);

    // Check if the sum of A1, A2, and A3 is the same as A
    return A === A1 + A2 + A3;
  }

  area(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number): number {
    /**
     * A utility function to calculate the area of a triangle formed by (x1, y1),
     * (x2, y2), and (x3, y3)
     */
    return Math.abs((x1 * (y2 - y3) + x2 * (y3 - y1) + x3 * (y1 - y2)) / 2.0);
  }
}

// Test case
const pit = new PointInsideTriangle();
const result = pit.isInside(0, 0, 20, 0, 10, 30, 10, 15);
console.log(result ? "Inside" : "Not inside");

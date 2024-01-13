/* """
https://www.geeksforgeeks.org/closest-pair-of-points-onlogn-implementation/

We are given an array of n points in the plane, and the problem is to find out the closest pair
of points in the array. This problem arises in a number of applications. For example,
in air-traffic control, you may want to monitor planes that come too close together, since this
may indicate a possible collision. Recall the following formula for distance between two points p
and q.

|pq| = math.sqrt((px -qx)**2 + (py - qy)**2)

We have discussed a divide and conquer solution for this problem. The time complexity of the
implementation provided in the previous post is O(n (Logn)^2). In this post, we discuss an
implementation with time complexity as O(nLogn).

Following is a recap of the algorithm discussed in the previous post.
1) We sort all points according to x coordinates.
2) Divide all points in two halves.
3) Recursively find the smallest distances in both sub arrays.
4) Take the minimum of two smallest distances. Let the minimum be d.
5) Create an array strip[] that stores all points which are at most d distance away from the middle
line dividing the two sets.
6) Find the smallest distance in strip[].
7) Return the minimum of d and the smallest distance calculated in above step 6.

The great thing about the above approach is, if the array strip[] is sorted according to y
coordinate, then we can find the smallest distance in strip[] in O(n) time. In the implementation
discussed in previous post, strip[] was explicitly sorted in every recursive call that made the
time complexity O(n (Logn)^2), assuming that the sorting step takes O(nLogn) time.

In this post, we discuss an implementation where the time complexity is O(nLogn). The idea is to
presort all points according to y coordinates. Let the sorted array be Py[]. When we make
recursive calls, we need to divide points of Py[] also according to the vertical line. We can do
that by simply processing every point and comparing its x coordinate with x coordinate of middle
line.

Time Complexity:Let Time complexity of above algorithm be T(n). Let us assume that we use a
O(nLogn) sorting algorithm. The above algorithm divides all points in two sets and recursively
calls for two sets. After dividing, it finds the strip in O(n) time. Also, it takes O(n) time to
divide the Py array around the mid vertical line. Finally finds the closest points in strip in O(n)
time.
So T(n) can expressed as follows
T(n) = 2T(n/2) + O(n) + O(n) + O(n)
T(n) = 2T(n/2) + O(n)
T(n) = T(nLogn)

----------------------------------------------------------------------------  */
export class Point {
    constructor(public x: number, public y: number) {}
}

class ClosestPairs {
    private points: Point[];
    private size: number;

    constructor(points: Point[] = []) {
        this.points = points;
        this.size = points.length;
    }

    closest(): number {
        const points = this.points.slice();
        const n = this.size;

        const px = points.slice();
        const py = points.slice();
        px.sort((a, b) => a.x - b.x);
        py.sort((a, b) => a.y - b.y);

        return this.utils(px, py, n);
    }

    private utils(px: Point[], py: Point[], n: number): number {
        if (n <= 3) {
            return this.bruteForce(px, n);
        }

        const mid = Math.floor(n / 2);
        const midPoint = px[mid];
        const pyl: Point[] = [];
        const pyr: Point[] = [];

        for (let i = 0; i < n; i++) {
            if (py[i].x < midPoint.x) {
                pyl.push(py[i]);
            } else {
                pyr.push(py[i]);
            }
        }

        const dl = this.utils(px.slice(0, mid), pyl, mid);
        const dr = this.utils(px.slice(mid), pyr, n - mid);

        const d = Math.min(dl, dr);

        const strip: Point[] = [];
        for (let i = 0; i < n; i++) {
            if (Math.abs(py[i].x - midPoint.x) < d) {
                strip.push(py[i]);
            }
        }

        return Math.min(d, this.stripClosest(strip, strip.length, d));
    }

    private stripClosest(strip: Point[], size: number, d: number): number {
        let minimum = d;
        for (let i = 0; i < size; i++) {
            let j = i + 1;
            while (j < size && strip[j].y - strip[i].y < minimum) {
                const distance = this.dist(strip[i], strip[j]);
                if (distance < minimum) {
                    minimum = distance;
                }
                j++;
            }
        }
        return minimum;
    }

    private dist(p1: Point, p2: Point): number {
        return Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
    }

    private bruteForce(px: Point[], n: number): number {
        let minimum = Number.MAX_SAFE_INTEGER;
        for (let i = 0; i < n; i++) {
            for (let j = i + 1; j < n; j++) {
                const distance = this.dist(px[i], px[j]);
                if (distance < minimum) {
                    minimum = distance;
                }
            }
        }
        return minimum;
    }
}

const closestPairs = new ClosestPairs([
    new Point(2, 3),
    new Point(12, 30),
    new Point(40, 50),
    new Point(5, 1),
    new Point(12, 10),
    new Point(3, 4),
]);

console.log("The smallest distance is", closestPairs.closest());

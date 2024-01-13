/**
 * 84
 *
 * ======
 *
 * Task.
 *
 * Given n non-negative integers representing the histogram's bar height where
 * the width of each bar is 1, find the area of largest rectangle in the
 * histogram.

Explanation:
The largest area’s height will be the highest bar of the selected bars or the smaller bar that
will cut along other bars that are bigger. We can cut along bigger bars with smaller bar and we can’t
cut along smaller bars with the bigger one. Thus the width would be spanning between smaller bars -
from the smaller bar on the left to the smaller bar on the right from the current bar.

Above is a histogram where width of each bar is 1, given height = [2,1,5,6,2,3].

-- REFER: largest_rectangle.png ---

The largest rectangle is shown in the shaded area, which has area = 10 unit.


Input: [2,1,5,6,2,3]
Output: 10
 * ======
 *
 * Source: Leetcode
 */

export class Item {
    constructor(public value: number, public index: number) {}
}

class MQ {
    private queue: Item[] = [];
    private nearest: number[] = [];
    private defaultNearest: number;

    constructor(defaultNearest: number, n: number) {
        this.defaultNearest = defaultNearest;
    }

    push(newItem: Item): void {
        while (this.queue.length > 0 && newItem.value <= this.queue[this.queue.length - 1].value) {
            this.queue.pop();
        }

        if (this.queue.length === 0) {
            this.nearest[newItem.index] = this.defaultNearest;
        } else {
            this.nearest[newItem.index] = this.queue[this.queue.length - 1].index;
        }

        this.queue.push(newItem);
    }

    getNearest(): number[] {
        return this.nearest;
    }

    getMaxArea(): number {
        return this.queue.reduce((maxArea, currentItem, currentIndex) => {
            const upperBoundary = currentItem;
            const leftBoundaryIndex = currentIndex > 0 ? this.queue[currentIndex - 1].index : -1;
            const width = currentItem.index - leftBoundaryIndex - 1;
            const currentArea = width * upperBoundary.value;
            return Math.max(maxArea, currentArea);
        }, 0);
    }
}

function largestRectangleArea(heights: number[]): number {
    const n = heights.length;

    // Using two MQ instances
    const leftRight = new MQ(-1, n);
    const rightLeft = new MQ(n, n);

    for (let i = 0; i < n; i++) {
        leftRight.push(new Item(heights[i], i));
    }

    for (let i = n - 1; i >= 0; i--) {
        rightLeft.push(new Item(heights[i], i));
    }

    let maxArea = 0;
    const rightToLeftNearest = rightLeft.getNearest();
    const leftToRightNearest = leftRight.getNearest();

    for (let i = 0; i < n; i++) {
        const width = rightToLeftNearest[i] - leftToRightNearest[i] - 1;
        const currentArea = width * heights[i];
        maxArea = Math.max(maxArea, currentArea);
    }

    return maxArea;
}


if (require.main === module) {
    // Example usage
    const heights: number[] = [2, 1, 5, 6, 2, 3];
    console.log("Largest rectangle area:", largestRectangleArea(heights));
}

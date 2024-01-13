/*
Largest Rectangular Area in a Histogram | Set 1
Find the largest rectangular area possible in a given histogram where the largest rectangle can be made of a number of contiguous bars. 
For simplicity, assume that all bars have same width and the width is 1 unit.
For example, consider the following histogram with 7 bars of heights {6, 2, 5, 4, 5, 2, 6}. The largest possible rectangle possible is 12 
(see the below figure, the max area rectangle is highlighted in red)

# A Divide and Conquer Program to find maximum rectangular area in a histogram

*/

export class SegmentTree {
    private st: number[];

    constructor(size: number) {
        const x = Math.ceil(Math.log2(size));
        const maxSize = 2 * Math.pow(2, x) - 1;
        this.st = new Array(maxSize).fill(0);
    }

    private maxValue(x: number, y: number, z: number): number {
        return Math.max(Math.max(x, y), z);
    }

    private minVal(hist: number[], i: number, j: number): number {
        if (i === -1) {
            return j;
        }
        if (j === -1) {
            return i;
        }
        return hist[i] < hist[j] ? i : j;
    }

    private getMid(s: number, e: number): number {
        return s + Math.floor((e - s) / 2);
    }

    private rmqUtil(hist: number[], ss: number, se: number, qs: number, qe: number, index: number): number {
        if (qs <= ss && qe >= se) {
            return this.st[index];
        }

        if (se < qs || ss > qe) {
            return -1;
        }

        const mid = this.getMid(ss, se);
        return this.minVal(
            hist,
            this.rmqUtil(hist, ss, mid, qs, qe, 2 * index + 1),
            this.rmqUtil(hist, mid + 1, se, qs, qe, 2 * index + 2)
        );
    }

    public RMQ(hist: number[], n: number, qs: number, qe: number): number {
        if (qs < 0 || qe > n - 1 || qs > qe) {
            console.log("Invalid Input");
            return -1;
        }

        return this.rmqUtil(hist, 0, n - 1, qs, qe, 0);
    }

    private constructSTUtil(hist: number[], ss: number, se: number, si: number): number {
        if (ss === se) {
            this.st[si] = ss;
            return this.st[si];
        }

        const mid = this.getMid(ss, se);
        this.st[si] = this.minVal(
            hist,
            this.constructSTUtil(hist, ss, mid, si * 2 + 1),
            this.constructSTUtil(hist, mid + 1, se, si * 2 + 2)
        );
        return this.st[si];
    }

    public constructST(hist: number[], n: number): void {
        this.constructSTUtil(hist, 0, n - 1, 0);
    }

    public getMaxAreaRec(hist: number[], n: number, l: number, r: number): number {
        if (l > r) {
            return Number.MIN_SAFE_INTEGER;
        }
        if (l === r) {
            return hist[l];
        }

        const m = this.RMQ(hist, n, l, r);
        return this.maxValue(
            this.getMaxAreaRec(hist, n, l, m - 1),
            this.getMaxAreaRec(hist, n, m + 1, r),
            (r - l + 1) * hist[m]
        );
    }

    public getMaxArea(hist: number[], n: number): number {
        this.constructST(hist, n);
        return this.getMaxAreaRec(hist, n, 0, n - 1);
    }
}

if (require.main === module) {
    const hist = [6, 1, 5, 4, 5, 2, 6];
    const n = hist.length;
    const st = new SegmentTree(n);
    console.log("Maximum area is ", st.getMaxArea(hist, n));
}

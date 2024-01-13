
/* * 
## 739
 *
 * ======
 *
 * Task.
 *
 * Given a list of daily temperatures T, return a list such that, for each day
 * in the input, tells you how many days you would have to wait until a warmer
 * temperature. If there is no future day for which this is possible, put 0
 * instead.
 *
 * For example, given the list of temperatures T = [73, 74, 75, 71, 69, 72, 76, 73], 
 * your output should be [1, 1, 4, 2, 1, 1, 0, 0].
 * ======
 *
 * Source: Leetcode
 

 */


export class Item {
    constructor(public value: number, public index: number) { }
}

export class DMQ {
    private q: Item[] = [];
    private nearestValues: number[] = [];
    private defaultValue: number;

    constructor(size: number, defaultValue: number) {
        this.defaultValue = defaultValue;
    }

    push(currentItem: Item): void {
        while (this.q.length > 0 && currentItem.value >= this.q[this.q.length - 1].value) {
            this.q.pop();
        }

        this.setNearestValue(currentItem.index);
        this.q.push(currentItem);
    }

    setNearestValue(currentItemIndex: number): void {
        this.nearestValues[currentItemIndex] = this.defaultValue;
        if (this.q.length > 0) {
            this.nearestValues[currentItemIndex] = this.q[this.q.length - 1].index - currentItemIndex;
        }
    }

    getNearestValues(): number[] {
        return this.nearestValues;
    }
}

function dailyTemperatures1(T: number[]): number[] {
    const size = T.length;
    const q = new DMQ(size, 0);

    for (let i = size - 1; i >= 0; i--) {
        q.push(new Item(T[i], i));
    }

    return q.getNearestValues();
}

function dailyTemperatures2(T: number[]): number[] {
    const n = T.length;
    const nearest: number[] = Array(n).fill(0);
    const result: number[] = Array(n).fill(0);

    for (let i = n - 1; i >= 0; i--) {
        let j = i + 1;
        while (j < n && T[j] <= T[i]) {
            j = nearest[j];
        }
        nearest[i] = j;
        result[i] = nearest[i] === n ? 0 : nearest[i] - i;
    }

    return result;
}

function dailyTemperatures(temperatures: number[]): number[] {
    const st: number[] = [];
    const L = temperatures.length;
    const result: number[] = new Array(L).fill(0);

    for (let i = L - 1; i >= 0; i--) {
        while (st.length > 0 && temperatures[st[st.length - 1]] <= temperatures[i]) {
            st.pop();
        }
        if (st.length > 0) {
            result[i] = st[st.length - 1] - i;
        }
        st.push(i);
    }

    return result;
}

if (require.main === module) {
    // Example usage
    const T: number[] = [73, 74, 75, 71, 69, 72, 76, 73];
    console.log("Daily temperature method-1: ", dailyTemperatures1(T));
    console.log("Daily temperature method-2: ", dailyTemperatures2(T));
    console.log("Daily temperature method-3: ", dailyTemperatures(T));
}
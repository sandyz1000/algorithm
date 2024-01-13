/* 
Ugly numbers are numbers whose only prime factors are 2, 3 or 5. The sequence 1, 2, 3, 4, 5,
6, 8, 9, 10, 12, 15, ... shows the first 11 ugly numbers. By convention, 1 is included.

Given a number n, the task is to find n'th Ugly number.
Input  : n = 7
Output : 8

Input  : n = 10
Output : 12

Input  : n = 15
Output : 24

Input  : n = 150
Output : 5832

Algorithm:

To check if a number is ugly, divide the number by greatest divisible powers of 2, 3 and 5,
if the number becomes 1 then it is an ugly number otherwise not.

For example, let us see how to check for 300 is ugly or not. Greatest divisible power of 2 is 4,
after dividing 300 by 4 we get 75. Greatest divisible power of 3 is 3, after dividing 75 by 3 we
get 25. Greatest divisible power of 5 is 25, after dividing 25 by 25 we get 1.
Since we get 1 finally, 300 is ugly number.

""" 
*/


class FindUglyNo {
    maxDivide(a: number, b: number): number {
        while (a % b === 0) {
            a = a / b;
        }
        return a;
    }

    isUgly(no: number): number {
        no = this.maxDivide(no, 2);
        no = this.maxDivide(no, 3);
        no = this.maxDivide(no, 5);

        return no === 1 ? 1 : 0;
    }

    getNthUglyNo(n: number): number {
        let i = 1;
        let count = 1; // ugly number count
        // Check for all integers until ugly count becomes n
        while (n > count) {
            i += 1;
            if (this.isUgly(i)) {
                count += 1;
            }
        }

        return i;
    }
}

function getNthUglyNoDP(n: number): number {
    /**
     * Time Complexity: O(n)
     * Auxiliary Space: O(n)
     */
    const ugly: number[] = Array(n).fill(0); // To store ugly numbers

    // 1 is the first ugly number
    ugly[0] = 1;

    // i2, i3, i5 will indicate indices for 2,3,5 respectively
    let i2 = 0,
        i3 = 0,
        i5 = 0;

    // set initial multiple value
    let nextMultipleOf2 = 2;
    let nextMultipleOf3 = 3;
    let nextMultipleOf5 = 5;

    // start loop to find value from ugly[1] to ugly[n]
    for (let l = 1; l < n; l++) {
        // choose the min value of all available multiples
        ugly[l] = Math.min(nextMultipleOf2, nextMultipleOf3, nextMultipleOf5);
        // increment the value of index accordingly
        if (ugly[l] === nextMultipleOf2) {
            i2 += 1;
            nextMultipleOf2 = ugly[i2] * 2;
        }

        if (ugly[l] === nextMultipleOf3) {
            i3 += 1;
            nextMultipleOf3 = ugly[i3] * 3;
        }

        if (ugly[l] === nextMultipleOf5) {
            i5 += 1;
            nextMultipleOf5 = ugly[i5] * 5;
        }
    }

    // return ugly[n] value
    return ugly[n - 1];
}

// Test case
console.log("150th ugly no. is", new FindUglyNo().getNthUglyNo(150));
console.log("150th ugly no. is", getNthUglyNoDP(150));

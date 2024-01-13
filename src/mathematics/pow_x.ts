/* """
Efficient program to calculate e^x
The value of Exponential Function e^x can be expressed using following Taylor Series.
- - - - - - - - - - - - - - - - - - - - - -
e^x = 1 + x/1! + x^2/2! + x^3/3! + ......
- - - - - - - - - - - - - - - - - - - - - -

How to efficiently calculate the sum of above series?
The series can be re-written as
- - - - - - - - - - - - - - - - - - - - - - - - - -
e^x = 1 + (x/1) (1 + (x/2) (1 + (x/3) (........) ) )
- - - - - - - - - - - - - - - - - - - - - - - - - -

Let the sum needs to be calculated for n terms, we can calculate sum using following loop.
- - - - - - - - - - - - - - - - - - - - - - - - - -
for (i = n - 1, sum = 1; i > 0; --i )
    sum = 1 + x * sum / i;
- - - - - - - - - - - - - - - - - - - - - - - - - -

"""
 */
function power(a: number, b: number): number {
    if (b === 0) {
        return 1;
    }
    let answer: number = a;
    let increment: number = a;

    for (let i = 1; i < b; i++) {
        for (let j = 0; j < a; j++) {
            answer += increment;
        }
        increment = answer;
    }
    return answer;
}

class Power {
    power(a: number, b: number): number {
        if (b) {
            return this.multiply(a, this.power(a, b - 1));
        } else {
            return 1;
        }
    }

    multiply(x: number, y: number): number {
        if (y) {
            return x + this.multiply(x, y - 1);
        } else {
            return 0;
        }
    }
}

if (require.main === module) {

    // Test
    const method2 = new Power();
    console.log("\nMethod-1", power(5, 3));
    console.log("\nMethod-2", method2.power(5, 3));
}

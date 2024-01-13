/* 
Returns approximate value of e^x using sum of first n terms of Taylor Series
e^x = 1 + (x/1) (1 + (x/2) (1 + (x/3) (1 + (x/4) (1 + ......))))

 */

function exponential(n: number, x: number): number {
    let result = 1.0;
    for (let i = n - 1; i > 0; i--) {
        result = 1 + (x / i) * result;
    }
    return result;
}

if (require.main === module) {
    const n = 10;
    const x = 1.0;
    console.log(`e^x = ${exponential(n, x)}`);
}

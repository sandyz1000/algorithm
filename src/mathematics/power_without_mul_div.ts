/* 
Write you own Power without using multiplication(*) and division(/) operators  


## Method 1 (Using Nested Loops)
We can calculate power by using repeated addition.

For example to calculate 5^6.
1) First 5 times add 5, we get 25. (5^2)
2) Then 5 times add 25, we get 125. (5^3)
3) Then 5 time add 125, we get 625 (5^4)
4) Then 5 times add 625, we get 3125 (5^5)
5) Then 5 times add 3125, we get 15625 (5^6)

Works only if a >= 0 and b >= 0

## Method 2 (Using Recursion)
Recursively add a to get the multiplication of two numbers. And recursively multiply to
get a raise to the power b.

A recursive function to get a^b Works only if a >= 0 and b >= 0

*/

class SelectRandom {
    count: number = 0;
    res: number = 0;

    selectRandom = (x: number): number => {
        this.count += 1;

        // If this is the first element from stream, return it
        if (this.count === 1) {
            this.res = x;
        } else {
            const i = Math.floor(Math.random() * this.count);
            // Replace the previous random number with a new number with 1/count probability
            if (i === this.count - 1) {
                this.res = x;
            }
        }

        return this.res;
    }
}

if (require.main === module) {

    // Driver program
    const stream: number[] = [1, 2, 3, 4];
    const n: number = stream.length;
    let res = 0;
    let count = 0;
    
    let s = new SelectRandom();
    for (let i = 0; i < n; i++) {
        console.log(`Random number from the first ${i + 1} numbers is ${s.selectRandom(stream[i])}`, count, res);
    }
}

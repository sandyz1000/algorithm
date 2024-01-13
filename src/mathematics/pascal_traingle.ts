/*
Pascal's Triangle
Pascal's triangle is a triangular array of the binomial coefficients. Write a function that takes
an integer value n as input and prints first n lines of the Pascal's triangle.

Following are the first 6 rows of Pascal's Triangle.

1
1 1
1 2 1
1 3 3 1
1 4 6 4 1
1 5 10 10 5 1

## Method 2( O(n^2) time and O(n^2) extra space )
If we take a closer at the triangle, we observe that every entry is sum of the two values
above it. So we can create a 2D array that stores previously generated values. To generate a
value in a line, we can use the previously stored values from array.

## Method 3 ( O(n^2) time and O(1) extra space )
This method is based on method 1. We know that ith entry in a line number line is Binomial
Coefficient C(line, i) and all lines start with value 1. The idea is to calculate C(line, i)
using C(line, i-1). It can be calculated in O(1) time using the following.

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
C(line, i)   = line! / ( (line-i)! * i! )
C(line, i-1) = line! / ( (line - i + 1)! * (i-1)! )
We can derive following expression from above two expressions.
C(line, i) = C(line, i-1) * (line - i + 1) / i

So C(line, i) can be calculated from C(line, i-1) in O(1) time
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

A O(n^2) time and O(1) extra space function for Pascal's Triangle
 */



function printPascal2(n: number): void {
    // An auxiliary array to store generated Pascal triangle values
    const arr: number[][] = new Array(n).fill([]).map(() => new Array(n).fill(0));

    // Iterate through every line and print integer(s) in it
    for (let line = 0; line < n; line++) {
        // Every line has a number of integers equal to the line number
        for (let i = 0; i <= line; i++) {
            // First and last values in every row are 1
            if (line === i || i === 0) {
                arr[line][i] = 1;
            } else {
                // Other values are the sum of values just above and left of above
                arr[line][i] = arr[line - 1][i - 1] + arr[line - 1][i];
            }
            process.stdout.write(`${arr[line][i]} `);
        }
        console.log("");
    }
}

function printPascal3(n: number): void {
    for (let line = 1; line <= n; line++) {
        let C: number = 1; // used to represent C(line, i)
        for (let i = 1; i <= line; i++) {
            process.stdout.write(`${C} `); // The first value in a line is always 1
            C = (C * (line - i)) / i;
        }
        console.log("");
    }
}

if (require.main === module) {
    const n: number = 7;
    console.log("\nMethod-1: -- ");
    printPascal2(n);

    console.log("\nMethod-2: -- ");
    printPascal3(n);
}

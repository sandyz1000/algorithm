/* Program for Fibonacci numbers
http://www.geeksforgeeks.org/program-for-nth-fibonacci-number/

The Fibonacci numbers are the numbers in the following integer sequence.

0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, ...

In mathematical terms, the sequence Fn of Fibonacci numbers is defined by the recurrence relation
- - - - - - - - - - - - - - - - - - - -
Fn = Fn-1 + Fn-2

with seed values

F0 = 0 and F1 = 1.
- - - - - - - - - - - - - - - - - - - -

Write a function int fib(int n) that returns Fn. For example, if n = 0, then fib() should return
0. If n = 1, then it should return 1. For n > 1, it should return Fn-1 + Fn-2

For n = 9
Output:34

Following are different methods to get the nth Fibonacci number.

Method 1 ( Use recursion )
---------------------------------------
A simple method that is a direct recursive implementation mathematical recurrence relation given
above.

Time Complexity: T(n) = T(n-1) + T(n-2) which is exponential.
We can observe that this implementation does a lot of repeated work (see the following
recursion tree). So this is a bad implementation for nth Fibonacci number.

                         fib(5)
                     /
               fib(4)                fib(3)
             /                      /
         fib(3)      fib(2)         fib(2)    fib(1)
        /             /           /
  fib(2)   fib(1)  fib(1) fib(0) fib(1) fib(0)
  /
fib(1) fib(0)

Extra Space: O(n) if we consider the function call stack size, otherwise O(1).

Method 2 ( Use Dynamic Programming )
---------------------------------------
We can avoid the repeated work done is the method 1 by storing the Fibonacci numbers calculated
so far.

Time Complexity: O(n)
Extra Space: O(n)

Method 3 ( Space Optimized Method 2 )
---------------------------------------
We can optimize the space used in method 2 by storing the previous two numbers only because that
is all we need to get the next Fibonacci number in series.

Time Complexity: O(n)
Extra Space: O(1)

 */

function fib(n: number, lookup: number[]): number {
  if (n === 0 || n === 1) {
    lookup[n] = n;
  }

  if (lookup[n] === null || lookup[n] === undefined) {
    lookup[n] = fib(n - 1, lookup) + fib(n - 2, lookup);
  }

  return lookup[n];
}

const fibArray: number[] = [0, 1];

function fibonacciM2(n: number): number {
  if (n < 0) {
    console.log("Incorrect input");
  } else if (n <= fibArray.length) {
    return fibArray[n - 1];
  } else {
    const tempFib: number = fibonacciM2(n - 1) + fibonacciM2(n - 2);
    fibArray.push(tempFib);
    return tempFib;
  }

  return -1;
}

function fibonacciM3(n: number): number {
  let a: number = 0;
  let b: number = 1;

  if (n < 0) {
    console.log("Incorrect input");
  } else if (n === 0) {
    return a;
  } else if (n === 1) {
    return b;
  } else {
    for (let i = 2; i < n; i++) {
      const c: number = a + b;
      a = b;
      b = c;
    }
    return b;
  }
  return -1;
}

if (require.main === module) {
  // Test case
  const n: number = 34;
  // Declaration of lookup table
  // Handles till n = 100
  const lookup: number[] = Array(101).fill(0);
  console.log("Fibonacci Number is", fib(n, lookup));

  console.log(fibonacciM2(9));

  console.log(fibonacciM3(9));
}
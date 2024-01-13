/* 
Check divisibility by 7
Given a number, check if it is divisible by 7. You are not allowed to use modulo operator,
floating point arithmetic is also not allowed.

A simple method is repeated subtraction. Following is another interesting method.

Divisibility by 7 can be checked by a recursive method. A number of the form 10a + b is divisible
by 7 if and only if a - 2b is divisible by 7. In other words, subtract twice the last digit from
the number formed by the remaining digits. Continue to do this until a small number.

Example: the number 371: 37 - (2×1) = 37 - 2 = 35; 3 - (2 × 5) = 3 - 10 = -7; thus, since -7 is
divisible by 7, 371 is divisible by 7. 

# Function to check whether a number is divisible by 7
 */

function isDivisibleBy7(num: number): boolean {
    // If number is negative, make it positive
    if (num < 0) {
        return isDivisibleBy7(-num);
    }

    // Base cases
    if (num === 0 || num === 7) {
        return true;
    }

    if (num < 10) {
        return false;
    }

    // Recur for (num / 10 - 2 * (num % 10))
    return isDivisibleBy7(Math.floor(num / 10) - 2 * (num - Math.floor(num / 10) * 10));
}

if (require.main === module) {
    const num = 616;
    console.log(isDivisibleBy7(num) ? "Divisible" : "Not Divisible");
}


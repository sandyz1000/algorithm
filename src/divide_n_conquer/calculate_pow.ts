/* 
Write a program to calculate pow(x,n)

Given two integers x and n, write a function to compute xn. We may assume that x and n
are small and overflow doesn't happen.

Input : x = 2, n = 3
Output : 8
Input : x = 7, n = 2
Output : 49
*/

// Function to calculate x raised to the power y
// Time Complexity: O(n)
// Space Complexity: O(1)
// Algorithmic Paradigm: Divide and conquer.
// Above function can be optimized to O(logn) by calculating power(x, y/2) only
// once and storing it.
function power_ver_1(x: number, y: number): number {
    if (y === 0) {
        return 1;
    } else if (y % 2 === 0) {
        return power_ver_1(x, y / 2) * power_ver_1(x, y / 2);
    } else {
        return x * power_ver_1(x, y / 2) * power_ver_1(x, y / 2);
    }
}

// # Time Complexity of optimized solution: O(logn)
// # Let us extend the pow function to work for negative y and float x.
function power_ver_2(x: number, y: number): number {
    if (y === 0) {
        return 1;
    }

    const temp = power_ver_2(x, Math.floor(y / 2));
    if (y % 2 === 0) {
        return temp * temp;
    } else {
        return x * temp * temp;
    }
}
// Extended version of power function that can work for float x and negative y
function power_ver_3(x: number, y: number): number {
    if (y === 0) {
        return 1;
    }

    const temp = power_ver_3(x, Math.floor(y / 2));
    if (y % 2 === 0) {
        return temp * temp;
    } else {
        return x * temp * temp;
    }
}

console.log("Power version 1");
let x = 2;
let y = 3;
console.log(power_ver_1(x, y));

console.log("Power version 2");
x = 2;
y = 3;
console.log(power_ver_2(x, y));

console.log("Power version 3");
x = 2;
y = 3;
console.log(power_ver_3(x, y));
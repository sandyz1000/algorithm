/* 

Efficient way to multiply with 7
We can multiply a number by 7 using bitwise operator. First left shift the number by 3 bits
(you will get 8n) then subtract the original numberfrom the shifted number and return the
difference (8n – n).

 */


function multiplyBySeven(n: number): number {
    // Note the inner bracket here. This is needed because precedence of '-' operator is higher than '<<'
    return (n << 3) - n;
}

if (require.main === module) {
    const n: number = 4;
    console.log(multiplyBySeven(n));
}

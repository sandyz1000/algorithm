/* 
Write a program to add two numbers in base 14

Below are the different ways to add base 14 numbers.
Method 1
  1. Convert both i/p base 14 numbers to base 10.
  2. Add numbers.
  3. Convert the result back to base 14.

Method 2

Just add the numbers in base 14 in same way we add in base 10. Add numerals of both numbers one by
one from right to left. If there is a carry while adding two numerals, consider the carry for
adding next numerals.

Let us consider the presentation of base 14 numbers same as hexadecimal numbers

   A --> 10
   B --> 11
   C --> 12
   D --> 13

Example:
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
num1 =       1  2  A
num2 =       C  D  3

1. Add A and 3, we get 13(D). Since 13 is smaller than 14, carry becomes 0 and resultant
numeral becomes D
2. Add 2, D and carry(0). we get 15. Since 15 is greater than 13, carry becomes 1 and
resultant numeral is 15 - 14 = 1
3. Add 1, C and carry(1). we get 14. Since 14 is greater than 13, carry becomes 1 and resultant
numeral is 14 - 14 = 0

Finally, there is a carry, so 1 is added as leftmost numeral and the result becomes 101D
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -


*/

export class Add2Number {
  sumBase14(num1: string, num2: string): string[] {
      const l1: number = num1.length;
      const l2: number = num2.length;
      const res: (string | null)[] = new Array(l1 + 1);
      let carry: number = 0;

      if (l1 !== l2) {
          console.log("Function doesn't support numbers of different lengths. If you want to " +
              "add such numbers, then prefix the smaller number with the required number of zeroes");
          throw new Error("Invalid input: Numbers of different lengths");
      }

      for (let i = l1 - 1; i >= 0; i--) {
          const nml1: number = this.getNumeralValue(num1[i]);
          const nml2: number = this.getNumeralValue(num2[i]);
          const resNml: number = carry + nml1 + nml2;

          if (resNml >= 14) {
              carry = 1;
          } else {
              carry = 0;
          }

          res[i + 1] = this.getNumeral(resNml);
      }

      if (carry === 0) {
          return res.slice(1) as string[];
      }

      res[0] = '1';
      return res as string[];
  }

  private getNumeralValue(num: string): number {
      if ('0' <= num && num <= '9') {
          return num.charCodeAt(0) - '0'.charCodeAt(0);
      }

      if ('A' <= num && num <= 'D') {
          return num.charCodeAt(0) - 'A'.charCodeAt(0) + 10;
      }

      throw new Error("Invalid numeral: " + num);
  }

  private getNumeral(val: number): string {
      if (0 <= val && val <= 9) {
          return String.fromCharCode(val + '0'.charCodeAt(0));
      }

      if (10 <= val && val <= 14) {
          return String.fromCharCode(val + 'A'.charCodeAt(0) - 10);
      }

      throw new Error("Invalid value: " + val);
  }
}

if (require.main === module) {
  const test = new Add2Number();
  const num1 = "DC2";
  const num2 = "0A3";
  console.log("Result is " + test.sumBase14(num1, num2).join(""));
}

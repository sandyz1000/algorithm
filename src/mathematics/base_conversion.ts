/* """
Convert from any base to decimal and vice versa

Given a number and its base, convert it to decimal. The base of number can be anything such that
all digits can be represented using 0 to 9 and A to Z. Value of A is 10, value of B is 11 and so
on. Write a function to convert the number to decimal.

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Input number is given as string and output is an integer.

Input: str = "1100", base = 2
Output: 12

Input: str = "11A", base = 16
Output: 282

Input: str = "123",  base = 8
Output: 83
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

We can always use below formula to convert from any base to decimal.
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
"str" is input number as string
"base" is base of input number.

Decimal Equivalent is,
  1*str[len-1] + base*str[len-2] + (base)2*str[len-2] + ...
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

 */

// To return value of a char. For example, 2 is returned for '2'.  10 is
// returned for 'A', 11 for 'B'


export class BaseConversion {
  reValue(num: number): string {
    return num >= 0 && num <= 9 ? String.fromCharCode(num + '0'.charCodeAt(0)) : String.fromCharCode(num - 10 + 'A'.charCodeAt(0));
  }

  strev(mString: string[], index: number): void {
    let length = index;
    let i = 0;
    while (i < length / 2) {
      [mString[i], mString[length - i - 1]] = [mString[length - i - 1], mString[i]];
      i++;
    }
  }

  fromDecimal(base: number, inputNum: number): string {
    const res: string[] = new Array(100);
    let index = 0;

    while (inputNum > 0) {
      res[index] = this.reValue(inputNum % base);
      index++;
      inputNum = Math.floor(inputNum / base);
    }

    res[index] = '\0';
    this.strev(res, index);

    return res.slice(0, index).join('');
  }

  value(c: string): number {
    return c.charCodeAt(0) - '0'.charCodeAt(0) >= 0 && c.charCodeAt(0) - '0'.charCodeAt(0) <= 9
      ? c.charCodeAt(0) - '0'.charCodeAt(0)
      : c.charCodeAt(0) - 'A'.charCodeAt(0) + 10;
  }

  toDecimal(mStr: string, base: number): number {
    const length = mStr.length;
    let power = 1;
    let num = 0;

    for (let i = length - 1; i >= 0; i--) {
      if (this.value(mStr[i]) >= base) {
        console.log("Invalid Number");
        return -1;
      }

      num += this.value(mStr[i]) * power;
      power *= base;
    }

    return num;
  }
}

if (require.main === module) {
  const test = new BaseConversion();
  const mStr = "11A";
  const base = 16;
  console.log(`Decimal equivalent of ${mStr} in base ${base} is ${test.toDecimal(mStr, base)}`);

  const inputNum = 282;
  const res: string[] = new Array(100);
  const output = test.fromDecimal(16, inputNum);
  console.log(`Equivalent of ${inputNum} in base 16 is ${output}`);

}
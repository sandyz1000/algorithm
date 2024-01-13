export class Stack<T> {
  private items: T[];

  constructor() {
    this.items = [];
  }

  push(element: T): void {
    this.items.push(element);
  }

  pop(): T | undefined {
    return this.items.pop();
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }
}

export class DecimalToBinary {
  private stack: Stack<number>;
  private digit: string;

  constructor() {
    this.stack = new Stack<number>();
    this.digit = "0123456789ABCDEF";
  }

  decimalToBinary(decNumber: number, base: number): string {
    let outputStr = "";
    while (decNumber > 0) {
      const remainder = decNumber % base;
      this.stack.push(remainder);
      decNumber = Math.floor(decNumber / base);
    }

    while (!this.stack.isEmpty()) {
      outputStr += this.digit[this.stack.pop()!];
    }

    return outputStr;
  }
}

function decimalBinaryRec(number: number, base: number): number {
  if (number === 0) {
    return 0;
  }
  return (number % base) + 10 * decimalBinaryRec(Math.floor(number / base), base);
}

if (require.main === module) {

  // Example usage:
  const decimalToBinary = new DecimalToBinary();
  console.log(decimalToBinary.decimalToBinary(233, 2));  // Output: 11101001
  console.log(decimalBinaryRec(233, 2));  // Output: 1001001001001

}
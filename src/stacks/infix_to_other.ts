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
  
    peek(): T | undefined {
      return this.items[this.items.length - 1];
    }
  
    isEmpty(): boolean {
      return this.items.length === 0;
    }
  }
  
  export class InfixToPostfix {
    private prec: { [key: string]: number } = { "*": 3, "/": 3, "+": 2, "-": 2, "(": 1 };
    private validToken: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    private stack: Stack<string>;
  
    constructor() {
      this.stack = new Stack<string>();
    }
  
    evaluate(inputString: string): string {
      const postfixList: string[] = [];
      const inputTokens: string[] = inputString.split(" ");
  
      for (const token of inputTokens) {
        if (token.match(/[A-Z0-9]/i)) {
          postfixList.push(token);
        } else if (this.prec.hasOwnProperty(token)) {
          if (token === "(") {
            this.stack.push(token);
          } else if (token === ")") {
            let topToken = this.stack.pop();
            while (topToken !== "(") {
              postfixList.push(topToken!);
              topToken = this.stack.pop();
            }
          } else {
            while (!this.stack.isEmpty() && this.prec[this.stack.peek()!] > this.prec[token]) {
              postfixList.push(this.stack.pop()!);
            }
            this.stack.push(token);
          }
        }
      }
  
      while (!this.stack.isEmpty()) {
        postfixList.push(this.stack.pop()!);
      }
  
      return postfixList.join(" ");
    }
  }
  
  // Example usage:
  const infixToPostfix = new InfixToPostfix();
  console.log(infixToPostfix.evaluate("A * B + C * D"));  // Output: A B * C D * +
  console.log(infixToPostfix.evaluate("( A + B ) * C - ( D - E ) * ( F + G )"));
  
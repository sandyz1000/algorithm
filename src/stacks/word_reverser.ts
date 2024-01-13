
/* Stack | Set 3 (Reverse a string using stack)

Given a string, reverse it using stack. For example "GeeksQuiz" should be converted to "ziuQskeeG".

Following is simple algorithm to reverse a string using stack.
1) Create an empty stack.
2) One by one push all characters of string to stack.
3) One by one pop all characters from stack and put them back to string.
 */

export class Stack<T> {
    private items: T[];

    constructor() {
        this.items = [];
    }

    size(): number {
        return this.items.length;
    }

    isEmpty(): boolean {
        return this.size() === 0;
    }

    push(item: T): void {
        this.items.push(item);
    }

    pop(): T | undefined {
        if (this.isEmpty()) {
            return undefined;
        }
        return this.items.pop();
    }
}

function reverseString(inputString: string): string {
    const n: number = inputString.length;
    const stack: Stack<string> = new Stack<string>();

    // Push all characters of the string to the stack
    for (let i = 0; i < n; i++) {
        stack.push(inputString[i]);
    }

    // Making the string empty since all characters are saved in the stack
    let reversedString: string = "";

    // Pop all characters of the string and put them back to the string
    for (let i = 0; i < n; i++) {
        reversedString += stack.pop()!;
    }

    return reversedString;
}

// Example usage:
const inputString: string = "GeeksQuiz";
const reversedString: string = reverseString(inputString);
console.log("Reversed string is " + reversedString);

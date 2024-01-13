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

export class ParanthesisChecker {
    stack: Stack<string>;

    constructor() {
        this.stack = new Stack<string>();
    }

    check(param: string = ""): boolean {
        const parList: string[] = param.split(" ");
        let balanced: boolean = true;
        let index: number = 0;

        while (index < parList.length && balanced) {
            const symbol: string = parList[index];

            if (symbol === "(") {
                this.stack.push(symbol);
            } else if (this.stack.isEmpty()) {
                balanced = false;
            } else {
                this.stack.pop();
            }

            index++;
        }

        if (!balanced && this.stack.isEmpty()) {
            return false;
        } else {
            return true;
        }
    }
}

export class GeneralParanthesisChecker extends ParanthesisChecker {
    check(param: string = ""): boolean {
        const parList: string[] = param.split(" ");
        let balanced: boolean = true;
        let index: number = 0;

        while (index < parList.length && balanced) {
            const symbol: string = parList[index];

            if (symbol === "[" || symbol === "{" || symbol === "(") {
                this.stack.push(symbol);
            } else {
                const top: string | undefined = this.stack.pop();

                if (!top || !GeneralParanthesisChecker.matches(top, symbol)) {
                    balanced = false;
                }
            }

            index++;
        }

        if (!balanced && this.stack.isEmpty()) {
            return false;
        } else {
            return true;
        }
    }

    private static matches(open: string, close: string): boolean {
        const opens: string = "([{";
        const closes: string = ")]}";

        return opens.indexOf(open) === closes.indexOf(close);
    }
}

if (require.main === module) {
    // Example usage:
    const paranthesisChecker = new ParanthesisChecker();
    console.log(paranthesisChecker.check("()"));  // Output: true

    const generalParanthesisChecker = new GeneralParanthesisChecker();
    console.log(generalParanthesisChecker.check("[{()}]"));  // Output: true
    console.log(generalParanthesisChecker.check("{{([][])}()}"));  // Output: true
    console.log(generalParanthesisChecker.check("[{()]"));  // Output: false


}